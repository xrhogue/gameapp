import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RaceService} from "../../../../service/race/race.service";
import {NgForm} from "@angular/forms";
import {Race} from "../../../shared/race";
import {UtilService} from "../../../../shared/services/util/util.service";
import {Gender} from "../../../shared/gender";

@Component({
  selector: 'app-race-general',
  templateUrl: './race-general.component.html',
  styleUrls: ['./race-general.component.scss']
})
export class RaceGeneralComponent implements OnInit {

  id: number;
  genders: Array<Gender>;
  selectedGenders: Array<Gender>;
  @Input() race: Race;
  @Output() raceChange: EventEmitter<Race> = new EventEmitter<Race>();
  @Output() genderUpdate: EventEmitter<any> = new EventEmitter<any>();
  JSON: JSON;
  fieldStates: {name: boolean, genders: boolean} = {name: false, genders: false};
  isInteger:(number: string)=>boolean;
  @Input() ngForm: NgForm;

  constructor(private route: ActivatedRoute, private router: Router, private raceService: RaceService, private utilService: UtilService) {
    this.route.params.subscribe( params => this.id = params.id );
    this.JSON = JSON;
    this.isInteger = utilService.isInteger;
  }

  ngOnInit() {
    this.raceService.getGenders().subscribe(genders => this.genders = genders.filter(gender => gender.id !== 0));

    this.selectedGenders = this.race.genders;

    this.initInvalid();
  }

  initInvalid() {
    if (!this.race.name || this.race.name.length === 0) {
      this.fieldStates.name = true;
    }

    if (!this.selectedGenders || this.selectedGenders.length == 0) {
      this.fieldStates.genders = true;
    }
  }

  isInvalid() {
    return this.fieldStates.name || this.fieldStates.genders;
  }

  updateGenders() {
    this.race.genders = Array.from(this.selectedGenders);
    this.genderUpdate.emit();
  }

  updateInvalid(field: string, invalid: boolean) {
    this.fieldStates[field] = invalid;
  }
}
