const CLI = {
	ParseFile(filePath) {},
	ParseDirectory(filePath) {}
}

const GLOBAL_LUA_ENVIRONMENT = "_G"

class DocComment {
	constructor(text = "", namespace = GLOBAL_LUA_ENVIRONMENT) {
	}
}

class FunctionDefinition {
	constructor(astNode) {
		this.comments = [];
		console.log(astNode);
	}
}

const OutputFormatter = {
	DumpAsJSON(docComments) {}
}

const LuaParser = {
	OnRelevantTagEncountered(tagName) {},
	OnCommentEncountered(rawText) {}
}


const AST_NODE_TYPE_COMMENT = "Comment";
const AST_NODE_TYPE_FUNCTION = "FunctionDeclaration";

// let namespaceOrModuleName = "Unknown";
let exportedApiSurface = {};

let fs = require("fs");
let fileContents = fs.readFileSync("C_FileSystem.lua").toString();
// console.log(fileContents.toString());


let lastCommentNodes = [];

function onFunctionDefinition(astNode) {
	console.log("NYI: Function def begins here");

	if(astNode.type === AST_NODE_TYPE_FUNCTION) { // OnFunctionDefinitionEncountered
		console.log("FUNCTION DEF BEGINS: %s (base: %s)", astNode.identifier.identifier.name, astNode.identifier.base.name);

		// if (namespaceOrModuleName === astNode.identifier.base.name)
		astNode.comments = lastCommentNodes; lastCommentNodes = []; // Reset for next funcdef

		// Relevant properties: Name, arguments, return values, namespace, isLocal =scope
		astNode.name = astNode.identifier.identifier.name;
		// astNode.name = astNode.identifier.identifier.name;
		// params, return values aren't yet available and have to be added AFTER the function def is parsed fully

		exportedApiSurface[astNode.identifier.base.name] = exportedApiSurface[astNode.identifier.base.name] || {};
		exportedApiSurface[astNode.identifier.base.name][astNode.name] = new FunctionDefinition(astNode);

	}
}

function onNodeCreated(astNode) {
	// console.log("Node created\t%s\t\t\t%s", astNode.type, astNode.name || "");

	if(astNode.type === AST_NODE_TYPE_FUNCTION) { // OnFunctionDefinitionEncountered
		console.log("FUNCTION DEF ENDS: %s (base: %s)", astNode.identifier.identifier.name, astNode.identifier.base.name);

		// // if (namespaceOrModuleName === astNode.identifier.base.name)
		// astNode.comments = lastCommentNodes; lastCommentNodes = []; // Reset for next funcdef

		// exportedApiSurface[astNode.identifier.base.name] = exportedApiSurface[astNode.identifier.base.name] || [];
		// exportedApiSurface[astNode.identifier.base.name].push(astNode);

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
	scope: true,
	locations: true,
	onCreateNode: onNodeCreated,
	onCreateFunctionDefinition: onFunctionDefinition
}
var ast = parser.parse(fileContents, options);
// console.log(JSON.stringify(ast));
// console.log("Namespace: %s", namespaceOrModuleName);
// console.log("Exported functions: %d\n", exportedApiSurface.length, exportedApiSurface);
console.log(exportedApiSurface);