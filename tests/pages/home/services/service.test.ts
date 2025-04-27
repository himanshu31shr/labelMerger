import { PDFDocument } from "pdf-lib";
import { PDFMergerService } from "../../../../src/pages/home/services/merge.service";
import { AmazonPDFTransformer } from "../../../../src/pages/home/services/TrasformAmazonPages";
import { FlipkartPageTransformer } from "../../../../src/pages/home/services/TrasformFlipkartPages";

// Mock the dependencies
jest.mock("pdf-lib", () => ({
  PDFDocument: {
    create: jest.fn().mockResolvedValue({
      addPage: jest.fn(),
      copyPages: jest.fn().mockResolvedValue([{}]),
      getPages: jest.fn().mockReturnValue([{}]),
      getPageIndices: jest.fn().mockReturnValue([0]),
    }),
    load: jest.fn().mockResolvedValue({
      getPages: jest.fn().mockReturnValue([{}]),
      getPageIndices: jest.fn().mockReturnValue([0]),
    }),
  },
}));

jest.mock("../../../../src/pages/home/services/TrasformAmazonPages", () => ({
  AmazonPDFTransformer: jest.fn().mockImplementation(() => ({
    transform: jest.fn().mockResolvedValue({
      getPageIndices: jest.fn().mockReturnValue([0]),
      getPages: jest.fn().mockReturnValue([{}]),
    }),
    getSummary: jest.fn().mockReturnValue([{
      name: "Test Product",
      quantity: 1,
      type: "amazon"
    }])
  })),
}));

jest.mock("../../../../src/pages/home/services/TrasformFlipkartPages", () => ({
  FlipkartPageTransformer: jest.fn().mockImplementation(() => ({
    transformPages: jest.fn().mockResolvedValue({
      getPageIndices: jest.fn().mockReturnValue([0]),
      getPages: jest.fn().mockReturnValue([{}]),
    }),
    getSummary: jest.fn().mockReturnValue([{
      name: "Test Product",
      quantity: 1,
      type: "flipkart",
      SKU: "123"
    }])
  })),
}));

describe("PDFMergerService", () => {
  let service: PDFMergerService;

  beforeEach(() => {
    service = new PDFMergerService();
  });

  test("returns a PDF document", async () => {
    const result = await service.mergePdfs({ amzon: null, flp: null });
    expect(result).toBeDefined();
  });

  test("merges Amazon pages correctly", async () => {
    const amazonData = new Uint8Array([1, 2, 3]);
    const result = await service.mergePdfs({ amzon: amazonData, flp: null });
    expect(AmazonPDFTransformer).toHaveBeenCalledWith(amazonData);
    expect(result).toBeDefined();
  });

  test("merges Flipkart pages correctly", async () => {
    const flipkartData = new Uint8Array([4, 5, 6]);
    const result = await service.mergePdfs({ amzon: null, flp: flipkartData });
    expect(FlipkartPageTransformer).toHaveBeenCalledWith(flipkartData);
    expect(result).toBeDefined();
  });

  test("merges both Amazon and Flipkart pages correctly", async () => {
    const amazonData = new Uint8Array([1, 2, 3]);
    const flipkartData = new Uint8Array([4, 5, 6]);
    const result = await service.mergePdfs({ amzon: amazonData, flp: flipkartData });
    expect(AmazonPDFTransformer).toHaveBeenCalledWith(amazonData);
    expect(FlipkartPageTransformer).toHaveBeenCalledWith(flipkartData);
    expect(result).toBeDefined();
  });
});