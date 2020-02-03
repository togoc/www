const fs = require('fs')
const dirs = fs.readdirSync('./json')
let lastObj = {
    nodes: [],
    edges: []
}
dirs.map(v => {
    let data = fs.readFileSync('./json/' + v, 'utf8')
    let { devDependencies, dependencies } = JSON.parse(data)
    let obj = { ...devDependencies, ...dependencies }
    let arr = Object.keys(obj)
    // edges
    let sourceID = v.slice(0, -5)
    arr1 = arr.map(v => {
        return {
            sourceID,
            targetID: v,
        }
    })
    lastObj.edges = [...lastObj.edges, ...arr1]

    arr.push(sourceID)
    if (lastObj.nodes.length === 0) {
        arr.forEach((v1, index) => {
            lastObj.nodes = [...lastObj.nodes, {
                color: v1 === sourceID ? '#ff4141' : "#c98522",
                label: v1,
                size: v1 === sourceID ? 25 : 5
            }]
        })
    } else {
        arr.forEach((v2, index1) => {
            let l = 0
            lastObj.nodes.forEach((v3, index) => {
                if (v3.label === v2) {
                    v3.size *= 1.5
                } else {
                    l++
                    if (l === lastObj.nodes.length) {
                        lastObj.nodes.push({
                            color: v2 === sourceID ? '#ff4141' : "#c98522",
                            label: v2,
                            size: v2 === sourceID ? 25 : 5
                        })
                    }
                }
            })

        })
    }
})
// fs.writeFileSync('./dev.txt', JSON.stringify(lastObj))
