const express = require('express');
const app = express()

//post body
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extende: false }));
app.use(bodyparser.json())

//react-demo1
require('./react-demo1-build/serve')(app)




app.listen(80, () => {
    console.log(`Server started on 80`);
});