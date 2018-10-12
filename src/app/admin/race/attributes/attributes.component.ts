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

  addComplexion(name: string) {
    this.raceService.addComplexion(new Complexion(null, name)).subscribe(data => {
      this.raceService.getComplexions().subscribe(data => this.complexions = data);
    });
  }

  deleteComplexions(complexions: Array<Complexion>) {
    complexions.forEach(complexion=>{
      this.raceService.deleteComplexion(complexion.id).subscribe(data => {
        this.raceService.getComplexions().subscribe(data => this.complexions = data);
      });
    })
  }

  addEyeColor(name: string) {
    this.raceService.addEyeColor(new EyeColor(null, name)).subscribe(data => {
      this.raceService.getEyeColors().subscribe(data => this.eyeColors = data);
    });
  }

  deleteEyeColors(eyeColors: Array<EyeColor>) {
    eyeColors.forEach(eyeColor=>{
      this.raceService.deleteEyeColor(eyeColor.id).subscribe(data => {
        this.raceService.getEyeColors().subscribe(data => this.eyeColors = data);
      });
    })
  }

  addHairColor(name: string) {
    this.raceService.addHairColor(new HairColor(null, name)).subscribe(data => {
      this.raceService.getHairColors().subscribe(data => this.hairColors = data);
    });
  }

  deleteHairColors(hairColors: Array<HairColor>) {
    hairColors.forEach(hairColor=>{
      this.raceService.deleteHairColor(hairColor.id).subscribe(data => {
        this.raceService.getHairColors().subscribe(data => this.hairColors = data);
      });
    })
  }

  addSkinColor(name: string) {
    this.raceService.addSkinColor(new SkinColor(null, name)).subscribe(data => {
      this.raceService.getSkinColors().subscribe(data => this.skinColors = data);
    });
  }

  deleteSkinColors(skinColors: Array<SkinColor>) {
    skinColors.forEach(skinColor=>{
      this.raceService.deleteSkinColor(skinColor.id).subscribe(data => {
        this.raceService.getSkinColors().subscribe(data => this.skinColors = data);
      });
    })
  }
}
