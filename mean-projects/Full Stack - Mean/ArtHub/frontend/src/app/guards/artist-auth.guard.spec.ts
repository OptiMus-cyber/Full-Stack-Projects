import { TestBed } from '@angular/core/testing';

import { ArtistAuthGuard } from './artist-auth.guard';

describe('ArtistAuthGuard', () => {
  let guard: ArtistAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ArtistAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
