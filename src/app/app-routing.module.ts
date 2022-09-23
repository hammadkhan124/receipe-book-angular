import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';


const appRoutes: Routes = 
[
{path:'',redirectTo:'/receipes',pathMatch:'full'},
{path:'receipes',
 loadChildren:
 () => import('./receipes/receipes.module')
 .then(m => m.ReceipesModule)
},
{path:'shopping-list',
 loadChildren:
 () => import('./shopping-list/shopping-list.module')
 .then(s => s.shoppingModuleComponent)
},
{path:'auth',
 loadChildren:
 () => import('./auth/auth.module')
 .then(a => a.AuthModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
