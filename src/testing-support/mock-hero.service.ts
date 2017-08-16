import {HeroService} from 'app/hero.service';
import {Hero} from 'app/hero';
import {createHeroes} from './testing-utils';

export class MockHeroService extends HeroService {
  private heroes: {[key: string]: Hero} = {};

  constructor() {
    super(null);
    createHeroes().forEach(hero => this.heroes[String(hero.id)] = hero);
  }

  async getHeroes(): Promise<Hero[]> {
    return Object.values(this.heroes);
  }

  async getHero(id: number): Promise<Hero> {
    return this.heroes[String(id)];
  }

  async save(hero: Hero): Promise<Hero> {
    if (!hero.id) {
      hero.id = this.createHeroId();
    }
    return this.heroes[String(hero.id)] = hero;
  }

  private createHeroId() {
    let max = 0;
    Object.keys(this.heroes).forEach(id => max = Number(id) > max ? Number(id) : max);
    return max + 1;
  }

}
