const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('./public'));

const mysql=require('mysql')
const Connection=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'product'

})
 
app.listen(5000,()=>{console.log('server running on port 5000')})

Connection.connect((error)=>{
    if(!error){
          console.log("connect to product database")
     }
  })
//GET API
        app.get('/apiswork/api/products', (req, res) => {
        Connection.query('SELECT * FROM products',(err,rows,field)=>{
        res.send(rows)
            })  
        });
    
//POST API        
     app.post('/apiswork/api/items',(req,res)=>{
        let item= req.body;
       
     Connection.query('INSERT INTO products SET prodId = ?,prodName = ?, prodAmount = ?',[item.prodId, item.prodName,item.prodAmount],function(err,rows,fields){
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
     Connection.query('DELETE FROM products WHERE prodId = ?',[product_id],(err,rows,fields)=>{
         if(!err){
             res.send("deleted sawa")
             console.log('it is deleted')
         }else{
             console.log("not deleted")
         }
     })
 })