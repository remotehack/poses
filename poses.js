// https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/

// <script type="module" >

// module.exports =

/**
 * Returns the poses
 */
export const getPoseFromImage = async (imageElement) => {

    const net = await posenet.load();

    const scaleFactor = 0.50;
    const flipHorizontal = false;
    const outputStride = 16;
    const pose = await net.estimateSinglePose(imageElement, scaleFactor, flipHorizontal, outputStride);


    return pose;
}

export class PoseEvent extends Event {
    constructor(data) {
        super('pose')
        this.data = data;
    }
}




export class PoseStream extends EventTarget {
    constructor(root) {
        super()
        this.root = root || document.body
        this.delay = 100
    }
    async start() {
        this.video = document.createElement('video')
        this.video.style.transform = 'scaleX(-1)'
        this.root.appendChild(this.video);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        this.video.srcObject = stream;
        this.video.width = 640;
        this.video.height = 480;

        await new Promise(resolve => setTimeout(resolve, 500))

        this.video.play()

        this.pose = null;

        this.control = new AbortController();
        this.loop()

    }

    stop() {
        this.control.abort()
    }

    async loop() {

        const net = await posenet.load();

        const scaleFactor = 0.50;
        const flipHorizontal = true;
        const outputStride = 16;

        while (!this.control.signal.aborted) {

            try {
                this.pose = await net.estimateSinglePose(this.video, { scaleFactor, flipHorizontal, outputStride });


                const ev = new MessageEvent('pose', { data: this.pose });


                this.dispatchEvent(ev)
            } catch (e) {
                console.log(e)
            }

            await new Promise(resolve => setTimeout(resolve, 200))

        }

        console.log('stopped')
    }
}



export const getPoseFromVideo = (video, callback) => {

}


export const getDemoPose = async () => ({
    "score": 0.7061188659247231,
    "keypoints": [
        {
            "score": 0.9989023208618164,
            "part": "nose",
            "position": {
                "x": 145.20192424610894,
                "y": 98.32286612069097
            }
        },
        {
            "score": 0.999750554561615,
            "part": "leftEye",
            "position": {
                "x": 151.84357639416646,
                "y": 88.1811475939324
            }
        },
        {
            "score": 0.997585654258728,
            "part": "rightEye",
            "position": {
                "x": 135.99740113729635,
                "y": 92.36018258773865
            }
        },
        {
            "score": 0.9808627367019653,
            "part": "leftEar",
            "position": {
                "x": 167.0472438233372,
                "y": 86.8098871253344
            }
        },
        {
            "score": 0.7141686677932739,
            "part": "rightEar",
            "position": {
                "x": 129.78992091078703,
                "y": 99.29844600217353
            }
        },
        {
            "score": 0.9429682493209839,
            "part": "leftShoulder",
            "position": {
                "x": 197.2685342632843,
                "y": 109.5191154034685
            }
        },
        {
            "score": 0.9836947917938232,
            "part": "rightShoulder",
            "position": {
                "x": 124.45055297376581,
                "y": 128.43529964699357
            }
        },
        {
            "score": 0.9188609719276428,
            "part": "leftElbow",
            "position": {
                "x": 235.23007404015686,
                "y": 61.04552272692729
            }
        },
        {
            "score": 0.9698950052261353,
            "part": "rightElbow",
            "position": {
                "x": 66.88497669501992,
                "y": 121.68716846273105
            }
        },
        {
            "score": 0.7104167342185974,
            "part": "leftWrist",
            "position": {
                "x": 210.79000035148653,
                "y": 19.50697843202822
            }
        },
        {
            "score": 0.929177463054657,
            "part": "rightWrist",
            "position": {
                "x": 64.15572556076347,
                "y": 88.71007837674034
            }
        },
        {
            "score": 0.8141899704933167,
            "part": "leftHip",
            "position": {
                "x": 198.15805635563595,
                "y": 218.86161477649262
            }
        },
        {
            "score": 0.7019696831703186,
            "part": "rightHip",
            "position": {
                "x": 145.4365414868069,
                "y": 220.66215782313958
            }
        },
        {
            "score": 0.14105083048343658,
            "part": "leftKnee",
            "position": {
                "x": 187.3199403517905,
                "y": 257.66752369209024
            }
        },
        {
            "score": 0.14896400272846222,
            "part": "rightKnee",
            "position": {
                "x": 151.0086297061193,
                "y": 260.98112707472035
            }
        },
        {
            "score": 0.019431542605161667,
            "part": "leftAnkle",
            "position": {
                "x": 134.44128073606976,
                "y": 249.09708342199662
            }
        },
        {
            "score": 0.03213154152035713,
            "part": "rightAnkle",
            "position": {
                "x": 138.72064078364392,
                "y": 250.17494765700997
            }
        }
    ]
})