var cc = require('child_process').spawn('start echo "hai"',{shell:true});

process.on('exit', (code)=> {
    cc.kill();
});