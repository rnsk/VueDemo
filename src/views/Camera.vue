<template>
    <div class="camera">
        <video ref="video" id="video" width="640" height="480" autoplay></video>
        <p>
            <b-button
            v-if="isPlaying"
            @click="stop"
            class="button is-warning"
            icon-pack="fa"
            icon-left="stop">Stop Video
            </b-button>
            <b-button
            v-else
            @click="start"
            class="button is-info"
            icon-pack="fa"
            icon-left="play">Start Video
            </b-button>
            <b-button
            v-if="isPlaying"
            @click="capture"
            class="button is-link"
            icon-pack="fa"
            icon-left="camera"> Snap Photo
            </b-button>
        </p>
        <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
        <hr>
        <div class="columns">
            <div
            v-for="(c, i) in captures" :key="i"
            class="column is-2">
                <img :src="c" />
                <p class="has-text-centered">
                    <button
                        type="button"
                        class="button is-danger is-small"
                        @click="destroy(i)">Delete
                    </button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'camera',
    data() {
        return {
            video: {},
            canvas: {},
            captures: [],
            isPlaying: false
        }
    },
    mounted() {
        this.start()
    },
    methods: {
        capture() {
            this.canvas = this.$refs.canvas;
            this.canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 480);
            this.captures.push(canvas.toDataURL('image/png'));
        },
        destroy(index) {
            this.captures.splice(index, 1)
        },
        start() {
            this.video = this.$refs.video;
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        facingMode: 'environment',
                        // frameRate: { ideal: 5, max: 15 }// Firefox では指定できない
                    }
                }).then(stream => {
                    this.isPlaying = true;
                    this.video.srcObject = stream;
                    this.video.setAttribute('playsinline', true);// required to tell iOS safari we don't want fullscreen
                    this.video.play();
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        stop() {
            this.video.pause();
            let stream = this.video.srcObject;
            if (stream != null) {
                let tracks = stream.getTracks();

                tracks.forEach(function (track) {
                    track.stop();
                });
            }

            this.video.srcObject = null;
            this.isPlaying = false;
        }
    }
}
</script>

<style scoped>
#video {
    background-color: #000;
}
#canvas {
    display: none;
}
</style>
