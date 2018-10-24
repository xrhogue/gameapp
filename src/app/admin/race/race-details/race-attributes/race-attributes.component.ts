import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RaceService} from "../../../../service/race/race.service";
import {UtilService} from "../../../../shared/services/util/util.service";
import {Race} from "../../../shared/race";
import {NgForm} from "@angular/forms";
import {Gender} from "../../../shared/gender";
import {Complexion} from "../../../shared/complexion";
import {RaceComplexion} from "../../../shared/race-complexion";

@Component({
  selector: 'app-race-attributes',
  templateUrl: './race-attributes.component.html',
  styleUrls: ['./race-attributes.component.scss']
})
export class RaceAttributesComponent implements OnInit {

  @Input() gender: Gender;
  @Input() race: Race;
  @Output() raceChange: EventEmitter<Race> = new EventEmitter<Race>();
  JSON: JSON;
  @Input() ngForm: NgForm;
  complexions: Array<Complexion>;
  raceComplexions: Array<Complexion>;

  constructor(private route: ActivatedRoute, private router: Router, private raceService: RaceService, private utilService: UtilService) {
    this.JSON = JSON;
    this.raceService.getComplexions().subscribe(data => this.complexions = data);
  }

  ngOnInit() {
  }

  updateComplexions() {
    this.removeRaceComplexions();
    this.addRaceComplexions();
  }

  removeRaceComplexions() {
    if (!!this.race.complexions) {
      this.race.complexions = this.race.complexions.filter(complexion => complexion.genderId !== this.gender.id);
    }
  }

  addRaceComplexions() {
    if (!!this.raceComplexions) {
      if (!this.race.complexions) {
        this.race.complexions = [];
      }

      this.raceComplexions.forEach(complexion => this.race.complexions.push(new RaceComplexion(complexion.id, this.gender.id)));
    }
  }

  updateInvalid(name: string, invalid: boolean) {
  }
}
