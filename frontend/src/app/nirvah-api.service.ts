import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NirvahApiService {

  private http = inject(HttpClient);

  private readonly apiUrl = 'http://127.0.0.1:8000';

  // Check whether the FastAPI backend is available
  checkHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }

  // Process uploaded PDFs and generate an Excel report
  processAndExport(files: File[]): Observable<Blob> {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file);
    });

    return this.http.post(
      `${this.apiUrl}/process-and-export`,
      formData,
      {
        responseType: 'blob'
      }
    );
  }
}