<template>
    <div>
        <Loading class="loading" v-show="loading"/>
        <ul v-show="!loading" class="list">
            <li
                v-for="item of items" :key="item.id"
                class="list-item">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue'

export default {
    props: ['items', 'loading'],
    components: {
        Loading
    }
}
</script>
