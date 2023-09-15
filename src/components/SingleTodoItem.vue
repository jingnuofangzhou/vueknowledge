<template>
  <li>
    <div v-show="!isEdit">
      <input
        class="checkboxItem"
        type="checkbox"
        :checked="todo.checked"
        @change="checkedSingleChange"
      />
      <span class="itemDesc">{{ todo.name }}</span>
    </div>

    <div v-show="isEdit">
      <input
        class="checkboxItem"
        type="checkbox"
        :checked="todo.checked"
        @change="checkedSingleChange"
      />
      <input
        maxlength="40"
        class="checkboxEditItem"
        type="text"
        size="small"
        :value="todo.name"
        ref="inputTitle"
        @blur="handleBlur(todo)"
        @keyup.enter="handleKeyUp(todo)"
      />
    </div>

    <el-button @click="handleDelete" size="mini" type="danger">删除</el-button>
    <el-button @click="handleEdit(todo)" size="mini" type="primary"
      >编辑</el-button
    >
  </li>
</template>

<script>
// import pubsub from 'pubsub-js'
export default {
  name: "SingleTodoItem",
  props: ["todo"],
  data() {
    return {
      isEdit: false,
    };
  },

  methods: {
    handleDelete() {
      if (confirm("您确认要删除吗")) {
        console.log("delete event.");
        this.$bus.$emit("deleteTodo", this.todo.id);
      }
    },

    handleEdit(todo) {
      console.log("handleEdit id:", todo);

      //使用属性名称“a in b”的方式可以判断a是否为b的属性
      if ("isEdit" in todo) {
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true); //响应式的添加属性的方法，提供set函数。
      }
      this.isEdit = todo.isEdit;
      this.$nextTick(function () {
        this.$refs.inputTitle.focus(); //nextTick下一轮刷新模板时自动获取焦点
      });
    },
    handleBlur(todo) {
      todo.name = this.$refs.inputTitle.value;
      todo.isEdit = false;
      this.isEdit = todo.isEdit;
      this.$bus.$emit("editTodo", todo);
    },
    handleKeyUp(todo) {
      console.log("enter handleKeyup");
      this.handleBlur(todo);
    },
    checkedSingleChange(checkedValue) {
      console.log("SingleTodoItem checked:" + checkedValue);
      this.$bus.$emit("changeCheckBoxState", this.todo.id);
    },
  },
  mounted() {
    // pubsub.subscribe("checkAllFinished", this.handleCheckAllFinished);
  },
  beforeDestroy() {
    // pubsub.unsubscribe("checkAllFinished");
  },
};
</script>

<style scoped>
li {
  position: relative;
}
.checkboxItem {
  position: absolute;
  left: 10px;
  top: 5px;
}
.checkboxEditItem {
  position: absolute;
  size: 30;
  overflow: hidden;
  left: 50px;
  top: 5px;
}
.itemDesc {
  position: absolute;
  left: 50px;
  top: 0;
}
</style>