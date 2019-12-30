const express = require('express');
var compression = require('compression')
const app = express()


//启用gzip
app.use(compression());
// app.use(compression({ filter: shouldCompress }))

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // 这里就过滤掉了请求头包含'x-no-compression'
        return false
    }

    return compression.filter(req, res)
}

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