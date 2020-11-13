import data from '../testData/data.json'


export function getPackagePaths(){
    // paths = data.slice().map((record) => {
    //     console.log("records")
    //     console.log(record.title)
    //     return(record.title)})

    //     let pathsexp = paths.map((record) => {
    //         console.log("records")
    //         console.log(record.title)
    //         return(record.title)})
    //     console.log(pathsexp)
    var jp = require('jsonpath')
    let paths = jp.query(data, '$..title')
    return paths
}
export function getAllPackageIds(){
    let paths = data.slice().map((record) => {
        return({
            params:{
                id: record.title.toLowerCase()
            }
        })
    })
    return paths
}


export function getPackageData(id){
    for (let i = 0; i < data.length; i++){
        if(data[i].title.toLowerCase() == id)
            return data[i]
    }
    return null
}