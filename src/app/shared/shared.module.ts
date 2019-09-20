import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {CustomFormsModule} from "ng2-validation";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PageNotFoundComponent} from 'shared/components/page-not-found/page-not-found.component';
import {UniqueStatDirective} from "shared/directives/unique-stat/unique-stat.directive";
import {UniqueSkillDirective} from "shared/directives/unique-skill/unique-skill.directive";
import {AuthGuard} from "shared/guards/auth-guard/auth-guard.service";
import {AuthService} from "shared/services/auth/auth.service";
import {LoginComponent} from 'shared/components/login/login.component';
import {SharedRoutingModule} from "shared/shared-routing.module";
import {DialogService} from "shared/services/dialog/dialog.service";
import {DeactivateGuard} from "shared/guards/deactivate-guard/deactivate-guard.service";
import {UtilService} from "shared/services/util/util.service";
import {UniqueNameDirective} from 'shared/directives/unique-name/unique-name.directive';
import {UniqueRaceDirective} from 'shared/directives/unique-race/unique-race.directive';
import {BetweenDirective} from "shared/directives/between/between.directive";
import {NumberComponent} from 'shared/components/number/number.component';
import {UniqueGenderDirective} from "shared/directives/unique-gender/unique-gender.directive";
import {CharacterBaseComponent} from 'shared/components/character-base/character-base.component';
import {AddNameComponent} from 'shared/components/add-name/add-name.component';
import {AddNameDialogComponent} from 'shared/components/add-name-dialog/add-name-dialog.component';

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
            imports:      [
              CommonModule,
              FormsModule,
              SharedRoutingModule,
              FontAwesomeModule,
              CustomFormsModule,
              ButtonModule,
              DialogModule
            ],
            exports:      [
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
            providers:    [
              AuthGuard,
              DeactivateGuard,
              AuthService,
              DialogService,
              UtilService
            ]
          })
export class SharedModule {
}
