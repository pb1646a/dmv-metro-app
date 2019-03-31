import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetroBusComponent } from './metro-bus.component';

describe('MetroBusComponent', () => {
  let component: MetroBusComponent;
  let fixture: ComponentFixture<MetroBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetroBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetroBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
