import { pdfMergerReducer, addAmazonFile, addFlipkartFile, removeAmazonFile, removeFlipkartFile, clearAmazonFiles, clearFlipkartFiles, clearFiles, mergePDFs } from '../pdfMergerSlice';

describe('pdfMergerSlice', () => {
  const initialState = {
    amazonFiles: [],
    flipkartFiles: [],
    finalPdf: null,
    summary: [],
    loading: false,
    error: null,
  };

  const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
  const mockFile2 = new File(['test2'], 'test2.pdf', { type: 'application/pdf' });
  const mockSummary = [
    { sku: 'TEST-SKU-1', name: 'Test Product 1', quantity: 5, price: 100, type: 'amazon' },
    { sku: 'TEST-SKU-2', name: 'Test Product 2', quantity: 3, price: 200, type: 'flipkart' },
  ] as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(pdfMergerReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle addAmazonFile', () => {
      const action = addAmazonFile(mockFile);
      const state = pdfMergerReducer(initialState, action);
      
      expect(state.amazonFiles).toHaveLength(1);
      expect(state.amazonFiles[0]).toBe(mockFile);
    });

    it('should handle addFlipkartFile', () => {
      const action = addFlipkartFile(mockFile);
      const state = pdfMergerReducer(initialState, action);
      
      expect(state.flipkartFiles).toHaveLength(1);
      expect(state.flipkartFiles[0]).toBe(mockFile);
    });

    it('should handle removeAmazonFile', () => {
      const stateWithFiles = {
        ...initialState,
        amazonFiles: [mockFile, mockFile2]
      };
      
      const action = removeAmazonFile(0);
      const state = pdfMergerReducer(stateWithFiles, action);
      
      expect(state.amazonFiles).toHaveLength(1);
      expect(state.amazonFiles[0]).toBe(mockFile2);
    });

    it('should handle removeFlipkartFile', () => {
      const stateWithFiles = {
        ...initialState,
        flipkartFiles: [mockFile, mockFile2]
      };
      
      const action = removeFlipkartFile(0);
      const state = pdfMergerReducer(stateWithFiles, action);
      
      expect(state.flipkartFiles).toHaveLength(1);
      expect(state.flipkartFiles[0]).toBe(mockFile2);
    });

    it('should handle clearAmazonFiles', () => {
      const stateWithFiles = {
        ...initialState,
        amazonFiles: [mockFile, mockFile2]
      };
      
      const action = clearAmazonFiles();
      const state = pdfMergerReducer(stateWithFiles, action);
      
      expect(state.amazonFiles).toHaveLength(0);
    });

    it('should handle clearFlipkartFiles', () => {
      const stateWithFiles = {
        ...initialState,
        flipkartFiles: [mockFile, mockFile2]
      };
      
      const action = clearFlipkartFiles();
      const state = pdfMergerReducer(stateWithFiles, action);
      
      expect(state.flipkartFiles).toHaveLength(0);
    });

    it('should handle clearFiles', () => {
      const stateWithFiles = {
        ...initialState,
        amazonFiles: [mockFile],
        flipkartFiles: [mockFile],
        finalPdf: 'blob:test-url',
        summary: mockSummary,
      };
      
      const action = clearFiles();
      const state = pdfMergerReducer(stateWithFiles, action);
      
      expect(state.amazonFiles).toHaveLength(0);
      expect(state.flipkartFiles).toHaveLength(0);
      expect(state.finalPdf).toBeNull();
      expect(state.summary).toEqual([]);
    });
  });

  describe('async thunks', () => {
    it('should handle mergePDFs.pending', () => {
      const action = { type: mergePDFs.pending.type };
      const state = pdfMergerReducer(initialState, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle mergePDFs.fulfilled', () => {
      const payload = {
        pdfUrl: 'blob:test-url',
        summary: mockSummary,
      };
      
      const action = { type: mergePDFs.fulfilled.type, payload };
      const state = pdfMergerReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.finalPdf).toBe(payload.pdfUrl);
      expect(state.summary).toEqual(payload.summary);
    });

    it('should handle mergePDFs.rejected', () => {
      const action = { 
        type: mergePDFs.rejected.type, 
        error: { message: 'Merge failed' } 
      };
      const state = pdfMergerReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Merge failed');
    });
  });

  describe('state structure', () => {
    it('should maintain correct state structure', () => {
      const state = pdfMergerReducer(undefined, { type: 'unknown' });
      
      expect(state).toHaveProperty('amazonFiles');
      expect(state).toHaveProperty('flipkartFiles');
      expect(state).toHaveProperty('finalPdf');
      expect(state).toHaveProperty('summary');
      expect(state).toHaveProperty('loading');
      expect(state).toHaveProperty('error');
    });

    it('should have correct initial values', () => {
      const state = pdfMergerReducer(undefined, { type: 'unknown' });
      
      expect(state.amazonFiles).toEqual([]);
      expect(state.flipkartFiles).toEqual([]);
      expect(state.finalPdf).toBeNull();
      expect(state.summary).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });
}); 