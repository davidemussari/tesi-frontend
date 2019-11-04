import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RighePassaggiComponent } from './riga-passaggio.component';

describe('RighePassaggiComponent', () => {
  let component: RighePassaggiComponent;
  let fixture: ComponentFixture<RighePassaggiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RighePassaggiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RighePassaggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
