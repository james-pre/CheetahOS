import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarPreviewComponent } from './taskbarpreview.component';

describe('TaskbarPreviewComponent', () => {
  let component: TaskbarPreviewComponent;
  let fixture: ComponentFixture<TaskbarPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskbarPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
