import { PDFDocument } from "pdf-lib";
import { FlipkartPageTransformer } from "../../../../src/pages/home/services/TrasformFlipkartPages";

// Mock pdf-lib
jest.mock("pdf-lib", () => ({
  PDFDocument: {
    create: jest.fn().mockResolvedValue({
      addPage: jest.fn(),
      copyPages: jest.fn().mockResolvedValue([{
        drawText: jest.fn(),
        getWidth: jest.fn().mockReturnValue(100),
        getHeight: jest.fn().mockReturnValue(100),
        setWidth: jest.fn(),
        setHeight: jest.fn(),
        setCropBox: jest.fn()
      }]),
      getPages: jest.fn().mockReturnValue([{}]),
      getPageIndices: jest.fn().mockReturnValue([0])
    }),
    load: jest.fn().mockResolvedValue({
      getPages: jest.fn().mockReturnValue([{
        getMediaBox: jest.fn().mockReturnValue({
          width: 100,
          height: 100
        }),
        setWidth: jest.fn(),
        setHeight: jest.fn(),
        setCropBox: jest.fn()
      }]),
      copyPages: jest.fn().mockResolvedValue([{
        drawText: jest.fn(),
        getWidth: jest.fn().mockReturnValue(100),
        getHeight: jest.fn().mockReturnValue(100),
        setWidth: jest.fn(),
        setHeight: jest.fn(),
        setCropBox: jest.fn()
      }])
    })
  }
}));

// Mock pdf-worker with realistic Flipkart product data
jest.mock("../../../../src/utils/pdf-worker", () => ({
  pdfjsLib: {
    getDocument: jest.fn().mockReturnValue({
      promise: Promise.resolve({
        getPage: jest.fn().mockResolvedValue({
          getTextContent: jest.fn().mockResolvedValue({
            items: [
              { str: "SKU", transform: [0, 0, 0, 0, 0, 100] },
              { str: "123 | Test Product 2 | 2", transform: [0, 0, 0, 0, 0, 90] }
            ]
          })
        })
      })
    }),
    version: "2.12.313"
  }
}));

describe("FlipkartPageTransformer", () => {
  let transformer: FlipkartPageTransformer;
  
  beforeEach(() => {
    transformer = new FlipkartPageTransformer(new Uint8Array([1, 2, 3]));
  });

  test("transforms PDF pages correctly", async () => {
    const result = await transformer.transformPages();
    expect(result).toBeDefined();
  });

  test("extracts product information correctly", async () => {
    await transformer.transformPages();
    expect(transformer.getSummary()).toEqual([{
      name: "Test Product 2",
      quantity: 2,
      type: "flipkart",
      SKU: "123"
    }]);
  });
});