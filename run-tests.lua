local uv = require("uv")
local PWD = uv.cwd()

local run
if not _G.args[2] then
  run = function (dir)
     local cmd = 'cd '..dir..' && lua '..PWD..'/ldoc.lua --testing . && diff -r doc cdocs'
     print(cmd)
     os.execute(cmd)
  end
elseif _G.args[2] == 'update' then
   run = function (dir)
     local cmd = 'cd '..dir..' && lua '..PWD..'/ldoc.lua --dir cdocs --testing .'
     print(cmd)
     os.execute(cmd)
   end
end

for _,d in ipairs{'tests','tests/example','tests/md-test'} do
   run(d)
end
