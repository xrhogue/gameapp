import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Race} from "../../shared/race";
import {RaceGeneralComponent} from "./race-general/race-general.component";
import {Gender} from "../../shared/gender";
import {RaceGenderComponent} from "./race-gender/race-gender.component";
import {RaceService} from "../../../service/race/race.service";
import {StatService} from "../../../service/stat/stat.service";

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

  @ViewChild(RaceGeneralComponent, { static: false }) private raceGeneralComponent: RaceGeneralComponent;
  @ViewChild(RaceGenderComponent, { static: false }) private raceGenderComponent: RaceGenderComponent;

  constructor(private route: ActivatedRoute, private router: Router, private statService: StatService, private raceService: RaceService) {
    this.route.params.subscribe( params => this.id = params.id );
    this.JSON = JSON;
  }

  ngOnInit() {
    if (this.id > 0) {
      this.raceService.getRace(this.id).subscribe(race => {
        this.race = race;

        console.log('initializing race');

        this.race = Race.initialize(this.race, 0, this.statService.getStatsCache(), this.raceService.getComplexionsCache(), this.raceService.getEyeColorsCache(), this.raceService.getHairColorsCache(), this.raceService.getSkinColorsCache());

        this.raceService.getGenders().subscribe(genders =>{
          this.genderBase = genders.filter(gender => gender.id === 0).pop();

          this.initInvalid();
        });
      });
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

  initInvalid() {
    this.componentStates['raceGender' + this.getGender().name + 'Component'] = Race.isGenderInvalid(this.race, this.getGender().id)
  }

  isInvalid() {
    //console.log('checking race invalid state');

    return Race.isInvalid(this.race);
  }

  isGenderInvalid(genderId: number) {
    //console.log("gender: " + genderId + ", invalid: " + Race.isGenderInvalid(this.race, genderId));
    return Race.isGenderInvalid(this.race, genderId);
  }

  getGender(): Gender {
    return !!this.raceGenderComponent && this.raceGenderComponent.gender !== undefined ? this.raceGenderComponent.gender : this.genderBase;
  }
}
