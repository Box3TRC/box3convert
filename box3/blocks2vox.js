const writeVox = require("vox-saver");
const bl2c = require("./blocks2color");
const { axispermedstr } = require("./utils");
// let blockDat = {"0,3,0":131,"0,3,1":131,"0,3,2":131,"0,3,3":131,"0,3,4":131,"0,4,0":131,"0,4,1":131,"0,4,2":131,"0,4,3":131,"0,4,4":131,"1,3,0":131,"1,3,1":131,"1,3,2":131,"1,3,3":131,"1,3,4":131,"1,4,0":131,"1,4,1":131,"1,4,2":131,"1,4,3":131,"1,4,4":131,"1,5,1":131,"1,5,2":131,"1,5,3":131,"1,6,2":131,"2,0,2":133,"2,1,2":133,"2,2,2":133,"2,3,0":131,"2,3,1":131,"2,3,2":131,"2,3,3":131,"2,3,4":131,"2,4,0":131,"2,4,1":131,"2,4,2":131,"2,4,3":131,"2,4,4":131,"2,5,1":131,"2,5,2":131,"2,5,3":131,"2,6,1":131,"2,6,2":131,"2,6,3":131,"3,3,0":131,"3,3,1":131,"3,3,2":131,"3,3,3":131,"3,3,4":131,"3,4,0":131,"3,4,1":131,"3,4,2":131,"3,4,3":131,"3,4,4":131,"3,5,1":131,"3,5,2":131,"3,5,3":131,"3,6,2":131,"4,3,0":131,"4,3,1":131,"4,3,2":131,"4,3,3":131,"4,3,4":131,"4,4,0":131,"4,4,1":131,"4,4,2":131,"4,4,3":131,"4,4,4":131};

function blocks2vox(blockDat, axis,blockColor={}) {
    var BLOCKS=Object.assign({},bl2c.BLOCKS);
    BLOCKS=Object.assign(BLOCKS,blockColor);
    let rgba_values = [];
    let block2colorindex = {};
    for (let block in BLOCKS) {
        let rgb = BLOCKS[block];
        rgba_values.push({ r: rgb.r, g: rgb.g, b: rgb.b, a: 255 });
        block2colorindex[block] = rgba_values.length;
    }
    while (rgba_values.length < 255) rgba_values.push({ r: 0, g: 0, b: 0, a: 0 });

    let xyziValues = [];
    var size = { x: 0, y: 0, z: 0 };
    for (let pos of Object.keys(blockDat)) {
        let [x, y, z] = pos.split(",").map(Number);
        if (x > size.x) size.x = x;
        if (y > size.y) size.y = y;
        if (z > size.z) size.z = z;
        // let dat = { x, y, z, i: bl2c.block2colorindex[bl2c.box3.voxels.name(blockDat[pos])] };
        // xyziValues.push(dat)
    }
    size.x++;
    size.y++;
    size.z++;
    for (let pos of Object.keys(blockDat)) {
        let [x, y, z] = pos.split(",").map(Number);
        [x, y, z] = axispermedstr({ x, y, z }, size, axis);
        let i={r:Math.floor(Math.random()*255),g:Math.floor(Math.random()*255),b:Math.floor(Math.random()*255),a:255};
        if(block2colorindex[bl2c.box3.voxels.name(blockDat[pos])])i=block2colorindex[bl2c.box3.voxels.name(blockDat[pos])];
        let dat = { x, y, z, i: i };
        xyziValues.push(dat)
    }
    
    const vox = {
        size: size,
        xyzi: {
            numVoxels: xyziValues.length,
            values: xyziValues
        },
        rgba: {
            values: rgba_values
        }
    }
    return Buffer.from(writeVox(vox));
}
// require("fs").writeFileSync("out.vox",blocks2vox({"0,3,0":131,"0,3,1":131,"0,3,2":131,"0,3,3":131,"0,3,4":131,"0,4,0":131,"0,4,1":131,"0,4,2":131,"0,4,3":131,"0,4,4":131,"1,3,0":131,"1,3,1":131,"1,3,2":131,"1,3,3":131,"1,3,4":131,"1,4,0":131,"1,4,1":131,"1,4,2":131,"1,4,3":131,"1,4,4":131,"1,5,1":131,"1,5,2":131,"1,5,3":131,"1,6,2":131,"2,0,2":133,"2,1,2":133,"2,2,2":133,"2,3,0":131,"2,3,1":131,"2,3,2":131,"2,3,3":131,"2,3,4":131,"2,4,0":131,"2,4,1":131,"2,4,2":131,"2,4,3":131,"2,4,4":131,"2,5,1":131,"2,5,2":131,"2,5,3":131,"2,6,1":131,"2,6,2":131,"2,6,3":131,"3,3,0":131,"3,3,1":131,"3,3,2":131,"3,3,3":131,"3,3,4":131,"3,4,0":131,"3,4,1":131,"3,4,2":131,"3,4,3":131,"3,4,4":131,"3,5,1":131,"3,5,2":131,"3,5,3":131,"3,6,2":131,"4,3,0":131,"4,3,1":131,"4,3,2":131,"4,3,3":131,"4,3,4":131,"4,4,0":131,"4,4,1":131,"4,4,2":131,"4,4,3":131,"4,4,4":131},"xzy"))
module.exports = {
    blocks2vox
}