<template>
  <div>
    <el-input
      v-on:keyup.enter.native='handleKeyEnter'
      v-on:input = 'handleInput'
      v-model="input"
      placeholder="请输入任务名称"
    />
  </div>
</template>

<script>
export default {
  name: "CreateTodos",
  data() {
    return {
      input: "",
    };
  },
  methods: {
    handleInput() {
      console.log("input event had been triggered  00.");
    },

    handleKeyEnter() {
      console.log("enter key finished.why e-input element not effctive");
      // this.$emit("addTodoRecord", this.input);
      this.$bus.$emit('addTodoRecord', this.input)
      this.input = '';
    }
  },
};
</script>

<style>

</style>