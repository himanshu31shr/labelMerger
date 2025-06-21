import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PDFMergerService } from '../../pages/home/services/merge.service';
import { ProductSummary } from '../../pages/home/services/base.transformer';
import { store } from '..';
import { CategorySortConfig } from "../../utils/pdfSorting";

export interface PdfMergerState {
  amazonFiles: File[];
  flipkartFiles: File[];
  finalPdf: string | null;
  summary: ProductSummary[];
  loading: boolean;
  error: string | null;
}

const initialState: PdfMergerState = {
  amazonFiles: [],
  flipkartFiles: [],
  finalPdf: null,
  summary: [],
  loading: false,
  error: null,
};

interface MergePDFsParams {
  amazonFiles: File[];
  flipkartFiles: File[];
  sortConfig?: CategorySortConfig;
}

// Helper function to read file contents
const readFileFromInput = (file: File): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(new Uint8Array(reader.result));
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const mergePDFs = createAsyncThunk(
  'pdfMerger/mergePDFs',
  async (params: MergePDFsParams) => {
    const { amazonFiles, flipkartFiles, sortConfig } = params;

    if (amazonFiles.length === 0 && flipkartFiles.length === 0) {
      throw new Error('No files provided');
    }

    const products = store.getState().products.items;
    const categories = store.getState().products.categories;

    const mergePdfs = new PDFMergerService(products, categories);
    
    // Read all Amazon files
    const amazonFileContents = await Promise.all(
      amazonFiles.map(file => readFileFromInput(file))
    );
    
    // Read all Flipkart files
    const flipkartFileContents = await Promise.all(
      flipkartFiles.map(file => readFileFromInput(file))
    );
    
    // Pass the sort config if provided
    const pdf = await mergePdfs.mergePdfs({
      amzon: amazonFileContents,
      flp: flipkartFileContents,
      sortConfig: sortConfig // Pass the sortConfig to use in merging
    });

    if (!pdf) {
      throw new Error('Failed to merge PDFs');
    }

    const outputPdfBytes = await pdf.save();
    const blob = new Blob([outputPdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(blob);

    return {
      pdfUrl,
      summary: mergePdfs.summary,
    };
  }
);

const pdfMergerSlice = createSlice({
  name: 'pdfMerger',
  initialState,
  reducers: {
    addAmazonFile: (state, action: PayloadAction<File>) => {
      state.amazonFiles.push(action.payload);
    },
    addFlipkartFile: (state, action: PayloadAction<File>) => {
      state.flipkartFiles.push(action.payload);
    },
    removeAmazonFile: (state, action: PayloadAction<number>) => {
      state.amazonFiles.splice(action.payload, 1);
    },
    removeFlipkartFile: (state, action: PayloadAction<number>) => {
      state.flipkartFiles.splice(action.payload, 1);
    },
    clearAmazonFiles: (state) => {
      state.amazonFiles = [];
    },
    clearFlipkartFiles: (state) => {
      state.flipkartFiles = [];
    },
    clearFiles: (state) => {
      state.amazonFiles = [];
      state.flipkartFiles = [];
      state.finalPdf = null;
      state.summary = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(mergePDFs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergePDFs.fulfilled, (state, action) => {
        state.loading = false;
        state.finalPdf = action.payload.pdfUrl;
        state.summary = action.payload.summary;
      })
      .addCase(mergePDFs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to merge PDFs';
      });
  },
});

export const { 
  addAmazonFile, 
  addFlipkartFile, 
  removeAmazonFile,
  removeFlipkartFile,
  clearAmazonFiles,
  clearFlipkartFiles,
  clearFiles
} = pdfMergerSlice.actions;
export const pdfMergerReducer = pdfMergerSlice.reducer; 