import { pdfMergerReducer, setAmazonFile, setFlipkartFile, clearFiles, mergePDFs } from '../pdfMergerSlice';

describe('pdfMergerSlice', () => {
  const initialState = {
    amazonFile: null,
    flipkartFile: null,
    finalPdf: null,
    summary: [],
    loading: false,
    error: null,
  };

  const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
  const mockSummary = [
    { sku: 'TEST-SKU-1', name: 'Test Product 1', quantity: 5, price: 100, type: 'amazon' },
    { sku: 'TEST-SKU-2', name: 'Test Product 2', quantity: 3, price: 200, type: 'flipkart' },
  ] as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(pdfMergerReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setAmazonFile', () => {
      const action = setAmazonFile(mockFile);
      const state = pdfMergerReducer(initialState, action);
      
      expect(state.amazonFile).toBe(mockFile);
    });

    it('should handle setFlipkartFile', () => {
      const action = setFlipkartFile(mockFile);
      const state = pdfMergerReducer(initialState, action);
      
      expect(state.flipkartFile).toBe(mockFile);
    });

    it('should handle clearFiles', () => {
      const stateWithFiles = {
        ...initialState,
        amazonFile: mockFile,
        flipkartFile: mockFile,
        finalPdf: 'blob:test-url',
        summary: mockSummary,
      };
      
      const action = clearFiles();
      const state = pdfMergerReducer(stateWithFiles, action);
      
      expect(state.amazonFile).toBeNull();
      expect(state.flipkartFile).toBeNull();
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
      
      expect(state).toHaveProperty('amazonFile');
      expect(state).toHaveProperty('flipkartFile');
      expect(state).toHaveProperty('finalPdf');
      expect(state).toHaveProperty('summary');
      expect(state).toHaveProperty('loading');
      expect(state).toHaveProperty('error');
    });

    it('should have correct initial values', () => {
      const state = pdfMergerReducer(undefined, { type: 'unknown' });
      
      expect(state.amazonFile).toBeNull();
      expect(state.flipkartFile).toBeNull();
      expect(state.finalPdf).toBeNull();
      expect(state.summary).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });
}); 