<template>
    <div class="preview-single has-text-centered">
        <h2>Preview single file</h2>
        <div
          :class="{'hover-style': !isSelected}"
          class="dropbox">
            <input
                v-if="!isSelected"
                :name="uploadFieldName"
                :accept="acceptType"
                @change="onFileChange($event.target);"
                type="file"
                class="dropbox__file">

            <p v-if="!isSelected">
                Drag your file here to begin<br> or click to browse
            </p>
            <div v-else>
                <div class="dropbox__preview">
                    <img
                      v-if="fileUrl"
                      :src="fileUrl"
                      alt="preview">
                </div>
            </div>
        </div>
        <div v-if="isSelected">
            <div class="box__buttons">
                <button
                    type="button"
                    class="button is-warning"
                    @click="reset">cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PreviewSingle',
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
            fileUrl: '',
            file: null,
            warningText: ''
        }
    },
    computed: {
        isSelected() {
            return !!this.file;
        }
    },
    mounted() {
      this.reset();
    },
    methods: {
        reset() {
            this.fileUrl = ''
            this.file = null
            this.warningText = ''
        },
        onFileChange({files}) {
            if (!files.length) return;

            this.file = files[0];
            this.readUrl();
        },
        readUrl() {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.fileUrl = event.target.result;
            };
            reader.readAsDataURL(this.file);
        }
    }
}
</script>

<style scoped>
  .dropbox {
    background-color: #fff;
    margin: 0 auto 20px;
    min-height: 300px;
    border: 1px solid #92b0b3;
    outline-offset: -10px;
    padding: 10px;
    position: relative;
    -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
    transition: outline-offset .15s ease-in-out, background-color .15s linear;
    width: 450px;
  }

  .dropbox.hover-style {
    background-color: #c8dadf;
    cursor: pointer;
    outline: 2px dashed #92b0b3;
  }

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

  .dropbox__preview {
    margin: 0 auto;
    padding: 0;
  }

  .dropbox__preview img {
    height: auto;
    max-width: 100%;
    vertical-align: bottom;
  }
</style>
