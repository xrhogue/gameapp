import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";
import {UniqueStat} from "../../admin/shared/unique-stat";
import {StatService} from "../../service/stat/stat.service";

@Directive({
  selector: '[appUniqueStat]',
  providers: [{provide: NG_VALIDATORS, useExisting: UniqueStatDirective, multi: true}]
})
export class UniqueStatDirective implements Validator {

  @Input('appUniqueStat') uniqueStat: UniqueStat;

  constructor(private data: StatService) { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return control.value ? uniqueStatValidator(this.data, this.uniqueStat)(control)
      : null;
  }
}

export function uniqueStatValidator(data: StatService, uniqueStat: UniqueStat): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return data.isUnique(uniqueStat.stat, uniqueStat.fieldName, control.value) ? null : {'uniqueStat': {value: control.value, description: "'" + control.value + "' is not unique"}};
  };
}
