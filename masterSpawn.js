const fs = require('fs');
const child_process = require('child_process');

for(var i=0; i<3; i++){
  var workerProcess = child_process.spawn('node', ['supportSpawn.js', i])
  workerProcess.stdout.on('data', function (data){
    console.log('stdout: ' + data)
  })

  
}
