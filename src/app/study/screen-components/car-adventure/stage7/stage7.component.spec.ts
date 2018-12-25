import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stage7Component } from './stage7.component';

describe('Stage7Component', () => {
  let component: Stage7Component;
  let fixture: ComponentFixture<Stage7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stage7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stage7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
