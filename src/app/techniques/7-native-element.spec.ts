import {Component, Input} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';

import {Hero} from 'app/hero';
import {createHeroes} from 'testing-support/testing-utils';

@Component({
  selector: 'my-hero-info',
  template: '<span [ngClass]="{active: hero.active, retired: !hero.active}">{{hero.name}}</span>'
})
export class HeroInfoComponent {
  @Input() hero: Hero;
}

@Component({
  selector: 'my-hero-list',
  template: `
    <ul>
      <li *ngFor="let hero of heroes">
        <my-hero-info [hero]="hero"></my-hero-info>
        <button (click)="remove(hero)">Remove</button>
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

describe('Native Element', () => {
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

    // We select child element using CSS selector syntax.
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(3);
    expect(fixture.nativeElement.querySelectorAll('.active').length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('.retired').length).toBe(1);
  });

  it('allows buttons to be clicked', () => {
    const fixture = TestBed.createComponent(HeroListComponent);
    fixture.componentInstance.heroes = createHeroes();
    fixture.detectChanges();

    // We can even fake click using nativeElement.
    fixture.nativeElement.querySelectorAll('button')[0].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(2);
  });
});
