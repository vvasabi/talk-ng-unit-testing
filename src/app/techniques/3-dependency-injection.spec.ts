import {async, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {AsyncService} from './2-async.spec';

describe('Dependency injection in tests', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AsyncService
      ]
    }).compileComponents();
  }));

  it('can inject AsyncService using inject function',
    inject([AsyncService], (asyncService: AsyncService) => {
      expect(asyncService).toBeTruthy();
    }));

  it('can also get AsyncService using TestBed.get', () => {
    const asyncService = <AsyncService>TestBed.get(AsyncService);
    expect(asyncService).toBeTruthy();
  });

  it('can chain async with inject',
    async(inject([AsyncService], (asyncService: AsyncService) => {
      asyncService.doAsyncWork().then(() => {
        expect(asyncService.counter).toBe(1);
      });
    })));

  it('can chain fakeAsync with inject',
    fakeAsync(inject([AsyncService], (asyncService: AsyncService) => {
      asyncService.doAsyncWork();
      tick();
      expect(asyncService.counter).toBe(1);
    })));
});
