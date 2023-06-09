const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
// using the body parser

app.use(bodyParser.urlencoded({ extended: false }));// this line u have to use everytime you use the body parser.

// now using the get function 
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})
app.post('/', (req,res)=>{
   
    let a= Number(req.body.num1);
    let b = Number(req.body.num2);
    
    const sum = a + b ;




    res.send(" the summation of the data is  " + sum )
})

app.listen(port,()=>{
    console.log(`the calculator.js is listening on port ${port}`);

})
//nnnkk