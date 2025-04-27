import '@testing-library/jest-dom';

// TextEncoder/TextDecoder polyfill for React Router
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock html2pdf.js
jest.mock('html2pdf.js', () => ({
  __esModule: true,
  default: () => ({
    from: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    save: jest.fn().mockResolvedValue(undefined),
  }),
}));

// Mock pdfjs-dist
jest.mock('pdfjs-dist/legacy/build/pdf', () => ({
  getDocument: jest.fn().mockReturnValue({
    promise: Promise.resolve({
      getPage: jest.fn().mockResolvedValue({
        getTextContent: jest.fn().mockResolvedValue({
          items: [
            { str: '1 Test Product', transform: [0, 0, 0, 0, 0, 100] },
            { str: '| ₹500 2', transform: [0, 0, 0, 0, 0, 100] }
          ]
        })
      })
    })
  }),
  GlobalWorkerOptions: {
    workerSrc: 'mocked-worker-src'
  },
  version: '2.12.313'
}));

// Mock canvas context since jsdom doesn't implement it
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({
    data: new Array(4),
  })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => []),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  translate: jest.fn(),
  transform: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  fillText: jest.fn(),
}));