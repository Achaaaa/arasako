var socket;
var chatlog = {
  name: "Name",
  message: "Sampleee message",
  now: "200001010000"
}

var elapsed_time = 0;
let beat_button = [];
let beat_Status = [];
let pg;

function setup() {
  const myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.position(0, 0);
  select("#send").mouseClicked(sendMessage);
  socket = io.connect(window.location.origin);
  socket.on('gotMessage', gotMessage);
  frameRate(30);
  se = loadSound('assets/se/mokugyo.mp3');
  soundSE = loadSound('assets/sound.mp3');
  for (let i = 0; i < 8; i += 1) {
    beat_button[i] = createButton(i + 1);
    beat_button[i].position(30 * i, 0);
    beat_button[i].style("background", "red");
    beat_button[i].style("border", "none");
    beat_button[i].style("color", "white");
    beat_button[i].style("width", "30px");
    beat_button[i].style("height", "30px");
    beat_button[i].style("border-radius", "5px");
  }
  pg = createGraphics(200, 200);
}

function gotMessage(chatdata) {
  usernum = usercount;
  console.log(chatdata);
  chatlog.name = chatdata.name;
  chatlog.message = chatdata.message;
  chatlog.now = chatdata.nowtime;
  resetSequencer();
}

var beatNum = -1;
var beatNum_prev;
var usernum;
function draw() {
  updateBeatButton();
  background(225, 255, 255, 0);
  pg.background(150, 0, 0);
  pg.erase();
  pg.ellipse(pg.width/2, pg.height/2, 80, 80);
  pg.noErase();
  updateSequencer();
  fill(0);
  text("名前:" + socket.id, width / 2, height / 2);
  text("メッセージ:" + chatlog.message, width / 2, height / 2 + 12);
  text("現在時刻:" + chatlog.now, width / 2, height / 2 + 24);
  text("時間経過" + elapsed_time, width / 2, height / 2 + 36);
  text("ユーザ数" + usernum, width / 2, height / 2 + 48);
}

function updateBeatButton() {
  for (let i = 0; i < 8; i += 1) {
    beat_button[i].mousePressed(() => {
      beat_Status[i] = !beat_Status[i];
    });
    if (beat_Status[i]) {
      beat_button[i].style("background", "green");
    } else beat_button[i].style("background", "black");
  }
}

function updateSequencer() {
  elapsed_time += deltaTime;
  stroke(255, 20, 0);
  noFill();
  strokeWeight(5);
  for (let i = 0; i < 8; i += 1) {
    rect(30 * i, 0, 30, 30);
  }
  stroke(255, 204, 0);
  rect(30 * beatNum, 0, 30, 30);
  noStroke();
  if (1000 < elapsed_time) {
    beatNum++;
    elapsed_time = 0;
  }
  if (beatNum == 8) {
    beatNum = 0;
  }
  if (beatNum_prev != beatNum) {
    if (beat_Status[beatNum]) {
      se.play();
    }
  }
  beatNum_prev = beatNum;

}

function sendMessage() {
  var text_name = document.getElementById("name").value;
  var text_message = document.getElementById("message").value;
  var text_nowtime = str(nf(hour(), 2)) + ":" + str(nf(minute(), 2)) + ":" + str(nf(second(), 2));
  var chatdata = {
    name: text_name,
    message: text_message,
    nowtime: text_nowtime
  }
  chatlog.now = chatdata.nowtime;
  socket.emit('sendMessage', chatdata);
  console.log(chatdata);
  chatlog.name = chatdata.name;
  chatlog.message = chatdata.message;
  resetSequencer();
}

function resetSequencer() {
  elapsed_time = 0;
  beatNum = -1;
  for (let i = 0; i < 8; i += 1) {
    beat_Status[i] = false;
  }
}