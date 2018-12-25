import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHandleMainSkeletonComponent } from './car-handle-main-skeleton.component';

describe('CarHandleMainSkeletonComponent', () => {
  let component: CarHandleMainSkeletonComponent;
  let fixture: ComponentFixture<CarHandleMainSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarHandleMainSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHandleMainSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
