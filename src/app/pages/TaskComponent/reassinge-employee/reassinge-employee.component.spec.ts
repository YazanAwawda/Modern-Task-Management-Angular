import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassingeEmployeeComponent } from './reassinge-employee.component';

describe('ReassingeEmployeeComponent', () => {
  let component: ReassingeEmployeeComponent;
  let fixture: ComponentFixture<ReassingeEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReassingeEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReassingeEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
