const assert = require("assert/strict");
const assertEquals = assert.deepStrictEqual;
// const assertInstanceOf = assert.equal;

const { LuaParser } = require("../LuaParser");

const parser = new LuaParser("fixtures/TestModule.lua");

describe("LuaParser Interface", () => {
	it("Should be present", () => {
		assertEquals(parser.constructor.name, LuaParser.name);
	})
})