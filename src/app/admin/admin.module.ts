import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {
  ContextMenuModule,
  DragDropModule,
  MultiSelectModule,
  TreeModule,
  TreeTableModule,
  TreeDragDropService,
  ListboxModule, InputTextModule, ButtonModule
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

@NgModule({
  declarations: [
    StatDetailsComponent,
    SkillsComponent,
    SkillDetailsComponent,
    SkillGeneralComponent,
    SkillPrerequisitesComponent,
    RacesComponent,
    RaceDetailsComponent,
    RaceGeneralComponent,
    AttributesComponent,
    AttributeDetailsComponent
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
    ButtonModule,
    AdminRoutingModule
  ],
  providers: [
    TreeDragDropService
  ]
})
export class AdminModule {
}
