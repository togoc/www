const fs = require('fs')
const procy = require('./index')

let x = 26796
let t = x - 1
let setInter = setInterval(() => {
    t++
    if (t === 26810) {
        clearInterval(setInter)
    }
    let getGoodsListUrl = 'https://api.zbztb.cn/api/public/v1/goods/detail?goods_id=' + t
    procy(getGoodsListUrl).then(res => {
        fs.writeFile('26810.txt', JSON.stringify(res.message), { flag: 'a' }, (err) => {
            console.log(t)
            if (err)
                console.log(err)
        })
    }).catch(err => {
        if (err)
            console.log(err)
    })
}, 2000);



// 1-200 净化器

// 曲面电视43964-43986 23个 43986.txt

//海信电视 47855-47869 15个 47869.txt
//夏普电视 53933-53947 15个 53947.txt
//创维电视 57431-57445 15个 53947.txt
//tcl电视 9818-9832 15个 53947.txt
//pptv电视 13823-13831 15个 53947.txt
//小米电视 17914-17928 15个 53947.txt
//长虹电视 22303-22317 15个 53947.txt
//康佳电视 25570-25584 15个 53947.txt
//三星电视 25959-25973 15个 53947.txt
//飞利浦电视电视 26420-26434 15个 53947.txt
//索尼电视 26796-26810 15个 53947.txt