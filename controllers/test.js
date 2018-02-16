// const p1 = Promise.resolve(3);
// const p2 = 42;

// const p3 = new Promise( (resolve, reject) => {
//     //setTimeout( ()=> console.log('gg'), 3000 )
//     setTimeout(resolve, 4000, 'foo');
// });
// const p4 = new Promise( (resolve, reject) => {
//     //setTimeout( ()=> console.log('gg'), 3000 )
//     setTimeout(resolve, 4000, 'foo');
// });

// ff()
// async function ff(){
//     console.log( await p1 )
//     console.log( await p2 )
//     console.log( await p3 )
//     console.log(  await p4 )
// }
// async function gg(){
//     console.log( await Promise.all([p1, p2, p3]) )
//     //const all = await Promise.all([p1, p2, p3])
//     //console.log(all)
// }
// function hh(){
//     Promise.all([p1, p2, p3]).then( v => console.log(v) );
// }#
var appRoot = require('app-root-path');
// var split = __filename.split('\\')

//    console.log(appRoot.path)
    //console.log(__filename)

   var ret = __filename.replace(appRoot.path,'');
   global.ret = ret
   console.log(ret)
//console.log(require('app-root-path').path)