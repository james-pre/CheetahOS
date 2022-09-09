import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsdosComponent } from './jsdos.component';

describe('JsdosComponent', () => {
  let component: JsdosComponent;
  let fixture: ComponentFixture<JsdosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsdosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
