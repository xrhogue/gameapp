import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RaceService} from "../../../../service/race/race.service";
import {NgForm} from "@angular/forms";
import {Race} from "../../../shared/race";
import {UtilService} from "../../../../shared/services/util/util.service";
import {Gender} from "../../../shared/gender";
import {RaceGenderAttributes} from "../../../shared/race-gender-attributes";

@Component({
  selector: 'app-race-general',
  templateUrl: './race-general.component.html',
  styleUrls: ['./race-general.component.scss']
})
export class RaceGeneralComponent implements OnInit {

  id: number;
  genders: Array<Gender>;
  raceGenders: Array<Gender>;
  @Input() race: Race;
  @Output() raceChange: EventEmitter<Race> = new EventEmitter<Race>();
  JSON: JSON;
  fieldStates: {name: boolean, genders: boolean} = {name: false, genders: false};
  isInteger:(number: string)=>boolean;
  @Input() ngForm: NgForm;

  constructor(private route: ActivatedRoute, private router: Router, private raceService: RaceService, private utilService: UtilService) {
    this.route.params.subscribe( params => this.id = params.id );
    this.raceService.getGenders().subscribe(data => this.genders = data);
    this.JSON = JSON;
    this.isInteger = utilService.isInteger;
  }

  ngOnInit() {
  }

  invalid() {
    return this.fieldStates.name || this.fieldStates.genders;
  }

  updateGenders() {
    this.updateGenderAttributes(this.raceGenders.map(gender => gender.id))

    this.race.genders = Array.from(this.raceGenders);
  }

  updateGenderAttributes(genderIds: Array<number>) {
    if (!!this.race.complexions) {
      this.race.complexions = this.race.complexions.filter(complexion => genderIds.indexOf(complexion.genderId) > -1);
    }
  }

  updateInvalid(field: string, invalid: boolean) {
    this.fieldStates[field] = invalid;
  }
}
