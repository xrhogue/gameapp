import { UniqueSkillDirective } from './unique-skill.directive';
import {SkillService} from "../../../service/skill/skill.service";
import {TestBed, getTestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('UniqueSkillDirective', () => {
  let injector: TestBed;
  let service: SkillService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SkillService]
    });
    injector = getTestBed();
    service = injector.get(SkillService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should create an instance', () => {
    const directive = injector.get(UniqueSkillDirective);
    expect(directive).toBeTruthy();
  });
});
