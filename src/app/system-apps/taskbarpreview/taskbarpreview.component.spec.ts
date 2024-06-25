import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarpreviewComponent } from './taskbarpreview.component';

describe('TaskbarpreviewComponent', () => {
  let component: TaskbarpreviewComponent;
  let fixture: ComponentFixture<TaskbarpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskbarpreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
