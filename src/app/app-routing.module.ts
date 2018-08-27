import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './character/characters/characters.component';
import { StatsComponent } from './admin/stat/stats/stats.component';
import { StatDetailsComponent } from './admin/stat/stat-details/stat-details.component';
import {SkillDetailsComponent} from "./admin/skill/skill-details/skill-details.component";
import {SkillsComponent} from "./admin/skill/skills/skills.component";

const routes: Routes = [
  {
    path: '',
    component: CharactersComponent
  },
  {
    path: 'characters',
    component: CharactersComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'stats/0',
    component: StatDetailsComponent
  },
  {
    path: 'stats/:id',
    component: StatDetailsComponent
  },
  {
    path: 'skills',
    component: SkillsComponent
  },
  {
    path: 'skills/0',
    component: SkillDetailsComponent
  },
  {
    path: 'skills/:id',
    component: SkillDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
