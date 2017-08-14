export abstract class Pet {

  weight: number;
  age: number;
  height: number;

  abstract get likesToBeWalked(): boolean;
  abstract speak(): string;

}
