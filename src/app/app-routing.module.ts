import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './character/characters/characters.component';
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full'
  },
  {
    path: 'characters',
    component: CharactersComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
