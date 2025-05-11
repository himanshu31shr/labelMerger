import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PDFMergerService } from '../../pages/home/services/merge.service';
import { ProductSummary } from '../../pages/home/services/base.transformer';

interface PDFMergerState {
  amazonFile: File | null;
  flipkartFile: File | null;
  finalPdf: string | null;
  summary: ProductSummary[];
  loading: boolean;
  error: string | null;
}

const initialState: PDFMergerState = {
  amazonFile: null,
  flipkartFile: null,
  finalPdf: null,
  summary: [],
  loading: false,
  error: null,
};

export const mergePDFs = createAsyncThunk(
  'pdfMerger/mergePDFs',
  async ({ amazonFile, flipkartFile }: { amazonFile: File | null; flipkartFile: File | null }) => {
    if (!amazonFile && !flipkartFile) {
      throw new Error('No files provided');
    }

    const mergePdfs = new PDFMergerService();
    const pdf = await mergePdfs.mergePdfs({
      amzon: amazonFile ? await readFileFromInput(amazonFile) : null,
      flp: flipkartFile ? await readFileFromInput(flipkartFile) : null,
    });

    if (!pdf) {
      throw new Error('Failed to merge PDFs');
    }

    const outputPdfBytes = await pdf.save();
    const blob = new Blob([outputPdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(blob);

    return {
      pdfUrl,
      summary: mergePdfs.summary,
    };
  }
);

const readFileFromInput = async (file: File): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(new Uint8Array(reader.result));
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

const pdfMergerSlice = createSlice({
  name: 'pdfMerger',
  initialState,
  reducers: {
    setAmazonFile: (state, action) => {
      state.amazonFile = action.payload;
    },
    setFlipkartFile: (state, action) => {
      state.flipkartFile = action.payload;
    },
    clearFiles: (state) => {
      state.amazonFile = null;
      state.flipkartFile = null;
      state.finalPdf = null;
      state.summary = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(mergePDFs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergePDFs.fulfilled, (state, action) => {
        state.loading = false;
        state.finalPdf = action.payload.pdfUrl;
        state.summary = action.payload.summary;
      })
      .addCase(mergePDFs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to merge PDFs';
      });
  },
});

export const { setAmazonFile, setFlipkartFile, clearFiles } = pdfMergerSlice.actions;
export const pdfMergerReducer = pdfMergerSlice.reducer; 