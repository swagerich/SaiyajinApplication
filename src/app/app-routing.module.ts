import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'heroes',
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(auth => auth.AuthModule)
  },
  {
    path:'heroes',
    loadChildren:() => import('./heroes/heroes.module').then(auth => auth.HeroesModule)
  },
  {
    path:'404',
    component:Error404PageComponent
  },
  {
    path:'**',
    redirectTo:'404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
