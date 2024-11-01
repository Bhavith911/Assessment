import { Routes } from '@angular/router';
import { PagesComponent } from '../pages/pages.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../auth.guard';

export const routes: Routes = [
    {
      path: "login",
      component: LoginComponent
    },
    {
      path: "dashboard",
      component: PagesComponent,canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: 'login'}
  ];
