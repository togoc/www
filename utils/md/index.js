const showdown = require('showdown')
const fs = require('fs')
/**
 * 给定一个md文件地址,返回html内容.
 */
module.exports = (url) => {
    if (!url || url.replace(/^\s*|\s*$/g, '') === '') return
    try {
        const data = fs.readFileSync(url, 'utf8')
        converter = new showdown.Converter()
        html = converter.makeHtml(data);
        return html
    } catch (error) {
        console.log('文件读写错误:' + error)
        return error
    }

}
