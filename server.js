const express = require('express');
const compression = require('compression')
const history = require('connect-history-api-fallback');
const bodyparser = require('body-parser');
const routers = require('./routers')
const app = express()

// 过滤(必须放前面)
require('./utils/filter/index')(app)

// history mode
app.use('/index', history());
app.use(routers.elment, history());
app.use('/mallshop', history());
app.use('/vue-pro', history());



//启用gzip
app.use(compression());
function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // 这里就过滤掉了请求头包含'x-no-compression'
        return false
    }
    return compression.filter(req, res)
}
app.use(compression({ filter: shouldCompress }))

//post body
app.use(bodyparser.urlencoded({ extende: false }));
app.use(bodyparser.json())






//http https 
require('./https/router')(app)

// test
require('./test')(app)

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

//login/register
require('./passport')(app)

//mallshop
require('./mallshop/router')(app)


//主页
require('./index/router')(app)

//sms
// require('./sms')(app)

// 搜索
require('./react-search/router')(app)

