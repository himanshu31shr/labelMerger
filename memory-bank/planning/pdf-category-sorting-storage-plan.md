# PDF Category Sorting & Firebase Storage - Technical Plan

> **Comprehensive Feature Planning Document**  
> Created: December 23, 2024  
> Status: PLAN Mode ✅ COMPLETE

## 📋 Feature Requirements

### Primary Business Requirements
1. Sort merged PDF labels by category before generating final PDF
2. Save merged PDFs to Firebase Storage with category metadata
3. Integrate with planned 7-day auto-deletion lifecycle
4. Provide user-configurable sorting preferences

### Technical Requirements
1. Develop efficient category-based sorting algorithm
2. Implement secure Firebase Storage integration
3. Design intuitive UI for sorting preferences
4. Add comprehensive metadata for storage management
5. Ensure performance with large PDF datasets

## 🏗️ Technical Architecture

### 1. Category-Based Sorting System

#### Core Component: `utils/pdfSorting.ts`

```typescript
// Type definitions for sorting configuration
interface CategorySortConfig {
  primarySort: 'category' | 'name' | 'price';
  secondarySort?: 'name' | 'price' | 'sku';
  sortOrder: 'asc' | 'desc';
  groupByCategory: boolean;
  categoryOrder?: string[]; // Optional manual category ordering
}
```

#### Main Sorting Function

```typescript
// Core sorting function
export function sortProductsByCategory(
  products: Product[], 
  config: CategorySortConfig
): Product[] {
  if (!products?.length) return [];
  
  // If not grouping by category, use simple sorting
  if (!config.groupByCategory) {
    return sortProductsByField(products, config.primarySort, config.sortOrder);
  }
  
  // Group by category
  const categoryGroups: Record<string, Product[]> = {};
  products.forEach(product => {
    const category = product.category || 'Uncategorized';
    if (!categoryGroups[category]) categoryGroups[category] = [];
    categoryGroups[category].push(product);
  });
  
  // Get list of categories (either from manual order or alphabetical)
  let categories = Object.keys(categoryGroups);
  if (config.categoryOrder?.length) {
    // Use manual category order if provided
    const orderMap = new Map(config.categoryOrder.map((cat, idx) => [cat, idx]));
    categories.sort((a, b) => {
      const aIdx = orderMap.has(a) ? orderMap.get(a)! : Infinity;
      const bIdx = orderMap.has(b) ? orderMap.get(b)! : Infinity;
      return aIdx - bIdx;
    });
  } else {
    // Default alphabetical order
    categories.sort();
  }
  
  // For each category, sort products by secondary field
  const sortedProducts: Product[] = [];
  categories.forEach(category => {
    const productsInCategory = categoryGroups[category];
    if (config.secondarySort) {
      sortProductsByField(
        productsInCategory, 
        config.secondarySort, 
        config.sortOrder
      );
    }
    sortedProducts.push(...productsInCategory);
  });
  
  return sortedProducts;
}
```

### 2. Firebase Storage Integration

#### Core Component: `services/pdfStorageService.ts`

```typescript
// Type definitions for storage
export interface PdfStorageMetadata {
  userId: string;
  fileName: string;
  createdAt: Timestamp;
  expiresAt: Timestamp;
  categories: string[];
  productCount: number;
  fileSize: number;
}

export interface PdfStorageConfig {
  fileName?: string;  // Optional custom filename
  categories: string[];
  productCount: number;
  expirationDays?: number; // Default: 7
}
```

#### Storage Service Class

```typescript
// Main class for PDF storage operations
export class PdfStorageService {
  private storage = getStorage();
  private db = getFirestore();
  private auth = getAuth();
  
  // Save PDF to Firebase Storage
  async savePdf(pdfBlob: Blob, config: PdfStorageConfig): Promise<StoredPdfInfo> {
    const userId = this.getUserId();
    const fileName = config.fileName || this.generateFileName(config);
    const filePath = `user-pdfs/${userId}/${fileName}`;
    const storageRef = ref(this.storage, filePath);
    
    // Upload file
    const uploadResult = await uploadBytes(storageRef, pdfBlob);
    
    // Calculate expiration date
    const createdAt = Timestamp.now();
    const expirationDays = config.expirationDays || 7;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    const expiresAt = Timestamp.fromDate(expirationDate);
    
    // Get download URL
    const downloadUrl = await getDownloadURL(storageRef);
    
    // Save metadata to Firestore
    const metadata: PdfStorageMetadata = {
      userId,
      fileName,
      createdAt,
      expiresAt,
      categories: config.categories || [],
      productCount: config.productCount || 0,
      fileSize: uploadResult.metadata.size || 0
    };
    
    const docRef = await addDoc(collection(this.db, 'pdf_metadata'), metadata);
    
    return {
      id: docRef.id,
      downloadUrl,
      fileName,
      createdAt,
      expiresAt,
      categories: metadata.categories,
      productCount: metadata.productCount,
      fileSize: metadata.fileSize,
      daysRemaining: expirationDays
    };
  }
}
```

