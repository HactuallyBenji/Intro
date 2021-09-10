const express = require('express');
const app = express();
const port = 3001;

const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'my_database',
    password: 'root',
    port: 5432
});

const getMerchants = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
};

const deleteMerchants = () => {
    pool.query('DELETE FROM merchants WHERE id > 0', (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Good');
        }
    });
};

const addMerchant = () => {
    pool.query('INSERT INTO merchants (name, age) VALUES ($1, $2)', ['Ben', 20], (err, result) => {
        if (err) {
            return console.log('Error' + err);
        }
        console.log('Added');
    });
};

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19006');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
  getMerchants()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/', (req, res) => {
    addMerchant();
    res.status(211).send('Nice');
});

app.delete('/', (req, res) => {
    deleteMerchants();
    res.status(200).send('Done');
});

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});
