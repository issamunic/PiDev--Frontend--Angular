import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarchatComponent } from './sidebarchat.component';

describe('SidebarchatComponent', () => {
  let component: SidebarchatComponent;
  let fixture: ComponentFixture<SidebarchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
