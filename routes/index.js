var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'kevin_db'
})
connection.connect();
connection.query(
  `
  CREATE TABLE IF NOT EXISTS Appdata (
    id int NOT NULL auto_increment,
      name varchar(50),
      version varchar(50),
      date varchar(50),
      email varchar(50),
      severity varchar(50),
      type varchar(50),
      description varchar(255),
      PRIMARY KEY (id)
  );
  `
);

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.send({message: "wassup"});
});

router.post('/insert', (req, res, next) => {
  let body = req.body;
  try {
    // body.name, body.version, body.date, body.email, body.severity, body.type, body.description
    connection.query(`
    INSERT INTO Appdata(name, version, date, email, severity, type, description) 
    VALUES('${body.name}', '${body.version}', '${body.date}', '${body.email}', '${body.severity}', '${body.type}', '${body.description}')
    `, (err, result) => {
      if(err) return res.json(err);;
      return res.json(result);
    });
  } catch (e) {
    return res.json(e);
  }
})

router.get('/list', (req, res, next) => {
  try {
    connection.query(`
    SELECT * FROM Appdata`, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
    });
  } catch (e) {
    return res.json(e);
  }
})

router.get('/get/:id', (req, res, next) => {
  try {
    connection.query(`
      SELECT * FROM Appdata WHERE id = ${req.params.id}
    `, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
    })
  } catch (e) {
    return res.json(e);
  }
})

router.delete('/delete/:id', (req, res, next) => {
  try {
    connection.query(`
      DELETE FROM Appdata 
      WHERE id = ${req.params.id}
    `, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
    })
  } catch (e) { 
    return res.json(e);
  }
})

router.patch('/update/:id', (req, res, next) => {
  let body = req.body;
  try {
    // body.name, body.version, body.date, body.email, body.severity, body.type, body.description
    connection.query(`
      UPDATE Appdata
      SET name='${body.name}', version='${body.version}', date='${body.date}', 
      email='${body.email}', severity='${body.severity}', type='${body.type}', description='${body.description}'
      WHERE id='${req.params.id}'
      `, (err, result) => {
        if (err) return res.json(err);;
        return res.json(result);
      });
  } catch (e) {
    return res.json(e);
  }
})

module.exports = router;
