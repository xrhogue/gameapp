import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StatsComponent} from 'stat/stats/stats.component';
import {StatDetailsComponent} from 'stat/stat-details/stat-details.component';
import {SkillDetailsComponent} from "skill/skill-details/skill-details.component";
import {SkillsComponent} from "skill/skills/skills.component";
import {AuthGuard} from "shared/guards/auth-guard/auth-guard.service";
import {DeactivateGuard} from "shared/guards/deactivate-guard/deactivate-guard.service";
import {RacesComponent} from "race/races/races.component";
import {RaceDetailsComponent} from "race/race-details/race-details.component";
import {AttributesComponent} from "race/attributes/attributes.component";
import {CampaignsComponent} from "campaign/campaigns/campaigns.component";
import {LocationsComponent} from "location/locations/locations.component";
import {LocationPageComponent} from "location/location-page/location-page.component";
import {LocationTypesComponent} from "location/location-types/location-types.component";
import {DeitiesComponent} from "deity/deities/deities.component";
import {DeityDetailsComponent} from "deity/deity-details/deity-details.component";

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
            path: 'campaigns',
            component: CampaignsComponent
          },
          {
            path: 'deities',
            component: DeitiesComponent
          },
          {
            path: 'deities/:id',
            component: DeityDetailsComponent
          },
          {
            path: 'locations',
            component: LocationsComponent
          },
          {
            path: 'locations/:id',
            component: LocationPageComponent
          },
          {
            path: 'locationTypes',
            component: LocationTypesComponent
          },
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
            path: 'attributes',
            component: AttributesComponent
          },
          {
            path: 'races',
            component: RacesComponent
          },
          {
            path: 'races/0',
            component: RaceDetailsComponent
          },
          {
            path: 'races/:id',
            component: RaceDetailsComponent
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
