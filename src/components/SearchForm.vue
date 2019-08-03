<template>
    <div>
        <div class="field">
            <label class="label">Post ID</label>
            <div class="control">
                <input class="input" type="text" placeholder="Post ID" v-model="q" @input="onInput">
            </div>
            <p class="help">検索先API: <a href="https://jsonplaceholder.typicode.com/comments">JSONPlaceholder</a></p>
        </div>
        <hr>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        url: String,
    },
    data() {
        return {
            q: ''
        }
    },
    methods: {
        async onInput() {
            this.$emit('loadStart')// イベント発火
            const { data } = await axios.get(this.url + '?postId=' + this.q);
            this.$emit('loadResults', { results: data })// イベント発火
        }
    }
}
</script>
