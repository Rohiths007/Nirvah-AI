import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  private http = inject(HttpClient);

  backendStatus = 'Checking...';
  backendConnected = false;

  ngOnInit(): void {
    this.checkBackend();
  }

  checkBackend(): void {
    this.backendStatus = 'Checking...';

    this.http.get('http://127.0.0.1:8000/health').subscribe({
      next: () => {
        this.backendConnected = true;
        this.backendStatus = 'Connected';
      },
      error: () => {
        this.backendConnected = false;
        this.backendStatus = 'Disconnected';
      }
    });
  }
}