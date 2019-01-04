import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidatorFn} from "@angular/forms";
import {UniqueGender} from "../../../admin/shared/unique-gender";

@Directive({
  selector: '[appUniqueGender]',
  providers: [{provide: NG_VALIDATORS, useExisting: UniqueGenderDirective, multi: true}]
})
export class UniqueGenderDirective {

  @Input('appUniqueGender') uniqueGender: UniqueGender;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return control.value ? uniqueGenderValidator(this.uniqueGender)(control)
      : null;
  }
}

export function uniqueGenderValidator(uniqueGender: UniqueGender): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return uniqueGender.genders.filter(gender=>gender.name === control.value).length == 0 ? null : {'uniqueGender': {value: control.value, description: "'" + control.value + "' is not unique"}};
  };
}