### 3. Firebase Cloud Functions for Auto-Deletion

```typescript
// functions/src/index.ts
export const cleanupExpiredPdfs = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async context => {
    const db = admin.firestore();
    const storage = admin.storage();
    
    const now = admin.firestore.Timestamp.now();
    
    // Get all expired PDF metadata
    const expiredQuery = await db
      .collection('pdf_metadata')
      .where('expiresAt', '<=', now)
      .get();
    
    if (expiredQuery.empty) {
      console.log('No expired PDFs to delete');
      return null;
    }
    
    console.log(`Found ${expiredQuery.size} expired PDFs to delete`);
    
    // Process each expired document
    const deletePromises: Promise<any>[] = [];
    
    expiredQuery.docs.forEach(doc => {
      const data = doc.data();
      const userId = data.userId;
      const fileName = data.fileName;
      const filePath = `user-pdfs/${userId}/${fileName}`;
      
      // Delete storage file and metadata document
      const fileDeletePromise = storage.bucket().file(filePath).delete()
        .catch(err => console.error(`Error deleting file ${filePath}:`, err));
      
      const metadataDeletePromise = doc.ref.delete();
      
      deletePromises.push(Promise.all([fileDeletePromise, metadataDeletePromise]));
    });
    
    await Promise.all(deletePromises);
    console.log(`Successfully deleted ${expiredQuery.size} expired PDFs`);
    
    return null;
  });
```

### 4. User Interface Components

#### Sort Preferences UI

```typescript
// components/SortPreferencesControl.tsx

export const SortPreferencesControl: React.FC<SortPreferencesControlProps> = ({ 
  onConfigChange,
  initialConfig = defaultConfig
}) => {
  const [config, setConfig] = useState<CategorySortConfig>(initialConfig);
  
  const handleChange = (field: keyof CategorySortConfig, value: any) => {
    const newConfig = { ...config, [field]: value };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };
  
  return (
    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <SortIcon color="primary" />
        <Typography variant="subtitle1">Sorting Preferences</Typography>
        <Tooltip title="These settings determine how products will appear in your generated PDF">
          <IconButton size="small">
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
      
      <FormControlLabel
        control={
          <Checkbox
            checked={config.groupByCategory}
            onChange={e => handleChange('groupByCategory', e.target.checked)}
          />
        }
        label="Group by category"
      />
      
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <FormControl size="small" fullWidth>
          <InputLabel>Primary Sort</InputLabel>
          <Select
            value={config.primarySort}
            label="Primary Sort"
            onChange={e => handleChange('primarySort', e.target.value)}
          >
            <MenuItem value="category">Category</MenuItem>
            <MenuItem value="name">Product Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl size="small" fullWidth>
          <InputLabel>Secondary Sort</InputLabel>
          <Select
            value={config.secondarySort}
            label="Secondary Sort"
            onChange={e => handleChange('secondarySort', e.target.value)}
          >
            <MenuItem value="name">Product Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="sku">SKU</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl size="small" fullWidth>
          <InputLabel>Sort Order</InputLabel>
          <Select
            value={config.sortOrder}
            label="Sort Order"
            onChange={e => handleChange('sortOrder', e.target.value)}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
```

#### Storage Dialog

```typescript
// components/StorageConfirmationDialog.tsx

export const StorageConfirmationDialog: React.FC<StorageConfirmationDialogProps> = ({
  open,
  onClose,
  pdfBlob,
  categories,
  productCount,
  onSuccess
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSave = async () => {
    if (!pdfBlob) {
      setError('No PDF data available to save');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      // Save to Firebase Storage
      const pdfInfo = await pdfStorage.savePdf(pdfBlob, {
        categories,
        productCount,
        expirationDays: 7
      });
      
      setIsUploading(false);
      onSuccess(pdfInfo);
    } catch (err) {
      setIsUploading(false);
      setError(err instanceof Error ? err.message : 'Unknown error saving PDF');
    }
  };
  
  return (
    <Dialog open={open} onClose={isUploading ? undefined : onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Save PDF to Cloud Storage
      </DialogTitle>
      
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        
        <Typography variant="body1" paragraph>
          Your merged PDF will be saved to secure cloud storage and will be automatically deleted after 7 days.
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon sx={{ mr: 1 }} fontSize="small" />
            PDF Details
          </Typography>
          
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CategoryIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Categories" 
                secondary={
                  <Box sx={{ mt: 0.5 }}>
                    {categories.map(cat => (
                      <Chip key={cat} label={cat} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                    {categories.length === 0 && 'No categories'}
                  </Box>
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Products" secondary={`${productCount} items`} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <AccessTimeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Expiration" 
                secondary="Will be automatically deleted after 7 days" 
              />
            </ListItem>
          </List>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} disabled={isUploading}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={isUploading || !pdfBlob}
          startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
        >
          {isUploading ? 'Saving...' : 'Save to Cloud'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
```

