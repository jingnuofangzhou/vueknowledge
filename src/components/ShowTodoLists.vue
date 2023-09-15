<template>
  <div class="dataArea">
    <ul class="showDataList">
      <transition-group
        appear
        name="animate__animated animate__bounce animate__faster"
        enter-active-class="animate__swing"
        leave-active-class="animate__shakeY"
      >
        <SingleTodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
      </transition-group>
    </ul>
  </div>
</template>

<script>
import SingleTodoItem from "./SingleTodoItem";
import "animate.css";

export default {
  name: "ShowTodoLists",
  components: { SingleTodoItem },
  props: ["todos"],

};
</script>

<style>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.showDataList {
  margin-top: 20px;
}
.showDataList li {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 6px;
  border: 1px solid #eee;
}

.showDataList li:hover {
  background: #ddd;
}
.el-checkbox {
  float: left;
  margin-left: 10px;
}

.showDataList .el-button {
  float: right;
  margin-right: 2px;
  display: none;
}

.showDataList li:hover .el-button {
  display: block;
}
</style>