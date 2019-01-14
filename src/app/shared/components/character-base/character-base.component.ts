import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilService} from "../../services/util/util.service";
import {Character} from "admin/shared/character";

@Component({
  template: ''
})
export class CharacterBaseComponent implements OnInit {
  @Input() character: Character;
  @Output() characterChange: EventEmitter<Character> = new EventEmitter<Character>();
  isInteger:(number: string) => boolean;
  MAX_VALUE: Number = Number.MAX_VALUE;
  fieldStates: Array<boolean> = [];

  constructor(protected utilService: UtilService) {
    this.isInteger = this.utilService.isInteger;
  }

  ngOnInit() {
  }

  isInvalid(): boolean {
    for (let fieldStateKey in this.fieldStates) {
      if (this.fieldStates[fieldStateKey] == true) {
        return true;
      }
    }

    return false;
  }

  updateInvalid(event: {id: string, name: string, invalid: boolean}) {
    this.fieldStates[event.name] = event.invalid;
  }
}
