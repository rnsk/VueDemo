<template>
    <div class="camera">
        <video ref="preview" id="preview" width="640" height="480" autoplay></video>
        <p>
            <b-button
            v-if="isRecording"
            @click="stop"
            class="button is-warning"
            icon-pack="fa"
            icon-left="stop">Stop Recording
            </b-button>
            <b-button
            v-else
            @click="start"
            class="button is-info"
            icon-pack="fa"
            icon-left="play">Start Recording
            </b-button>
            <b-button
            v-if="isRecorded"
            @click="download"
            class="button is-dark"
            icon-pack="fa"
            icon-left="download">Download
            </b-button>
        </p>
        <video ref="video" id="video" width="640" height="480" autoplay></video>
    </div>
</template>

<script>
export default {
    name: 'recording',
    data() {
        return {
            preview: {},
            video: {},
            recorder: {},
            recordedChunks: [],
            isRecording: false,
            isRecorded: false
        }
    },
    mounted() {
        
    },
    methods: {
        start() {
            this.preview = this.$refs.preview;
            this.video = this.$refs.video;
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: {
                        facingMode: 'environment',
                        // frameRate: { ideal: 5, max: 15 }// Firefox では指定できない
                    }
                })
                .then(stream => {
                    this.isRecording = true
                    this.isRecorded = false
                    this.video.src = null
                    this.preview.srcObject = stream;
                    this.preview.setAttribute('playsinline', true)// required to tell iOS safari we don't want fullscreen
                    this.preview.play()
                })
                .then(() => {
                    this.recorder = new MediaRecorder(
                        this.preview.captureStream(),
                        { mimeType: 'video/webm;codecs=vp9' })
                    this.recorder.ondataavailable = this.recording
                    this.recorder.start()
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        recording(event) {
            if (event.data.size > 0) {
                let outputdata = window.URL.createObjectURL(event.data)
                this.video.src = outputdata
                this.recordedChunks.push(event.data);
            }
        },
        stop() {
            this.recorder.stop()
            this.preview.pause();
            let stream = this.preview.srcObject;
            if (stream != null) {
                let tracks = stream.getTracks();
                tracks.forEach(function (track) {
                    track.stop();
                });
            }
            this.isRecording = false
            this.isRecorded = true
        },
        download() {
            var blob = new Blob(this.recordedChunks, {
                type: 'video/webm'
            });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = url;
            a.download = 'test.webm';
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }
}
</script>

<style scoped>
#video {
    background-color: #000;
}
</style>
