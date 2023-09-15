<template>
  <div id="app">
    <CreateTodos />
    <ShowTodoLists :todos="todos" />
    <MakeTodoStatics :todos="todos" />
  </div>
</template>
<script>
import CreateTodos from "./components/CreateTodos";
import ShowTodoLists from "./components/ShowTodoLists";
import MakeTodoStatics from "./components/MakeTodoStatics.vue";
import pubsub from "pubsub-js";
import axios from 'axios'
import {nanoid} from 'nanoid'

export default {
  name: "App",
  data() {
    return {
      todos: [],
    };
  },
  components: {
    CreateTodos,
    ShowTodoLists,
    MakeTodoStatics,
  },
  methods: {
    checkTodo(id) {
      console.log("checkTodo,id=", id);
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.checked = !todo.checked;
        }
      });
      console.log("todos=", this.todos);
      axios.get('/mini/car').then(response => {
        console.log('get result,',response);
      }, err=> {
        console.log('error information,',err);
      })

        //这里使用的代理服务器获取远端服务器的truck信息。其中'/huge'为配合代理服务器而设置的代理前缀，
        //非远端服务器的获取truck信息的路由路径，而'/truck'为远端服务器的路由路径信息。即实际的访问路由为
        //'http://localhost:3005/truck'，代理服务器的配置参见vue.config.js的devServer配置。
       axios.get('/huge/truck').then(response => {
        console.log('get result,',response);
      }, err=> {
        console.log('error information,',err);
      })
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    deleteTodo(id) {
      console.log("deleteTodo,id=", id);
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    editTodo(todo) {
      console.log("editTodo,id=", todo.id);
      let index = this.todos.findIndex(function (item) {
        return item.id == todo.id;
      });
      this.todos[index] = todo;
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    addTodoRecord(todoName) {
      console.log("addTodoRecord:" + this.todos.length);
      if (todoName.length > 0) {
        console.log("addTodoRecord val.length:" + todoName.length);
        let index = this.todos.findIndex((item) => {
          return item.name === todoName; 
        });
        if (index >= 0)
        {
          alert('已经存在相同名称的记录，请重新输入');
          return;
        }
        this.todos.unshift({ id: nanoid(), name: todoName, checked: false });
        localStorage.setItem("todos", JSON.stringify(this.todos));
        this.$bus.$emit("addTodoRecordFromApp");
      }
    },
    handleDeleteFinished(msgName) {
      console.log("handleDeleteFinishe：", msgName);
      console.log("this todos:", this.todos);
      this.todos = this.todos.filter(function (item) {
        return item.checked!== true;
      });

      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    handleCheckAllFinished(msgName, checkedValue) {
      console.log("checkAllFinished event.", checkedValue);
      this.todos.forEach((todo) => {
        todo.checked = checkedValue;
      });
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
  mounted() {
    const localStorageData = localStorage.getItem('todos');
    if (localStorageData !== null && localStorageData!== 'undefined')
    {
      console.log("App mounted:", localStorageData);
      this.todos = JSON.parse(localStorageData);
    }
    if (this.todos.length == 0 || this.todos == "undefined") {
      console.log("App mounted:this.todos.length", this.todos.length);
      this.todos = [
        { id: nanoid(), name: "打代码", checked: true },
        { id: nanoid(), name: "睡觉", checked: true },
        { id: nanoid(), name: "吃饭", checked: false },
      ];
    }
    pubsub.subscribe("deleteFinishedTasks", this.handleDeleteFinished);
    pubsub.subscribe("checkAllFinished", this.handleCheckAllFinished);
    this.$bus.$on("changeCheckBoxState", this.checkTodo);
    this.$bus.$on("deleteTodo", this.deleteTodo);
    this.$bus.$on("addTodoRecord", this.addTodoRecord);
    this.$bus.$on("editTodo", this.editTodo);
    
  },

  beforeDestroy() {
    pubsub.unsubscribe("deleteFinishedTasks");
    pubsub.unsubscribe("checkAllFinished");
    this.$bus.$off("changeCheckBoxState");
    this.$bus.$off("deleteTodo");
    this.$bus.$off("addTodoRecord");
    this.$bus.$off("editTodo");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  padding: 10px 10px;
  width: 500px;
  border: 1px solid #999;
}
</style>
