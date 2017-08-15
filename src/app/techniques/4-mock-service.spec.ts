import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AppModule} from 'app/app.module';
import {SHARED_TEST_MODULE} from './1-configure-testing-module-for-real.spec';
import {HeroService} from 'app/hero.service';
import {Hero} from 'app/hero';
import {inject} from '@angular/core/testing';

// We define a "mock" service that returns hard coded values.
// This technique prevents our test from making a real web request.
// Note that we don't have to override every method, but only the ones that matter.
class MockHeroService extends HeroService {

  async getHeroes(): Promise<Hero[]> {
    const testHero = new Hero();
    testHero.id = 1;
    testHero.name = 'Testo';
    return [testHero];
  }

}

describe('Mock service', () => {
  beforeEach(async(() => {
    // We reuse the SHARED_TEST_MODULE created back in 1-configure-testing-module-for-real.spec.ts
    // that we said we were going to reuse.
    TestBed.configureTestingModule(SHARED_TEST_MODULE);

    // We call TestBed.overrideModule to make sure our MockHeroService is used instead
    TestBed.overrideModule(AppModule, {
      remove: {
        providers: [
          HeroService
        ]
      },
      add: {
        providers: [
          {
            provide: HeroService,
            useClass: MockHeroService
          }
        ]
      }
    });

    TestBed.compileComponents();
  }));

  it('can return a hard coded list of heroes',
    fakeAsync(inject([HeroService], (heroService: HeroService) => {
      let heroes = null;
      heroService.getHeroes().then(result => heroes = result);
      tick();
      expect(heroes[0].name).toBe('Testo');
    })));
});
