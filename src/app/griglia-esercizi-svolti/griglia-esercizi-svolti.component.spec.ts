import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrigliaEserciziSvoltiComponent } from './griglia-esercizi-svolti.component';

describe('GrigliaEserciziSvoltiComponent', () => {
  let component: GrigliaEserciziSvoltiComponent;
  let fixture: ComponentFixture<GrigliaEserciziSvoltiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrigliaEserciziSvoltiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrigliaEserciziSvoltiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
