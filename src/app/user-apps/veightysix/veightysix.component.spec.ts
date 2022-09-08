import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeightysixComponent } from './veightysix.component';

describe('VeightysixComponent', () => {
  let component: VeightysixComponent;
  let fixture: ComponentFixture<VeightysixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeightysixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeightysixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
