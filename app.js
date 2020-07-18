var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

//Connecting PG-Postgre
const { Pool } = require('pg') //Pool : Request yang Banyak Redudan, Client : Requestnya satu-satu, supaya tidak trafic

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'datadb',
  password: 'bayu121190',
  port: 5432,
})

//Intermedical Recall
var indexRouter = require('./routes/index')(pool);//Kirim (Pool) nya, Hanya pakai Router Index


var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/siswa', indexRouter);//Dimulai Router api/siswa sebagai kongfigurasinya, menyambung dengan index routernya, 
//pengetesan menggunakan postman localhost3000/api/siswa method GET lalu di send => disebut juga endpoint sudah termasuk url nya, methodnya dan paramsnya

module.exports = app;
