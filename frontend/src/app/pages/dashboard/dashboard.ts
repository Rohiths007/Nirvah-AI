import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

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