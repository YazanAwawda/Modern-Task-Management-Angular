import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavTaskComponent } from './sidenav-task.component';

describe('SidenavTaskComponent', () => {
  let component: SidenavTaskComponent;
  let fixture: ComponentFixture<SidenavTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
