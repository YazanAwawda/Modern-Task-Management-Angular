import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneTaskComponent } from './assigne-task.component';

describe('AssigneTaskComponent', () => {
  let component: AssigneTaskComponent;
  let fixture: ComponentFixture<AssigneTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigneTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigneTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
