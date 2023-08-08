import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTasksOfProjectComponent } from './view-tasks-of-project.component';

describe('ViewTasksOfProjectComponent', () => {
  let component: ViewTasksOfProjectComponent;
  let fixture: ComponentFixture<ViewTasksOfProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTasksOfProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTasksOfProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
