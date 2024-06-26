const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
const scoreCollection = db.collection('scores');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function addScore(username) {
  let newScore = await getScore(username);
  console.log(`new score: ${newScore}`);
  newScore++;
  console.log(`new after update: ${newScore}`);

  if (newScore == 1) {
    await scoreCollection.insertOne({ 
      username: username,
      score: newScore
  });
  }
  else {
    await scoreCollection.updateOne(
      {username: username},
      {$set: {score: newScore}}
    );
  }

  return newScore;
}

async function getScore(username) {
  const scoreDoc = await scoreCollection.findOne({ username: username });

  if (scoreDoc == null || isNaN(scoreDoc.score)) {
    return 0;
  }

  console.log(`scoreDocument.score: ${scoreDoc.score}`);
  return scoreDoc.score;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getScore,
};
