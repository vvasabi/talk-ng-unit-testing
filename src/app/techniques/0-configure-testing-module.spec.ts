import {async, TestBed, TestModuleMetadata} from '@angular/core/testing';
import {HeroGravatarComponent} from 'app/hero-gravatar.component';
import {AppModule} from 'app/app.module';
import {APP_BASE_HREF} from '@angular/common';

// We can set up a testing module like how we create a regular Angular module.
// The module metadata has a similar syntax as what goes inside the @NgModule decorator.
describe('Configure testing module', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroGravatarComponent
      ]
    }).compileComponents();
  }));

  it('can create HeroGravatarComponent', () => {
    expect(TestBed.createComponent(HeroGravatarComponent)).toBeTruthy();
  });
});

// In the real world, components have dependencies. Test modules usually import other modules,
// where the components to be tested are declared. Their parent modules know how to provide their dependencies.
// Reuse this test module by exporting it from a file and import in many spec files.
export const SHARED_TEST_MODULE: TestModuleMetadata = {
  imports: [
    AppModule
  ],
  providers: [
    // Required by Angular's RouterModule
    // See: https://github.com/angular/angular/issues/12295
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
};

describe('Configure testing module by importing AppModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule(SHARED_TEST_MODULE).compileComponents();
  }));

  it('can create HeroGravatarComponent', () => {
    expect(TestBed.createComponent(HeroGravatarComponent)).toBeTruthy();
  });
});
