import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddizioneComponent } from './addizione.component';

describe('AddizioneComponent', () => {
  let component: AddizioneComponent;
  let fixture: ComponentFixture<AddizioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddizioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddizioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
