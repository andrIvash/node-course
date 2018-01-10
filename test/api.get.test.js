

  // const chai = require('chai');
  // const expect = chai.expect;
  // const chaiHttp = require('chai-http');
  // const server = require('../server');
  //
  // chai.use(chaiHttp);


  // describe('initial test', function () {
  //   it('should true to be true', function () {
  //     expect(true).to.be.true;
  //   });
  //   it.skip('postpone your assertion', () => {
  //   });
  //   it.skip('postpone your assertion')
  // });
const sinon = require('sinon');
//const stub = sinon.stub(request, 'get');
//stub.resolves({status: 200, body: [1, 2]});

// bc.getAll.then(function(data){
//     expect(data.response).to.equal("ok");
//     done();
// },function(err){
//     done("should NEVER get here");
// });


// Test the /GET route
beforeEach(() => {
  this.get = sinon.stub(request, 'get');
  this.get.resolves({status: 200, body: [1, 2]});
});

afterEach(() => {
  request.get.restore();
});
describe('/GET users', () => {
  // it('it should GET all the users', (done) => {
  //   chai.request(server)
  //     .get('/api/v1.0/users')
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.be.a('array');
  //       expect(res.body.length).to.not.be.equal(0);
  //       done();
  //     });
  // });
  it('it should GET all the users', () => {
    request
      .get('/api/v1.0/users')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.not.be.equal(0);
        //done();
      });
  });
  it('it should return a right error for the wrong GET request', (done) => {
    request
      .get('/api/v1.0/user')
      .end((err, res) => {
        if (err || !res.ok) {
          expect(err).to.have.status(404);
          done();
        } else {
          done(new Error('the route is not wrong'));
        }
      });
  });
});

describe('GET /users/:id', () => {
  it('it should return the user by id', (done) => {
    const user = db.get('users').first().value();
    const userId = db.get('users').value().indexOf(user);
    request
      .get('/api/v1.0/users/' + userId)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(user);
        done();
      });
  });

  it('it should return status 404 when user id is not found', (done) => {
    const userId = 'fake id';
    request
      .get('/api/v1.0/users/' + userId)
      .end((err, res) => {
        if (err || !res.ok) {
          expect(err).to.have.status(404);
          done();
        } else {
          done(new Error('the id is found'));
        }
      });
  });
});
