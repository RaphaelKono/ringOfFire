import { TestBed } from '@angular/core/testing';

import { GameInfoHelperService } from './game-info-helper.service';

describe('GameInfoHelperService', () => {
  let service: GameInfoHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameInfoHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
