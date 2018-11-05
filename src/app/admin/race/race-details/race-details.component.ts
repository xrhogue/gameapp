import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RaceService} from "../../../service/race/race.service";
import {NgForm} from "@angular/forms";
import {Race} from "../../shared/race";
import {RaceGeneralComponent} from "./race-general/race-general.component";
import {Gender} from "../../shared/gender";

@Component({
  selector: 'app-race-details',
  templateUrl: './race-details.component.html',
  styleUrls: ['./race-details.component.scss']
})
export class RaceDetailsComponent implements OnInit {

  id: number;
  race: Race;
  genderBase: Gender;
  JSON: JSON;
  invalid: boolean = true;

  @ViewChild('form') ngForm: NgForm;
  @ViewChild(RaceGeneralComponent) private raceGeneralComponent: RaceGeneralComponent;

  constructor(private route: ActivatedRoute, private router: Router, private raceService: RaceService) {
    this.route.params.subscribe( params => this.id = params.id );
    this.JSON = JSON;
    raceService.getGenders().subscribe(data => this.genderBase = data.filter(gender => gender.id === 0).pop());
  }

  ngOnInit() {
    if (this.id > 0) {
      this.raceService.getRace(this.id).subscribe(data => this.race = data);
    }
    else {
      this.race = new Race(0, "", true, 3, null, null, null, null, null, null, null, null);
    }
  }

  update() {
    if (this.race.id == 0) {
      this.raceService.addRace(this.race).subscribe(race => this.race = race);
    }
    else {
      this.raceService.updateRace(this.race).subscribe(race => this.race = race);
    }

    this.router.navigate(['/admin/races']);
  }

  cancel() {
    this.router.navigate(['/admin/races']);
  }

  isInvalid() {
    if (this.raceGeneralComponent !== undefined) {
      this.invalid = this.raceGeneralComponent.invalid();
    }

    return this.invalid;
  }
}
