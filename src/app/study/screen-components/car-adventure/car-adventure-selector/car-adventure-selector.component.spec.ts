import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAdventureSelectorComponent } from './car-adventure-selector.component';

describe('CarAdventureSelectorComponent', () => {
  let component: CarAdventureSelectorComponent;
  let fixture: ComponentFixture<CarAdventureSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarAdventureSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAdventureSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
