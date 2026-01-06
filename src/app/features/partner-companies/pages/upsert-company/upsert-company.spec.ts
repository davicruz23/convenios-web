import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertCompany } from './upsert-company';

describe('UpsertCompany', () => {
  let component: UpsertCompany;
  let fixture: ComponentFixture<UpsertCompany>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertCompany]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertCompany);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
