<template>
  <div class="midi">
    <p class="text-center">
        <button
            type="button"
            class="button is-primary"
            @click="play()">Play "C4"
        </button>
        <button
            type="button"
            class="button is-warning"
            @click="requestMIDI()">Connect
        </button>
    </p>
  </div>
</template>

<script>
import Tone from 'tone';

export default {
  name: 'midi',
  data() {
    return {
      synth: {}
    }
  },
  mounted() {
    this.synth = new Tone.Synth().toMaster();
  },
  methods: {
    play() {
      this.synth.triggerAttackRelease('C4', '8n');
    },
    requestMIDI() {
      if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess({ sysex: false })
          .then(this.onMIDISuccess, this.onMIDIFailure);
      } else {
        this.onMIDIFailure();
      }
    },
    onMIDISuccess(data) {
      console.log('success!!!', data);
      let devices = [];

      // MIDIの入力デバイスを取得
      let inputs = data.inputs.values();
      for (let input = inputs.next(); !input.done; input = inputs.next()) {
        let value = input.value;
        devices.push(value);
        value.addEventListener('midimessage', this.onMIDIMessage, false);
      }
    },
    onMIDIFailure(error) {
      console.error('error!!!', error);
    },
    onMIDIMessage(message) {
      console.log(message.data);
    }
  }
}
</script>
