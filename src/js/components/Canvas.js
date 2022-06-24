const { FPS } = require('../const');

let instance = null;

class Canvas {
    face = undefined;
    progressRatioOnRemoteHR = undefined;
    remoteHR = undefined;
    progressRatioOnHRV = undefined;
    hrv = undefined;
    engagement = undefined;

    constructor() {
        if (instance) {
            return instance;
        }
        this.video = document.getElementById("video");
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = "#ec008c";
        this.ctx.fillStyle = "#ec008c";
        this.ctx.lineWidth = "3";
        this.ctx.font = "20px gulim";
        this.video.addEventListener("play", function() {
            setTimeout(instance._draw(instance), 0);
        }, false);
        instance = this;
    }

    draw(face, progressRatioOnRemoteHR, remoteHR, progressRatioOnHRV, hrv, engagement) {
        this.face = face
        this.progressRatioOnRemoteHR = progressRatioOnRemoteHR;
        this.remoteHR = remoteHR;
        this.progressRatioOnHRV = progressRatioOnHRV;
        this.hrv = hrv;
        this.engagement = engagement;   
    }

    _draw(obj) {
        obj.ctx.beginPath();
        // obj.ctx.drawImage(obj.video, 0, 0, obj.video.width, obj.video.height);

        if (obj.face) {
            if (obj.face.getIsDetect()) {
                obj.ctx.beginPath();
                obj.ctx.rect(obj.face.getX(), obj.face.getY(), obj.face.getW(), obj.face.getH());
                obj.ctx.stroke();

                if (obj.progressRatioOnRemoteHR) {
                    obj.ctx.fillText("Progress on HR: " + obj.progressRatioOnRemoteHR.getProgress() + "%", 10, 20);
                }

                if (obj.remoteHR) {
                    obj.ctx.fillText("HR: " + obj.remoteHR.getHR() + "(bpm)", 10, 50);
                }

                if (obj.progressRatioOnHRV) {
                    obj.ctx.fillText("Progress on HRV: " + obj.progressRatioOnHRV.getProgress() + "%", 10, 80);
                }

                if (obj.hrv) {
                    obj.ctx.fillText("HRV-SDNN: " + obj.hrv.getSdnn() + "ms2", 10, 110);
                }

                if (obj.engagement) {
                    obj.ctx.fillText("Engagement: " + obj.engagement.getEmotionStr(), 10, 140);
                }
            }   
        }

        setTimeout(function(){ obj._draw(obj) }, 1000 / FPS);
    }

    static getInstance() {
        return new ESRCCanvas();
    }
}

export { Canvas };