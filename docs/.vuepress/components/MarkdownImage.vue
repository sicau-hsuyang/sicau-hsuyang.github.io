<template>
  <div align="center">
    <img :src="url" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  name: "MarkdownImage",
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  computed: {
    url() {
      return /^https?/.test(this.src) ? this.src : this.$withBase(this.src);
    },
  },
};
</script>
