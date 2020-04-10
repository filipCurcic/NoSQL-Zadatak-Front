import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RoleGuard } from './services/auth-service/role-guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'display', component: DisplayComponent,
    canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_STUDENT', 'ROLE_ADMINISTRATOR'] }
  },
  {
    path: 'register', component: RegisterComponent,
    canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_STUDENT', 'ROLE_ADMINISTRATOR'] }
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
