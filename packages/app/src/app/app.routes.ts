import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './core/guards/authenticated/authenticated.guard';
import { UnauthenticatedGuard } from './core/guards/unauthenticated/unauthenticated.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [UnauthenticatedGuard],
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'equipments',
    canActivate: [AuthenticatedGuard],
    loadComponent: () =>
      import('./pages/equipments/equipments.page').then(
        (m) => m.EquipmentsPage
      ),
  },
  {
    path: 'equipment',
    canActivate: [AuthenticatedGuard],
    loadComponent: () =>
      import('./pages/equipment/equipment.page').then((m) => m.EquipmentPage),
  },
  {
    path: 'equipment/:id',
    canActivate: [AuthenticatedGuard],
    loadComponent: () =>
      import('./pages/equipment/equipment.page').then((m) => m.EquipmentPage),
  },
  {
    path: '',
    redirectTo: 'equipments',
    pathMatch: 'full',
  },
];
