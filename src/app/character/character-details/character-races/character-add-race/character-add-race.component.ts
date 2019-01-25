import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
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
export class CharacterAddRaceComponent implements OnInit, OnChanges {
  @Input() character: Character;
  @Output() characterChange: EventEmitter<Character> = new EventEmitter<Character>();
  @Input() selectedCharacterRace: CharacterRace;
  @Output() selectedCharacterRaceChange: EventEmitter<CharacterRace> = new EventEmitter<CharacterRace>();
  races: Array<Race>;
  characterRaceTreeNodes: Array<CharacterRaceTreeNode>;
  selectedCharacterRaceTreeNode: CharacterRaceTreeNode = new CharacterRaceTreeNode(new CharacterRace(0, 0, 0), null);

  constructor(private raceService: RaceService, protected utilService: UtilService) { }

  ngOnInit() {
    this.updateCharacterRaceTreeNodes();

//    this.selectedCharacterRace = this.selectedCharacterRaceTreeNode.data;
  }

  ngOnChanges() {
    if (!!this.races) {
      // remove nodes instead of rebuilding to preserve expansion.
      // TODO: handle the case where a race is dropped from the list of character races (need to add the node back in)
      // TODO: we could not drop the node, but rather mark it as not selectable...
      this.characterRaceTreeNodes = this.removeCharacterRaceTreeNodes(this.characterRaceTreeNodes);
    }
  }

  removeCharacterRaceTreeNodes(characterRaceTreeNodes: Array<CharacterRaceTreeNode>): Array<CharacterRaceTreeNode> {
    let newCharacterRaceTreeNodes: Array<CharacterRaceTreeNode> = characterRaceTreeNodes.filter(characterRaceTreeNode => !this.isCharacterRace(this.getRace(characterRaceTreeNode.data)));

    newCharacterRaceTreeNodes.forEach(characterRaceTreeNode => characterRaceTreeNode.children = this.removeCharacterRaceTreeNodes(characterRaceTreeNode.children));
    newCharacterRaceTreeNodes = newCharacterRaceTreeNodes.filter(characterRaceTreeNode => characterRaceTreeNode.selectable || characterRaceTreeNode.children.length > 0);

    return newCharacterRaceTreeNodes;
  }

  updateCharacterRaceTreeNodes() {
    this.raceService.getRaces().subscribe(races => {
      this.races = races;
      this.characterRaceTreeNodes = this.buildCharacterRaceTreeNodes(null);
    });
  }

  buildCharacterRaceTreeNodes(parentId: number) {
    let characterRaceTreeNodes: Array<CharacterRaceTreeNode> = this.races.filter(race => race.parentId === parentId && !this.isCharacterRace(race)).map(race => new CharacterRaceTreeNode(new CharacterRace(this.character.id, race.id, this.getRemainingPercent()), null, null, null, null, true, false, false));

    characterRaceTreeNodes.forEach(raceTreeNode => {
      raceTreeNode.children = this.buildCharacterRaceTreeNodes(raceTreeNode.data.raceId);

      raceTreeNode.leaf = (raceTreeNode.children == undefined || raceTreeNode.children == null || raceTreeNode.children.length == 0);
      raceTreeNode.selectable = raceTreeNode.leaf;
    });

    return characterRaceTreeNodes;
  }

  isCharacterRace(race: Race): boolean {
    return this.character.races.find(characterRace => characterRace.raceId == race.id) != null;
  }

  raceSelected(event: {node: CharacterRaceTreeNode}) {
    this.selectedCharacterRaceTreeNode = event.node;
    this.selectedCharacterRace.raceId = this.selectedCharacterRaceTreeNode.data.raceId;
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
