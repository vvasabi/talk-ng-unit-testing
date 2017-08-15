import {async, fakeAsync, tick} from '@angular/core/testing';

export class AsyncService {
  counter = 0;

  doAsyncWork() {
    return new Promise<void>(resolve => setTimeout(() => {
      this.counter++;
      resolve();
    }));
  }
}

describe('Jasmine async support', () => {
  // The done function allows us to manually tell Jasmine that our test is done.
  it('provides the done callback', done => {
    const service = new AsyncService();
    service.doAsyncWork().then(() => {
      expect(service.counter).toBe(1);
      done();
    });
  });
});

describe('Angular async test support', () => {
  // The async function automatically checks to see if all async executions end and
  // calls the done function for us.
  it('provides the async function', async(() => {
    const service = new AsyncService();
    service.doAsyncWork().then(() => {
      expect(service.counter).toBe(1);
    });
  }));

  // The fakeAsync function tells Angular that we will be calling tick to simulate the passage of time.
  // The tick function makes Angular run all async tasks synchronously in the test.
  it('provides fakeAsync and tick functions', fakeAsync(() => {
    const service = new AsyncService();
    service.doAsyncWork();
    tick();
    expect(service.counter).toBe(1);
  }));
});
