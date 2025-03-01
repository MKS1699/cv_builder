export {};

declare global {
  interface Window {
    PDFDocument: any;
    BlobStream: any;
  }
}
