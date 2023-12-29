
	var audio;
	var sound = 0;
	var sound2 = 0;
	var AudioNullSum;
	var mokugyo = new Audio('assets/mokugyo.mp3');
		
	//se001
    AFRAME.registerComponent('se001', {
        init: function () {
            var marker = this.el;
            // マーカーを検出したイベントの登録
            marker.addEventListener('markerFound', function () {
                var markerId = marker.id;
                console.log('se001_found', markerId);
				audio = new Audio('assets/sound.mp3');
				sound = 1;
            });
            // マーカーを見失ったイベントの登録
            marker.addEventListener('markerLost', function () {
                var markerId = marker.id;
                console.log('se001_lost', markerId);
				sound = 0;
            });
        }
    });
		
	//se002
    AFRAME.registerComponent('se002', {
        init: function () {
            var marker = this.el;
            // マーカーを検出したイベントの登録
            marker.addEventListener('markerFound', function () {
                var markerId = marker.id;
                console.log('se002_found', markerId);
				audio = new Audio('assets/sound2.mp3');
				sound2 = 1;
            });
            // マーカーを見失ったイベントの登録
            marker.addEventListener('markerLost', function () {
                var markerId = marker.id;
                console.log('se002_lost', markerId);
				sound2 = 0;
            });
        }
    });
