# Angular Unit Testing Talk

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.

This project uses sources from [Angular Tour of Heroes](https://github.com/johnpapa/angular-tour-of-heroes).

## Slides

https://docs.google.com/presentation/d/1lxtHjCALMlJ4mS7E-ehaD9oLL4XO3r6eBoeJTLC-L-Y

## Install dependencies

```bash
yarn
```

## Running Tests

- Default mode (With a browser): `yarn test`
- In headless Chrome: `yarn test-headless`

## Install Jest

1. Run:
```bash
yarn add --dev jest-cli jest-preset-angular
```
2. Add the following lines to the bottom of `package.json` (_i.e._ before the last `}`):
```json
"jest": {
  "preset": "jest-preset-angular",
  "setupTestFrameworkScriptFile": "<rootDir>/src/setupJest.ts"
}
```
3. Copy `src/setupJest.ts` to your project.
4. In `src/tsconfig.app.json`, add `"setupJest.ts"` to the `"exclude"` array.
5. Optionally, add `"jest": "jest"` to `"scripts"` section in `package.json`.

Note that it is a [known issue](https://github.com/thymikee/jest-preset-angular/issues/65) that fakeAsync tests
currently fail with Jest. For more info on using Jest with Angular, see:
[thymikee/jest-preset-angular](https://github.com/thymikee/jest-preset-angular).
