import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForNodeComponent } from './for-node.component';

describe('ForNodeComponent', () => {
  let component: ForNodeComponent;
  let fixture: ComponentFixture<ForNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
