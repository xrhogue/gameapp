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
  @Input() pattern: string = "[1-9]+[0-9]*";
  @Input() min: number = Number.MIN_VALUE;
  @Input() max: number = Number.MAX_VALUE;

  JSON: JSON;
  isInteger:(number: string) => boolean;

  constructor(private utilService: UtilService) {
    this.JSON = JSON;
    this.isInteger = this.utilService.isInteger;
  }

  ngOnInit() {
  }

  updateInvalid(field: string, invalid: boolean) {
  }
}
