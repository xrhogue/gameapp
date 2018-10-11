import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";
import {UniqueSkill} from "../../../admin/shared/unique-skill";
import {SkillService} from "../../../service/skill/skill.service";

@Directive({
  selector: '[appUniqueSkill]',
  providers: [{provide: NG_VALIDATORS, useExisting: UniqueSkillDirective, multi: true}]
})
export class UniqueSkillDirective implements Validator {

  @Input('appUniqueSkill') uniqueSkill: UniqueSkill;

  constructor(private data: SkillService) { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return control.value ? uniqueSkillValidator(this.data, this.uniqueSkill)(control)
      : null;
  }
}

export function uniqueSkillValidator(data: SkillService, uniqueSkill: UniqueSkill): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return data.isUnique(uniqueSkill.skill, uniqueSkill.fieldName, control.value) ? null : {'uniqueSkill': {value: control.value, description: "'" + control.value + "' is not unique"}};
  };
}
