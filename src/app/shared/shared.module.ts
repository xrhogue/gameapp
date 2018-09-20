import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {UniqueStatDirective} from "./directives/unique-stat.directive";
import {UniqueSkillDirective} from "./directives/unique-skill.directive";
import {AuthGuard} from "./guards/auth-guard/auth-guard.service";
import {AuthService} from "./services/auth/auth.service";
import { LoginComponent } from './components/login/login.component';
import {SharedRoutingModule} from "./shared-routing.module";
import {DialogService} from "./services/dialog/dialog.service";
import {DeactivateGuard} from "./guards/deactivate-guard/deactivate-guard.service";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    UniqueStatDirective,
    UniqueSkillDirective,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    PageNotFoundComponent,
    UniqueStatDirective,
    UniqueSkillDirective
  ],
  providers: [
    AuthGuard,
    DeactivateGuard,
    AuthService,
    DialogService
  ]
})
export class SharedModule { }
