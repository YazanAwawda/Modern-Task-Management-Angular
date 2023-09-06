import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMultipleFilesComponent } from './upload-multiple-files.component';

describe('UploadMultipleFilesComponent', () => {
  let component: UploadMultipleFilesComponent;
  let fixture: ComponentFixture<UploadMultipleFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMultipleFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMultipleFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
