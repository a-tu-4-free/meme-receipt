let memes;

fetch("memes.json")
  .then(res => res.json())
  .then(data => memes = data);

function rand(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function randomMoney(){
  return Math.floor(Math.random()*1000000).toLocaleString();
}

function randomId(){
  return "MT-" + Math.floor(Math.random()*999999);
}

function nowTime(){
  return new Date().toLocaleString();
}

function generateMeme(){

  if(Math.random() < 0.08){
    return rand(memes.rare);
  }

  return rand(memes.openings)
       + rand(memes.usages)
       + "，"
       + rand(memes.endings);
}

function generate(){
  document.getElementById("result").innerText = generateMeme();
  document.getElementById("rmoney").innerText = randomMoney();
  document.getElementById("rid").innerText = randomId();
  document.getElementById("rtime").innerText = nowTime();
}

function spam(){
  let text = "";
  for(let i=0;i<10;i++){
    text += generateMeme() + "\n\n";
  }
  document.getElementById("result").innerText = text;
  document.getElementById("rmoney").innerText = randomMoney();
  document.getElementById("rid").innerText = randomId();
  document.getElementById("rtime").innerText = nowTime();
}

function download(){
  const receipt = document.getElementById("receipt");

  html2canvas(receipt).then(canvas => {
    const link = document.createElement("a");
    link.download = "meme_receipt.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}