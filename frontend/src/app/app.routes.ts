import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    title: 'Dashboard | NIRVAH',
    loadComponent: () =>
      import('./pages/dashboard/dashboard')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'process-documents',
    title: 'Process Documents | NIRVAH',
    loadComponent: () =>
      import('./pages/process-documents/process-documents')
        .then(m => m.ProcessDocumentsComponent)
  },
  {
  path: 'company-records',
  title: 'Company Records | NIRVAH',
  loadComponent: () =>
    import('./pages/company-records/company-records')
      .then(m => m.CompanyRecordsComponent)
},
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];