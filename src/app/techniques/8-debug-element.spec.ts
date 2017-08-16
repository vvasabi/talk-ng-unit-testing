import {Component, Input} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {Hero} from 'app/hero';
import {createHeroes} from 'testing-support/testing-utils';

@Component({
  selector: 'my-hero-info',
  template: `
    <span [ngClass]="{active: hero.active, retired: !hero.active}">{{hero.name}}</span>
    <button *ngIf="hero.active" (click)="retire()">Retire</button>
  `
})
export class HeroInfoComponent {
  @Input() hero: Hero;

  retire() {
    this.hero.active = false;
  }
}

@Component({
  selector: 'my-hero-list',
  template: `
    <ul>
      <li *ngFor="let hero of heroes">
        <my-hero-info [hero]="hero"></my-hero-info>
      </li>
    </ul>
  `
})
export class HeroListComponent {
  @Input() heroes: Hero[] = [];
  remove(hero: Hero) {
    this.heroes = this.heroes.filter(h => h !== hero);
  }
}

describe('Debug Element', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroInfoComponent,
        HeroListComponent
      ]
    }).compileComponents();
  }));

  it('exposes native HTMLElement object to tests', () => {
    const fixture = TestBed.createComponent(HeroListComponent);
    fixture.componentInstance.heroes = createHeroes();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    expect(fixture.debugElement.queryAll(By.css('.active')).length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css('.retired')).length).toBe(1);
  });

  it('allows child components to be accessed', () => {
    const fixture = TestBed.createComponent(HeroListComponent),
      heroes = createHeroes();
    fixture.componentInstance.heroes = heroes;
    fixture.detectChanges();

    const heroInfoComponents = fixture.debugElement.queryAll(By.css('my-hero-info'));
    expect(heroInfoComponents.length).toBe(3);

    const heroInfoComponent = <HeroInfoComponent>heroInfoComponents[0].componentInstance;
    expect(heroInfoComponent).toBeTruthy();
    heroInfoComponent.retire();
    expect(heroes[0].active).toBeFalsy();
  });
});
