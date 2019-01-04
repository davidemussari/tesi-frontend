import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SottrazioneComponent } from './sottrazione.component';

describe('SottrazioneComponent', () => {
  let component: SottrazioneComponent;
  let fixture: ComponentFixture<SottrazioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SottrazioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SottrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
