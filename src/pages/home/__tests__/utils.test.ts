import { readFileFromInput, downloadFile, exportTableToPDF } from '../utils';

// Mock html2pdf
jest.mock('html2pdf.js', () => {
  const mockWorker = {
    set: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    save: jest.fn().mockReturnThis(),
  };
  return jest.fn(() => mockWorker);
});

describe('home utils', () => {
  describe('readFileFromInput', () => {
    it('should return null when no file is provided', async () => {
      const result = await readFileFromInput();
      expect(result).toBeNull();
    });

    it('should return null when undefined file is provided', async () => {
      const result = await readFileFromInput(undefined);
      expect(result).toBeNull();
    });

    it('should read file and return Uint8Array', async () => {
      const mockFileContent = new ArrayBuffer(8);
      const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
      
      // Mock FileReader
      const mockFileReader = {
        readAsArrayBuffer: jest.fn(),
        result: mockFileContent,
        onload: null as any,
        onerror: null as any,
      };

      // Replace FileReader constructor
      global.FileReader = jest.fn(() => mockFileReader) as any;

      // Start the read operation
      const resultPromise = readFileFromInput(mockFile);

      // Simulate successful file read
      setTimeout(() => {
        if (mockFileReader.onload) {
          mockFileReader.onload();
        }
      }, 0);

      const result = await resultPromise;
      
      expect(result).toBeInstanceOf(Uint8Array);
      expect(mockFileReader.readAsArrayBuffer).toHaveBeenCalledWith(mockFile);
    });
  });

  describe('downloadFile', () => {
    let mockCreateElement: jest.SpyInstance;
    let mockAppendChild: jest.SpyInstance;
    let mockRemoveChild: jest.SpyInstance;
    let mockPreventDefault: jest.SpyInstance;

    beforeEach(() => {
      // Mock DOM methods
      const mockAnchor = {
        style: {},
        href: '',
        target: '',
        download: '',
        click: jest.fn(),
      };

      mockCreateElement = jest.spyOn(document, 'createElement').mockReturnValue(mockAnchor as any);
      mockAppendChild = jest.spyOn(document.body, 'appendChild').mockImplementation();
      mockRemoveChild = jest.spyOn(document.body, 'removeChild').mockImplementation();
      
      // Mock event
      mockPreventDefault = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should create and trigger download link', () => {
      const mockEvent = { preventDefault: mockPreventDefault } as any;
      const finalPdf = 'data:application/pdf;base64,test-pdf-data';

      downloadFile(mockEvent, finalPdf);

      expect(mockCreateElement).toHaveBeenCalledWith('a');
      expect(mockAppendChild).toHaveBeenCalled();
      expect(mockRemoveChild).toHaveBeenCalled();
      expect(mockPreventDefault).toHaveBeenCalled();
    });
  });

  describe('exportTableToPDF', () => {
    let mockHtml2pdf: jest.MockedFunction<any>;
    let mockElement: HTMLElement;
    let mockGetElementById: jest.SpyInstance;

    beforeEach(() => {
      // Clear all mocks before each test
      jest.clearAllMocks();
      
      // Mock html2pdf
      const mockWorker = {
        set: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        save: jest.fn().mockReturnThis(),
      };
      mockHtml2pdf = require('html2pdf.js');
      mockHtml2pdf.mockReturnValue(mockWorker);

      // Mock DOM element
      mockElement = {
        style: {},
        getElementsByTagName: jest.fn().mockReturnValue([
          { style: {} },
          { style: {} },
        ]),
      } as any;

      mockGetElementById = jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should export table to PDF when element exists', () => {
      exportTableToPDF('test-table');

      expect(mockGetElementById).toHaveBeenCalledWith('test-table');
      expect(mockHtml2pdf).toHaveBeenCalled();
    });

    it('should return early when element does not exist', () => {
      // Clear mocks again to ensure clean state
      jest.clearAllMocks();
      mockGetElementById.mockReturnValue(null);

      exportTableToPDF('non-existent-table');

      expect(mockGetElementById).toHaveBeenCalledWith('non-existent-table');
      expect(mockHtml2pdf).not.toHaveBeenCalled();
    });
  });
}); 