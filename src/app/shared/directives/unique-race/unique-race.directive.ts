import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";
import {UniqueRace} from "../../../admin/shared/unique-race";
import {RaceService} from "../../../service/race/race.service";

@Directive({
  selector: '[appUniqueRace]',
  providers: [{provide: NG_VALIDATORS, useExisting: UniqueRaceDirective, multi: true}]
})
export class UniqueRaceDirective implements Validator {

  @Input('appUniqueRace') uniqueRace: UniqueRace;

  constructor(private raceService: RaceService) { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return control.value ? uniqueRaceValidator(this.raceService, this.uniqueRace)(control)
      : null;
  }
}

export function uniqueRaceValidator(raceService: RaceService, uniqueRace: UniqueRace): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return raceService.isUnique(uniqueRace.race, uniqueRace.fieldName, control.value) ? null : {'uniqueRace': {value: control.value, description: "'" + control.value + "' is not unique"}};
  };
}
