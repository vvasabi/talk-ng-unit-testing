import {Cat} from './cat';
import {Dog} from './dog';

describe('Pets', () => {
  describe('Cat', () => {
    it('meows', () => {
      expect(new Cat().speak()).toBe('meow');
    });
  });

  describe('Dog', () => {
    it('barks', () => {
      expect(new Dog().speak()).toBe('woof');
    });
  });
});
