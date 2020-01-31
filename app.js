const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const mysql=require('mysql')
const Connecction=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'product'

})
Connecction.connect((err)=>{
    if(!err){
        console.log("connect to product database")
//GET API
        app.get('/apiswork/api/products', (req, res) => {
        Connecction.query('SELECT * FROM products',(err,rows,field)=>{
        res.send(rows)
            })  
        });
//POST API        
       app.post('/apiswork/api/items',(req,res)=>{
        let item= req.body;
          if(item){
          Connection.query('INSERT INTO product SET prodId = ?,prodName = ?, prodAmount = ?,',[item.prodId,item.prodName,item.prodAmount],function(err,rows,fields){
                if(!err){
                    res.send('successfull send')
                }else{
                    console.log(err)
                    res.send(' data not send')
          
        }
       
       })
    


const port = 3000;
app.listen(port, () => {console.log(` app listening on port ${port}!`)})