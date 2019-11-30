var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yA631779',
  database: 'omega-database'
})
connection.connect();
connection.query(
  `
  CREATE TABLE IF NOT EXISTS Appdata (
    id int NOT NULL auto_increment,
      name varchar(50),
      version varchar(50),
      priority varchar(50),
      date varchar(50),
      email varchar(50),
      type varchar(50),
      description varchar(255),
      PRIMARY KEY (id)
  );
  `
);

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.send({message: "Database Connected"});
});

router.post('/insert', (req, res, next) => {
  let body = req.body;
  try {
    // body.name, body.version, body.date, body.email, body.priority, body.type, body.description
    connection.query(`
    INSERT INTO Appdata(name, version, priority, email, date, type, description) 
    VALUES('${body.name}', '${body.version}', '${body.priority}', '${body.email}', '${body.date}', '${body.type}', '${body.description}')
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
    // body.name, body.version, body.priority, body.email, body.date, body.type, body.description
    connection.query(`
      UPDATE Appdata
      SET name='${body.name}', version='${body.version}', priority='${body.priority}', 
      email='${body.email}', date='${body.date}', type='${body.type}', description='${body.description}'
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
