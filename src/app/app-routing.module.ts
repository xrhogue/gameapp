import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CharacterSkillDetailsComponent} from "./character/character-details/character-skills/character-skill-details/character-skill-details.component";
import {CharactersComponent} from './character/characters/characters.component';
import {CharacterDetailsComponent} from "./character/character-details/character-details.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";

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
    path: 'characters/0',
    component: CharacterDetailsComponent
  },
  {
    path: 'characters/:id',
    component: CharacterDetailsComponent
  },
  {
    path: 'characters/skills/:id',
    component: CharacterSkillDetailsComponent
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
export class AppRoutingModule {
}
