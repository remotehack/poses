// Nose is a simple triangle
export function playNose(x, y, context) {
    const osc = new OscillatorNode(context, {
        type: 'triangle',
        detune: 0,
        frequency: x
    });
    const gain = new GainNode(context);
    osc.connect(gain).connect(context.destination);
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1);
    osc.start();
    osc.stop(context.currentTime + 1);
}

// Frequency modulation
export function playEar(x, y, context, playLength = 1) {
    const osc = context.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = y;

    const amp = context.createGain();
    amp.gain.value = 1;

    const lfo = context.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = x / 10;

    lfo.connect(amp.gain);
    osc.connect(amp).connect(context.destination);
    lfo.start();
    osc.start();
    osc.stop(context.currentTime + playLength);
}

// Noise buffer for hihat
export function playEye(x, y, context, playLength = 1) {
    const bufferSize = context.sampleRate * playLength;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate); // create an empty buffer
    let data = buffer.getChannelData(0); // get data

    // fill the buffer with noise
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    // create a buffer source for our created data
    let noise = context.createBufferSource();
    noise.buffer = buffer;

    let bandpass = context.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = x;

    // connect our graph
    noise.connect(bandpass).connect(context.destination);
    noise.start();
    noise.stop(context.currentTime + playLength);
}

// Noise buffer for kick
export function playShoulder(x, y, context, playLength = 0.5) {
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.frequency.setValueAtTime(y, context.currentTime);
    gain.gain.setValueAtTime(1, context.currentTime);

    osc.frequency.exponentialRampToValueAtTime(0.01, context.currentTime + playLength);
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + playLength);

    // connect our graph
    osc.connect(gain).connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + playLength);
}
//
export function playWrist() { }
//
export function playElbow() { }