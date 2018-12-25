import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedWagonComponent } from './speed-wagon.component';

describe('SpeedWagonComponent', () => {
  let component: SpeedWagonComponent;
  let fixture: ComponentFixture<SpeedWagonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedWagonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedWagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
