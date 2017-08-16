import {Component, Input} from '@angular/core';
import {TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import {Hero} from 'app/hero';

describe('Detect changes', () => {
  @Component({
    selector: 'my-hero-status',
    template: `<span *ngIf="hero">{{hero.active ? 'active' : 'retired'}}</span>`
  })
  class HeroStatusComponent {
    @Input() hero: Hero;

    retireHeroIn100Ms() {
      setTimeout(() => {
        this.hero.active = false
      }, 100);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroStatusComponent
      ]
    }).compileComponents();
  }));

  it('allows changes to be detected', () => {
    const hero = new Hero();
    hero.active = true;
    const fixture = TestBed.createComponent(HeroStatusComponent),
      component = fixture.componentInstance,
      htmlElement = fixture.nativeElement;
    component.hero = hero;
    expect(htmlElement.textContent).toBe('');
    fixture.detectChanges(); // detectChanges will cause the component to render changes
    expect(htmlElement.textContent).toBe('active');

    hero.active = false;
    fixture.detectChanges();
    expect(htmlElement.textContent).toBe('retired');
  });

  it('can work in conjunction with async and fakeAsync zones', fakeAsync(() => {
    const hero = new Hero();
    hero.active = true;
    const fixture = TestBed.createComponent(HeroStatusComponent),
      component = fixture.componentInstance,
      htmlElement = fixture.nativeElement;
    component.hero = hero;
    fixture.detectChanges();
    component.retireHeroIn100Ms();
    tick(101);
    expect(htmlElement.textContent).toBe('active');
    fixture.detectChanges();
    expect(htmlElement.textContent).toBe('retired');
  }));
});
