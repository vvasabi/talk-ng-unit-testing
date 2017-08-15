import {async, TestBed} from '@angular/core/testing';
import {HeroGravatarComponent} from 'app/hero-gravatar.component';

describe('Configure testing module', () => {
  beforeEach(async(() => {
    // The module metadata has a similar syntax as what goes inside the @NgModule decorator
    TestBed.configureTestingModule({
      declarations: [
        HeroGravatarComponent
      ]
    }).compileComponents();
  }));

  it('can create HeroGravatarComponent', () => {
    expect(TestBed.createComponent(HeroGravatarComponent)).toBeTruthy();
  });
});
