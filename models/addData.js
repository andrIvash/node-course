const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
const db = low(adapter);

module.exports = function addData (user) {
  return new Promise ((resolve, reject) => {
    if (!user.firstName) reject(new Error('Missing required parameter - firstName'));
    db.get('users')
      .push(user)
      .write();
    resolve(db.get('users').value().length); 
  });
};
