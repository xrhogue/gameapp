import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RaceService} from "../../../../service/race/race.service";
import {UtilService} from "../../../../shared/services/util/util.service";
import {Race} from "admin/shared/race";
import {Character} from "admin/shared/character";
import {CharacterRaceTreeNode} from "admin/shared/character-race-tree-node";
import {CharacterRace} from "admin/shared/character-race";

@Component({
  selector: 'app-character-add-race',
  templateUrl: './character-add-race.component.html',
  styleUrls: ['./character-add-race.component.scss']
})
export class CharacterAddRaceComponent implements OnInit {
  @Input() character: Character;
  @Output() characterChange: EventEmitter<Character> = new EventEmitter<Character>();
  @Input() selectedCharacterRace: CharacterRace;
  @Output() selectedCharacterRaceChange: EventEmitter<CharacterRace> = new EventEmitter<CharacterRace>();
  races: Array<Race>;
  characterRaceTreeNodes: Array<CharacterRaceTreeNode>;
  selectedCharacterRaceTreeNode: CharacterRaceTreeNode = new CharacterRaceTreeNode(new CharacterRace(0, 0, 0), null);

  constructor(private raceService: RaceService, protected utilService: UtilService) { }

  ngOnInit() {
    this.raceService.getRaces().subscribe(races => {
      this.races = races;
      this.characterRaceTreeNodes = this.buildCharacterRaceTreeNodes(null);
    });

    this.selectedCharacterRace = this.selectedCharacterRaceTreeNode.data;
  }

  buildCharacterRaceTreeNodes(parentId: number) {
    let characterRaceTreeNodes: Array<CharacterRaceTreeNode> = this.races.filter(race => race.parentId === parentId && this.character.races.filter(characterRace => characterRace.raceId == race.id).length == 0).map(race => new CharacterRaceTreeNode(new CharacterRace(this.character.id, race.id, this.getRemainingPercent()), null, null, null, null, true, false, false));

    characterRaceTreeNodes.forEach(raceTreeNode => {
      raceTreeNode.children = this.buildCharacterRaceTreeNodes(raceTreeNode.data.raceId);

      raceTreeNode.leaf = (raceTreeNode.children == undefined || raceTreeNode.children == null || raceTreeNode.children.length == 0);
      raceTreeNode.selectable = raceTreeNode.leaf;
    });

    return characterRaceTreeNodes;
  }

  raceSelected(event: {node: CharacterRaceTreeNode}) {
    this.selectedCharacterRaceTreeNode = event.node;
    this.selectedCharacterRace = this.selectedCharacterRaceTreeNode.data;
    this.selectedCharacterRaceChange.emit(this.selectedCharacterRace);
  }

  getRemainingPercent(): number {
    return Character.getRemainingPercent(this.character);
  }

  getRace(characterRace: CharacterRace): Race {
    if (characterRace.raceId == 0) {
      return new Race(0,"");
    }

    return this.races.find(race => race.id === characterRace.raceId);
  }
}
