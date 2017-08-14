import {Cat} from './cat';
import {Dog} from './dog';

describe('Pets', () => {
  beforeAll(() => {
    // run before all tests
  });

  beforeEach(() => {
    // run before each test
  });

  afterAll(() => {
    // run after all tests are done
  });

  afterEach(() => {
    // run after each test
  });

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
