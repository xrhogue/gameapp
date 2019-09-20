import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ContextMenuModule} from "primeng/contextmenu";
import {DragDropModule} from "primeng/dragdrop";
import {TreeModule} from "primeng/tree";
import {TreeTableModule} from "primeng/treetable";
import {TreeDragDropService} from "primeng/components/common/treedragdropservice";
import {MultiSelectModule} from "primeng/multiselect";
import {ListboxModule} from "primeng/listbox";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {CheckboxModule} from "primeng/checkbox";

import {SharedModule} from "shared/shared.module";

import {SelectDeitiesDlgComponent} from "admin/deity/select-deities-dlg/select-deities-dlg.component";
import {StatDetailsComponent} from "admin/stat/stat-details/stat-details.component";
import {SkillsComponent} from "admin/skill/skills/skills.component";
import {SkillDetailsComponent} from "admin/skill/skill-details/skill-details.component";
import {AdminRoutingModule} from "admin/admin-routing.module";
import {SkillPrerequisitesComponent} from 'admin/skill/skill-details/skill-prerequisites/skill-prerequisites.component';
import {SkillGeneralComponent} from 'admin/skill/skill-details/skill-general/skill-general.component';
import {RacesComponent} from 'admin/race/races/races.component';
import {RaceDetailsComponent} from 'admin/race/race-details/race-details.component';
import {AttributesComponent} from 'admin/race/attributes/attributes.component';
import {AttributeDetailsComponent} from 'admin/race/attribute-details/attribute-details.component';
import {RaceGeneralComponent} from 'admin/race/race-details/race-general/race-general.component';
import {RaceGenderComponent} from 'admin/race/race-details/race-gender/race-gender.component';
import {RaceAttributesComponent} from 'admin/race/race-details/race-attributes/race-attributes.component';
import {RaceAttributeDetailsComponent} from 'admin/race/race-details/race-attribute-details/race-attribute-details.component';
import {RaceStatsComponent} from 'admin/race/race-details/race-stats/race-stats.component';
import {RaceAgesComponent} from 'admin/race/race-details/race-ages/race-ages.component';
import {RaceMeasurementsComponent} from 'admin/race/race-details/race-measurements/race-measurements.component';
import {RaceGenderBaseComponent} from 'admin/race/shared/components/race-gender-base/race-gender-base.component';
import {SkillRacesComponent} from 'admin/skill/skill-details/skill-races/skill-races.component';
import {DeitiesComponent} from 'admin/deity/deities/deities.component';
import {CampaignsComponent} from 'admin/campaign/campaigns/campaigns.component';
import {LocationsComponent} from 'admin/location/locations/locations.component';
import {LocationTypesComponent} from 'admin/location/location-types/location-types.component';
import {LocationDetailsComponent} from 'admin/location/location-details/location-details.component';
import {LocationDlgComponent} from 'admin/location/location-dlg/location-dlg.component';
import {LocationPageComponent} from 'admin/location/location-page/location-page.component';
import {DeityDlgComponent} from 'admin/deity/deity-dlg/deity-dlg.component';
import {DeityDetailsComponent} from 'admin/deity/deity-details/deity-details.component';
import {DeityTypesComponent} from 'admin/deity/deity-types/deity-types.component';
import {LocationsDlgComponent} from 'admin/location/locations-dlg/locations-dlg.component';
import {SelectLocationDlgComponent} from 'admin/location/select-location-dlg/select-location-dlg.component';
import {SelectDeityDlgComponent} from 'admin/deity/select-deity-dlg/select-deity-dlg.component';
import {DeitiesDlgComponent} from 'admin/deity/deities-dlg/deities-dlg.component';

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
            imports:      [
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
            exports:      [
              LocationsDlgComponent,
              DeitiesDlgComponent
            ],
            providers:    [
              TreeDragDropService
            ]
          })
export class AdminModule {
}
