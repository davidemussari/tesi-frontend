import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSommaAlgebricaComponent } from './input-somma-algebrica.component';

describe('InputSommaAlgebricaComponent', () => {
  let component: InputSommaAlgebricaComponent;
  let fixture: ComponentFixture<InputSommaAlgebricaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSommaAlgebricaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSommaAlgebricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
