import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidatorFn} from "@angular/forms";
import {UniqueName} from "../../../admin/shared/unique-name";

@Directive({
  selector: '[appUniqueName]',
  providers: [{provide: NG_VALIDATORS, useExisting: UniqueNameDirective, multi: true}]
})
export class UniqueNameDirective {

  @Input('appUniqueName') uniqueName: UniqueName;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return control.value ? uniqueNameValidator(this.uniqueName)(control)
      : null;
  }
}

export function uniqueNameValidator(uniqueName: UniqueName): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return uniqueName.attributes.filter(attribute=>attribute.name === control.value).length == 0 ? null : {'uniqueName': {value: control.value, description: "'" + control.value + "' is not unique"}};
  };
}
