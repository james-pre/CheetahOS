import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinampComponent } from './winamp.component';

describe('WinampComponent', () => {
  let component: WinampComponent;
  let fixture: ComponentFixture<WinampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinampComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
