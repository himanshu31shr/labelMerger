import { PDFDocument } from "pdf-lib";
import { AmazonPDFTransformer } from "../../../../src/pages/home/services/TrasformAmazonPages";

// Mock pdf-lib
jest.mock("pdf-lib", () => ({
  PDFDocument: {
    create: jest.fn().mockResolvedValue({
      addPage: jest.fn(),
      copyPages: jest.fn().mockResolvedValue([{
        drawText: jest.fn(),
        getWidth: jest.fn().mockReturnValue(100),
        getHeight: jest.fn().mockReturnValue(100)
      }]),
      getPages: jest.fn().mockReturnValue([{}]),
      getPageIndices: jest.fn().mockReturnValue([0]),
      removePage: jest.fn(),
      embedFont: jest.fn().mockResolvedValue({})
    }),
    load: jest.fn().mockResolvedValue({
      getPages: jest.fn().mockReturnValue([{}, {}]),
      getPageIndices: jest.fn().mockReturnValue([0, 1]),
      copyPages: jest.fn().mockResolvedValue([{
        drawText: jest.fn(),
        getWidth: jest.fn().mockReturnValue(100),
        getHeight: jest.fn().mockReturnValue(100)
      }])
    })
  },
  rgb: jest.fn(),
  StandardFonts: { Helvetica: 'Helvetica' }
}));

// Mock pdf-worker
jest.mock("../../../../src/utils/pdf-worker", () => ({
  pdfjsLib: {
    getDocument: jest.fn().mockReturnValue({
      promise: Promise.resolve({
        getPage: jest.fn().mockResolvedValue({
          getTextContent: jest.fn().mockResolvedValue({
            items: [
              { str: "1 Test Product", transform: [0, 0, 0, 0, 0, 100] },
              { str: "| ₹500 2", transform: [0, 0, 0, 0, 0, 100] }
            ]
          })
        })
      })
    }),
    version: "2.12.313"
  }
}));

describe("AmazonPDFTransformer", () => {
  let transformer: AmazonPDFTransformer;
  
  beforeEach(() => {
    transformer = new AmazonPDFTransformer(new Uint8Array([1, 2, 3]));
  });

  test("transforms PDF pages correctly", async () => {
    const result = await transformer.transform();
    expect(result).toBeDefined();
  });

  test("extracts product information correctly", async () => {
    await transformer.transform();
    expect(transformer.getSummary()).toEqual([{
      name: "Test Product",
      quantity: 2,
      type: "amazon"
    }]);
  });
});
