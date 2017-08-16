import {async, inject, TestBed} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, HttpModule, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

describe('Mock Http Response', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        {provide: ConnectionBackend, useClass: MockBackend}
      ]
    }).overrideProvider(Http, {
      useFactory: backend => new Http(backend, new BaseRequestOptions()),
      deps: [ConnectionBackend]
    });
    TestBed.compileComponents();
  }));

  it('can mock an Http response', async(inject([Http, ConnectionBackend],
    (http: Http, backend: MockBackend) => {
      let requestBody;
      backend.connections.subscribe((conn: MockConnection) => {
        requestBody = JSON.parse(conn.request.getBody());
        conn.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify({message: 'request received'})
        })))
      });
      http.post('/test/api', {message: 'this is the request'})
        .map(response => response.json())
        .toPromise()
        .then(response => {
          expect(requestBody.message).toBe('this is the request');
          expect(response.message).toBe('request received');
        });
    })));
});
