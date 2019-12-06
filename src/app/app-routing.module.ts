import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuardGuard } from './services/login-guard.guard';
import { VerificaTokenGuard } from './services/verifica-token.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent, data: { titulo: 'Login' }},
  { path: '',
    canActivate:[ LoginGuardGuard],
    canActivateChild: [ VerificaTokenGuard ],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
