/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DistributorService } from './distributor.service';

describe('Service: Distributor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistributorService]
    });
  });

  it('should ...', inject([DistributorService], (service: DistributorService) => {
    expect(service).toBeTruthy();
  }));
});
