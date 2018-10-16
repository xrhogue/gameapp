import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {UniqueStatDirective} from "./directives/unique-stat/unique-stat.directive";
import {UniqueSkillDirective} from "./directives/unique-skill/unique-skill.directive";
import {AuthGuard} from "./guards/auth-guard/auth-guard.service";
import {AuthService} from "./services/auth/auth.service";
import { LoginComponent } from './components/login/login.component';
import {SharedRoutingModule} from "./shared-routing.module";
import {DialogService} from "./services/dialog/dialog.service";
import {DeactivateGuard} from "./guards/deactivate-guard/deactivate-guard.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {UtilService} from "./services/util/util.service";
import { UniqueNameDirective } from './directives/unique-name/unique-name.directive';
import { UniqueRaceDirective } from './directives/unique-race/unique-race.directive';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    UniqueStatDirective,
    UniqueRaceDirective,
    UniqueSkillDirective,
    UniqueNameDirective,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    PageNotFoundComponent,
    UniqueStatDirective,
    UniqueRaceDirective,
    UniqueSkillDirective,
    UniqueNameDirective
  ],
  providers: [
    AuthGuard,
    DeactivateGuard,
    AuthService,
    DialogService,
    UtilService
  ]
})
export class SharedModule { }
