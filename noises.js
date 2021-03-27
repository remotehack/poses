// Nose is a simple triangle
export function playTri(x, y, context, playLength = 0.5) {
    const osc = new OscillatorNode(context, {
        type: 'triangle',
        detune: 0,
        frequency: x
    });
    const gain = new GainNode(context);
    osc.connect(gain).connect(context.destination);
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + playLength);
    osc.start();
    osc.stop(context.currentTime + playLength);
}

// Frequency modulation
export function playPulse(x, y, context, playLength = 0.5) {
    const osc = context.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = y;

    const amp = context.createGain();
    amp.gain.value = 0.5;

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
export function playNoise(x, y, context, playLength = 0.1) {
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

    const bandpass = context.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = x;

    const gain = context.createGain();
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + playLength)

    // connect our graph
    noise.connect(bandpass).connect(gain).connect(context.destination);
    noise.start();
    noise.stop(context.currentTime + playLength);
}

// Noise buffer for kick
export function playKick(x, y, context, playLength = 0.5, startTime = 0.5) {
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.frequency.value = y;
    gain.gain.value = 1;

    osc.frequency.exponentialRampToValueAtTime(0.01, context.currentTime + startTime + playLength);
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + startTime + playLength);

    // connect our graph
    osc.connect(gain).connect(context.destination);
    osc.start(context.currentTime + startTime);
    osc.stop(context.currentTime + startTime + playLength);
}
//
export function playWrist() { }
//
export function playElbow() { }