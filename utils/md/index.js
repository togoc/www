const showdown = require('showdown')
const path = require('path')
const fs = require('fs')
/**
 * 给定一个md文件地址,返回html内容.
 */
module.exports = (url) => {
    console.log(url)
    if (!url || url.replace(/^\s*|\s*$/g, '') === '') return
    try {
        const data = fs.readFileSync(path.resolve(url), 'utf8')
        converter = new showdown.Converter()
        html = converter.makeHtml(data);
        return html
    } catch (error) {
        console.log('文件读写错误:' + error)
    }

}
