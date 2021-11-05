-- This is only needed because evo-luvi assumes a bundle's entry point to be main.lua
-- It's possible to change this when running locally (-m switch), but it doesn't work when running a compiled bundle
_G.import("ldoc")