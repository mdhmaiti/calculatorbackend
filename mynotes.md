# notes
simply res.send("hello"); is limited to the strings. To send a file to the server we should use the ```res.sendFile(filename) ```. inside the file name we are passig the name of the relative file .but here lies the problem , while deploying it to another machine it may not be the same directory ..therfore sending the relative path is risky ,as it may or may not work. so we are using the ```__dirname``` this ensures that we are inside the directory of the app that we deployed here it is the ``` caculatorbasics``` .
```__dirname ``` is just a constant that helps us to grab hold of the current file location ...  if i create a ```path.js ``` file in the desktop .. and console.log it .. it wil show the location of the desktop path .
2. ``` <form action="index.html" method="post"> ``` here we can see that our form has a action and a method.
the **method** name is " post "; which indicates that we are sending it to somewhere ...and the somewhere is determined by the ***action*** attribute ... (note : the data is the things inside the form ).. now the action is set to the ``` "/"``` which indicates the home route(home page) .
3. In the html file the ``` name ``` is a very important thing without this the things wont workout .. you can go to the developer tools and the network section and inside the section you can do to the payload section this is where you can see how the back end works ....and the name section is basically for the system to identify the things.4

4. now if you do run  the things if you are in the current code state.. ...
``` js 
 //calculator.js
    const express = require('express')
const app = express();
const port = 3000;
// now using the get function 
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})
app.listen(port,()=>{
    console.log(`the calculator.js is listening on port ${port}`);

})

```
``` html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>calculator</title>
    
</head>
<body>
    <h1>Calculator</h1>
    <form action="/" method="post">
        <input type="text" name="num1" placeholder="first number">
        <input type="text" name="num2" placeholder="second number">
        <button type="submit" name="submit" >calculate</button>
    </form>

</body>
</html>

```
***this is bound to give you an error*** : It will be the 404 not found .It is because when you click the calculate button i.e, trigeer the post thing the server does not lnopw how to respond .so now lets do a response.
``` js
    app.post('/', (req,res)=>{
    res.send(" thanks for sending the data ")
})
```
now we are adding this piece of the data ;; we are calling the express then the post thing ..and point the location to the home directory and then displaying the message " thanks for sending the data "

4. now the step 1 is essentially complete ... now we need to figure out how to tap into the data that we are sending or the data we are seeing in the payload section .So we can calculate the out put and send the output back to the user.For this we need another thing called bnody parser ``` npm install body-parser ```
--------------------------------------------
## body parser tutorial ;
1. body parser npm and how to use it with express js 
* Body-parser is a popular middleware package for Node.js and Express.js that simplifies the process of parsing incoming request bodies. It extracts the data from the request body and makes it accessible in your Express.js application.

To use body-parser with Express.js, follow these steps:

1. Install body-parser as a dependency in your project:
   ```
   npm install body-parser
   ```

2. Require the body-parser module in your Express.js application:
   ```javascript
   const bodyParser = require('body-parser');
   ```

3. Configure body-parser as middleware in your Express.js application:
   ```javascript
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());
   ```

   The `urlencoded` method is used to parse URL-encoded data (e.g., form submissions) and the `json` method is used to parse JSON data.

4. Now you can access the parsed request body in your Express.js routes or middleware. For example:
   ```javascript
   app.post('/api/users', (req, res) => {
     const userData = req.body; // Access the parsed request body
     // Process the userData and send a response
     res.send('User created successfully');
   });
   ```

   In this example, when a POST request is made to `/api/users`, the request body is parsed by body-parser, and the parsed data is available in `req.body`.

With body-parser configured as middleware, it automatically parses the request body for incoming requests that match the specified parsing options (`urlencoded` or `json`). This allows you to access the parsed data easily in your Express.js application.

Note: Starting from Express.js version 4.16.0, the `express` package itself includes built-in middleware for parsing URL-encoded and JSON data. You can use `express.urlencoded` and `express.json` instead of body-parser if you are using a newer version of Express.js.

2. app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
should'nt  it be extended true ?

* The `extended` option in `bodyParser.urlencoded()` determines how the URL-encoded data is parsed. 

When `extended` is set to `true`, the parsing mechanism supports rich objects and arrays as values in the URL-encoded data. For example, it can handle nested objects and arrays. This is the legacy behavior of `body-parser` and is typically used when dealing with data formats that require more complex structures.

On the other hand, when `extended` is set to `false`, the parsing mechanism uses the simpler query-string library, which supports only strings and arrays as values in the URL-encoded data. This is the recommended setting for most use cases, as it provides better compatibility and avoids potential security risks.

In most scenarios, setting `extended` to `false` is sufficient and recommended unless you specifically require support for rich objects and arrays in the URL-encoded data.

3. This is the recommended setting for most use cases, as it provides better compatibility and avoids potential security risks. can you explain this and how it is potentially risky if you set it to the extended true ?
* Setting `extended` to `true` in `bodyParser.urlencoded()` can potentially be risky due to the way it handles the parsing of URL-encoded data. Here are a couple of reasons why setting `extended` to `true` might introduce security risks:

1. **Potential Denial-of-Service (DoS) Attacks**: When `extended` is set to `true`, `body-parser` allows the parsing of nested objects and arrays in the URL-encoded data. This feature can be exploited by sending a large or deeply nested payload, which could consume excessive server resources and potentially lead to a Denial-of-Service (DoS) attack.

2. **Unintended Data Overwriting**: The `extended` mode of parsing allows for more flexibility in how objects and arrays are represented in the URL-encoded data. However, this flexibility can lead to unintended consequences. For example, if a key in the URL-encoded data is repeated multiple times, it could result in data overwriting or the accidental exposure of sensitive information.

By setting `extended` to `false`, you ensure that the parsing mechanism only supports strings and arrays as values in the URL-encoded data, which provides better compatibility and mitigates these potential security risks. The simpler parsing mechanism is less prone to abuse and reduces the chances of unexpected behavior or vulnerabilities.

In summary, unless you have a specific use case that requires support for rich objects and arrays in the URL-encoded data, it is recommended to set `extended` to `false` to maintain better compatibility, reduce security risks, and mitigate potential DoS attacks or unintended data manipulation.

-----------------------------------------------------
5. ``` console.log(req.body);``` using this command now you can see the payload in the terminal ..( urlencoded in the body parser is basically the thing that we use in the html , we can get the form data). we write it the ```req `` because we are requesting the value from the website, to work on these value.
6. now if we use the ``` console.log(req.body.num1);``` .. we will only get the value of the num1 . That we provide in the form ,in the website.Suppose we enter the value 5 .. then the terminal will show the value of 5 . Now we can work with this value .
7. now we do a simple calculation and return a summation of the numbers that are provided by the user 

``` js 
    let a= req.body.num1;
    let b = req.body.num2;

    const sum = a + b ;

    res.send(" the summation of the data is  " + sum )

    // suppose the input is 6 and 9 .. the result will be 69.( which is a mistake , beacuse req.body take the input as a string-- to solve this we have to do the following )

```
``` js 
    let a= Number(req.body.num1);
    let b = Number(req.body.num2);

    const sum = a + b ;

    res.send(" the summation of the data is  " + sum )
```
we will get the correct output .
7. now if we right click on it and click on the view page source ,,, we can only see the plain html thing which is on (front end --client browser) .. it is because we have hidden all the calculation to the server side .. which we did by using the java script ... this is back end ....