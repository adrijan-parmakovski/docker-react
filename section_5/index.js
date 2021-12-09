const express = require('express');
const redis = require('redis');
const process = require('process')

const app = express();
const client = redis.createClient({
  host: 'redis-server', // connecting to the redis-server container
  port: 6379 // default port
});
client.set('visits', 0);

app.get('/', (req, res) => {
  process.exit(1);
  client.get('visits', (err, visits) => {
    res.send('Number of visits ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});
