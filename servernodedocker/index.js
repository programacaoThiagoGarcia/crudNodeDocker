const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: '172.17.0.2',
    user: 'root',
    password: 'thiagodb',
    database: 'thiagodb'
});

connection.connect()

app.get('/', function (req, res) {
    res.send("Hello");
});

app.get('/users', function (req, res) {
    connection.query('SELECT * FROM users', function (error, result) {
        if (error) {
            res.send("ERRO")
        }
        res.send(result.map(
            user => ({
                id:user.id,
                name: user.name,
                age: user.age
            })
        ));
    });
});

app.post('/user', function (req, res) {
    var user = new User(req.body.name, req.body.age)


    connection.query('INSERT INTO users SET ?', { id: 0, name: user.name, age: user.age }, function (error, result, fields) {
        if (error) {
            res.send(error)
        }
        res.send(fields);
        // console.log(fields)
    });

});

app.delete('/user',function(req,res){
    let id = req.body.id
    connection.query('DELETE FROM users WHERE id ='+id, function (error, result, fields){
        if (error) {
            res.send(error)
        }
        res.send(result);
        console.log(fields)
    });
});

app.listen('8080', function () {
    console.log('Server OK');
});


class User {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

