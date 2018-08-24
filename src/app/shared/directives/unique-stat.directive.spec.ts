import { UniqueStatDirective } from './unique-stat.directive';
import {StatService} from "../../service/stat/stat.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {TestBed, getTestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('UniqueStatDirective', () => {
  let injector: TestBed;
  let service: StatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatService]
    });
    injector = getTestBed();
    service = injector.get(StatService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should create an instance', () => {
    const directive = injector.get(UniqueStatDirective);
    expect(directive).toBeTruthy();
  });
});
