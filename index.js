const cp = require('child_process');
const exec = cp.exec;
const execs = cp.execSync;
const spawn = cp.spawn;
const spawns = cp.spawnSync;
const fs = require('fs');
const read = fs.readFile;
const reads = fs.readFileSync;

var originalPackage = JSON.parse(reads('package.json').toString());
//console.log(originalPackage)
var child;


function autoRun(){
    execs('git pull');
    var newPackage = JSON.parse(reads('package.json').toString());
    console.log('scan...')

    if(originalPackage.version != newPackage.version){
        originalPackage = newPackage;
        console.log('new version!!!\n')
        restartProcess();
    }
}

function startProcess(){
    child = spawn(originalPackage.scripts.test,{shell:true});
}

function endProcess(){
    child.kill();
}

function restartProcess(){
    endProcess();

    while(!child.killed){
        // no code here just waiting
    }

    startProcess();
}

module.exports = () =>{
    startProcess();

    var autoTime = setInterval(autoRun, 10000); 
}