let fs = require("fs");
let fileContents = fs.readFileSync("C_FileSystem.lua").toString();
// console.log(fileContents.toString());

var parser = require('luaparse');
var ast = parser.parse(fileContents);
console.log(JSON.stringify(ast));