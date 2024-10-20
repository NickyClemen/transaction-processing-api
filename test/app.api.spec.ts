import { server } from './jest.setup';

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return server.get('/').expect(200).expect('Hello World!');
  });
});
