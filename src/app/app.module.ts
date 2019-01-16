import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TreeTableModule} from 'primeng/treetable';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MultiSelectModule} from "primeng/primeng";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {SharedModule} from "./shared/shared.module";
import {AdminModule} from "./admin/admin.module";

import {SidebarComponent} from './sidebar/sidebar.component';
import {StatsComponent} from './admin/stat/stats/stats.component';
import {CharactersComponent} from './character/characters/characters.component';
import {CharacterDetailsComponent} from './character/character-details/character-details.component';

import {StatService} from './service/stat/stat.service';
import {SkillService} from "./service/skill/skill.service";
import {MockService} from "./service/mock/mock.service";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import { CharacterStatsComponent } from './character/character-details/character-stats/character-stats.component';
import { CharacterSkillsComponent } from './character/character-details/character-skills/character-skills.component';
import { CharacterGeneralComponent } from './character/character-details/character-general/character-general.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    StatsComponent,
    CharactersComponent,
    CharacterDetailsComponent,
    CharacterGeneralComponent,
    CharacterStatsComponent,
    CharacterSkillsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    AdminModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    TreeTableModule,
    ContextMenuModule,
    MultiSelectModule,
    InMemoryWebApiModule.forRoot(MockService, { delay: 0 })
  ],
  providers: [
    StatService,
    SkillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
