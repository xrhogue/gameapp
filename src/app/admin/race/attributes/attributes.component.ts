import {Component, OnInit} from '@angular/core';
import {RaceService} from "../../../service/race/race.service";
import {Complexion} from "../../shared/complexion";
import {SkinColor} from "../../shared/skin-color";
import {HairColor} from "../../shared/hair-color";
import {EyeColor} from "../../shared/eye-color";

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {

  complexions: Array<Complexion> = [];
  eyeColors: Array<EyeColor> = [];
  hairColors: Array<HairColor> = [];
  skinColors: Array<SkinColor> = [];

  constructor(private raceService: RaceService) {
  }

  ngOnInit() {
    this.raceService.getComplexions().subscribe(data => this.complexions = data);
    this.raceService.getEyeColors().subscribe(data => this.eyeColors = data);
    this.raceService.getHairColors().subscribe(data => this.hairColors = data);
    this.raceService.getSkinColors().subscribe(data => this.skinColors = data);
  }

}
