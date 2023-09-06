import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserRoleComponent } from './update-user-role.component';

describe('UpdateUserRoleComponent', () => {
  let component: UpdateUserRoleComponent;
  let fixture: ComponentFixture<UpdateUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
