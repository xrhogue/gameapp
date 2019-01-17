import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../../shared/services/util/util.service";
import {CharacterBaseComponent} from "../../../shared/components/character-base/character-base.component";
import {RaceService} from "../../../service/race/race.service";
import {Race} from "admin/shared/race";
import {Gender} from "admin/shared/gender";

@Component({
  selector: 'app-character-races',
  templateUrl: './character-races.component.html',
  styleUrls: ['./character-races.component.scss']
})
export class CharacterRacesComponent extends CharacterBaseComponent implements OnInit {
  races: Array<Race>
  genders: Array<Gender>;

  constructor(private raceService: RaceService, protected utilService: UtilService) {
    super(utilService);
  }

  ngOnInit() {
    this.raceService.getGenders().subscribe(genders => {
      this.genders = genders;

      this.raceService.getRaces().subscribe(races => {
        this.races = races;

        this.initCharacterRaces();
      });
    });
  }

  initCharacterRaces() {
    if (!this.character.races) {
      this.character.races = [];
    }
  }
}
