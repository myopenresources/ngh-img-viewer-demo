import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NghImgViewerComponent } from './ngh-img-viewer.component';

describe('NghImgViewerComponent', () => {
  let component: NghImgViewerComponent;
  let fixture: ComponentFixture<NghImgViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NghImgViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NghImgViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
