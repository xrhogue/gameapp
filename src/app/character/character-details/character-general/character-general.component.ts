import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Campaign} from "admin/shared/campaign";
import {Deity} from "admin/shared/deity";
import {CampaignService} from "../../../service/campaign/campaign.service";
import {DeityService} from "../../../service/deity/deity.service";
import {LocationService} from "../../../service/location/location.service";
import {UtilService} from "../../../shared/services/util/util.service";
import {CharacterBaseComponent} from "../../../shared/components/character-base/character-base.component";
import {Character} from "admin/shared/character";
import {CharacterService} from "../../../service/character/character.service";
import {RaceService} from "../../../service/race/race.service";
import {Location} from "admin/shared/location";

@Component({
  selector: 'app-character-general',
  templateUrl: './character-general.component.html',
  styleUrls: ['./character-general.component.scss']
})
export class CharacterGeneralComponent extends CharacterBaseComponent implements OnInit {
  id: number;
  @Input() character: Character;
  @Output() characterChange: EventEmitter<Character> = new EventEmitter<Character>();
  campaigns: Array<Campaign> = [];
  birthplace: Location = new Location(null, null, null, null, "(None)");
  characterDeities: Array<Deity> = [];
  selectedDeities: Array<Deity> = [];
  selectCampaign: boolean = false;
  selectBirthplace: boolean = false;
  selectDeities: boolean = false;

  constructor(private campaignService: CampaignService,
              private locationService: LocationService,
              private deityService: DeityService,
              private raceService: RaceService,
              private characterService: CharacterService,
              protected utilService: UtilService) {
    super(utilService);
    this.fieldStates['name'] = true;
  }

  ngOnInit() {
    this.initInvalid();

    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
    });

    this.locationService.getLocations().subscribe(locations => {
      if (!!locations) {
        this.birthplace = locations.find(location => location.id === this.character.locationId);
      }
    });

    this.deityService.getDeities().subscribe(deities => {
      if (!!deities && !!this.character.deityIds) {
        this.characterDeities = deities.filter(deity => this.character.deityIds.includes(deity.id));
      }

      if (this.characterDeities.length === 0) {
        this.characterDeities.push(new Deity(null, null, null, null, '(None)'));
      }
    });
  }

  initInvalid() {
    if (!this.character.name || this.character.name.length === 0) {
      this.fieldStates['name'] = true;
    }
  }

  updateCampaign(campaign: Campaign) {
    this.character.campaignId = campaign.id;
    this.characterChange.emit(this.character);
  }

  updateBirthplace(birthplace: Location) {
    this.character.locationId = birthplace.id;
    this.characterChange.emit(this.character);
  }

  updateDeities(deities: Array<Deity>) {
    this.character.deityIds = deities.map(deity => deity.id);
    this.characterChange.emit(this.character);
  }
}
