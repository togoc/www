module.exports = (app) => {
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
}