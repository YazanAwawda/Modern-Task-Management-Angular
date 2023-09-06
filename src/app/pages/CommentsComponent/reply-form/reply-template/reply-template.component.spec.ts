import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyTemplateComponent } from './reply-template.component';

describe('ReplyTemplateComponent', () => {
  let component: ReplyTemplateComponent;
  let fixture: ComponentFixture<ReplyTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
