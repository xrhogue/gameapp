import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './stat/stats/stats.component';
import { StatDetailsComponent } from './stat/stat-details/stat-details.component';
import {SkillDetailsComponent} from "./skill/skill-details/skill-details.component";
import {SkillsComponent} from "./skill/skills/skills.component";

const adminRoutes: Routes = [
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
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
