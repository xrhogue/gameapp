import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Race} from "../../../shared/race";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RaceService} from "../../../../service/race/race.service";
import {UtilService} from "../../../../shared/services/util/util.service";
import {Gender} from "../../../shared/gender";

@Component({
  selector: 'app-race-gender',
  templateUrl: './race-gender.component.html',
  styleUrls: ['./race-gender.component.scss']
})
export class RaceGenderComponent implements OnInit {

  @Input() gender: Gender;
  @Input() race: Race;
  @Output() raceChange: EventEmitter<Race> = new EventEmitter<Race>();
  JSON: JSON;
  @Input() ngForm: NgForm;


  constructor(private route: ActivatedRoute, private router: Router, private raceService: RaceService, private utilService: UtilService) {
    this.JSON = JSON;
  }

  ngOnInit() {
  }
}
