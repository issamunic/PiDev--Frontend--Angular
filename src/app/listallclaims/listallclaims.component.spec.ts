import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListallclaimsComponent } from './listallclaims.component';

describe('ListallclaimsComponent', () => {
  let component: ListallclaimsComponent;
  let fixture: ComponentFixture<ListallclaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListallclaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListallclaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
