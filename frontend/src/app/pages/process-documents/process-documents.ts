import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NirvahApiService } from '../../nirvah-api.service';

@Component({
  selector: 'app-process-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process-documents.html',
  styleUrl: './process-documents.scss'
})
export class ProcessDocumentsComponent {

  selectedFiles: File[] = [];
  private cdr = inject(ChangeDetectorRef);

  isDragging = false;
  isProcessing = false;

  errorMessage = '';
  successMessage = '';
  processingError = '';

  constructor(private apiService: NirvahApiService) {}

  // Select PDF files
  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.addFiles(Array.from(input.files));
      input.value = '';
    }
  }

  // Handle drag over
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  // Handle drag leave
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  // Handle dropped files
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  // Validate and add PDF files
  private addFiles(files: File[]): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.processingError = '';

    const pdfFiles = files.filter(file =>
      file.name.toLowerCase().endsWith('.pdf') ||
      file.type === 'application/pdf'
    );

    const invalidCount = files.length - pdfFiles.length;

    if (invalidCount > 0) {
      this.errorMessage =
        `${invalidCount} file(s) were skipped. Only PDF files are accepted.`;
    }

    const existingNames = new Set(
      this.selectedFiles.map(file => `${file.name}_${file.size}`)
    );

    const newFiles = pdfFiles.filter(file =>
      !existingNames.has(`${file.name}_${file.size}`)
    );

    this.selectedFiles = [...this.selectedFiles, ...newFiles];

    if (newFiles.length === 0 && pdfFiles.length > 0) {
      this.errorMessage = 'These PDF files are already selected.';
    }
  }

  // Remove a selected file
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.selectedFiles = [...this.selectedFiles];

    this.errorMessage = '';
    this.successMessage = '';
    this.processingError = '';
  }

  // Clear selected files
  clearFiles(): void {
    this.selectedFiles = [];
    this.errorMessage = '';
    this.successMessage = '';
    this.processingError = '';
  }

  // Format file size
  formatFileSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  // Process PDFs and export Excel
  processDocuments(): void {
    if (this.selectedFiles.length === 0 || this.isProcessing) {
      return;
    }

    this.isProcessing = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.processingError = '';

    this.apiService.processAndExport(this.selectedFiles).subscribe({
      next: (blob: Blob) => {
        try {
          if (
            blob.size === 0 ||
            blob.type.includes('application/json')
          ) {
            this.processingError =
              'Unexpected response from the backend. Please check the backend logs.';
            return;
          }

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');

          link.href = url;
          link.download = 'NIRVAH_Report.xlsx';

          document.body.appendChild(link);
          link.click();
          link.remove();

          window.setTimeout(() => {
            window.URL.revokeObjectURL(url);
          }, 1000);

          this.successMessage =
            'Document processing completed. Your Excel report is ready.';
        } catch (error) {
          this.processingError =
            'Unable to download the Excel report. Please try again.';

          console.error('Excel download error:', error);
        } finally {
          this.isProcessing = false;
          this.cdr.detectChanges();
        }
      },

      error: (error) => {
        this.isProcessing = false;
        this.cdr.detectChanges();

        if (error.status === 0) {
          this.processingError =
            'Cannot connect to the backend. Check that FastAPI is running.';
        } else if (error.status === 404) {
          this.processingError =
            'The processing endpoint was not found. Please check the backend URL.';
        } else {
          this.processingError =
            `Document processing failed (HTTP ${error.status}).`;
        }

        console.error('NIRVAH processing error:', error);
      }
    });
  }
}