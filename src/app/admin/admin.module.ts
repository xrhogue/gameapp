import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {SelectDeitiesDlgComponent} from "admin/deity/select-deities-dlg/select-deities-dlg.component";

import {
  ContextMenuModule,
  DragDropModule,
  MultiSelectModule,
  TreeModule,
  TreeTableModule,
  TreeDragDropService,
  ListboxModule, InputTextModule, ButtonModule, DialogModule, CheckboxModule
} from "primeng/primeng";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {SharedModule} from "../shared/shared.module";

import {StatDetailsComponent} from "./stat/stat-details/stat-details.component";
import {SkillsComponent} from "./skill/skills/skills.component";
import {SkillDetailsComponent} from "./skill/skill-details/skill-details.component";
import {AdminRoutingModule} from "./admin-routing.module";
import { SkillPrerequisitesComponent } from './skill/skill-details/skill-prerequisites/skill-prerequisites.component';
import { SkillGeneralComponent } from './skill/skill-details/skill-general/skill-general.component';
import { RacesComponent } from './race/races/races.component';
import { RaceDetailsComponent } from './race/race-details/race-details.component';
import { AttributesComponent } from './race/attributes/attributes.component';
import { AttributeDetailsComponent } from './race/attribute-details/attribute-details.component';
import { RaceGeneralComponent } from './race/race-details/race-general/race-general.component';
import { RaceGenderComponent } from './race/race-details/race-gender/race-gender.component';
import { RaceAttributesComponent } from './race/race-details/race-attributes/race-attributes.component';
import { RaceAttributeDetailsComponent } from './race/race-details/race-attribute-details/race-attribute-details.component';
import { RaceStatsComponent } from './race/race-details/race-stats/race-stats.component';
import { RaceAgesComponent } from './race/race-details/race-ages/race-ages.component';
import { RaceMeasurementsComponent } from './race/race-details/race-measurements/race-measurements.component';
import { RaceGenderBaseComponent } from './race/shared/components/race-gender-base/race-gender-base.component';
import { SkillRacesComponent } from './skill/skill-details/skill-races/skill-races.component';
import { DeitiesComponent } from './deity/deities/deities.component';
import { CampaignsComponent } from './campaign/campaigns/campaigns.component';
import { LocationsComponent } from './location/locations/locations.component';
import { LocationTypesComponent } from './location/location-types/location-types.component';
import { LocationDetailsComponent } from './location/location-details/location-details.component';
import { LocationDlgComponent } from './location/location-dlg/location-dlg.component';
import { LocationPageComponent } from './location/location-page/location-page.component';
import { DeityDlgComponent } from './deity/deity-dlg/deity-dlg.component';
import { DeityDetailsComponent } from './deity/deity-details/deity-details.component';
import { DeityTypesComponent } from './deity/deity-types/deity-types.component';
import { LocationsDlgComponent } from './location/locations-dlg/locations-dlg.component';
import { SelectLocationDlgComponent } from './location/select-location-dlg/select-location-dlg.component';
import { SelectDeityDlgComponent } from './deity/select-deity-dlg/select-deity-dlg.component';
import { DeitiesDlgComponent } from './deity/deities-dlg/deities-dlg.component';

@NgModule({
  declarations: [
    StatDetailsComponent,
    SkillsComponent,
    SkillDetailsComponent,
    SkillGeneralComponent,
    SkillPrerequisitesComponent,
    SkillRacesComponent,
    RacesComponent,
    RaceDetailsComponent,
    RaceGeneralComponent,
    AttributesComponent,
    AttributeDetailsComponent,
    RaceGenderComponent,
    RaceAttributesComponent,
    RaceAttributeDetailsComponent,
    RaceStatsComponent,
    RaceAgesComponent,
    RaceMeasurementsComponent,
    RaceGenderBaseComponent,
    DeitiesComponent,
    CampaignsComponent,
    LocationsComponent,
    LocationsDlgComponent,
    LocationTypesComponent,
    LocationDetailsComponent,
    LocationDlgComponent,
    LocationPageComponent,
    DeityDlgComponent,
    DeityDetailsComponent,
    DeityTypesComponent,
    SelectLocationDlgComponent,
    SelectDeityDlgComponent,
    SelectDeitiesDlgComponent,
    DeitiesDlgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgbModule,
    ContextMenuModule,
    MultiSelectModule,
    TreeTableModule,
    TreeModule,
    DragDropModule,
    ListboxModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    DialogModule,
    AdminRoutingModule
  ],
  exports: [
    LocationsDlgComponent,
    DeitiesDlgComponent
  ],
  providers: [
    TreeDragDropService
  ]
})
export class AdminModule {
}
