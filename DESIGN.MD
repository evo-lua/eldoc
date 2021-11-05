# About EvoDoc

TODO Add summary

TODO Decide on a name

eldoc is an experimental documentation generator for use with Lua programs, designed to generate API documentations automatically. It works mostly like existing tools such as LDoc, following the JavaDoc convention of using ``@``-tags and comment sections.

## Why create a new tool?

There are many reasons that fueled my decision, some of them better than others:

* I simply enjoy building stuff that works to my own specifications (sue me)
* LuaDoc is dead and abandoned
* LDoc is somewhat maintained, but not very actively so
* LDoc also requires modules such as LuaFileSystem and Penlight
* Both tools feel like they're straight out of the 90s, and the code isn't easy to read either

Tapping into the massive Node ecosystem allows utilizing better tools; tools that simply weren't available when LuaDoc and LDoc were first created. That's why EvoDoc runs on JS.

## What are the drawbacks?

I'm always thinking in the long term, but obviously no one can tell whether my experiments will turn out to be successful. I generally expect many, if not most, to fail, but such is the price of innovation.

Since the tools I'm building for the Lua ecosystem are altogether very immature, you should expect bugs and missing features. Hopefully the advantages will more than outweigh any potential drawbacks.

Also, if you're allergic to JavaScript then I guess there may be some, uhm... ideological difficulties 🕵️ I don't enjoy programming in JS very much, but it would be foolish to ignore the vast potential that it holds for a task such as this. Without [luaparse](https://fstirlitz.github.io/luaparse/) I wouldn't have tried.

## What are the advantages?

I put an extremely (some would say, almost fanatic) emphasis on documentation and making software user-friendly, as well as easy to maintain.

While I won't always succeed, I am very dedicated to maintaining even legacy software that people are still relying on, so if there is interest my projects won't just be left for dead.

Additionally, building new things from scratch allows learning from the already existing tools in the same niche, without being subjected to the same limitations that past authors had to work around.

It also means better utilizing the latest innovations in other fields, or building on more and better work that others have done that simply didn't exist before this project was started.

## Features Comparison

Since EvoDoc is inspired by tools such as LDoc and the original LuaDoc, most of their feature must be supported before it can at all considered to be useful.

[JSDoc](https://jsdoc.app/) is the de-facto standard for JavaScript documentation and provides many more features than are available to people in the Lua ecosystem, so I use it as a "distant goalpost" in terms of features that may be added to EvoDoc in the future.

In other words: The LDoc colum in the following table represents the "minimum required feature set" before I would consider the tool "complete", and the JSDoc one represents the "ideally supported feature set" (a list of things that would be "nice to have").

| Scope | Feature | eldoc | LDoc | JSDoc |
|:---:|:---:|:---:|:---:|:---:|
| CLI | Configurable output directory | --- | ✓ | TBD |
| CLI | Configurable output file name | --- | ✓ | TBD |
| CLI | Configurable output file format | TBD | ✓ | TBD |
| CLI | Configuration via CLI arguments | TBD | ✓ | TBD |
| CLI | Configuration via config file | TBD | ✓ | TBD |
| Output | Custom CSS template (for HTML output) | --- | ✓ | TBD |
| Output | Custom project name | TBD | ✓ | TBD |
| Output | Custom page title | TBD | ✓ | TBD |
| Parsing | Also document local functions | --- | ✓ | TBD |
| Parsing | Auto-detect namespaces | TBD | --- | TBD |
| Parsing | Auto-exclude irrelevant block comments | TBD | --- | TBD |
| Parsing | Auto-detect namespaces across multiple files | TBD | --- | TBD |
| Parsing | C/C++ support | TBD | ✓ | TBD |
| Tags | Cross-references | TBD | TBD | ✓ |
| Tags | Multiple return values | TBD | ✓ | TBD |
| Tags | Mandatory Parameters | TBD | ✓ | ✓ |
| Tags | Optional Parameters | TBD | ✓ | --- |
| Tags | Type annotations | TBD | ✓ | TBD |
| Tags | TBD | TBD | TBD | TBD |

TODO Add overview of min/max feature set

If some of the features aren't included here, it's likely because I forgot or didn't think them particularly important. Feel free to open an issue if you consider it worthwhile :)

## Configuration

There are no command line switches. In order to change the behaviour you can pass a configuration file path as the second parameter; or simply put it in the current working directory and name it ``evdoc.json``.

## Installation and Usage

You'll need NodeJS and ``npm``. Yeah, I know.

Then simply ``clone`` the repo and run the script using ``node``:

``node evodoc.js <rootFolderOrFileName> [<optionalConfigurationFilePath>]``

TODO: Make executable so people don't need Node/JS

If the first argument is a ``.lua`` file, it will be processed. If it's a folder path, it will be considered the "root" and all ``.lua`` files in this folder will (recursively) be processed.

If omitted, ``.`` (the current working directory) will be assumed.

The configuration file is a standard JSON that must adhere to the following schema:

```js
{
  "outputDirectory": "This is a relative or absolute path where the documentation should be stored",
  "outputFormat": "One of 'markdown', 'json', 'lua', or 'html (see below for details)'
}
```

## Comment Syntax

Starting a function description:

```lua
--- This is the description that will be assigned to the next function encountered while parsing the source code. It can take any form you like, but it must start with three hyphens in order to be recognized.
-- If you need multiple lines, only the first should have three hyphens (to signal the beginning of the section).
-- You may or may not add periods at the end (unlike in LDoc, where it is required). EvoDoc simply takes whatever you write after the initial tag or section indicators
```

TODO: Add details about the output formats

## Supported Tags

This is an exhaustive list of all the tags that EvoDoc currently supports:

TODO Add list of all supported tags

## How it works

eldoc generates its output in phases, each handled independently of the others:

1. Abstract Syntax Tree Generation
2. Extracting relevant doc comments
3. Transforming doc comments into the final output

Read on for more details on the individual phases

### Phase 1: AST Generation

This is mostly handled by [luaparse](https://fstirlitz.github.io/luaparse/), which will take a given Lua script as input and output a JSON represenation of an abstract syntax tree for the given program.

### Phase 2: DocComment Extraction

While generating the AST, luaparse will emit certain events that eldoc uses to determine when a relevant DocComment has been encountered. It will then associate them with the function definition that immediately follows it, and store the result alongside the respective namespace in a simplified JSON representation.

### Phase 3: HTML/Markdown/etc Rendering

This intermediate representation can be transformed into the desired output format, such as a set of markdown files or a website styled with CSS. Plain JSON dumps are also possible, though they're mostly useful for debugging (or if you want to employ other tools later).