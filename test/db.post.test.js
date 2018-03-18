// если post с данными пользователя то база должна пополняться на один элемент
// и это обьект с обязательным полем

const sinon = require('sinon');
const addData = require('../models/addData');
const user = {
  firstName: 'testName',
  lastName: 'testLastName',
  phone: '111',
  email: 'testName@google.com',
  memberSince: Date.now()
};

describe('test bd on POST /users', function () {
  before(function () {
    const stub = sinon.stub(request, 'post');
    stub.resolves(user);
  });
  after(function () {
    request.post.restore();
  });
  it('it should add user to db', function (done) {
    request
      .post()
      .then((res) => {
        const lengthOld = db.get('users').size().value();
        addData(res).then((lengthNew) => {
          expect(lengthOld).to.not.be.equal(lengthNew);
          return db.get('users').last().value();
        }).then((lastElement) => {
          expect(lastElement).to.have.property('firstName').equal('testName');
          done();
        }).catch(err => {
          done(err);
        });
      });
  });
});
