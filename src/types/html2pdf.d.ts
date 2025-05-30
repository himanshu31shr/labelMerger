declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: number;
        filename?: string;
        image?: { type: string; quality: number };
        html2canvas?: { scale: number };
        jsPDF?: { unit: string; format: string; orientation: string };
    }

    interface Html2PdfWorker {
        set(options: Html2PdfOptions): Html2PdfWorker;
        from(element: HTMLElement): Html2PdfWorker;
        save(): void;
    }

    export default function(): Html2PdfWorker;
}