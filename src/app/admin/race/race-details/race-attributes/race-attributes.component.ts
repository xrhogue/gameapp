import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RaceService} from "../../../../service/race/race.service";
import {Complexion} from "../../../shared/complexion";
import {RaceComplexion} from "../../../shared/race-complexion";
import {RaceEyeColor} from "../../../shared/race-eye-color";
import {EyeColor} from "../../../shared/eye-color";
import {HairColor} from "../../../shared/hair-color";
import {RaceHairColor} from "../../../shared/race-hair-color";
import {SkinColor} from "../../../shared/skin-color";
import {RaceSkinColor} from "../../../shared/race-skin-color";
import {RaceGenderBaseComponent} from "../../shared/components/race-gender-base/race-gender-base.component";
import {UtilService} from "../../../../shared/services/util/util.service";

@Component({
  selector: 'app-race-attributes',
  templateUrl: './race-attributes.component.html',
  styleUrls: ['./race-attributes.component.scss']
})
export class RaceAttributesComponent extends RaceGenderBaseComponent implements OnInit {

  complexions: Array<Complexion> = [];
  eyeColors: Array<EyeColor> = [];
  hairColors: Array<HairColor> = [];
  skinColors: Array<SkinColor> = [];

  constructor(private route: ActivatedRoute, private router: Router, private raceService: RaceService, protected utilService: UtilService) {
    super(utilService);

    this.raceService.getComplexions().subscribe(data => this.complexions = data);
    this.raceService.getEyeColors().subscribe(data => this.eyeColors = data);
    this.raceService.getHairColors().subscribe(data => this.hairColors = data);
    this.raceService.getSkinColors().subscribe(data => this.skinColors = data);
  }

  ngOnInit() {
    this.initInvalid();
  }

  updateComplexions(selectedComplexions: Array<Complexion>) {
    this.removeRaceComplexions();
    this.addRaceComplexions(selectedComplexions);
  }

  removeRaceComplexions() {
    if (!!this.race.complexions) {
      this.race.complexions = this.race.complexions.filter(complexion => complexion.genderId !== this.gender.id);
    }
  }

  addRaceComplexions(selectedComplexions: Array<Complexion>) {
    if (!this.race.complexions) {
      this.race.complexions = [];
    }

    selectedComplexions.forEach(complexion => this.race.complexions.push(new RaceComplexion(complexion.id, this.gender.id)));
  }

  addComplexion(complexion: string) {
    this.raceService.addComplexion(new Complexion(null, complexion)).subscribe(data => {
      this.raceService.getComplexions().subscribe(data => this.complexions = data);
    });
  }

  updateEyeColors(selectedEyeColors: Array<EyeColor>) {
    this.removeRaceEyeColors();
    this.addRaceEyeColors(selectedEyeColors);
  }

  removeRaceEyeColors() {
    if (!!this.race.eyeColors) {
      this.race.eyeColors = this.race.eyeColors.filter(eyeColor => eyeColor.genderId !== this.gender.id);
    }
  }

  addRaceEyeColors(selectedEyeColors: Array<EyeColor>) {
    if (!this.race.eyeColors) {
      this.race.eyeColors = [];
    }

    selectedEyeColors.forEach(eyeColor => this.race.eyeColors.push(new RaceEyeColor(eyeColor.id, this.gender.id)));
  }

  addEyeColor(eyeColor: string) {
    this.raceService.addEyeColor(new EyeColor(null, eyeColor)).subscribe(data => {
      this.raceService.getEyeColors().subscribe(data => this.eyeColors = data);
    });
  }

  updateHairColors(selectedHairColors: Array<HairColor>) {
    this.removeRaceHairColors();
    this.addRaceHairColors(selectedHairColors);
  }

  removeRaceHairColors() {
    if (!!this.race.hairColors) {
      this.race.hairColors = this.race.hairColors.filter(hairColor => hairColor.genderId !== this.gender.id);
    }
  }

  addRaceHairColors(selectedHairColors: Array<HairColor>) {
    if (!this.race.hairColors) {
      this.race.hairColors = [];
    }

    selectedHairColors.forEach(hairColor => this.race.hairColors.push(new RaceHairColor(hairColor.id, this.gender.id)));
  }

  addHairColor(hairColor: string) {
    this.raceService.addHairColor(new HairColor(null, hairColor)).subscribe(data => {
      this.raceService.getHairColors().subscribe(data => this.hairColors = data);
    });
  }

  updateSkinColors(selectedSkinColors: Array<SkinColor>) {
    this.removeRaceSkinColors();
    this.addRaceSkinColors(selectedSkinColors);
  }

  removeRaceSkinColors() {
    if (!!this.race.skinColors) {
      this.race.skinColors = this.race.skinColors.filter(skinColor => skinColor.genderId !== this.gender.id);
    }
  }

  addRaceSkinColors(selectedSkinColors: Array<SkinColor>) {
    if (!this.race.skinColors) {
      this.race.skinColors = [];
    }

    selectedSkinColors.forEach(skinColor => this.race.skinColors.push(new RaceSkinColor(skinColor.id, this.gender.id)));
  }

  addSkinColor(skinColor: string) {
    this.raceService.addSkinColor(new SkinColor(null, skinColor)).subscribe(data => {
      this.raceService.getSkinColors().subscribe(data => this.skinColors = data);
    });
  }

  initInvalid() {
    if (!this.race.complexions || this.race.complexions.filter(complexion => complexion.genderId == this.gender.id).length == 0) {
      this.fieldStates['Complexion'] = true;
    }
    if (!this.race.eyeColors || this.race.eyeColors.filter(eyeColor => eyeColor.genderId == this.gender.id).length == 0) {
      this.fieldStates['EyeColor'] = true;
    }
    if (!this.race.hairColors || this.race.hairColors.filter(hairColor => hairColor.genderId == this.gender.id).length == 0) {
      this.fieldStates['HairColor'] = true;
    }
    if (!this.race.skinColors || this.race.skinColors.filter(skinColor => skinColor.genderId == this.gender.id).length == 0) {
      this.fieldStates['SkinColor'] = true;
    }
  }
}
