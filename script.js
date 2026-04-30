let memes;

fetch("memes.json")
  .then(r => r.json())
  .then(d => memes = d);

function rand(a){
  return a[Math.floor(Math.random()*a.length)];
}

function money(){
  return Math.floor(Math.random()*800000).toLocaleString();
}

function id(){
  return "MT-" + Math.floor(Math.random()*9999999);
}

function level(){
  return rand(["LEVEL 1 可識別","LEVEL 2 模糊","LEVEL 3 匿名","LEVEL 4 不存在"]);
}

function time(){
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
  document.getElementById("rmoney").innerText = money();
  document.getElementById("rid").innerText = id();
  document.getElementById("rtime").innerText = time();
  document.getElementById("rlevel").innerText = level();
}

function spam(){
  let t = "";
  for(let i=0;i<8;i++){
    t += generateMeme()+"\n\n";
  }
  document.getElementById("result").innerText = t;
}

function download(){
  html2canvas(document.getElementById("receipt")).then(c=>{
    let a=document.createElement("a");
    a.download="meme_receipt.png";
    a.href=c.toDataURL();
    a.click();
  });
}