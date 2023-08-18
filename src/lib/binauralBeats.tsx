const binauralBeats: BinauralBeats = {
  //set volume
  volume : function(ctx, left, right) {
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1, ctx.currentTime)
    gain.connect(ctx.destination)

    left.connect(gain);
    right.connect(gain);
  },

  //set frequency
  frequency : function(ctx, leftOscillator, rightOscillator, left, right) {
    leftOscillator.type = "sine"
    leftOscillator.frequency.setValueAtTime(left, ctx.currentTime)
    rightOscillator.type = "sine"
    rightOscillator.frequency.setValueAtTime(right, ctx.currentTime)
  },

  //play the audio
  play : function(ctx, leftOscillator, rightOscillator, time) {
    const duration = ctx.currentTime + time;
    leftOscillator.start();
    rightOscillator.start();
    
    leftOscillator.stop(duration);
    rightOscillator.stop(duration);
  },

  //initialize
  init : function(ctx, left, right, time) {
    //create oscillators
    const leftOscillator = ctx.createOscillator()
    const rightOscillator = ctx.createOscillator()

    //set frequency
    this.frequency(ctx, leftOscillator, rightOscillator,left, right);
    //set volume and connect oscillator
    this.volume(ctx, leftOscillator, rightOscillator)
    //play the audio
    this.play(ctx, leftOscillator, rightOscillator, time);
  }
}

export default binauralBeats;
