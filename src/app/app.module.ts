import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatsComponent } from './admin/stat/stats/stats.component';
import { CharactersComponent } from './character/characters/characters.component';
import { CharacterDetailsComponent } from './character/character-details/character-details.component';

import { StatService } from './service/stat/stat.service';
import { StatDetailsComponent } from './admin/stat/stat-details/stat-details.component';
import { UniqueStatDirective } from './shared/directives/unique-stat.directive';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    StatsComponent,
    CharactersComponent,
    CharacterDetailsComponent,
    StatDetailsComponent,
    UniqueStatDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    StatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
