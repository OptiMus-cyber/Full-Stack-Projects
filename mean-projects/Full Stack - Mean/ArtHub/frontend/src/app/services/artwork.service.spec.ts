import { TestBed } from '@angular/core/testing';

import { ArtworkService } from './services/artwork.service';

describe('ArtworkService', () => {
  let service: ArtworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
