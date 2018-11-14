import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RaceService} from "../../../service/race/race.service";
import {Race} from "../../shared/race";
import {RaceGeneralComponent} from "./race-general/race-general.component";
import {Gender} from "../../shared/gender";
import {RaceGenderComponent} from "./race-gender/race-gender.component";

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
  componentStates: Array<boolean> = [];

  @ViewChild(RaceGeneralComponent) private raceGeneralComponent: RaceGeneralComponent;
  @ViewChild(RaceGenderComponent) private raceGenderComponent: RaceGenderComponent;

  constructor(private route: ActivatedRoute, private router: Router, private raceService: RaceService) {
    this.route.params.subscribe( params => this.id = params.id );
    this.JSON = JSON;
  }

  ngOnInit() {
    this.raceService.getGenders().subscribe(genders => this.genderBase = genders.filter(gender => gender.id === 0).pop());

    if (this.id > 0) {
      this.raceService.getRace(this.id).subscribe(data => this.race = data);
    }
    else {
      this.race = new Race(0, "", true, 0);
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

  updateGenders(event: Event) {
    this.race.genders.forEach(gender => {
      if (this.componentStates['raceGender' + gender.name + 'Component'] === undefined) {
        this.componentStates['raceGender' + gender.name + 'Component'] = true;
      }
    })
  }

  isInvalid() {
    if (!!this.raceGeneralComponent) {
      this.componentStates['raceGeneralComponent'] = this.raceGeneralComponent.isInvalid();
    }

    if (!!this.raceGenderComponent) {
      this.componentStates['raceGender' + this.raceGenderComponent.gender.name + 'Component'] = this.raceGenderComponent.isInvalid();
    }

    if (this.isRaceInvalid()) {
      return true;
    }

    for (let componentKey in this.componentStates) {
      //console.log('component: ' + componentKey +', state: ' + this.componentStates[componentKey]);

      if (this.componentStates[componentKey]) {
        return true;
      }
    }

    return false;
  }

  isGenderInvalid(genderName: string) {
    return this.componentStates['raceGender' + genderName + 'Component'];
  }

  // TODO: Why can I not add this function to the Race class and access it there?
  isRaceInvalid(): boolean {
    return !this.race || !this.race.name || this.race.name.length == 0 || !this.race.stats || this.race.stats.length == 0 || !this.race.complexions || this.race.complexions.length == 0;
  }
}
