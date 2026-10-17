import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-records.html',
  styleUrl: './company-records.scss'
})
export class CompanyRecordsComponent {

  searchText = '';

  companies: any[] = [];

  get filteredCompanies(): any[] {
    return this.companies.filter(company =>
      company.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  searchCompanies(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
  }
}