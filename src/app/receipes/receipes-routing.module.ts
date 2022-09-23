import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGurad } from "../auth/auth.guard";
import { ReceipeDetailComponent } from "./receipe-detail/receipe-detail.component";
import { ReceipeEditComponent } from "./receipe-edit/receipe-edit.component";
import { ReceipeStartComponent } from "./receipe-start/receipe-start.component";
import { ReceipesResolverService } from "./receipes-resolver.service";
import { ReceipesComponent } from "./receipes.component";


const routes:Routes=[
    {
        path:'',
        component:ReceipesComponent,
canActivate:[AuthGurad],
children:[
  {path:'',component:ReceipeStartComponent},
  { path:'new',component:ReceipeEditComponent},
  {
    path:':id',
    component:ReceipeDetailComponent,
    resolve:[ReceipesResolverService]
  },
  {
    path:':id/edit',
    component:ReceipeEditComponent,
    resolve:[ReceipesResolverService]
  }
]},

];

@NgModule({
imports:[RouterModule.forChild(routes)],
exports:[RouterModule]
})

export class ReceipesRoutingModule{}