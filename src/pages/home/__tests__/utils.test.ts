import { readFileFromInput, downloadFile, exportTableToPDF } from '../utils';

// Removed html2pdf.js mocks and requires as the package is no longer used
// jest.mock('html2pdf.js', () => { ... });

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
        onload: null as FileReader['onload'],
        onerror: null as FileReader['onerror'],
      };

      // Replace FileReader constructor
      global.FileReader = jest.fn(() => mockFileReader) as unknown as typeof FileReader;

      // Start the read operation
      const resultPromise = readFileFromInput(mockFile);

      // Simulate successful file read
      setTimeout(() => {
        if (mockFileReader.onload) {
          mockFileReader.onload.call(mockFileReader as unknown as FileReader, {} as ProgressEvent<FileReader>);
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

      mockCreateElement = jest.spyOn(document, 'createElement').mockReturnValue(mockAnchor as unknown as HTMLAnchorElement);
      mockAppendChild = jest.spyOn(document.body, 'appendChild').mockImplementation();
      mockRemoveChild = jest.spyOn(document.body, 'removeChild').mockImplementation();
      
      // Mock event
      mockPreventDefault = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should create and trigger download link', () => {
      const mockEvent = { preventDefault: mockPreventDefault } as unknown as React.MouseEvent<HTMLAnchorElement, MouseEvent>;
      const finalPdf = 'data:application/pdf;base64,test-pdf-data';

      downloadFile(mockEvent, finalPdf);

      expect(mockCreateElement).toHaveBeenCalledWith('a');
      expect(mockAppendChild).toHaveBeenCalled();
      expect(mockRemoveChild).toHaveBeenCalled();
      expect(mockPreventDefault).toHaveBeenCalled();
    });
  });

  describe('exportTableToPDF', () => {
    let mockElement: HTMLElement;
    let mockGetElementById: jest.SpyInstance;

    beforeEach(() => {
      // Clear all mocks before each test
      jest.clearAllMocks();
      
      // Mock DOM element
      mockElement = {
        style: {},
        getElementsByTagName: jest.fn().mockReturnValue([
          { style: {} },
          { style: {} },
        ]),
      } as unknown as HTMLElement;

      mockGetElementById = jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should export table to PDF when element exists', () => {
      exportTableToPDF('test-table');

      expect(mockGetElementById).toHaveBeenCalledWith('test-table');
    });

    it('should return early when element does not exist', () => {
      // Clear mocks again to ensure clean state
      jest.clearAllMocks();
      mockGetElementById.mockReturnValue(null);

      exportTableToPDF('non-existent-table');

      expect(mockGetElementById).toHaveBeenCalledWith('non-existent-table');
    });
  });
}); 