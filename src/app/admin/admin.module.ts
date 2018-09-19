import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

import {ContextMenuModule, MultiSelectModule, TreeTableModule} from "primeng/primeng";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {SharedModule} from "../shared/shared.module";

import {StatDetailsComponent} from "./stat/stat-details/stat-details.component";
import {SkillsComponent} from "./skill/skills/skills.component";
import {SkillDetailsComponent} from "./skill/skill-details/skill-details.component";
import {AdminRoutingModule} from "./admin-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgbModule,
    ContextMenuModule,
    MultiSelectModule,
    TreeTableModule,
    AdminRoutingModule
  ],
  declarations: [
    StatDetailsComponent,
    SkillsComponent,
    SkillDetailsComponent
  ]
})
export class AdminModule { }
