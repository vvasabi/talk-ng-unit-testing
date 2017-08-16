import {Hero} from 'app/hero';

export const createHeroes = () => {
  const hero1 = new Hero();
  hero1.id = 1;
  hero1.name = 'Super Test';
  hero1.active = true;

  const hero2 = new Hero();
  hero2.id = 2;
  hero2.name = 'fanTESTic';
  hero2.active = true;

  const hero3 = new Hero();
  hero3.id = 3;
  hero3.name = 'Testy McTestface';
  hero3.active = false;
  return [hero1, hero2, hero3];
};
