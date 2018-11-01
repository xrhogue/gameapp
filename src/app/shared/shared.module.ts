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
import {BetweenDirective} from "./directives/between/between.directive";
import { NumberComponent } from './components/number/number.component';
import {FormsModule} from "@angular/forms";
import {CustomFormsModule} from "ng2-validation";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    UniqueStatDirective,
    UniqueRaceDirective,
    UniqueSkillDirective,
    UniqueNameDirective,
    BetweenDirective,
    LoginComponent,
    NumberComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    FontAwesomeModule,
    CustomFormsModule
  ],
  exports: [
    PageNotFoundComponent,
    NumberComponent,
    UniqueStatDirective,
    UniqueRaceDirective,
    UniqueSkillDirective,
    UniqueNameDirective,
    BetweenDirective
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
