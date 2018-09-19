import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {UniqueStatDirective} from "./directives/unique-stat.directive";
import {UniqueSkillDirective} from "./directives/unique-skill.directive";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    UniqueStatDirective,
    UniqueSkillDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageNotFoundComponent,
    UniqueStatDirective,
    UniqueSkillDirective
  ]
})
export class SharedModule { }
