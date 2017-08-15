import {async, fakeAsync, tick} from '@angular/core/testing';

class AsyncWorker {
  counter = 0;

  doAsyncWork() {
    return new Promise<void>(resolve => setTimeout(() => {
      this.counter++;
      resolve();
    }));
  }
}

describe('Jasmine async support', () => {
  // The done function allows you to manually tell Jasmine that your test is done.
  it('provides the done callback', done => {
    const worker = new AsyncWorker();
    worker.doAsyncWork().then(() => {
      expect(worker.counter).toBe(1);
      done();
    });
  });
});

describe('Angular async test support', () => {
  // The async function automatically checks to see if all async executions end and
  // calls the done function for you.
  it('provides the async function', async(() => {
    const worker = new AsyncWorker();
    worker.doAsyncWork().then(() => {
      expect(worker.counter).toBe(1);
    });
  }));

  // The fakeAsync function tells Angular that we will be calling tick to simulate the passage of time.
  // The tick function makes Angular run all async tasks synchronously in the test.
  it('provides fakeAsync and tick functions', fakeAsync(() => {
    const worker = new AsyncWorker();
    worker.doAsyncWork();
    tick();
    expect(worker.counter).toBe(1);
  }));
});
