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
        console.log(item.prodId)
        res.send( 'data sent')
        const prod_id= req.body.prodId
        const prod_name= req.body.prodName
        const prod_amount= req.body.prodAmount
        console.log(prod_id);
        console.log(prod_name);
        console.log(prod_amount);
     Connection.query('INSERT INTO products SET prodId = ?,prodName = ?, prodAmount = ?',[prod_id, prod_name, prod_amount],function(err,rows,fields){
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

app.delete('/apiswork/api/products/:prodId',(req,res)=>{
    const products=[{
        prodId:6,
        prodName:'umunyu',
        prodAmount:200

    }]
const product= products.find(c=>c === parseInt(req.params.prodId));
if(!product){
    res.send('the product with this id not found');
    console.log('not found')
}
else{
    console.log('product found')
}
    const index= products.indexOf(product);
    products.splice(index, 1 )
    res.send(product)
    console.log('not found')
 })