### 5. Firebase Security Rules

```
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // PDF metadata collection - user can only access their own files
    match /pdf_metadata/{metadataId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow delete: if request.auth != null && request.auth.uid == resource.data.userId;
      allow update: if false; // No updates allowed, only create and delete
    }
  }
}

// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User PDF files - user can only access their own files
    match /user-pdfs/{userId}/{fileName} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 📊 Implementation Phases

### Phase 1: Sorting Functionality (2-3 days)

1. **Create Sorting Utilities**
   - Develop `utils/pdfSorting.ts` with core sorting algorithm
   - Implement category grouping function
   - Add secondary sorting capabilities
   - Create type definitions for sort configuration

2. **Unit Testing**
   - Test sorting with various category combinations
   - Test edge cases (empty categories, null values)
   - Verify sorting performance with large datasets

3. **Integration with PDF Generation**
   - Modify existing PDF generation workflow
   - Apply sorting before PDF creation
   - Ensure sorted order is maintained in output

### Phase 2: Firebase Storage Integration (3-4 days)

1. **Firebase Storage Setup**
   - Configure storage buckets and security rules
   - Set up Firestore metadata collection
   - Create cloud functions for auto-deletion

2. **Storage Service Implementation**
   - Develop `pdfStorageService.ts` class
   - Implement upload/download functionality
   - Add metadata management
   - Create file naming convention

3. **Security Implementation**
   - Configure proper authentication checks
   - Set up user-scoped access rules
   - Test security with different user accounts

### Phase 3: User Interface Integration (2 days)

1. **Sort Preferences UI**
   - Create sort configuration controls
   - Implement preference persistence
   - Add tooltips and help text

2. **Storage Dialog**
   - Design confirmation dialog
   - Add category preview
   - Implement progress indicators

3. **Success Notification**
   - Create download link component
   - Add expiration countdown
   - Implement copy/share functionality

### Phase 4: Testing & QA (1-2 days)

1. **End-to-End Testing**
   - Verify complete workflow
   - Test with various sorting configurations
   - Validate storage and retrieval process

2. **Performance Testing**
   - Test with large PDF files (100+ products)
   - Verify sorting performance
   - Measure storage operation times

3. **Edge Case Validation**
   - Test with unusual category structures
   - Verify error handling and recovery
   - Test network interruptions

## 🎯 Success Criteria

1. **Category Sorting**
   - Products properly grouped by category in PDFs
   - Secondary sorting applied correctly within categories
   - User-configurable sort preferences respected
   - Performance maintained with large product sets

2. **Firebase Storage**
   - PDFs successfully saved to Firebase Storage
   - Proper metadata attached to stored files
   - Secure user-scoped access to files
   - Auto-deletion works after 7-day period

3. **User Experience**
   - Intuitive UI for sort preferences
   - Clear storage confirmation with preview
   - Helpful success notifications with download links
   - Smooth integration with existing workflow

## 🚨 Risk Mitigation

1. **Storage Costs**
   - Implement file size monitoring
   - Enforce auto-deletion policy
   - Add size limits for large PDFs

2. **Performance Concerns**
   - Optimize sorting algorithm for large datasets
   - Use batch processing for database operations
   - Implement progress indicators for long operations

3. **User Education**
   - Clear tooltips explaining sorting options
   - Visual indicators of expiration dates
   - Help text for storage limitations

4. **Security**
   - Comprehensive authentication checks
   - User-scoped storage rules
   - Regular security audits

## 📈 Future Enhancements (Post-MVP)

1. **Advanced Sorting Options**
   - Custom category ordering
   - Multi-level sorting with more fields
   - User-defined sort presets

2. **Enhanced Storage Features**
   - User-configurable retention periods
   - Email notifications before expiration
   - Bulk operations (download all, delete all)

3. **Sharing Capabilities**
   - Generate shareable links with expiration
   - Set custom permissions for shared files
   - Team/group access options

---

*This plan provides a comprehensive approach to implementing the PDF Category Sorting & Firebase Storage feature with a clear timeline, technical architecture, and success criteria.* 