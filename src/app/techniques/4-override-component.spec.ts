import {Component, Input, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {async, TestBed} from '@angular/core/testing';

import {Hero} from 'app/hero';

@Component({
  selector: 'my-hero-name',
  template: '{{hero.name}}'
})
export class HeroNameComponent {
  @Input() hero: Hero;
}

@Component({
  selector: 'my-hero-list',
  template: '<ul><li *ngFor="let hero of heroes"><my-hero-name [hero]="hero"></my-hero-name></li></ul>'
})
export class HeroListComponent {
  @Input() heroes: Hero[] = [];
}

@NgModule({
  imports: [
    CommonModule // required to use *ngFor
  ],
  declarations: [
    HeroNameComponent,
    HeroListComponent
  ]
})
export class HeroListModule {}

describe('Override component metadata', () => {
  beforeEach(() => {
    // We configure TestBed with HeroListModule
    TestBed.configureTestingModule({
      imports: [
        HeroListModule
      ]
    });
  });

  it('can override component metadata', async(() => {
    // We can use TestBed.overrideComponent() to override any metadata set in the @Component decorator.
    // That is, we can override things like template, selector, styles, etc.
    // TestBed has similar methods for overriding directives and pipes.
    TestBed.overrideComponent(HeroListComponent, {
      set: {
        host: {
          class: 'hero-list'
        },
        template: 'fake list'
      }
    }).compileComponents().then(() => {
      const fixture = TestBed.createComponent(HeroListComponent);
      expect(fixture.nativeElement.textContent).toBe('fake list');
      expect(fixture.nativeElement.className).toBe('hero-list');
    });
  }));

  it('can override template', async(() => {
    // To change just the template, there is a convenient TestBed.overrideTemplate()
    TestBed.overrideTemplate(HeroListComponent, 'new template');
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(HeroListComponent);
      expect(fixture.nativeElement.textContent).toBe('new template');
    });
  }));

  it('cannot override after TestBed.compileComponents() has been called', async(() => {
    // Note that any overrides need to be called before TestBed.compileComponents() is called,
    // or the overrides will be ignored.
    TestBed.compileComponents().then(() => {
      TestBed.overrideTemplate(HeroListComponent, 'new template');
      const fixture = TestBed.createComponent(HeroListComponent);
      expect(fixture.nativeElement.textContent).not.toBe('new template');
    });
  }));
});
