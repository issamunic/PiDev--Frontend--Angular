import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainCompanyComponent } from './domain-company.component';

describe('DomainCompanyComponent', () => {
  let component: DomainCompanyComponent;
  let fixture: ComponentFixture<DomainCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
