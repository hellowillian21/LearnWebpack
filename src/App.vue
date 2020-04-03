<template>
  <div>hello {{name}}</div>
</template>

<script>
export default {
  data() {
    return {
      name: 'vue'
    }
  }
}
</script>

<style lang="scss" scoped>
$color: aquamarine;
div {
  color: $color;
}
</style>