import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-location-dlg',
  templateUrl: './location-dlg.component.html',
  styleUrls: ['./location-dlg.component.scss']
})
export class LocationDlgComponent implements OnInit {
  @Input() location: Location;
  @Input() header: string = "New Location";
  @Input() visible: boolean = false;
  @Output() locationChange: EventEmitter<Location> = new EventEmitter<Location>();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  close(location: Location) {
    this.locationChange.emit(location);
    this.visibleChange.emit(false);
  }
}
