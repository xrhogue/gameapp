import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TreeTableModule } from 'primeng/treetable';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from "primeng/toast";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatsComponent } from './admin/stat/stats/stats.component';
import { CharactersComponent } from './character/characters/characters.component';
import { CharacterDetailsComponent } from './character/character-details/character-details.component';

import { StatService } from './service/stat/stat.service';
import { StatDetailsComponent } from './admin/stat/stat-details/stat-details.component';
import { UniqueStatDirective } from './shared/directives/unique-stat.directive';
import { SkillsComponent } from './admin/skill/skills/skills.component';
import { SkillDetailsComponent } from './admin/skill/skill-details/skill-details.component';
import { SkillService } from "./service/skill/skill.service";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    StatsComponent,
    CharactersComponent,
    CharacterDetailsComponent,
    StatDetailsComponent,
    UniqueStatDirective,
    SkillsComponent,
    SkillDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    TreeTableModule,
    ContextMenuModule,
    ToastModule
  ],
  providers: [
    StatService,
    SkillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
