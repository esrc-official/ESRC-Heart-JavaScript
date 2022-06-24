const { FPS } = require('../const');

let instance = null;

class Camera {
    constructor() {
        if (instance) {
            return instance;
        }
        this.video = document.getElementById("video");
        this.fps = FPS;
        this.streaming = false;
        instance = this;
    }

    load(onloadCallback) {
        this.capture = new cv.VideoCapture(this.video);
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream) => {
                this.video.srcObject = stream;
                onloadCallback();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    start(oncaptureCallback) {
        if (!this.streaming) {
            this.streaming = true;
            this.oncaptureCallback = oncaptureCallback;
            this.frame = new cv.Mat(this.video.height, this.video.width, cv.CV_8UC4);
            this.frameBGR = new cv.Mat(this.video.height, this.video.width, cv.CV_8UC3);
            this.id = 0;
            this.video.play();

            setTimeout(this._process(instance), 0);
        }
    }

    stop() {
        if (this.streaming) {
            this.streaming = false;
            this.video.pause();
        }
    }

    _process(obj) {
        try {
            if (!obj.streaming) {
                obj.frame.delete();
                obj.frameBGR.delete();
                return;
            }
            let begin = Date.now();

            obj.capture.read(obj.frame);            
            cv.cvtColor(obj.frame, obj.frameBGR, cv.COLOR_RGB2BGR, 0);       
            obj.oncaptureCallback(obj.frameBGR, obj.id);

            obj.id += 1;
            let delay = 1000 / obj.fps - (Date.now() - begin);
            setTimeout(function(){ obj._process(obj) }, delay);
        } catch (err) {
            console.error(err);
        }
    }

    static getInstance() {
        return new Camera();
    }
}

export { Camera };