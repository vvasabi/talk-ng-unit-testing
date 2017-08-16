import {Component} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {HeroListComponent, HeroListModule, HeroNameComponent} from './4-override-component.spec';
import {Hero} from 'app/hero';
import {createHeroes} from '../../testing-support/testing-utils';

@Component({
  selector: 'my-hero-name',
  template: '{{heroName}}'
})
class MockHeroNameComponent extends HeroNameComponent {

  get heroName() {
    return `${this.hero.id} - ${this.hero.name}`;
  }

}

describe('Override module', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HeroListModule
      ]
    });

    // While TestBed.overrideComponent() is very useful, unlike TestBed.overrideProvider(),
    // it does not allow us to override the actual implementation class.
    // This is when TestBed.overrideModule can be handy.
    TestBed.overrideModule(HeroListModule, {
      remove: {
        declarations: [
          HeroNameComponent
        ]
      },
      add: {
        declarations: [
          MockHeroNameComponent
        ]
      }
    });
    TestBed.compileComponents();
  }));

  it('can use overridden component class', () => {
    const fixture = TestBed.createComponent(HeroListComponent);
    fixture.componentInstance.heroes = createHeroes().slice(2, 3);
    fixture.detectChanges(); // here, we make sure our changes get rendered (more on this later)
    expect(fixture.nativeElement.textContent.trim()).toBe('3 - Testy McTestface');
  });
});
