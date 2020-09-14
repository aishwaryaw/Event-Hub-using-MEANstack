import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialEventsDetailComponent } from './special-events-detail.component';

describe('SpecialEventsDetailComponent', () => {
  let component: SpecialEventsDetailComponent;
  let fixture: ComponentFixture<SpecialEventsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialEventsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialEventsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
