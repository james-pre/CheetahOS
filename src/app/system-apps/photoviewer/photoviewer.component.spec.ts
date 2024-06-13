import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoviewerComponent } from './photoviewer.component';

describe('PhotoviewerComponent', () => {
  let component: PhotoviewerComponent;
  let fixture: ComponentFixture<PhotoviewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoviewerComponent]
    });
    fixture = TestBed.createComponent(PhotoviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
