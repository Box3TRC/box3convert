const writeVox = require("vox-saver");
// const bl2c = require("./blocks2color");

// let blockDat = {"0,3,0":131,"0,3,1":131,"0,3,2":131,"0,3,3":131,"0,3,4":131,"0,4,0":131,"0,4,1":131,"0,4,2":131,"0,4,3":131,"0,4,4":131,"1,3,0":131,"1,3,1":131,"1,3,2":131,"1,3,3":131,"1,3,4":131,"1,4,0":131,"1,4,1":131,"1,4,2":131,"1,4,3":131,"1,4,4":131,"1,5,1":131,"1,5,2":131,"1,5,3":131,"1,6,2":131,"2,0,2":133,"2,1,2":133,"2,2,2":133,"2,3,0":131,"2,3,1":131,"2,3,2":131,"2,3,3":131,"2,3,4":131,"2,4,0":131,"2,4,1":131,"2,4,2":131,"2,4,3":131,"2,4,4":131,"2,5,1":131,"2,5,2":131,"2,5,3":131,"2,6,1":131,"2,6,2":131,"2,6,3":131,"3,3,0":131,"3,3,1":131,"3,3,2":131,"3,3,3":131,"3,3,4":131,"3,4,0":131,"3,4,1":131,"3,4,2":131,"3,4,3":131,"3,4,4":131,"3,5,1":131,"3,5,2":131,"3,5,3":131,"3,6,2":131,"4,3,0":131,"4,3,1":131,"4,3,2":131,"4,3,3":131,"4,3,4":131,"4,4,0":131,"4,4,1":131,"4,4,2":131,"4,4,3":131,"4,4,4":131};
// let xyziValues = [];
// let error = false;
// var size={x:0,y:0,z:0}
// for (let pos of Object.keys(blockDat)) {
//     try {
//         let [x, y, z] = pos.split(",").map(Number);
//         if(x>size.x)size.x=x;
//         if(y>size.y)size.y=y;
//         if(z>size.z)size.z=z;
//         let dat={ x, y, z, i: bl2c.block2colorindex[bl2c.box3.voxels.name(blockDat[pos])]};
//         console.log(dat)
//         xyziValues.push(dat);
//     } catch (e) {
//         throw e;
//     }
// }
// const vox = {
//     size: size,
//     xyzi: {
//         numVoxels: xyziValues.length,
//         values: xyziValues
//     },
//     rgba: {
//         values: bl2c.rgba_values
//     }
// }
const fs=require("fs");

// const writtenVox = writeVox(vox)
// fs.writeFileSync('./tree.vox', Buffer.from(writtenVox))

//利用reduce实现
function flatten(arr) {
    return arr.reduce(function (prev, next) {
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}
function range(m,n){
    return Array.from({length: (n - m) + 1}, (_, i) => m + i);
}

const SIZE = 20;
const RADIUS = 8;

const checkIfInsideSphere = (x , y, z ) => {

    const cx = x - SIZE / 2;
    const cy = y - SIZE / 2;
    const cz = z - SIZE / 2;

    return cx * cx + cy * cy + cz * cz < RADIUS * RADIUS;
}

const xyziValues = 
    flatten(range(0, SIZE).map((z) => 
        range(0, SIZE).map((y) => 
            range(0, SIZE).map((x) => 
                ({ x, y, z, i: 1 })
            )
        )
    ))
    .filter((v) => checkIfInsideSphere(v.x, v.y, v.z))


const vox = {
    size: { x: SIZE, y: SIZE, z: SIZE },
    xyzi: {
        numVoxels: xyziValues.length,
        values: xyziValues
    },
    rgba: {
        values: range(0, 255).map(() => ({r: 255, g: 255, b: 255, a: 255}))
    }
}
console.log(JSON.stringify(vox))
const writtenVox = writeVox(vox)
fs.writeFileSync('./sphere.vox', Buffer.from(writtenVox))
