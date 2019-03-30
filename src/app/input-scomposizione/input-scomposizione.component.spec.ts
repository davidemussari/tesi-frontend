import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputScomposizioneComponent } from './input-scomposizione.component';

describe('InputScomposizioneComponent', () => {
  let component: InputScomposizioneComponent;
  let fixture: ComponentFixture<InputScomposizioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputScomposizioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputScomposizioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
