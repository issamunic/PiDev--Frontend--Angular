import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarrightchatComponent } from './sidebarrightchat.component';

describe('SidebarrightchatComponent', () => {
  let component: SidebarrightchatComponent;
  let fixture: ComponentFixture<SidebarrightchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarrightchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarrightchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
