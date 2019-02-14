import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
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
import {UniqueGenderDirective} from "./directives/unique-gender/unique-gender.directive";
import { CharacterBaseComponent } from './components/character-base/character-base.component';
import { AddNameComponent } from './components/add-name/add-name.component';
import { AddNameDialogComponent } from './components/add-name-dialog/add-name-dialog.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    UniqueStatDirective,
    UniqueRaceDirective,
    UniqueSkillDirective,
    UniqueNameDirective,
    UniqueGenderDirective,
    BetweenDirective,
    LoginComponent,
    NumberComponent,
    CharacterBaseComponent,
    AddNameComponent,
    AddNameDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    FontAwesomeModule,
    CustomFormsModule,
    ButtonModule,
    DialogModule
  ],
  exports: [
    PageNotFoundComponent,
    NumberComponent,
    AddNameComponent,
    AddNameDialogComponent,
    UniqueStatDirective,
    UniqueRaceDirective,
    UniqueSkillDirective,
    UniqueNameDirective,
    UniqueGenderDirective,
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
