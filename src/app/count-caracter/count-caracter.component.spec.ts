import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountCaracter } from './count-caracter.component';

describe('CountCaracter', () => {
  let component: CountCaracter;
  let fixture: ComponentFixture<CountCaracter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountCaracter],
    }).compileComponents();

    fixture = TestBed.createComponent(CountCaracter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
