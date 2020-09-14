import { TestBed, async, inject } from '@angular/core/testing';

import { CheckoutGuardGuard } from './checkout-guard.guard';

describe('CheckoutGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutGuardGuard]
    });
  });

  it('should ...', inject([CheckoutGuardGuard], (guard: CheckoutGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
