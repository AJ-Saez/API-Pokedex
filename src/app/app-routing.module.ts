import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonBatleComponent } from './pokemon-batle/pokemon-batle.component';
import { TypesComponent } from './types/types.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'type',
    component:TypesComponent
  },
  {
    path:'Galery',
    component:PokemonBatleComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
