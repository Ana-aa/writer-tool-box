import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultCharComponent } from './result-char.component';

describe('ResultCharComponent', () => {
  let component: ResultCharComponent;
  let fixture: ComponentFixture<ResultCharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultCharComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultCharComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
