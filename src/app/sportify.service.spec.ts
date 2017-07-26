import { TestBed, inject } from '@angular/core/testing';

import { SportifyService } from './sportify.service';

describe('SportifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SportifyService]
    });
  });

  it('should ...', inject([SportifyService], (service: SportifyService) => {
    expect(service).toBeTruthy();
  }));
});
