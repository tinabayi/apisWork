const express = require('express');
const app = express();

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
 
app.listen(8000,()=>{console.log('server running on port 8000')})

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
       console.log(item.prodId)
        res.send( 'data sent')
    const prodId=req.body.prodId
    const prodName=req.body.prodName
    const prodAmount=req.body.prodAmount
     Connection.query('INSERT INTO products SET prodId = ?,prodName = ?, prodAmount = ?',[prodId,prodName,prodAmount],function(err,rows,fields){
        if(!err){
            res.send('successfull send')
        }else{
            //
            console.log(err)
            res.send(' data not send')
        }
    })     
});