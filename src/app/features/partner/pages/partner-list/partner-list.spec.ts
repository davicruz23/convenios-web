import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerListComponent } from './partner-list';

describe('PartnerList', () => {
  let component: PartnerListComponent;
  let fixture: ComponentFixture<PartnerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
