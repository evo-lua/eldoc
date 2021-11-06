class LuaParser {
	constructor() {
		this.test = 42;
		return this;
	}
}

// export { LuaParser }
// return LuaParser;
module.exports = {
	LuaParser: LuaParser
}