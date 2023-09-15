<template>
  <div class="staticData">
    <input
      class="itemCheck"
      type="checkbox"
      :checked="isAllChecked"
      v-on:change="handleCheckChange"
    />已完成 <span>{{ finishedNumber }}</span
    >/全部:
    <span>{{ totalNumber }}</span>

    <el-button @click="handleDeleteFinished" size="mini" type="danger"
      >清除已完成</el-button
    >
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "CalcTodos",
  props: ["todos"],
  methods: {
    handleDeleteFinished() {
      console.log("handleDeleteFinished");
      pubsub.publish("deleteFinishedTasks");
    },

    handleCheckChange(e) {
      console.log(
        "MakeTodoStatics handleCheckChange enter,  this.isAllChecked:",
        this.isAllChecked
      );
      console.log("todos:", this.todos);
      pubsub.publish("checkAllFinished", e.target.checked);
      console.log("MakeTodoStatics handleCheckChange leave");
    },

    handleDeleteTodoRecord() {
      console.log("handleDeleteTotalRecord");
    },
  },

  computed: {
    finishedNumber() {
      return this.todos.reduce(
        (calc, todo) => calc + (todo.checked ? 1 : 0),
        0
      );
    },
    totalNumber() {
      return this.todos.length;
    },
    isAllChecked() {
      return this.finishedNumber === this.totalNumber;
    },
  },

  mounted() {
    this.$bus.$on("deleteTodoFromApp", this.handleDeleteTodoRecord);
  },
  beforeDestroy() {
    this.$bus.$off("deleteTodoFromApp");
  },
};
</script>

<style scoped>
.staticData {
  position: relative;
  margin-top: 20px;
  width: 500px;
  height: 40px;
  text-align: center;
  font-size: 10px;
}
.itemCheck {
  position: absolute;
  left: 11px;
  top: 0;
}
.el-button {
  float: right;
}
</style>