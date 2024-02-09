// すでに環境設定でポートが設定されていれば，それに従い，そうでなければ3000番をポート番号として利用する
const PORT = process.env.PORT || 5001

// expressはウェブサービスを提供するモジュール
let express = require('express');

// expressモジュールの初期化．appにexpressモジュールを代入している
let app = express();

// 指定したポート番号でサービス窓口を開始
let server = app.listen(PORT)

// 窓口にお客が来たときにpublic以下のディレクトリファイルを提供する
app.use(express.static('public'));

// ポート番号（サービス窓口番号）確認用出力
console.log("Socket server is running. localhost:" + PORT)

/// socket.ioモジュールの読み込み 
let socket = require('socket.io');

// 先程作成したサービス窓口を 変数 io に代入
let io = socket(server);

var usercount = 0;

// 教えてもらったサービス窓口で socket.io というプロトコルで通信をする
// ユーザの接続があるとconnectionメッセージが最初に送信されるので，そのメーッセージが来たときに呼び出す関数を指定する 
io.sockets.on('connection', newConnection);

// newConnection関数の定義．socketには接続したユーザの情報が含まれている
function newConnection(socket) {
    console.log('connection:', socket.id);
    usercount++;
    // さらに接続したユーザがなにかメッセージを送ってきたらその対応を定義できる
    socket.on('sendMessage', gotMessage);
    function gotMessage(data) {
        // 接続しているユーザ全員にメッセージを転送する
        socket.broadcast.emit('gotMessage', data)
        console.log(data)
    }
}