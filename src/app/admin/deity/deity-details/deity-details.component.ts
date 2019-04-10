import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Deity} from "admin/shared/deity";
import {DeityType} from "admin/shared/deity-type";
import {DeityService} from "../../../service/deity/deity.service";
import {DialogService} from "../../../shared/services/dialog/dialog.service";

@Component({
             selector: 'app-deity-details',
             templateUrl: './deity-details.component.html',
             styleUrls: ['./deity-details.component.scss']
           })
export class DeityDetailsComponent implements OnInit {
  id: number;
  @Input() deity: Deity;
  deityTypes: Array<DeityType>;
  deityTypeName: string = "";
  @Input() modal: boolean = false;
  @Output() deityChange: EventEmitter<Deity> = new EventEmitter<Deity>();
  @ViewChild('name') nameInput: any;
  @ViewChild('type') typeOption: any;
  parent: Deity = new Deity(0, 0, null, null, "(None)");
  showDialog: boolean = false;
  selectParent: boolean = false;
  dirty: boolean = false;
  JSON: JSON;

  constructor(private route: ActivatedRoute, private router: Router, private deityService: DeityService, private dialogService: DialogService) {
    this.route.params.subscribe(params => this.id = params.id);
    this.JSON = JSON;
  }

  ngOnInit() {
    this.deityService.getDeityTypes().subscribe(deityTypes => {
      this.deityTypes = deityTypes.filter(deityType => deityType.id !== 0);

      if (this.id > 0) {
        this.deityService.getDeity(this.id).subscribe(deity => this.deity = deity);
      }
      else if (!this.deity) {
        this.deity = new Deity(null, null, null, !!this.deityTypes && this.deityTypes.length > 0 ? this.deityTypes[0].id : null, "");
      }
    });
  }

  invalid() {
    // if this is a new record, then it is always invalid
    if (this.id == 0 && !this.nameInput.dirty) {
      return true;
    }

    // if this is an existing record, wait until it is ready for checking (e.g. value has been set)
    if (!!this.deity && !!this.deity.name && !this.nameInput.control.value) {
      return false;
    }

    return this.nameInput.invalid || this.typeOption.invalid;
  }

  focus() {
    if (!!this.nameInput) {
      this.nameInput.valueAccessor._elementRef.nativeElement.focus();
    }
  }

  update() {
    if (!this.deity.id) {
      this.deityService.addDeity(this.deity).subscribe(deity => {
        this.deity = deity;
        this.dirty = false;
        this.finalize();
      });
    }
    else {
      this.deityService.updateDeity(this.deity).subscribe(deity => {
        this.deity = deity;
        this.dirty = false;
        this.finalize();
      });
    }
  }

  updateParent(parent: Deity) {
    if (!!parent && !!parent.id) {
      this.parent = parent;
    }
  }

  cancel() {
    if (!this.dirty) {
      this.finalize();
    }
    else {
      this.dialogService.confirm('Discard changes?').subscribe(exit => {
        if (exit) {
          this.finalize();
        }
      });
    }
  }

  addDeityType() {
    this.deityService.addDeityType(new DeityType(null, this.deityTypeName)).subscribe(deityType => {
      this.deityTypeName = '';
      this.deityService.getDeityTypes().subscribe(deityTypes => {
        this.deityTypes = deityTypes.filter(deityType => deityType.id !== 0);
        if (!this.deity.typeId) {
          this.deity.typeId = !!this.deityTypes && this.deityTypes.length > 0 ? this.deityTypes[0].id : null;
        }
      });
    });
  }

  finalize() {
    if (!this.modal) {
      this.router.navigate(['/admin/deitys']).catch(/*display an error message?*/);
    }
    else {
      this.deityChange.emit(this.deity);
    }
  }
}
