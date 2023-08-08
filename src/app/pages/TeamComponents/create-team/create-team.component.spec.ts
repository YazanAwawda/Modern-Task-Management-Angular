import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamComponent } from './create-team.component';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef} from "@angular/material/dialog";

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeamComponent ] ,
      providers: [{ provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {} }, ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
