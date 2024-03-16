var express = require('express');
var multer = require('multer');
var box3tools = require("../box3");
var utility = require("utility");
var router = express.Router();
var fs=require("fs");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024, files: 1, headerPairs: 100, fields: 50 } })

// vercel provides writable /tmp
const IS_VERCEL=process.env.VERCEL,VERCEL_ENV=process.env.VERCEL_ENV;
console.log(process.env)
console.log(`running in vercel?[${IS_VERCEL},${VERCEL_ENV}]`);
const has_tmp_fs=fs.existsSync("/tmp");
console.log(`has tmp fs?[${has_tmp_fs}]`);

function isNumber(str) {
  return !isNaN(parseFloat(str)) && isFinite(str);
}

var DRAWER = [
  { name: "首页", path: "/" },
  { name: "vox模型转建筑", path: "/vox2blocks", convertor: "vox2blocks" },
  { name: "建筑转vox模型", path: "/blocks2vox", convertor: "blocks2vox" },
  { name: '岛三俯视图生成', path: "/map2pic", convertor: "map2pic" }
]

function renderArgs(opt, req, res) {
  return Object.assign({
    title: "",
    drawer: DRAWER,
    path: req.path
  }, opt);
}

const CONVERTORS = {
  vox2blocks() {
    router.get('/vox2blocks', function (req, res, next) {
      res.render('vox2blocks', renderArgs({ title: "岛三vox模型转方块建筑工具" }, req, res));
    });
    router.post("/api/vox2blocks", upload.single("file"), function (req, res, next) {
      try {
        var scale = req.body.scale || "0.25", axis = req.body.axis || "xzy";
        if (!isNumber(scale)) {
          res.send({ "result": {}, "error": "scale参数错误" })
          return;
        }
        let flagaxis = (axis.length == 3);
        if (flagaxis) {
          for (var i = 0; i < axis.length; i++) {
            if (axis[i].toLowerCase() != "x" && axis[i].toLowerCase() != "y" && axis[i].toLowerCase() != "z") {
              flagaxis = false;
              break;
            }
          }
        }
        if (!flagaxis) {
          res.send({ "result": {}, "error": "axis参数错误" });
          return;
        }
        if (!req.file || req.file.originalname.split(".").pop().toLowerCase() != "vox") {
          res.send({ "result": {}, "error": "文件类型错误" });
          return;
        }
        let blocks = box3tools.vox2blocks(req.file.buffer, scale, axis);
        res.send({ "result": { res: blocks } });
      } catch (e) {
        res.send({ "result": {}, "error": `internal error ${e.message}` })
      }
    })
  }, blocks2vox() {
    router.get('/blocks2vox', function (req, res, next) {
      res.render('blocks2vox', renderArgs({ title: "岛三建筑转vox模型工具" }, req, res));
    });

    router.post("/api/blocks2vox", function (req, res, next) {
      try {
        var axis = req.body.axis || "xzy";
        console.log(decodeURI(req.body.blockDat))
        var blockDat = JSON.parse(decodeURI(req.body.blockDat));
        let flagaxis = (axis.length == 3);
        if (flagaxis) {
          for (var i = 0; i < axis.length; i++) {
            if (axis[i].toLowerCase() != "x" && axis[i].toLowerCase() != "y" && axis[i].toLowerCase() != "z") {
              flagaxis = false;
              break;
            }
          }
        }
        if (!flagaxis) {
          res.send({ "result": {}, "error": "axis参数错误" });
          return;
        }
        var blockColor = req.body.blockColor || "{}";
        blockColor = JSON.parse(blockColor);
        var buf = box3tools.blocks2vox(blockDat, axis, blockColor);
        res.send({ "result": utility.base64encode(buf) })
      } catch (e) {
        res.send({ "result": {}, "error": `internal error ${e.message}` })
      }
    })
  }, map2pic() {
    router.get('/map2pic', function (req, res, next) {
      res.render('map2pic', renderArgs({ title: "岛三俯视图转换工具" }, req, res));
    });
    // map2pic实际上不需要api，可以canvas渲染
    // router.post("/api/map2pic", function (req, res, next) {
    //   try {
    //     var blockDat = JSON.parse(req.body.blockDat);
    //     var blockColor = req.body.blockColor || "{}";
    //     var mapsize=parseInt(req.body.mapsize||256)-1;
    //     blockColor = JSON.parse(blockColor);
    //     let tmp_path=`./tmp/${Date.now()}.png`;
    //     if(IS_VERCEL&&has_tmp_fs){
    //       tmp_path=`/tmp/${Date.now()}.png`;
    //     }
    //     box3tools.map2pic(blockDat, mapsize, "black", blockColor,tmp_path).then(()=>{
    //       res.sendFile(tmp_path,{root:__dirname+'/../'})
    //     })
    //   } catch (e) {
    //     res.send({ "result": {}, "error": `internal error ${e.message}` })
    //   }
    // })
  }
}

var _env_ENABLED_CONVERTORS = process.env.ENABLED_CONVERTORS || Object.keys(CONVERTORS).join(",");
var ENABLED_CONVERTORS = Object.keys(CONVERTORS);
try {
  ENABLED_CONVERTORS = _env_ENABLED_CONVERTORS.split(",").map(function (v) { return v.trim() });
} catch (e) {
  console.log(`unable to parse ENABLED_CONVERTORS: ${e}`)
}
console.log("ENABLED_CONVERTORS=" + ENABLED_CONVERTORS);

// DRAWER update\
for (let i = DRAWER.length - 1; i >= 0; i--) {
  if (DRAWER[i].convertor != undefined && !ENABLED_CONVERTORS.includes(DRAWER[i].convertor)) {
    DRAWER.splice(i, 1);
  }
}
console.log("DRAWER=" + JSON.stringify(DRAWER));

router.get('/', function (req, res, next) {
  res.render("index", renderArgs({}, req, res));
});

Object.keys(CONVERTORS).forEach((cid) => {
  if (ENABLED_CONVERTORS.includes(cid)) {
    CONVERTORS[cid]();
    console.log(`enabled convertor ${cid}`)
  }
})

module.exports = router;
