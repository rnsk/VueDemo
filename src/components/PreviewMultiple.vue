<template>
    <div class="preview-multiple has-text-centered">
        <h2>Preview multiple files</h2>
        <div
            @dragover="onDragOver()"
            @dragleave="onDragLeave()"
            @drop="onDragLeave()"
            :class="{'hover': isDragging}"
            class="dropbox hover-style">
            <input
                :name="uploadFieldName"
                :accept="acceptType"
                @change="onFileChange($event.target);"
                type="file"
                class="dropbox__file"
                multiple>
            <p>
                Drag your files here to begin<br> or click to browse
            </p>
        </div>
        <div class="box">
            <p v-if="items == ''">
                    ここに表示されます。</p>
            <div v-else class="columns">
                <div
                    v-for="(item, i) in items" :key="i"
                    class="column is-3">
                    <img
                        v-if="item.fileUrl"
                        :src="item.fileUrl"
                        alt="preview">
                    <p class="text-center">
                        <button
                            type="button"
                            class="button is-danger"
                            @click="destroy(i)">Delete
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PreviewMultiple',
    props: {
        acceptType: {
            type: String,
            default: 'image/*'
        },
        uploadFieldName: {
            type: String,
            default: 'photo'
        }
    },
    data() {
        return {
            items: [],
            isDragging: false
        }
    },
    mounted() {
      this.reset();
    },
    methods: {
        reset() {
            this.items = []
        },
        destroy(index) {
            this.items.splice(index, 1)
        },
        onFileChange({files}) {
            if (!files.length) return;

            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.onload = (event) => {
                    this.items.push({
                        fileUrl: event.target.result
                    });
                };
                reader.readAsDataURL(files[i]);
            }
        },
        onDragOver() {
            this.isDragging = true;
        },
        onDragLeave() {
            this.isDragging = false;
        }
    }
}
</script>

<style scoped>
  .dropbox {
    background-color: #fff;
    margin: 0 auto 20px;
    min-height: 150px;
    border: 1px solid #92b0b3;
    outline-offset: -10px;
    padding: 10px;
    position: relative;
    -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
    transition: outline-offset .15s ease-in-out, background-color .15s linear;
    width: 100%;
  }

  .dropbox.hover-style {
    background-color: #c8dadf;
    cursor: pointer;
    outline: 2px dashed #92b0b3;
  }

  .dropbox.hover-style.hover,
  .dropbox.hover-style:hover {
    background-color: #eee;
    outline-offset: -20px;
    outline-color: #c8dadf;
  }

  .dropbox__file {
    cursor: pointer;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0; left: 0;
    width: 100%;
  }

  .dropbox p {
    font-size: 1.2em;
    padding: 50px 0;
    text-align: center;
  }
</style>
