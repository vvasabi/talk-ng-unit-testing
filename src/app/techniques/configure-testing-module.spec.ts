import {async, TestBed} from '@angular/core/testing';
import {HeroGravatarComponent} from 'app/hero-gravatar.component';

describe('Configure testing module', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroGravatarComponent
      ]
    }).compileComponents();
  }));

  it('can start a real Angular environment for testing', () => {
    expect(TestBed.createComponent(HeroGravatarComponent)).toBeTruthy();
  });
});
