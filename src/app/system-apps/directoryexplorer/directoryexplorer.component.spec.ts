import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryexplorerComponent } from './directoryexplorer.component';

describe('DirectoryexplorerComponent', () => {
  let component: DirectoryexplorerComponent;
  let fixture: ComponentFixture<DirectoryexplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoryexplorerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoryexplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
