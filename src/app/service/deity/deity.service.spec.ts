import { TestBed } from '@angular/core/testing';

import { DeityService } from './deity.service';

describe('DeityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeityService = TestBed.get(DeityService);
    expect(service).toBeTruthy();
  });
});
