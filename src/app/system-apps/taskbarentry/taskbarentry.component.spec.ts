import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarentryComponent } from './taskbarentry.component';

describe('TaskbarentryComponent', () => {
  let component: TaskbarentryComponent;
  let fixture: ComponentFixture<TaskbarentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskbarentryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
