const AST_NODE_TYPE_COMMENT = "Comment";
const AST_NODE_TYPE_FUNCTION = "FunctionDeclaration";

// let namespaceOrModuleName = "Unknown";
let exportedApiSurface = {};

let fs = require("fs");
let fileContents = fs.readFileSync("C_FileSystem.lua").toString();
// console.log(fileContents.toString());


function OnRelevantTagEncountered(tagName) {}

function OnCommentEncountered(rawText) {}



let lastCommentNodes = [];

function onNodeCreated(astNode) {
	// console.log("Node created\t%s\t\t\t%s", astNode.type, astNode.name || "");

	if(astNode.type === AST_NODE_TYPE_FUNCTION) { // OnFunctionDefinitionEncountered
		console.log("FUNCTION DEF: %s (base: %s)", astNode.identifier.identifier.name, astNode.identifier.base.name);

		// if (namespaceOrModuleName === astNode.identifier.base.name)
		astNode.comments = lastCommentNodes; lastCommentNodes = []; // Reset for next funcdef

		exportedApiSurface[astNode.identifier.base.name] = exportedApiSurface[astNode.identifier.base.name] || [];
		exportedApiSurface[astNode.identifier.base.name].push(astNode);

	}

	if(astNode.type === AST_NODE_TYPE_COMMENT) { // OnCommentEncountered
		let location = astNode.loc;

		console.log("NEW COMMENT: %s (start: %d:%d, end: %d:%d)", astNode.value, location.start.line, location.start.column, location.end.line, location.end.column);
		if(astNode.raw.startsWith("---")) { // OnFunctionDescriptionEncountered
			console.log("DESC!")
			lastCommentNodes.push(astNode);
		}
		if(astNode.raw.startsWith("@")) { // OnFunctionTagEncountered
			console.log("TAG!")
			lastCommentNodes.push(astNode);
		}
	}
}

var parser = require('luaparse');
const options = {
	locations: true,
	onCreateNode: onNodeCreated
}
var ast = parser.parse(fileContents, options);
// console.log(JSON.stringify(ast));
// console.log("Namespace: %s", namespaceOrModuleName);
console.log("Exported functions: %d\n", exportedApiSurface.length, exportedApiSurface);