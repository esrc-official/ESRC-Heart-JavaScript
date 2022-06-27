const {
    APP_ID,
    ENABLE_MEASURE_ENV,
    ENABLE_FACE,
    ENABLE_REMOTE_HR,
    ENABLE_HRV,
    ENABLE_ENGAGEMENT
} = require('./const');

let instance = null;

class ESRCAction {
    constructor() {
        if (instance) {
            return instance;
        }        
        instance = this;
    }

    init(oninitCallback) {
        ESRC.initWithApplicationId(APP_ID, (isValid) => {
            if (isValid) {
                const esrc = ESRC.getInstance();
                console.log("ESRC Heart SDK " + esrc.getSDKVersion() + " is loaded.");

                this.measureEnv = new ESRCType.ESRCMeasureEnv();
                this.face = new ESRCType.ESRCFace();
                this.progressRatioOnRemoteHR = new ESRCType.ESRCProgressRatio();
                this.remoteHR = new ESRCType.ESRCRemoteHR();
                this.progressRatioOnHRV = new ESRCType.ESRCProgressRatio();
                this.hrv = new ESRCType.ESRCHRV();
                this.engagement = new ESRCType.ESRCEngagement();
                this.property = new ESRCType.ESRCProperty(
                    ENABLE_MEASURE_ENV,  // Whether analyze measurement environment or not.
                    ENABLE_FACE,  // Whether detect face or not.
                    ENABLE_REMOTE_HR,  // Whether estimate remote hr or not.
                    ENABLE_HRV,  // Whether analyze HRV or not. If enableRemoteHR is false, it is also automatically set to false.
                    ENABLE_ENGAGEMENT  // Whether recognize engagement or not. If enableRemoteHR is false, it is also automatically set to false.
                );
                this.handler = new ESRCHandler();
                this.handler.onAnalyzeMeasureEnv = function(_measureEnv) {
                    // console.log("onAnalyzeMeasureEnv: " + _measureEnv.toString());
                    ESRCAction.getInstance().measureEnv.setMeasureEnv(_measureEnv);
                }
                this.handler.onDetectedFace = function(_face) {
                    // console.log("onDetectedFace: " + _face.toString());
                    ESRCAction.getInstance().face.setFace(_face);
                }
                this.handler.didChangedProgressRatioOnRemoteHR = function(_progressRatio) {
                    console.log("didChangedProgressRatioOnRemoteHR: " + _progressRatio.toString());
                    ESRCAction.getInstance().progressRatioOnRemoteHR.setProgressRatio(_progressRatio);
                }
                this.handler.onEstimatedRemoteHR = function(_remoteHR) {
                    console.log("onEstimatedRemoteHR: " + _remoteHR.toString());
                    ESRCAction.getInstance().remoteHR.setRemoteHR(_remoteHR)
                }
                this.handler.didChangedProgressRatioOnHRV = function(_progressRatio) {
                    console.log("didChangedProgressRatioOnHRV: " + _progressRatio.toString());
                    ESRCAction.getInstance().progressRatioOnHRV.setProgressRatio(_progressRatio);
                }
                this.handler.onAnalyzedHRV = function(_hrv) {
                    console.log("onAnalyzedHRV: " + _hrv.toString());
                    ESRCAction.getInstance().hrv.setHRV(_hrv);
                }
                this.handler.onRecognizedEngagement = function(_engagement) {
                    console.log("onRecognizedEngagement: " + _engagement.toString());
                    ESRCAction.getInstance().engagement.setEngagement(_engagement);
                }

                oninitCallback();
            } else {
                alert("Please input valid license");
            }
        });
    }

    start() {
        this.measureEnv = new ESRCType.ESRCMeasureEnv();
        this.face = new ESRCType.ESRCFace();
        this.progressRatioOnRemoteHR = new ESRCType.ESRCProgressRatio();
        this.remoteHR = new ESRCType.ESRCRemoteHR();
        this.progressRatioOnHRV = new ESRCType.ESRCProgressRatio();
        this.hrv = new ESRCType.ESRCHRV();
        this.engagement = new ESRCType.ESRCEngagement();

        ESRC.start(this.property, this.handler);
    }

    stop() {
        ESRC.stop();
    }

    feed(frame, id) {
        const mat = new ESRCType.ESRCMat(frame, id);
        ESRC.feed(mat);
    }

    static getInstance() {
        return new ESRCAction();
    }
}

export { ESRCAction };