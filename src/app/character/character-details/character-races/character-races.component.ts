import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../../shared/services/util/util.service";
import {CharacterBaseComponent} from "../../../shared/components/character-base/character-base.component";
import {RaceService} from "../../../service/race/race.service";
import {Race} from "admin/shared/race";
import {Gender} from "admin/shared/gender";
import {CharacterRace} from "admin/shared/character-race";
import {Router} from "@angular/router";
import {Character} from "admin/shared/character";

@Component({
  selector: 'app-character-races',
  templateUrl: './character-races.component.html',
  styleUrls: ['./character-races.component.scss']
})
export class CharacterRacesComponent extends CharacterBaseComponent implements OnInit {
  races: Array<Race>
  genders: Array<Gender>;
  newRace: CharacterRace;
  showDialog: boolean = false;

  constructor(private raceService: RaceService, protected utilService: UtilService, private router: Router) {
    super(utilService);
  }

  ngOnInit() {
    this.raceService.getGenders().subscribe(genders => {
      this.genders = genders;

      this.raceService.getRaces().subscribe(races => {
        this.races = races;

        this.initCharacterRaces();
        this.newRace = this.initCharacterRace();
      });
    });
  }

  initCharacterRaces() {
    if (!this.character.races) {
      this.character.races = [];
    }
  }

  initCharacterRace(): CharacterRace {
    return CharacterRace.initialize(this.character.id, 0, Character.getRemainingPercent(this.character));
  }

  getRemainingPercent(): number {
    return Character.getRemainingPercent(this.character);
  }

  addCharacterRace() {
    this.router.navigateByUrl('/character/race/0');
  }

  updateCharacterRace(characterRace: CharacterRace) {
    this.router.navigateByUrl('/character/races/' + characterRace.raceId);
  }

  deleteCharacterRace(raceId: number) {
    // delete from the character object
  }

  getRace(characterRace: CharacterRace): Race {
    return this.races.find(race => race.id === characterRace.raceId);
  }
}
