import {Pet} from './pet';

export class Cat extends Pet {

  get likesToBeWalked(): boolean {
    return false;
  }

  speak(): string {
    return 'meow';
  }

}
