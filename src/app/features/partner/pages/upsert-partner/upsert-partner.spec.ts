import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertPartner } from './upsert-partner';

describe('UpsertPartner', () => {
  let component: UpsertPartner;
  let fixture: ComponentFixture<UpsertPartner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertPartner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertPartner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
