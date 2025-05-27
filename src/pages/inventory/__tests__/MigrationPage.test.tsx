import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MigrationPage from '../MigrationPage';
import { inventoryMigrationService } from '../../../services/inventoryMigration.service';
import { MigrationStatus, MigrationRule, ValidationResult } from '../../../types/categoryInventory.types';
import { Timestamp } from 'firebase/firestore';

// Mock the migration service
jest.mock('../../../services/inventoryMigration.service', () => ({
  inventoryMigrationService: {
    getMigrationStatus: jest.fn(),
    analyzeMigration: jest.fn(),
    executeMigration: jest.fn(),
    validateMigration: jest.fn(),
    rollbackMigration: jest.fn(),
  },
}));

const mockMigrationService = inventoryMigrationService as jest.Mocked<typeof inventoryMigrationService>;

// Mock Timestamp
const mockTimestamp = {
  toDate: () => new Date(),
} as Timestamp;

describe('MigrationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('component rendering', () => {
    it('should render the migration page with header', () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockResolvedValue(null);

      // Act
      render(<MigrationPage />);

      // Assert
      expect(screen.getByText('Inventory Migration')).toBeInTheDocument();
      expect(screen.getByText('Migrate from product-based to category-based inventory management')).toBeInTheDocument();
    });

    it('should render migration status card', () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockResolvedValue(null);

      // Act
      render(<MigrationPage />);

      // Assert
      expect(screen.getByText('Migration Status')).toBeInTheDocument();
      expect(screen.getByText('No migration status available')).toBeInTheDocument();
    });

    it('should render migration controls', () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockResolvedValue(null);

      // Act
      render(<MigrationPage />);

      // Assert
      expect(screen.getByText('Migration Controls')).toBeInTheDocument();
      expect(screen.getByText('Analyze Migration')).toBeInTheDocument();
      expect(screen.getByText('Start Migration')).toBeInTheDocument();
      expect(screen.getByText('Validate Migration')).toBeInTheDocument();
      expect(screen.getByText('Rollback Migration')).toBeInTheDocument();
    });

    it('should render migration process stepper', () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockResolvedValue(null);

      // Act
      render(<MigrationPage />);

      // Assert
      expect(screen.getByText('Migration Process')).toBeInTheDocument();
      expect(screen.getByText('Prepare Migration')).toBeInTheDocument();
      expect(screen.getByText('Execute Migration')).toBeInTheDocument();
      expect(screen.getByText('Handle Errors')).toBeInTheDocument();
      expect(screen.getByText('Validate Results')).toBeInTheDocument();
    });
  });

  describe('migration status display', () => {
    it('should display migration status when available', async () => {
      // Arrange
      const mockStatus: MigrationStatus = {
        status: 'in-progress',
        progress: 50,
        currentPhase: 'Migrating inventory data',
        categoriesProcessed: 5,
        totalCategories: 10,
        startedAt: mockTimestamp,
      };
      mockMigrationService.getMigrationStatus.mockResolvedValue(mockStatus);

      // Act
      render(<MigrationPage />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('IN-PROGRESS')).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
          return element?.tagName === 'P' && element?.textContent === 'Phase: Migrating inventory data';
        })).toBeInTheDocument();
        expect(screen.getAllByText((content, element) => {
          return element?.tagName === 'P' && element?.textContent === 'Progress: 50%';
        })[0]).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
          return element?.tagName === 'P' && element?.textContent === 'Categories: 5/10';
        })).toBeInTheDocument();
      });
    });

    it('should display error in migration status', async () => {
      // Arrange
      const mockStatus: MigrationStatus = {
        status: 'failed',
        progress: 25,
        currentPhase: 'Migration failed',
        lastError: 'Database connection failed',
        startedAt: mockTimestamp,
        categoriesProcessed: 2,
        totalCategories: 8,
      };
      mockMigrationService.getMigrationStatus.mockResolvedValue(mockStatus);

      // Act
      render(<MigrationPage />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('FAILED')).toBeInTheDocument();
        expect(screen.getByText('Database connection failed')).toBeInTheDocument();
      });
    });
  });

  describe('migration actions', () => {
    it('should handle analyze migration', async () => {
      // Arrange
      const mockRules: MigrationRule[] = [
        {
          categoryId: 'cat1',
          categoryName: 'Electronics',
          products: [],
          aggregatedQuantity: 100,
          lowStockThreshold: 10,
          productCount: 5,
        },
      ];
      mockMigrationService.getMigrationStatus.mockResolvedValue(null);
      mockMigrationService.analyzeMigration.mockResolvedValue(mockRules);

      // Act
      render(<MigrationPage />);
      
      // Wait for initial load to complete
      await waitFor(() => {
        expect(screen.getByText('Analyze Migration')).not.toBeDisabled();
      });
      
      fireEvent.click(screen.getByText('Analyze Migration'));

      // Assert
      await waitFor(() => {
        expect(mockMigrationService.analyzeMigration).toHaveBeenCalled();
        expect(screen.getByText('Migration Analysis Results')).toBeInTheDocument();
        expect(screen.getByText('Found 1 categories to migrate:')).toBeInTheDocument();
        expect(screen.getByText('Electronics')).toBeInTheDocument();
      });
    });

    it('should handle start migration', async () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockResolvedValue(null);
      mockMigrationService.executeMigration.mockResolvedValue({
        success: true,
        categoriesMigrated: 5,
        totalProductsProcessed: 25,
        errors: [],
        warnings: [],
        startTime: new Date(),
        endTime: new Date(),
        duration: 5000,
      });

      // Act
      render(<MigrationPage />);
      
      // Wait for initial load to complete
      await waitFor(() => {
        expect(screen.getByText('Start Migration')).not.toBeDisabled();
      });
      
      fireEvent.click(screen.getByText('Start Migration'));

      // Assert
      await waitFor(() => {
        expect(mockMigrationService.executeMigration).toHaveBeenCalled();
      });
    });

    it('should handle validate migration', async () => {
      // Arrange
      const mockValidation: ValidationResult = {
        isValid: true,
        totalDiscrepancies: 0,
        categoryDiscrepancies: [],
        orphanedProducts: [],
        duplicateProducts: [],
      };
      mockMigrationService.getMigrationStatus.mockResolvedValue({
        status: 'completed',
        progress: 100,
        currentPhase: 'Migration completed',
        startedAt: mockTimestamp,
        categoriesProcessed: 10,
        totalCategories: 10,
      });
      mockMigrationService.validateMigration.mockResolvedValue(mockValidation);

      // Act
      render(<MigrationPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Validate Migration')).not.toBeDisabled();
      });
      
      fireEvent.click(screen.getByText('Validate Migration'));

      // Assert
      await waitFor(() => {
        expect(mockMigrationService.validateMigration).toHaveBeenCalled();
        expect(screen.getByText('Migration Validation Results')).toBeInTheDocument();
        expect(screen.getByText('Migration validation passed successfully!')).toBeInTheDocument();
      });
    });

    it('should handle rollback migration', async () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockResolvedValue({
        status: 'completed',
        progress: 100,
        currentPhase: 'Migration completed',
        startedAt: mockTimestamp,
        categoriesProcessed: 10,
        totalCategories: 10,
      });
      mockMigrationService.rollbackMigration.mockResolvedValue(undefined);

      // Act
      render(<MigrationPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Rollback Migration')).not.toBeDisabled();
      });
      
      fireEvent.click(screen.getByText('Rollback Migration'));

      // Assert
      await waitFor(() => {
        expect(mockMigrationService.rollbackMigration).toHaveBeenCalled();
      });
    });

    it('should refresh migration status', async () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockResolvedValue(null);

      // Act
      render(<MigrationPage />);
      
      // Wait for initial load to complete
      await waitFor(() => {
        expect(mockMigrationService.getMigrationStatus).toHaveBeenCalledTimes(1);
      });
      
      fireEvent.click(screen.getByText('Refresh'));

      // Assert
      await waitFor(() => {
        expect(mockMigrationService.getMigrationStatus).toHaveBeenCalledTimes(2); // Once on mount, once on refresh
      });
    });
  });

  describe('error handling', () => {
    it('should display error when migration status fails to load', async () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockRejectedValue(new Error('Failed to load status'));

      // Act
      render(<MigrationPage />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Failed to load status')).toBeInTheDocument();
      });
    });

    it('should display error when analyze migration fails', async () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockResolvedValue(null);
      mockMigrationService.analyzeMigration.mockRejectedValue(new Error('Analysis failed'));

      // Act
      render(<MigrationPage />);
      
      // Wait for initial load to complete
      await waitFor(() => {
        expect(screen.getByText('Analyze Migration')).not.toBeDisabled();
      });
      
      fireEvent.click(screen.getByText('Analyze Migration'));

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Analysis failed')).toBeInTheDocument();
      });
    });

    it('should display error when migration execution fails', async () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockResolvedValue(null);
      mockMigrationService.executeMigration.mockRejectedValue(new Error('Execution failed'));

      // Act
      render(<MigrationPage />);
      
      // Wait for initial load to complete
      await waitFor(() => {
        expect(screen.getByText('Start Migration')).not.toBeDisabled();
      });
      
      fireEvent.click(screen.getByText('Start Migration'));

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Execution failed')).toBeInTheDocument();
      });
    });

    it('should close error alert when close button is clicked', async () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockRejectedValue(new Error('Failed to load status'));

      // Act
      render(<MigrationPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Failed to load status')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByLabelText('Close'));

      // Assert
      await waitFor(() => {
        expect(screen.queryByText('Failed to load status')).not.toBeInTheDocument();
      });
    });
  });

  describe('validation results dialog', () => {
    it('should display validation results with discrepancies', async () => {
      // Arrange
      const mockValidation: ValidationResult = {
        isValid: false,
        totalDiscrepancies: 2,
        categoryDiscrepancies: [
          {
            categoryId: 'cat1',
            categoryName: 'Electronics',
            expectedQuantity: 100,
            actualQuantity: 95,
            difference: 5,
          },
        ],
        orphanedProducts: ['PROD001'],
        duplicateProducts: ['PROD002'],
      };
      mockMigrationService.getMigrationStatus.mockResolvedValue({
        status: 'completed',
        progress: 100,
        currentPhase: 'Migration completed',
        startedAt: mockTimestamp,
        categoriesProcessed: 10,
        totalCategories: 10,
      });
      mockMigrationService.validateMigration.mockResolvedValue(mockValidation);

      // Act
      render(<MigrationPage />);
      
      await waitFor(() => {
        expect(screen.getByText('Validate Migration')).not.toBeDisabled();
      });
      
      fireEvent.click(screen.getByText('Validate Migration'));

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Found 2 discrepancies')).toBeInTheDocument();
        expect(screen.getByText('Category Discrepancies')).toBeInTheDocument();
        expect(screen.getByText('Electronics')).toBeInTheDocument();
        expect(screen.getByText('Expected: 100, Actual: 95, Difference: 5')).toBeInTheDocument();
        expect(screen.getByText('Orphaned Products')).toBeInTheDocument();
        expect(screen.getByText('PROD001')).toBeInTheDocument();
        expect(screen.getByText('Duplicate Products')).toBeInTheDocument();
        expect(screen.getByText('PROD002')).toBeInTheDocument();
      });
    });
  });

  describe('button states', () => {
    it('should disable start migration when migration is in progress', async () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockResolvedValue({
        status: 'in-progress',
        progress: 50,
        currentPhase: 'Migrating data',
        startedAt: mockTimestamp,
        categoriesProcessed: 5,
        totalCategories: 10,
      });

      // Act
      render(<MigrationPage />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Start Migration')).toBeDisabled();
      });
    });

    it('should disable validate migration when migration is not completed', async () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockResolvedValue({
        status: 'pending',
        progress: 0,
        currentPhase: 'Waiting to start',
        startedAt: mockTimestamp,
        categoriesProcessed: 0,
        totalCategories: 10,
      });

      // Act
      render(<MigrationPage />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Validate Migration')).toBeDisabled();
      });
    });

    it('should disable rollback migration when status is pending', async () => {
      // Arrange
      mockMigrationService.getMigrationStatus.mockResolvedValue({
        status: 'pending',
        progress: 0,
        currentPhase: 'Waiting to start',
        startedAt: mockTimestamp,
        categoriesProcessed: 0,
        totalCategories: 10,
      });

      // Act
      render(<MigrationPage />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Rollback Migration')).toBeDisabled();
      });
    });
  });
}); 