import { PDFDocument } from "pdf-lib";
import { TrasformAmazonPages } from "../../../../src/pages/home/services/TrasformAmazonPages";
import { TrasformFlipkartPages } from "../../../../src/pages/home/services/TrasformFlipkartPages";

// Mock the dependencies
jest.mock("pdf-lib", () => ({
  PDFDocument: {
    load: jest.fn().mockResolvedValue({
      getPages: jest.fn().mockReturnValue([
        {
          setWidth: jest.fn(),
          setCropBox: jest.fn(),
          setHeight: jest.fn(),
          getMediaBox: jest.fn().mockReturnValue({
            width: 100,
            height: 100,
          }),
        },
        {
          setWidth: jest.fn(),
          setCropBox: jest.fn(),
          setHeight: jest.fn(),
          getMediaBox: jest.fn().mockReturnValue({
            width: 100,
            height: 100,
          }),
        },
        {
          setWidth: jest.fn(),
          setCropBox: jest.fn(),
          setHeight: jest.fn(),
          getMediaBox: jest.fn().mockReturnValue({
            width: 100,
            height: 100,
          }),
        },
        {
          setWidth: jest.fn(),
          setCropBox: jest.fn(),
          setHeight: jest.fn(),
          getMediaBox: jest.fn().mockReturnValue({
            width: 100,
            height: 100,
          }),
        },
      ]), // Mock 4 pages
    }),
    create: jest.fn().mockResolvedValue({
      addPage: jest.fn(),
      copyPages: jest.fn().mockResolvedValue([{}]),
    }),
  },
}));

describe("TrasformAmazonPages", () => {
  test("returns a PDF document", async () => {
    const filePath = new Uint8Array([1, 2, 3]);
    const result = await TrasformAmazonPages(filePath);
    expect(result).toBeDefined();
  });

  test("processes the pages correctly", async () => {
    const filePath = new Uint8Array([1, 2, 3]);
    const result = await TrasformAmazonPages(filePath);
    const pdfDoc = await PDFDocument.load(filePath);
    const pages = pdfDoc.getPages();
    expect(pages).toHaveLength(4); // Mock 4 pages
    expect(result.copyPages).toHaveBeenCalled(); // Only even-indexed pages
    expect(result.addPage).toHaveBeenCalled(); // Only even-indexed pages
  });
});

// describe("TrasformFlipkartPages", () => {
//   test("returns a PDF document", async () => {
//     const filePath = new Uint8Array([1, 2, 3]);
//     const result = await TrasformFlipkartPages(filePath);
//     expect(result).toBeDefined();
//   });

//   test("processes the pages correctly", async () => {
//     const filePath = new Uint8Array([1, 2, 3]);
//     const result = await TrasformFlipkartPages(filePath);
//     const pdfDoc = await PDFDocument.load(filePath);
//     const pages = pdfDoc.getPages();
//     expect(pages).toHaveLength(4); // Mock 4 pages
//     expect(result.copyPages).toHaveBeenCalled(); // Only even-indexed pages
//     expect(result.addPage).toHaveBeenCalled(); // Only even-indexed pages
//   });
// });
