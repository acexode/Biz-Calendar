import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'calendar/adauga-programare',
    pathMatch: 'full'
  },
  {
    path: 'calendar',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'calendar/:id',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'style',
    loadChildren: () => import('./style-guide/style-guide.module').then(m => m.StyleGuidePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'selectie-spatiu',
    loadChildren: () => import('./selectie-spatiu/selectie-spatiu.module').then( m => m.SelectieSpatiuPageModule)
  }
];




@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
