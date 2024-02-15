const bl2c = require("./blocks2color");
const Color = require("color");
const ImageJS = require("imagejs");
const { Writable } = require('stream');

// 创建一个自定义的Writable流  
class BufferWriter extends Writable {
    constructor(options) {
        super(options);
        this.buffer = Buffer.alloc(0);
    }

    _write(chunk, encoding, callback) {
        this.buffer = Buffer.concat([this.buffer, chunk], this.buffer.length + chunk.length);
        callback();
    }

    getBuffer() {
        return this.buffer;
    }
}
async function map2pic(surfacedata,mapsize,DEFAULT_COLOR,CUSTROM_BLOCKS) {
    let bitmap = new ImageJS.Bitmap({ width: mapsize, height: mapsize, color: { r: 255, g: 255, b: 255 } });
    let surfacedata_2_vec = {}
    let vec_2_surfacedata = {}
    cnt = 0
    for (let x = 0; x < mapsize; x++) {
        for (let z = 0; z < mapsize; z++) {
            surfacedata_2_vec[cnt] = [x, z];
            vec_2_surfacedata[`${x},${z}`] = cnt;
            cnt++;
        }
    }
    console.log(surfacedata.length, mapsize, mapsize * mapsize)
    var BLOCKS = Object.assign(Object.assign({}, bl2c.BLOCKS), CUSTROM_BLOCKS);
    for (let x = 0; x < mapsize; x++) {
        for (let z = 0; z < mapsize; z++) {
            let block_id = surfacedata[vec_2_surfacedata[`${x},${z}`]];
            let block_name = bl2c.box3.voxels.name(block_id)
            let block_color = DEFAULT_COLOR;
            if (BLOCKS[block_name]) {
                block_color = BLOCKS[block_name];
            }
            block_color = Color(block_color).object();
            //console.log(block_id,block_name,block_color)
            bitmap.setPixel(x, z, block_color);
        }
    }
    let stream = new BufferWriter();
    await bitmap.write(stream, { type: ImageJS.ImageType.PNG });
    return stream.getBuffer();
}

module.exports = {
    map2pic
}