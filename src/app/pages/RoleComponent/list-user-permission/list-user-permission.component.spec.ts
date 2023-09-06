import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserPermissionComponent } from './list-user-permission.component';

describe('ListUserPermissionComponent', () => {
  let component: ListUserPermissionComponent;
  let fixture: ComponentFixture<ListUserPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
