const express = require('express');
const app = express()


//post body
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extende: false }));
app.use(bodyparser.json())

//http https 
require('./https/router')(app)

//react-demo1
require('./react-demo1-build/router')(app)

//vue-todo
require('./vue-todo/router')(app)
require('./vue-todo/routers/list')(app)
require('./vue-todo/routers/user')(app)

//vue-pro
require('./vue-pro/router')(app)

//element-ui
require('./element-ui/router')(app)

//login
require('./passport')(app)

//mallshop
require('./mallshop/router')(app)

