import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAccess } from './partner-access';

describe('PartnerAccess', () => {
  let component: PartnerAccess;
  let fixture: ComponentFixture<PartnerAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerAccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
