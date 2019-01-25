import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UtilService} from "../../services/util/util.service";

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

  @Input() ngForm: NgForm;
  @Input() id: string = "value";
  @Input() name: string = "value";
  @Input() value: number;
  @Input() decorator: string;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() invalid: EventEmitter<{id: string, name: string, invalid: boolean, description: string}> = new EventEmitter<{id: string, name: string, invalid: boolean, description: string}>();
  @Output() focusLost: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() pattern: string = "[1-9]+[0-9]*";
  @Input() width: string = "5";
  @Input() min: number = Number.MIN_VALUE;
  @Input() max: number = Number.MAX_VALUE;
  @Input() disabled: boolean = false;
  @Input() showError: boolean = true;

  JSON: JSON;
  isInteger:(number: string) => boolean;

  constructor(private utilService: UtilService) {
    this.JSON = JSON;
    this.isInteger = this.utilService.isInteger;
  }

  ngOnInit() {
  }

  updateInvalid(invalid: boolean, errors: {required: boolean, gt: boolean, lt: boolean}) {

    let description: string = '';

    if (invalid) {
      if (errors.required) {
        description = 'Required';
      } else if (errors.gt) {
        description = 'Value must be greater than ' + this.min;
      } else if (errors.lt) {
        description = 'Value must be less than ' + this.max;
      }
    }

    this.invalid.emit({id: this.id, name: this.name, invalid: invalid, description: description});
  }
}
