let fs = require("fs");
let fileContents = fs.readFileSync("C_FileSystem.lua").toString();
// console.log(fileContents.toString());

var parser = require('luaparse');
const options = {
	locations: true
}
var ast = parser.parse(fileContents, options);
console.log(JSON.stringify(ast));