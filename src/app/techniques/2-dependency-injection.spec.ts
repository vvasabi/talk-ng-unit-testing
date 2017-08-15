import {async, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {AsyncService} from './1-async.spec';

describe('Dependency injection in tests', () => {
  beforeEach(async(() => {
    // We initialize the TestBed with the AsyncService created back in 2.async.spec.ts.
    // In the real world, a service usually has some dependencies, so using Angular's dependency injection
    // support to create services will save us time.
    TestBed.configureTestingModule({
      providers: [
        AsyncService
      ]
    }).compileComponents();
  }));

  // The inject function takes an array of class names and will inject their instances into the test function.
  it('can inject AsyncService using inject function',
    inject([AsyncService], (asyncService: AsyncService) => {
      expect(asyncService).toBeTruthy();
    }));

  // We can also call TestBed.get() directly to get whatever we want. The 2 methods are only different in the
  // syntax. There are no benefits or trade-offs.
  it('can also get AsyncService using TestBed.get()', () => {
    const asyncService = <AsyncService>TestBed.get(AsyncService);
    expect(asyncService).toBeTruthy();
  });

  // We can call async alongside inject.
  // Note that async needs to be called before inject. The order matters.
  it('can chain async with inject',
    async(inject([AsyncService], (asyncService: AsyncService) => {
      asyncService.doAsyncWork().then(() => {
        expect(asyncService.counter).toBe(1);
      });
    })));

  // Likewise, we can call fakeAsync alongside inject.
  it('can chain fakeAsync with inject',
    fakeAsync(inject([AsyncService], (asyncService: AsyncService) => {
      asyncService.doAsyncWork();
      tick();
      expect(asyncService.counter).toBe(1);
    })));
});
