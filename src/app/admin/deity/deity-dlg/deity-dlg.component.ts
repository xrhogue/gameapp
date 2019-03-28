import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Deity} from "admin/shared/deity";

@Component({
             selector: 'app-deity-dlg',
             templateUrl: './deity-dlg.component.html',
             styleUrls: ['./deity-dlg.component.scss']
           })
export class DeityDlgComponent implements OnInit {
  @Input() deity: Deity;
  @Input() header: string = "New Deity";
  @Input() visible: boolean = false;
  @Output() deityChange: EventEmitter<Deity> = new EventEmitter<Deity>();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  close(deity: Deity) {
    this.deityChange.emit(deity);
    this.visibleChange.emit(false);
  }
}
