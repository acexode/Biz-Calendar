import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'calendar/recurenta',
    pathMatch: 'full'
  },
  {
    path: 'calendar',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'calendar/:id',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'style',
    loadChildren: () => import('./style-guide/style-guide.module').then(m => m.StyleGuidePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'selectie-spatiu',
    loadChildren: () => import('./selectie-spatiu/selectie-spatiu.module').then(m => m.SelectieSpatiuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vizualiare',
    loadChildren: () => import('./vizualiare/vizualiare.module').then(m => m.VizualiarePageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
