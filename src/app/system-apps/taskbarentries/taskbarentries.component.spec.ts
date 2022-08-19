import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarentriesComponent } from './taskbarentries.component';

describe('TaskbarentriesComponent', () => {
  let component: TaskbarentriesComponent;
  let fixture: ComponentFixture<TaskbarentriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskbarentriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarentriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
