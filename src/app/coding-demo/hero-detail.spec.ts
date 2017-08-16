import {async, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {HeroDetailComponent} from 'app/hero-detail.component';
import {MockHeroService} from 'testing-support/mock-hero.service';
import {HeroService} from 'app/hero.service';
import {AppModule} from 'app/app.module';

describe('Hero detail', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    TestBed.overrideProvider(HeroService, {useValue: new MockHeroService()});
    TestBed.overrideProvider(ActivatedRoute, {useValue: {params: Observable.of([])}});
    TestBed.compileComponents();
  }));

  it('can save a new hero', async(async () => {
    const fixture = TestBed.createComponent(HeroDetailComponent);
    fixture.detectChanges();

    const hero = fixture.componentInstance.hero;
    hero.name = 'Demo Hero';
    hero.email = 'demo@infusion.com';
    fixture.nativeElement.querySelector('[name=saveButton]').click();
    fixture.detectChanges();

    const heroService = <HeroService>TestBed.get(HeroService),
      allHeroes = await heroService.getHeroes(),
      lastHero = allHeroes.pop();
    expect(lastHero.name).toBe('Demo Hero');
    expect(lastHero.email).toBe('demo@infusion.com');
  }));
});
