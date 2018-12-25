import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleScreenComponent } from './simple-screen.component';

describe('SimpleScreenComponent', () => {
  let component: SimpleScreenComponent;
  let fixture: ComponentFixture<SimpleScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
