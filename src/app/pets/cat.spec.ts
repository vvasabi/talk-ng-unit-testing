import {Cat} from 'app/pets/cat';
import {Dog} from './dog';

describe('Cat', () => {
  let cat, dog;
  beforeEach(() => {
    cat = new Cat();
    cat.weight = 3.55455;

    dog = new Dog();
  });

  it('does not bark like a dog', () => {
    expect(cat.speak()).not.toBe(dog.speak());
  });

  it('hates trying to be walked', () => {
    expect(cat.likesToBeWalked).toBeFalsy();
  });

  it('weights about 3.55kg', () => {
    expect(cat.weight).toBeCloseTo(3.55, 2);
  });
});
