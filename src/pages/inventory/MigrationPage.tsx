import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  LinearProgress,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  PlayArrow as StartIcon,
  Refresh as RefreshIcon,
  CheckCircle as SuccessIcon,
  CheckCircle,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Undo as RollbackIcon,
  Assessment as AnalyzeIcon,
} from '@mui/icons-material';
import { inventoryMigrationService } from '../../services/inventoryMigration.service';
import { 
  MigrationStatus, 
  MigrationRule, 
  ValidationResult 
} from '../../types/categoryInventory.types';

interface MigrationPageProps {
  // No props needed for this component
}

const MigrationPage: React.FC<MigrationPageProps> = () => {
  // State management
  const [migrationStatus, setMigrationStatus] = useState<MigrationStatus | null>(null);
  const [migrationRules, setMigrationRules] = useState<MigrationRule[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Load migration status on component mount
  useEffect(() => {
    loadMigrationStatus();
  }, []);

  const loadMigrationStatus = async () => {
    try {
      setLoading(true);
      const status = await inventoryMigrationService.getMigrationStatus();
      setMigrationStatus(status);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load migration status');
    } finally {
      setLoading(false);
    }
  };

  const analyzeMigration = async () => {
    try {
      setLoading(true);
      const rules = await inventoryMigrationService.analyzeMigration();
      setMigrationRules(rules);
      setShowAnalysisDialog(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze migration');
    } finally {
      setLoading(false);
    }
  };

  const executeMigration = async () => {
    try {
      setLoading(true);
      setActiveStep(1);
      const result = await inventoryMigrationService.executeMigration();
      
      if (result.success) {
        setActiveStep(3);
        await loadMigrationStatus();
      } else {
        setActiveStep(2);
        setError(`Migration failed: ${result.errors.join(', ')}`);
      }
    } catch (err) {
      setActiveStep(2);
      setError(err instanceof Error ? err.message : 'Migration execution failed');
    } finally {
      setLoading(false);
    }
  };

  const validateMigration = async () => {
    try {
      setLoading(true);
      const result = await inventoryMigrationService.validateMigration();
      setValidationResult(result);
      setShowValidationDialog(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate migration');
    } finally {
      setLoading(false);
    }
  };

  const rollbackMigration = async () => {
    try {
      setLoading(true);
      await inventoryMigrationService.rollbackMigration();
      await loadMigrationStatus();
      setActiveStep(0);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rollback migration');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'failed': return 'error';
      case 'in-progress': return 'warning';
      case 'rolled-back': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <SuccessIcon />;
      case 'failed': return <ErrorIcon />;
      case 'in-progress': return <RefreshIcon />;
      case 'rolled-back': return <RollbackIcon />;
      default: return <InfoIcon />;
    }
  };

  const migrationSteps = [
    {
      label: 'Prepare Migration',
      description: 'Analyze current inventory and prepare migration rules',
    },
    {
      label: 'Execute Migration',
      description: 'Migrate product inventory to category-based system',
    },
    {
      label: 'Handle Errors',
      description: 'Review and resolve any migration errors',
    },
    {
      label: 'Validate Results',
      description: 'Verify migration completed successfully',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inventory Migration
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Migrate from product-based to category-based inventory management
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Migration Status Card */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Migration Status
              </Typography>
              
              {migrationStatus ? (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getStatusIcon(migrationStatus.status)}
                    <Chip
                      label={migrationStatus.status.toUpperCase()}
                      color={getStatusColor(migrationStatus.status) as any}
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  
                  {migrationStatus.currentPhase && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Phase:</strong> {migrationStatus.currentPhase}
                    </Typography>
                  )}
                  
                  {migrationStatus.progress !== undefined && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Progress: {migrationStatus.progress}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={migrationStatus.progress} 
                      />
                    </Box>
                  )}
                  
                  {migrationStatus.categoriesProcessed !== undefined && 
                   migrationStatus.totalCategories !== undefined && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Categories: {migrationStatus.categoriesProcessed}/{migrationStatus.totalCategories}
                    </Typography>
                  )}
                  
                  {migrationStatus.lastError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {migrationStatus.lastError}
                    </Alert>
                  )}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No migration status available
                </Typography>
              )}
            </CardContent>
            
            <CardActions>
              <Button
                startIcon={<RefreshIcon />}
                onClick={loadMigrationStatus}
                disabled={loading}
              >
                Refresh
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Migration Controls */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Migration Controls
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AnalyzeIcon />}
                  onClick={analyzeMigration}
                  disabled={loading}
                  fullWidth
                >
                  Analyze Migration
                </Button>
                
                <Button
                  variant="contained"
                  startIcon={<StartIcon />}
                  onClick={executeMigration}
                  disabled={loading || migrationStatus?.status === 'in-progress'}
                  fullWidth
                  color="primary"
                >
                  Start Migration
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<CheckCircle />}
                  onClick={validateMigration}
                  disabled={loading || migrationStatus?.status !== 'completed'}
                  fullWidth
                >
                  Validate Migration
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<RollbackIcon />}
                  onClick={rollbackMigration}
                  disabled={loading || !migrationStatus || migrationStatus.status === 'pending'}
                  fullWidth
                  color="warning"
                >
                  Rollback Migration
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Migration Process Stepper */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Migration Process
            </Typography>
            
            <Stepper activeStep={activeStep} orientation="vertical">
              {migrationSteps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>
      </Grid>

      {/* Analysis Dialog */}
      <Dialog
        open={showAnalysisDialog}
        onClose={() => setShowAnalysisDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Migration Analysis Results</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Found {migrationRules.length} categories to migrate:
          </Typography>
          
          <List>
            {migrationRules.map((rule, index) => (
              <React.Fragment key={rule.categoryId}>
                <ListItem>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={rule.categoryName}
                    secondary={
                      <Box>
                        <Typography variant="body2">
                          Products: {rule.productCount} | 
                          Total Quantity: {rule.aggregatedQuantity} | 
                          Low Stock Threshold: {rule.lowStockThreshold}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < migrationRules.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAnalysisDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Validation Dialog */}
      <Dialog
        open={showValidationDialog}
        onClose={() => setShowValidationDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Migration Validation Results</DialogTitle>
        <DialogContent>
          {validationResult && (
            <Box>
              <Alert 
                severity={validationResult.isValid ? 'success' : 'warning'} 
                sx={{ mb: 2 }}
              >
                {validationResult.isValid 
                  ? 'Migration validation passed successfully!' 
                  : `Found ${validationResult.totalDiscrepancies} discrepancies`
                }
              </Alert>
              
              {validationResult.categoryDiscrepancies.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Category Discrepancies
                  </Typography>
                  <List>
                    {validationResult.categoryDiscrepancies.map((disc, index) => (
                      <ListItem key={disc.categoryId}>
                        <ListItemIcon>
                          <WarningIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText
                          primary={disc.categoryName}
                          secondary={`Expected: ${disc.expectedQuantity}, Actual: ${disc.actualQuantity}, Difference: ${disc.difference}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
              
              {validationResult.orphanedProducts.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Orphaned Products
                  </Typography>
                  <Typography variant="body2">
                    {validationResult.orphanedProducts.join(', ')}
                  </Typography>
                </Box>
              )}
              
              {validationResult.duplicateProducts.length > 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Duplicate Products
                  </Typography>
                  <Typography variant="body2">
                    {validationResult.duplicateProducts.join(', ')}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowValidationDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MigrationPage; 