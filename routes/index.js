var express = require('express');
var router = express.Router();

/* GET home page. */

//Intermedical Recall
module.exports = function (pool) {//Pindah ke atas, dibuat menjadi sebuah function, (pool) nya datang dari router module.exsport

  //Membuat Endpoint / : List
  router.get('/', function (req, res, next) {
    pool.query('select id, nama, umur, isjomblo from siswa', (err, data) => {//Bisa pool query, Copas dari app.js, jangan req,res lagi nanti ketimpa maka diganti data
      if(err) return res.json(err)//Jika err kembali ke err json
      res.json(data.rows)//jika berhasil ke data rows nya
    })//Poolnya tidak perlu di end
  });

  //Membuat Endpoint / : POST ADD Data
  router.post('/', function (req, res, next) {
    pool.query('insert into siswa(nama, umur, isjomblo) values ($1, $2, $3)',  [req.body.nama, Number(req.body.umur), JSON.parse(req.body.isjomblo)], (err, data) => {// SQLnya values Paramsnya $1 : Bunding Query [$1 sebagai apa, req.body.(?) harus pakai Array], Umur typenya integer maka harus diparsing number, type boolean diparsing dengan JSON Parse
      if(err) return res.json(err)//pengetesan di Postman localhost3000/api/siswa method POST => di body form, lalu akses lagi yang method GETnya selanjutnya di send, akan muncul data baru yang sudah di input di body form
      res.status(201).json(data.rows)//untuk create respondnya status 201
    })
  });

  //Membuat Endpoint /:id PUT EDIT
  router.put('/:id', function (req, res, next) {
    pool.query('update siswa set nama=$1, umur=$2, isjomblo=$3 where id=$4',  [req.body.nama, Number(req.body.umur), JSON.parse(req.body.isjomblo), Number(req.params.id)], (err, data) => {// WHERE id : penambahan id dari params /:id lalu diparsing dengan NUMBER
      if(err) return res.json(err)//pengetesan di Postman method PUT localhost3000/api/siswa/(nomor idnya) => Lalu ditest kembali apakah sudah masuk dalam data base, => akses lagi yang method GETnya localhost3000/api/siswa/ selanjutnya di send
      res.status(201).json(data.rows)//untuk create respondnya status 201
    })
  });

  //Membuat Endpoint /:id PUT DELETE
  router.delete('/:id', function (req, res, next) {
    pool.query('DELETE FROM siswa WHERE id=$1', [Number(req.params.id)], (err, data) => {//hanya dibutuhkan params id saja
      if(err) return res.json(err)//pengetesan di Postman method DELETE localhost3000/api/siswa/(nomor idnya) => Lalu ditest kembali apakah sudah terhapus dalam data base, => akses lagi yang method GETnya localhost3000/api/siswa/ selanjutnya di send
      res.status(201).json(data.rows)//untuk create respondnya status 201
    })
  });

//POTSMAN => Pengganti HTML

  return router;// dibalikan menjadi router dan di break
}