import { PDFDocument } from "pdf-lib";
import { mergePdfs } from "../../../../src/pages/home/services/merge.service";
import { TrasformAmazonPages } from "../../../../src/pages/home/services/TrasformAmazonPages";
import { TrasformFlipkartPages } from "../../../../src/pages/home/services/TrasformFlipkartPages";

// Mock the dependencies
jest.mock("pdf-lib", () => ({
  PDFDocument: {
    create: jest.fn().mockResolvedValue({
      addPage: jest.fn(),
      copyPages: jest.fn().mockResolvedValue([{}]),
      getPages: jest.fn().mockReturnValue([{}]),
    }),
    load: jest.fn().mockResolvedValue({
      getPages: jest.fn().mockReturnValue([{}, {}, {}, {}]), // Mock 4 pages
    }),
  },
}));

jest.mock("../../../../src/pages/home/services/TrasformAmazonPages", () => ({
  TrasformAmazonPages: jest.fn().mockResolvedValue({
    getPages: jest.fn().mockReturnValue([{}]),
  }),
}));

jest.mock("../../../../src/pages/home/services/TrasformFlipkartPages", () => ({
  TrasformFlipkartPages: jest.fn().mockResolvedValue({
    getPages: jest.fn().mockReturnValue([{}]),
  }),
}));
describe("mergePdfs", () => {
  test("returns a PDF document", async () => {
    const result = await mergePdfs({ amzon: null, flp: null });
    expect(result).toBeDefined();
  });

  test("merges Amazon pages correctly", async () => {
    const amazonData = new Uint8Array([1, 2, 3]);
    const result = await mergePdfs({ amzon: amazonData, flp: null });
    expect(TrasformAmazonPages).toHaveBeenCalledWith(amazonData);
    expect(result.addPage).toHaveBeenCalled();
  });

  test("merges Flipkart pages correctly", async () => {
    const flipkartData = new Uint8Array([4, 5, 6]);
    const result = await mergePdfs({ amzon: null, flp: flipkartData });
    expect(TrasformFlipkartPages).toHaveBeenCalledWith(flipkartData);
    expect(result.addPage).toHaveBeenCalled();
  });

  test("merges both Amazon and Flipkart pages correctly", async () => {
    const amazonData = new Uint8Array([1, 2, 3]);
    const flipkartData = new Uint8Array([4, 5, 6]);
    const result = await mergePdfs({ amzon: amazonData, flp: flipkartData });
    expect(TrasformAmazonPages).toHaveBeenCalledWith(amazonData);
    expect(TrasformFlipkartPages).toHaveBeenCalledWith(flipkartData);
    expect(result.addPage).toHaveBeenCalled();
  });
});