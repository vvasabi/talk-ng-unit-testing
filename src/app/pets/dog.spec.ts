import {Dog} from './dog';

describe('Dog', () => {   // Test Suite
  it('barks', () => {         // Test
    const dog = new Dog();
    expect(dog.speak()).toBe('woof');   // Expectation
  });

  it('likes to be walked', () => {
    const dog = new Dog();
    expect(dog.likesToBeWalked).toBeTruthy();
  });
});
