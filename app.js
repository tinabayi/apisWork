const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('./public'));

const mysql=require('mysql')
const pool= mysql.createPool({
   host:'localhost',
   user:'root',
   password:'',
   database:'product'

})
 
app.listen(9000,()=>{console.log('This server is running on port 9000')})

pool.getConnection((error)=>{
    if(!error){
          console.log("connect to product database")
     }
  })
//GET API
        app.get('/apiswork/api/products', (req, res) => {
            pool.query('SELECT * FROM products',(err,rows,field)=>{
        res.send(rows)
            })  
        });
    
//POST API        
     app.post('/apiswork/api/items',(req,res)=>{
        let item= req.body;
        console.log(item)
       
        pool.query('INSERT INTO products SET prodId = ?,prodName = ?, prodAmount = ?',[item.prodId, item.prodName,item.prodAmount],function(err,rows,fields){
        if(!err){
            res.send('successfull send')
        }else{
            //
            console.log(err)
            res.send(' data not send')
        }
    })     
});
//DELETE API

app.delete('/apiswork/api/products/:id',(req,res)=>{
    const product_id = req.body.prodId
    pool.query('DELETE FROM products WHERE prodId = ?',[product_id],(err,rows,fields)=>{
         if(!err){
             res.send("deleted sawa")
             console.log('it is deleted')
         }else{
             console.log("not deleted")
         }
     })
 })
 //UPDATE API
 app.put('/apiswork/api/products/:id',(req,res)=>{
    const params = req.body
    const product_id = params.prodId
    const product_name=params.prodName
    const product_amount=params.prodAmount
    pool.query('update products SET prodId= ?, prodName = ?,prodAmount=? , WHERE prodId =product_id',[ product_id, product_name,product_amount],(err,rows,fields)=>{
         if(!err){
             res.send("updated sawa")
             console.log('it is update')
         }else{
             console.log("not updated")
         }
     })
 })
 
