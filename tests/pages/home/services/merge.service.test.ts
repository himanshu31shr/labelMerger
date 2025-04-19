import { mergePdfs } from "../../../../src/pages/home/services/merge.service";
import { TrasformAmazonPages } from "../../../../src/pages/home/services/TrasformAmazonPages";

// Mock dependencies
jest.mock("pdf-lib", () => ({
  PDFDocument: {
    create: jest.fn().mockResolvedValue({
      addPage: jest.fn(),
      copyPages: jest.fn().mockResolvedValue([{}]),
      getPages: jest.fn().mockReturnValue([{}]),
    }),
    load: jest.fn().mockResolvedValue({
      getPages: jest.fn().mockReturnValue([{}]),
    }),
  },
}));

jest.mock("../../../../src/pages/home/services/TrasformAmazonPages", () => ({
  TrasformAmazonPages: jest.fn().mockResolvedValue({
    getPages: jest.fn().mockReturnValue([{}]),
  }),
}));

describe("mergePdfs", () => {
  test("returns a PDF document", async () => {
    const result = await mergePdfs({ amzon: null, flp: null });
    expect(result).toBeDefined();
  });

  test("merges main PDF correctly", async () => {
    const mainPdfData = new Uint8Array([1, 2, 3]);
    const result = await mergePdfs({ amzon: mainPdfData, flp: null });
    expect(TrasformAmazonPages).toHaveBeenCalledWith(mainPdfData);
    expect(result.addPage).toHaveBeenCalled();
  });

  // test("merges secondary PDF correctly", async () => {
  //   const secondaryPdfData = new Uint8Array([4, 5, 6]);
  //   const result = await mergePdfs({ amzon: null, flp: secondaryPdfData });
  //   expect(TrasformAmazonPages).toHaveBeenCalledWith(secondaryPdfData);
  //   expect(result.addPage).toHaveBeenCalled();
  // });

  // test("merges both PDFs correctly", async () => {
  //   const mainPdfData = new Uint8Array([1, 2, 3]);
  //   const secondaryPdfData = new Uint8Array([4, 5, 6]);
  //   const result = await mergePdfs({ amzon: mainPdfData, flp: secondaryPdfData });
  //   expect(TrasformAmazonPages).toHaveBeenCalledWith(mainPdfData);
  //   expect(TrasformAmazonPages).toHaveBeenCalledWith(secondaryPdfData);
  //   expect(result.addPage).toHaveBeenCalled();
  // });
});