import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingMainSkeletonComponent } from './typing-main-skeleton.component';

describe('TypingMainSkeletonComponent', () => {
  let component: TypingMainSkeletonComponent;
  let fixture: ComponentFixture<TypingMainSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypingMainSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingMainSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
