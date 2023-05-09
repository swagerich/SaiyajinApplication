import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { HeroePageComponent } from './pages/heroe-page/heroe-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutPageComponent,
    children:[
      {
        path:'list',
        component:ListPageComponent,
      },
      {
        path:'search',
        component:SearchPageComponent,
      },
      {
        path:'new-hero',
        component:NewPageComponent
      },
      {
        path:'edit/:id',
        component:NewPageComponent
      },
      //=======el id tiene que ser ultimo
      {
        path:':id',
        component:HeroePageComponent
      },
      ///=====================
      {
        path:'**',
        redirectTo:'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
