import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './stat/stats/stats.component';
import { StatDetailsComponent } from './stat/stat-details/stat-details.component';
import {SkillDetailsComponent} from "./skill/skill-details/skill-details.component";
import {SkillsComponent} from "./skill/skills/skills.component";
import {AuthGuard} from "../shared/guards/auth-guard/auth-guard.service";
import {DeactivateGuard} from "../shared/guards/deactivate-guard/deactivate-guard.service";

const adminRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'stats',
            component: StatsComponent
          },
          {
            path: 'stats/0',
            component: StatDetailsComponent,
            canDeactivate: [DeactivateGuard]
          },
          {
            path: 'stats/:id',
            component: StatDetailsComponent,
            canDeactivate: [DeactivateGuard]
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
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
