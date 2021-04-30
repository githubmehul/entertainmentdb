var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password :'',
  database :'entertainment'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.get('/testconnect',function(req,res,next){ 
  if(db!=null){
    res.send("Connected!");
  } else{
    res.send("Failed!");
  }
})
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});

/////////////////////////////////////////// LANGUAGE TABLE////////////////////////////////////////////
router.get('/selectlanguage' , function(req,res,next){
  db.query('SELECT * FROM language',function(err,rs){
    res.render('selectlanguage' ,{language :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});

router.get('/addlanguage' , function(req,res,next){
  res.render('addlanguage');
});

router.post('/addlanguage' , function(req,res,next){
  db.query('INSERT INTO language SET ?', req.body , function(err,rs){
    res.redirect('selectlanguage');
  });
});

router.get('/deletelang' , function(req,res,next){
    db.query('DELETE FROM language WHERE language_id = ?' , req.query.language_id,function(err,rs){
      res.redirect('/selectlanguage')
    });
});

router.get('/editlang',(req, res) => {
  db.query('SELECT * FROM language WHERE language_id = ?' , req.query.language_id,function(err,rs){
    res.render('editlanguage' , {language :rs});
  });
});
router.post('/editlang' , function(req,res,next){
  var param=[
    req.body,
    req.query.language_id
  ]
  db.query('UPDATE language SET ? WHERE language_id = ?', param,function(err,rs){
    res.redirect('selectlanguage')
  });
});

//////////////////////////////////////COUNTRY TABLE///////////////////////////////////////////
router.get('/selectcountry' , function(req,res,next){
  db.query('SELECT * FROM country',function(err,rs){
    res.render('selectcountry' ,{country :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addcountry' , function(req,res,next){
  res.render('addcountry');
});
router.post('/addcountry' , function(req,res,next){
  db.query('INSERT INTO country SET ?', req.body , function(err,rs){
    res.redirect('selectcountry');
  });
});
router.get('/deletecount' , function(req,res,next){
  db.query('DELETE FROM country WHERE country_id = ?' , req.query.country_id,function(err,rs){
    res.redirect('/selectcountry')
  });
});
router.get('/editcount',(req, res) => {
  db.query('SELECT * FROM country WHERE country_id = ?' , req.query.country_id,function(err,rs){
    res.render('editcountry' , {country :rs});
  });
});
router.post('/editcount' , function(req,res,next){
  var param=[
    req.body,
    req.query.country_id
  ]
  db.query('UPDATE country SET ? WHERE country_id = ?', param,function(err,rs){
    res.redirect('selectcountry')
  });
});
////////////////////////////////////////CITY TABLE////////////////////////////////////////////////
router.get('/selectcity' , function(req,res,next){
  db.query('SELECT * FROM city',function(err,rs){
    res.render('selectcity' ,{city :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addcity' , function(req,res,next){
  res.render('addcity');
});
router.post('/addcity' , function(req,res,next){
  var name = req.body.city
  var countryid = req.body.country_id
  var lastupdate = req.body.last_update
  let data = {city:name , country_id:countryid,last_update:lastupdate};
  let sql = "INSERT INTO city SET ?";
  let query = db.query(sql, data,(err, results) => {
    res.redirect('selectcity');
  });
});
router.get('/deletecityt' , function(req,res,next){
  db.query('DELETE FROM city WHERE city_id = ?' , req.query.city_id,function(err,rs){
    res.redirect('/selectcity')
  });
});
router.get('/editcityt',(req, res) => {
  db.query('SELECT * FROM city WHERE city_id = ?' , req.query.city_id,function(err,rs){
    res.render('editcity' , {city :rs});
  });
});
router.post('/editcityt' , function(req,res,next){
  var param=[
    req.body,
    req.query.city_id
  ]
  db.query('UPDATE city SET ? WHERE city_id = ?', param,function(err,rs){
    res.redirect('selectcity')
  });
});
////////////////////////////////////////ADDRESS TABLE////////////////////////////////////////////////
router.get('/selectaddress' , function(req,res,next){
  db.query('SELECT * FROM address',function(err,rs){
    res.render('selectaddress' ,{address :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addaddress' , function(req,res,next){
  res.render('addaddress');
});
router.post('/addaddress' , function(req,res,next){
  var address1 = req.body.address1
  var address2 = req.body.address2
  var district = req.body.district
  var cityid = req.body.city_id
  var postalcode = req.body.postal_code
  var phone = req.body.phone
  var lastupdate = req.body.last_update
  let data = {address1:address1 ,address2:address2, district:district, city_id:cityid, 
    postal_code:postalcode,phone:phone,last_update:lastupdate};
  let sql = "INSERT INTO address SET ?";
  let query = db.query(sql, data,(err, results) => {
    res.redirect('selectaddress');
  });
});
router.get('/deleteaddr' , function(req,res,next){
  db.query('DELETE FROM address WHERE address_id = ?' , req.query.address_id,function(err,rs){
    res.redirect('/selectaddress')
  });
});
router.get('/editaddr',(req, res) => {
  db.query('SELECT * FROM address WHERE address_id = ?' , req.query.address_id,function(err,rs){
    res.render('editaddress' , {address :rs});
  });
});
router.post('/editaddr' , function(req,res,next){
  var param=[
    req.body,
    req.query.address_id
  ]
  db.query('UPDATE address SET ? WHERE address_id = ?', param,function(err,rs){
    res.redirect('selectaddress')
  });
});
////////////////////////////////////////STAFF TABLE////////////////////////////////////////////////
router.get('/selectstaff' , function(req,res,next){
  db.query('SELECT * FROM staff',function(err,rs){
    res.render('selectstaff' ,{staff :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addstaff' , function(req,res,next){
  res.render('addstaff');
});
router.post('/addstaff' , function(req,res,next){
  db.query('INSERT INTO staff SET ?', req.body , function(err,rs){
    res.redirect('selectstaff');
  });
});
router.get('/deletestaf' , function(req,res,next){
  db.query('DELETE FROM staff WHERE staff_id = ?' , req.query.staff_id,function(err,rs){
    res.redirect('/selectstaff')
  });
});
router.get('/editstaf',(req, res) => {
  db.query('SELECT * FROM staff WHERE staff_id = ?' , req.query.staff_id,function(err,rs){
    res.render('editstaff' , {staff :rs});
  });
});
router.post('/editstaf' , function(req,res,next){
  var param=[
    req.body,
    req.query.staff_id
  ]
  db.query('UPDATE staff SET ? WHERE staff_id = ?', param,function(err,rs){
    res.redirect('selectstaff')
  });
});
////////////////////////////////////////STORES TABLE////////////////////////////////////////////////
router.get('/selectstore' , function(req,res,next){
  db.query('SELECT * FROM store',function(err,rs){
    res.render('selectstore' ,{store :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addstore' , function(req,res,next){
  res.render('addstore');
});
router.post('/addstore' , function(req,res,next){
  db.query('INSERT INTO store SET ?', req.body , function(err,rs){
    res.redirect('selectstore');
  });
});
router.get('/deletestor' , function(req,res,next){
  db.query('DELETE FROM store WHERE store_id = ?' , req.query.store_id,function(err,rs){
    res.redirect('/selectstore')
  });
});
router.get('/editstor',(req, res) => {
  db.query('SELECT * FROM store WHERE store_id = ?' , req.query.store_id,function(err,rs){
    res.render('editstore' , {store :rs});
  });
});
router.post('/editstor' , function(req,res,next){
  var param=[
    req.body,
    req.query.store_id
  ]
  db.query('UPDATE store SET ? WHERE store_id = ?', param,function(err,rs){
    res.redirect('selectstore')
  });
});

////////////////////////////////////////CATEGORY TABLE////////////////////////////////////////////////
router.get('/selectcategory' , function(req,res,next){
  db.query('SELECT * FROM category',function(err,rs){
    res.render('selectcategory' ,{category :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addcategory' , function(req,res,next){
  res.render('addcategory');
});
router.post('/addcategory' , function(req,res,next){
  db.query('INSERT INTO category SET ?', req.body , function(err,rs){
    res.redirect('selectcategory');
  });
});
router.get('/deletecat' , function(req,res,next){
  db.query('DELETE FROM category WHERE category_id = ?' , req.query.category_id,function(err,rs){
    res.redirect('/selectcategory')
  });
});
router.get('/editcat',(req, res) => {
  db.query('SELECT * FROM category WHERE category_id = ?' , req.query.category_id,function(err,rs){
    res.render('editcategory' , {category :rs});
  });
});
router.post('/editcat' , function(req,res,next){
  var param=[
    req.body,
    req.query.category_id
  ]
  db.query('UPDATE category SET ? WHERE category_id = ?', param,function(err,rs){
    res.redirect('selectcategory')
  });
});

////////////////////////////////////////ACTOR TABLE////////////////////////////////////////////////
router.get('/selectactor' , function(req,res,next){
  db.query('SELECT * FROM actor',function(err,rs){
    res.render('selectactor' ,{actor :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addactor' , function(req,res,next){
  res.render('addactor');
});
router.post('/addactor' , function(req,res,next){
  db.query('INSERT INTO actor SET ?', req.body , function(err,rs){
    res.redirect('selectactor');
  });
});
router.get('/deleteact' , function(req,res,next){
  db.query('DELETE FROM actor WHERE actor_id = ?' , req.query.actor_id,function(err,rs){
    res.redirect('/selectactor')
  });
});
router.get('/editact',(req, res) => {
  db.query('SELECT * FROM actor WHERE actor_id = ?' , req.query.actor_id,function(err,rs){
    res.render('editactor' , {actor :rs});
  });
});
router.post('/editact' , function(req,res,next){
  var param=[
    req.body,
    req.query.actor_id
  ]
  db.query('UPDATE actor SET ? WHERE actor_id = ?', param,function(err,rs){
    res.redirect('selectactor')
  });
});
////////////////////////////////////////FILM TEXT TABLE////////////////////////////////////////////////
router.get('/selectfilmtext' , function(req,res,next){
  db.query('SELECT * FROM film_text',function(err,rs){
    res.render('selectfilmtext' ,{film_text :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addfilmtext' , function(req,res,next){
  res.render('addfilmtext');
});
//film id insert should be from 1 - 1000
router.post('/addfilmtext' , function(req,res,next){
  db.query('INSERT INTO film_text SET ?', req.body , function(err,rs){
    res.redirect('selectfilmtext');
  });
});
router.get('/deletefilmtext' , function(req,res,next){
  db.query('DELETE FROM film_text WHERE film_id = ?' , req.query.film_id,function(err,rs){
    res.redirect('/selectfilmtext')
  });
});
router.get('/editfilmtext',(req, res) => {
  db.query('SELECT * FROM film_text WHERE film_id = ?' , req.query.film_id,function(err,rs){
    res.render('editfilmtext' , {film_text :rs});
  });
});
router.post('/editfilmtext' , function(req,res,next){
  var param=[
    req.body,
    req.query.film_id
  ]
  db.query('UPDATE film_text SET ? WHERE film_id = ?', param,function(err,rs){
    res.redirect('selectfilmtext')
  });
});

////////////////////////////////////////FILM TABLE////////////////////////////////////////////////
router.get('/selectfilm' , function(req,res,next){
  db.query('SELECT * FROM film',function(err,rs){
    res.render('selectfilm' ,{film :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addfilm' , function(req,res,next){
  res.render('addfilm');
});
//film id insert should be from 1 - 6
router.post('/addfilm' , function(req,res,next){
  db.query('INSERT INTO film SET ?', req.body , function(err,rs){
    res.redirect('selectfilm');
  });
});
router.get('/deletefil' , function(req,res,next){
  db.query('DELETE FROM film WHERE film_id = ?' , req.query.film_id,function(err,rs){
    res.redirect('/selectfilm')
  });
});
router.get('/editfil',(req, res) => {
  db.query('SELECT * FROM film WHERE film_id = ?' , req.query.film_id,function(err,rs){
    res.render('editfilm' , {film :rs});
  });
});
router.post('/editfil' , function(req,res,next){
  var param=[
    req.body,
    req.query.film_id
  ]
  db.query('UPDATE film SET ? WHERE film_id = ?', param,function(err,rs){
    res.redirect('selectfilm')
  });
});

////////////////////////////////////////FILM CATEGORY TABLE////////////////////////////////////////////////
router.get('/selectfilmcat' , function(req,res,next){
  db.query('SELECT * FROM film_category',function(err,rs){
    res.render('selectfilmcategory' ,{film_category :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addfilmcat' , function(req,res,next){
  res.render('addfilmcategory');
});
router.post('/addfilmcat' , function(req,res,next){
  db.query('INSERT INTO film_category SET ?', req.body , function(err,rs){
    res.redirect('selectfilmcat');
  });
});
router.get('/deletefilmcat' , function(req,res,next){
  db.query('DELETE FROM film_category WHERE category_id = ?' , req.query.category_id,function(err,rs){
    res.redirect('/selectfilmcat')
  });
});
router.get('/editfilmcat',(req, res) => {
  db.query('SELECT * FROM film_category WHERE category_id = ?' , req.query.category_id,function(err,rs){
    res.render('editfilmcategory' , {film_category :rs});
  });
});
router.post('/editfilmcat' , function(req,res,next){
  var param=[
    req.body,
    req.query.category_id
  ]
  db.query('UPDATE film_category SET ? WHERE category_id = ?', param,function(err,rs){
    res.redirect('selectfilmcat')
  });
});
////////////////////////////////////////FILM TABLE////////////////////////////////////////////////
router.get('/selectfilmactor' , function(req,res,next){
  db.query('SELECT * FROM film_actor',function(err,rs){
    res.render('selectfilmactor' ,{film_actor :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addfilmact' , function(req,res,next){
  res.render('addfilmactor');
});
//film id insert should be from 1 - 6
router.post('/addfilmact' , function(req,res,next){
  db.query('INSERT INTO film_actor SET ?', req.body , function(err,rs){
    res.redirect('selectfilmactor');
  });
});
router.get('/deletefilmact' , function(req,res,next){
  db.query('DELETE FROM film_actor WHERE film_id = ?' , req.query.film_id,function(err,rs){
    res.redirect('/selectfilmactor')
  });
});
router.get('/editfilmact',(req, res) => {
  db.query('SELECT * FROM film_actor WHERE film_id = ?' , req.query.film_id,function(err,rs){
    res.render('editfilmactor' , {film_actor :rs});
  });
});
router.post('/editfilmact' , function(req,res,next){
  var param=[
    req.body,
    req.query.film_id
  ]
  db.query('UPDATE film_actor SET ? WHERE film_id = ?', param,function(err,rs){
    res.redirect('selectfilmactor')
  });
});
////////////////////////////////////////FILM TABLE////////////////////////////////////////////////
router.get('/selectinventory' , function(req,res,next){
  db.query('SELECT * FROM inventory',function(err,rs){
    res.render('selectinventory' ,{inventory :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addinventory' , function(req,res,next){
  res.render('addinventory');
});
//film id insert should be from 1 - 6
router.post('/addinventory' , function(req,res,next){
  db.query('INSERT INTO inventory SET ?', req.body , function(err,rs){
    res.redirect('selectinventory');
  });
});
router.get('/deleteinvent' , function(req,res,next){
  db.query('DELETE FROM inventory WHERE inventory_id = ?' , req.query.inventory_id,function(err,rs){
    res.redirect('/selectinventory')
  });
});
router.get('/editinvent',(req, res) => {
  db.query('SELECT * FROM inventory WHERE inventory_id = ?' , req.query.inventory_id,function(err,rs){
    res.render('editinventory' , {inventory :rs});
  });
});
router.post('/editinvent' , function(req,res,next){
  var param=[
    req.body,
    req.query.inventory_id
  ]
  db.query('UPDATE inventory SET ? WHERE inventory_id = ?', param,function(err,rs){
    res.redirect('selectinventory')
  });
});
////////////////////////////////////////CUSTOMER TABLE////////////////////////////////////////////////
router.get('/selectcustomer' , function(req,res,next){
  db.query('SELECT * FROM customer',function(err,rs){
    res.render('selectcustomer' ,{customer :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addcust' , function(req,res,next){
  res.render('addcustomer');
});
//film id insert should be from 1 - 6
router.post('/addcust' , function(req,res,next){
  db.query('INSERT INTO customer SET ?', req.body , function(err,rs){
    res.redirect('selectcustomer');
  });
});
router.get('/deletecust' , function(req,res,next){
  db.query('DELETE FROM customer WHERE customer_id = ?' , req.query.customer_id,function(err,rs){
    res.redirect('/selectcustomer')
  });
});
router.get('/editcust',(req, res) => {
  db.query('SELECT * FROM customer WHERE customer_id = ?' , req.query.customer_id,function(err,rs){
    res.render('editcustomer' , {customer :rs});
  });
});
router.post('/editcust' , function(req,res,next){
  var param=[
    req.body,
    req.query.customer_id
  ]
  db.query('UPDATE customer SET ? WHERE customer_id = ?', param,function(err,rs){
    res.redirect('selectcustomer')
  });
});
////////////////////////////////////////RENTAL TABLE////////////////////////////////////////////////
router.get('/selectrental' , function(req,res,next){
  db.query('SELECT * FROM rental',function(err,rs){
    res.render('selectrental' ,{rental :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addrental' , function(req,res,next){
  res.render('addrental');
});
//film id insert should be from 1 - 6
router.post('/addrental' , function(req,res,next){
  var rentaldate = req.body.rental_date
  var inventoryid = req.body.inventory_id
  var customerid = req.body.customer_id
  var returndate = req.body.return_date
  var staffid = req.body.staff_id
  var lastupdate = req.body.last_update
  let data = {rental_date:rentaldate , inventory_id:inventoryid , customer_id:customerid,
  return_date:returndate,staff_id:staffid,last_update:lastupdate};
  let sql = "INSERT INTO rental SET ?";
  let query = db.query(sql, data,(err, results) => {
  // db.query('INSERT INTO rental SET ?', req.body , function(err,rs){
    res.redirect('selectrental');
  });
});
router.get('/deleterent' , function(req,res,next){
  db.query('DELETE FROM rental WHERE rental_id = ?' , req.query.rental_id,function(err,rs){
    res.redirect('/selectrental')
  });
});
router.get('/editrent',(req, res) => {
  db.query('SELECT * FROM rental WHERE rental_id = ?' , req.query.rental_id,function(err,rs){
    res.render('editrental' , {rental :rs});
  });
});
router.post('/editrent' , function(req,res,next){
  var param=[
    req.body,
    req.query.rental_id
  ]
  db.query('UPDATE rental SET ? WHERE rental_id = ?', param,function(err,rs){
    res.redirect('selectrental')
  });
});
////////////////////////////////////////PAYMENT TABLE////////////////////////////////////////////////
router.get('/selectpayment' , function(req,res,next){
  db.query('SELECT * FROM payment',function(err,rs){
    res.render('selectpayment' ,{payment :rs} );
  });
});
router.get('/openmenu' , function(req,res,next){
  res.render('menu');
});
router.get('/addpayment' , function(req,res,next){
  res.render('addpayment');
});
//film id insert should be from 1 - 6
router.post('/addpayment' , function(req,res,next){
  var customerid = req.body.customer_id
  var staffid = req.body.staff_id
  var amount = req.body.amount
  var rentalid = req.body.rental_id
  var paymentdate = req.body.payment_date
  var lastupdate = req.body.last_update
  let data = {amount:amount , customer_id:customerid,rental_id:rentalid,
  payment_date:paymentdate,staff_id:staffid,last_update:lastupdate};
  let sql = "INSERT INTO payment SET ?";
  let query = db.query(sql, data,(err, results) => {
    res.redirect('selectpayment');
  });
});
router.get('/deletepayment' , function(req,res,next){
  db.query('DELETE FROM payment WHERE payment_id = ?' , req.query.payment_id,function(err,rs){
    res.redirect('/selectpayment')
  });
});
router.get('/editpayment',(req, res) => {
  db.query('SELECT * FROM payment WHERE payment_id = ?' , req.query.payment_id,function(err,rs){
    res.render('editpayment' , {payment :rs});
  });
});
router.post('/editpayment' , function(req,res,next){
  var param=[
    req.body,
    req.query.payment_id
  ]
  db.query('UPDATE payment SET ? WHERE payment_id = ?', param,function(err,rs){
    res.redirect('selectpayment')
  });
});
module.exports = router;
