import { TestBed } from '@angular/core/testing';

import { NghImgViewerService } from './ngh-img-viewer.service';

describe('NghImgViewerService', () => {
  let service: NghImgViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NghImgViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
