// если post с данными пользователя то база должна пополняться на один элемент
// и это обьект с обязательным полем

const sinon = require('sinon');
const usersLengthOld = db.get('users').size().value();

describe('test bd on POST /users', function () {
  before(function () {
    const stub = sinon.stub(request, 'post');
    stub.resolves({
      firstName: 'testName',
      lastName: 'testLastName',
      phone: '111',
      email: 'testName@google.com',
      memberSince: Date.now()
    });
    request
      .post()
      .then((res) => {
        db.get('users')
          .push(res)
          .write();
      });
  });
  after(function () {
    request.post.restore();
  });
  it('it should add user to db', function () {
    const usersLengthNew = db.get('users').size().value();
    expect(usersLengthNew).to.not.be.equal(usersLengthOld);
  });
  it('new user should has required field', function () {
    const lastElement = db.get('users').last().value();
    expect(lastElement).to.have.property('firstName').equal('testName');
  });
});
