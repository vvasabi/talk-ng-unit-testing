import {Pet} from './pet';

export class Dog extends Pet {

  get likesToBeWalked(): boolean {
    return true;
  }

  speak(): string {
    return 'woof';
  }

}
