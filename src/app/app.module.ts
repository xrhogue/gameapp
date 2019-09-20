import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TreeTableModule} from 'primeng/treetable';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from "primeng/button";
import {ListboxModule} from "primeng/listbox";
import {MultiSelectModule} from "primeng/multiselect";
import {DialogModule} from "primeng/dialog";
import {TreeModule} from "primeng/tree";

import {AppRoutingModule} from 'app/app-routing.module';
import {AppComponent} from 'app/app.component';

import {AdminModule} from "admin/admin.module";
import {SharedModule} from "app/shared/shared.module";

import {SidebarComponent} from 'app/sidebar/sidebar.component';
import {StatsComponent} from 'admin/stat/stats/stats.component';
import {CharactersComponent} from 'app/character/characters/characters.component';
import {CharacterDetailsComponent} from 'app/character/character-details/character-details.component';

import {StatService} from 'app/service/stat/stat.service';
import {SkillService} from "app/service/skill/skill.service";
import {MockService} from "app/service/mock/mock.service";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {CharacterStatsComponent} from 'app/character/character-details/character-stats/character-stats.component';
import {CharacterSkillsComponent} from 'app/character/character-details/character-skills/character-skills.component';
import {CharacterGeneralComponent} from 'app/character/character-details/character-general/character-general.component';
import {CharacterRacesComponent} from 'app/character/character-details/character-races/character-races.component';
import {RaceService} from "app/service/race/race.service";
import {CharacterService} from "app/service/character/character.service";
import {CharacterAddRaceComponent} from 'app/character/character-details/character-races/character-add-race/character-add-race.component';
import {TableModule} from "primeng/table";
import {CharacterAddSkillComponent} from 'app/character/character-details/character-skills/character-add-skill/character-add-skill.component';
import {CampaignService} from "app/service/campaign/campaign.service";
import {LocationService} from "app/service/location/location.service";
import {DeityService} from "app/service/deity/deity.service";
import {CharacterSkillDetailsComponent} from 'app/character/character-details/character-skills/character-skill-details/character-skill-details.component';
import {CharacterSkillDetailsDlgComponent} from 'app/character/character-details/character-skills/character-skill-details-dlg/character-skill-details-dlg.component';

@NgModule({
            declarations: [
              AppComponent,
              SidebarComponent,
              StatsComponent,
              CharactersComponent,
              CharacterDetailsComponent,
              CharacterGeneralComponent,
              CharacterRacesComponent,
              CharacterStatsComponent,
              CharacterSkillsComponent,
              CharacterAddRaceComponent,
              CharacterAddSkillComponent,
              CharacterSkillDetailsComponent,
              CharacterSkillDetailsDlgComponent
            ],
            imports:      [
              BrowserModule,
              FormsModule,
              SharedModule,
              AdminModule,
              AppRoutingModule,
              HttpClientModule,
              BrowserAnimationsModule,
              NgbModule,
              TableModule,
              TreeTableModule,
              TreeModule,
              ContextMenuModule,
              MultiSelectModule,
              ListboxModule,
              ButtonModule,
              DialogModule,
              InMemoryWebApiModule.forRoot(MockService, {delay: 0})
            ],
            providers:    [
              CampaignService,
              DeityService,
              LocationService,
              StatService,
              RaceService,
              SkillService,
              CharacterService
            ],
            bootstrap:    [AppComponent]
          })
export class AppModule {
}
