const express = require('express');
const compression = require('compression')
const history = require('connect-history-api-fallback');
const routers = require('./routers')
const app = express()

// 过滤
app.get('*', (req, res, next) => {
    let { url } = req
    if (url.indexOf('.') !== -1) {
        next()
        return
    }

    const passURL = [
        '/index',
        '/mallshop',
        '/vue-pro',
        '/element-ui',
        '/react-demo1',
        '/vue-todo'
    ]
    let t = 0
    passURL.map(v => {
        if (url.indexOf(v) === -1) {
            t++
        } else if (url === '/vue-pro' || url === '/element-ui' || url === '/mallshop' || url === '/index') {
            res.redirect(url + '/')
            return
        } else {
            next()
            return
        }
        t === passURL.length && res.redirect('/index/');
    })
});

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
const bodyparser = require('body-parser');
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

