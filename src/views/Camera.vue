<template>
    <div class="camera">
        <video ref="video" id="video" width="640" height="480" autoplay></video>
        <p><button
            @click="capture"
            class="button is-success">Snap Photo
            </button></p>
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
            captures: []
        }
    },
    mounted() {
        this.video = this.$refs.video;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: 'environment',
                    // frameRate: { ideal: 5, max: 15 }// Firefox では指定できない
                }
            }).then(stream => {
                this.video.srcObject = stream;
                this.video.setAttribute('playsinline', true);// required to tell iOS safari we don't want fullscreen
                this.video.play();
            }).catch(error => {
                console.log(error);
            });
        }
    },
    methods: {
        capture() {
            this.canvas = this.$refs.canvas;
            this.canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 480);
            this.captures.push(canvas.toDataURL('image/png'));
        },
        destroy(index) {
            this.captures.splice(index, 1)
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
