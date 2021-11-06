
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as Authguard } from './core/auth-guard.service';

const routes: Routes = [
  { path: 'main', loadChildren: () => import('./home/home.module').then(x => x.HomeModule), canActivate: [Authguard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule) },
  // otherwise redirect to home
  { path: '**', redirectTo: 'main/trang-chu' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
