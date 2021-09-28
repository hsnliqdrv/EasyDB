const fs = require("fs")

let Colls = []
module.exports.CreateDB = function(dbname, dir){
    this.info = {
        name: dbname,
        directory: dir,
        date: (new Date()).toUTCString()
    }
    fs.access(dir, (err) => {
        if (err) {
            console.log(`Could not find directory: ${dir}`)
        }
    })
    fs.readdir(dir, function(err, files) {
        if (err) {
           console.log(err)
        } else {
           if (files.length == 0) {
               console.log("Directory has been verified successfully! \n" + `Created database: ${dbname}`)
           }
        }
        if (files.length > 0) {
            console.log("The Directory which database will be created in, should be empty.")
        }
    })
    fs.writeFileSync(dir + "/" + "database_info.json", JSON.stringify(this.info))
    this.CreateCollection = (colle_name) => {
        if (colle_name in Colls) {
            console.log(`Collection: '${colle_name}' already exists!`)
        } else {
            Colls.push(colle_name)
        }
    }
    this.CreateRow = (r_title, colle_name, data) => {
        fs.writeFileSync(`${dir}/${colle_name}.edbc`, `(${r_title})${JSON.stringify(data)}`)
    }
}
function ejsonf(dir, action = data => data){
    this.content = JSON.parse( fs.readFileSync(dir) )
    let result = action(this.content)
    fs.writeFileSync(dir, JSON.stringify(result))
}