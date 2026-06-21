import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationCountComponent } from './configuration-count.component';

describe('ConfigurationCountComponent', () => {
  let component: ConfigurationCountComponent;
  let fixture: ComponentFixture<ConfigurationCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationCountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationCountComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
