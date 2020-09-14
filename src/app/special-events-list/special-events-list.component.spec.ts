import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialEventsListComponent } from './special-events-list.component';

describe('SpecialEventsListComponent', () => {
  let component: SpecialEventsListComponent;
  let fixture: ComponentFixture<SpecialEventsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialEventsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
