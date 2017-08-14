import {async, TestBed, TestModuleMetadata} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {AppModule} from 'app/app.module';
import {HeroGravatarComponent} from 'app/hero-gravatar.component';

// In the real world, components have dependencies. It is usually better to import the module where the component to
// be tested belongs to, since its module likely declares or imports the dependencies.
// Reuse this test module by exporting it from a file and import in many spec files.
const SHARED_TEST_MODULE: TestModuleMetadata = {
  imports: [
    AppModule
  ],
  providers: [
    // Required by Angular's RouterModule
    // See: https://github.com/angular/angular/issues/12295
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
};

describe('Configure testing module (for real)', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule(SHARED_TEST_MODULE).compileComponents();
  }));

  it('can create HeroGravatarComponent', () => {
    expect(TestBed.createComponent(HeroGravatarComponent)).toBeTruthy();
  });
});
