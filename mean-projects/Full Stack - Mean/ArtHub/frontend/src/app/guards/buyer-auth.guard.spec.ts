import { TestBed } from '@angular/core/testing';

import { BuyerAuthGuard } from './buyer-auth.guard';

describe('BuyerAuthGuard', () => {
  let guard: BuyerAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BuyerAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
