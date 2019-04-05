import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPositionElComponent } from './bus-position-el.component';

describe('BusPositionElComponent', () => {
  let component: BusPositionElComponent;
  let fixture: ComponentFixture<BusPositionElComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusPositionElComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPositionElComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
