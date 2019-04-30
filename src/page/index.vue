<template>
    <div id="container">
      <div class="bg"><b>背景图片</b></div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
  .bg{
    width: 200px;
    height: 200px;
    margin:0 auto;
    display:flex;
    justify-content: center;
    align-items: center;
    background:url("../assets/logo.png") no-repeat center center;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    border:1px solid gray;
    color:red;
  }
</style>
