import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Mock pdfjs-dist
jest.mock('pdfjs-dist/legacy/build/pdf', () => ({
  GlobalWorkerOptions: {
    workerSrc: '',
  },
  version: '2.16.105',
}));

describe('pdf-worker', () => {
  let originalWindow: Window & typeof globalThis | undefined;

  beforeEach(() => {
    // Reset the mock
    (pdfjsLib.GlobalWorkerOptions as { workerSrc: string }).workerSrc = '';
    originalWindow = global.window;
  });

  afterEach(() => {
    if (originalWindow) {
      global.window = originalWindow;
    } else {
      delete (global as { window?: Window & typeof globalThis }).window;
    }
  });



  it('should export pdfjsLib', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { pdfjsLib } = require('../pdf-worker');
    expect(pdfjsLib).toBeDefined();
    expect(pdfjsLib.GlobalWorkerOptions).toBeDefined();
  });

  it('should have GlobalWorkerOptions available', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { pdfjsLib } = require('../pdf-worker');
    expect(pdfjsLib.GlobalWorkerOptions).toHaveProperty('workerSrc');
  });
}); 