import {async, inject, TestBed} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, HttpModule, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

// Although Angular allows us to mock HTTP response, it is better to use service mocks.
// This example is here in the event you really need to mock a backend response.
// Also note that this only works if the code that makes HTTP call does so through Angular's
// Http service.
describe('Mock Http Response', () => {
  beforeEach(async(() => {
    // In your test, where HTTP call to the backend is required, make sure HttpModule is imported.
    // Then, provide MockBackend as our ConnectionBackend.
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        {provide: ConnectionBackend, useClass: MockBackend}
      ]
    });

    // We override the Http service provided by Angular and make it use our MockBackend.
    TestBed.overrideProvider(Http, {
      useFactory: backend => new Http(backend, new BaseRequestOptions()),
      deps: [ConnectionBackend]
    });
    TestBed.compileComponents();
  }));

  it('can mock an Http response', async(inject([Http, ConnectionBackend],
    async (http: Http, backend: MockBackend) => {
      let requestBody;

      // To produce a mock response, we subscribe to connections.
      backend.connections.subscribe((conn: MockConnection) => {
        // The request body is a JSON string, so it needs to be parsed first.
        requestBody = JSON.parse(conn.request.getBody());

        // We use mockResponse() method to send a response.
        // The API is a little overly complex.
        // Make sure the Response here is imported from @angular/http or it won't work.
        conn.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify({message: 'request received'})
        })))
      });

      // We use async await here to simplify the code when working with promises.
      const response = await http.post('/test/api', {message: 'this is the request'})
        .map(response => response.json())
        .toPromise();
      expect(requestBody.message).toBe('this is the request');
      expect(response.message).toBe('request received');
    })));
});
