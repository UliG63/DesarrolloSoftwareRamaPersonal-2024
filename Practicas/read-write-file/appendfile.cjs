
const fs = require("fs");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('String a appendear? ', strapp => {
    fs.appendFile("data.txt",strapp,"utf-8");
    console.log('Inicio del archivo');
    const text = fs.readFileSync('data.txt','utf-8');
    console.log(text);
    console.log('Fin del archivo');
    readline.close();
  });

