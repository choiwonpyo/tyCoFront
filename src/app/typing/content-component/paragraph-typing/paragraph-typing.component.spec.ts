import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphTypingComponent } from './paragraph-typing.component';

describe('ParagraphTypingComponent', () => {
  let component: ParagraphTypingComponent;
  let fixture: ComponentFixture<ParagraphTypingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagraphTypingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
