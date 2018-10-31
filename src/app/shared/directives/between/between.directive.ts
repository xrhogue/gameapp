import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidatorFn} from "@angular/forms";
import {Between} from "../../../admin/shared/between";

@Directive({
  selector: '[appBetween]',
  providers: [{provide: NG_VALIDATORS, useExisting: BetweenDirective, multi: true}]
})
export class BetweenDirective {

  @Input('appBetween') between: Between;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return control.value ? betweenValidator(this.between)(control)
      : null;
  }
}

export function betweenValidator(between: Between): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let value: number = control.value;
    return isBetween(value, between) ? null : {'between': {value: control.value, description: "'" + control.value + "' is not between"}};
  };
}

function isBetween(value: number, between: Between): boolean {
  if (!!value) {
    return (!!between.min ? (between.inclusiveMin ? value >= between.min : value > between.min) : true) && (!!between.max ? (between.inclusiveMax ? value <= between.max : value < between.max) : true);
  }

  return false;
}

