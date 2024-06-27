import { useQuasar } from "quasar";
import Filters from "src/pages/Onboarding/components/Filters.vue";
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import { savedTodoForm } from "../CreateTodoList";
import MainDialog from "src/components/MainDialog.vue";
import DeleteModal from "src/pages/Onboarding/components/DeleteModal.vue";
import { ToggleMainDialogState } from "../../../composables/Triggers";

export const selectedItem = ref([
  {
    task_title: "",
    date: "",
    tasks: [],
  },
]);

export const currentIndex = ref(null);

export default {
  components: {
    Filters,
    MainDialog,
    DeleteModal,
  },
  setup() {
    const router = useRouter();
    const $q = useQuasar();

    const goToCreateTodoList = () => {
      router.push({ name: "create-todo" });
    };

    const showDeleteDialog = () => {
      ToggleMainDialogState();
    };

    const moveSuccess = (message) => {
      let status = true;
      $q.notify({
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `${
          status ? "onboarding-success-notif" : "onboarding-error-notif"
        } q-px-lg q-pt-none q-pb-none`,
        html: true,
        message: status
          ? `<div class="text-bold">Successfully Completed Task!</div> ${message}`
          : `<div class="text-bold">Failed!</div> Failed to update To-do List`,
      });
    };

    const showNotify = () => {
      let status = true;
      $q.notify({
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `${
          status ? "onboarding-success-notif" : "onboarding-error-notif"
        } q-px-lg q-pt-none q-pb-none`,
        html: true,
        message: status
          ? `<div class="text-bold">Successfully Deleted!</div> To-do List has been deleted successfully.`
          : `<div class="text-bold">Failed!</div> Failed to delete a new To-do List`,
      });
    };

    return {
      goToCreateTodoList,
      moveSuccess,
      savedTodoForm,
      showDeleteDialog,
      showNotify,
    };
  },
  provide() {
    return {
      deleteTodo: this.deleteTodo,
    };
  },
  data() {
    return {
      todoList: [
        {
          task_title: "Fill up OJT Logbook",
          date: "June 27, 2024",
          tasks: [
            {
              checkbox: false,
              task_name: "Make Journal Entry",
              time: "10:00 AM",
            },
            {
              checkbox: false,
              task_name: "Talk to OJT Adviser for Feedback",
              time: "12:00 PM",
            },
          ],
        },
        {
          task_title: "Onboarding Task 2",
          date: "June 27, 2024",
          tasks: [
            {
              checkbox: false,
              task_name: "Finish Delete Function",
              time: "10:00 AM",
            },
            {
              checkbox: false,
              task_name: "Let the QA check my work",
              time: "11:00 AM",
            },
          ],
        },
      ],
      doneList: [],
      showMenu: [],
    };
  },
  created() {
    console.log("TodoList mounted");
    this.doneList = this.todoList.map((task) => ({
      ...task,
      tasks: [],
    }));

    watch(
      this.selectedItem,
      (newValue, oldValue) => {
        console.log("selectedItem changed:", newValue);
      },
      { deep: true }
    );

    if (savedTodoForm.value.length > 0) {
      savedTodoForm.value.forEach((newTask) => {
        const existingTaskIndex = this.todoList.findIndex(
          (task) =>
            task.task_title === newTask.task_title && task.date === newTask.date
        );

        if (existingTaskIndex === -1) {
          this.todoList.unshift(newTask);
        }

        const doneTask = {
          task_title: newTask.task_title,
          date: newTask.date,
          tasks: [],
        };
        this.doneList.unshift(doneTask);
      });
    }

    if (selectedItem.value) {
      this.todoList[currentIndex.value] = Object.assign(
        {},
        {
          task_title: selectedItem.value.task_title,
          date: selectedItem.value.date,
          tasks: selectedItem.value.tasks,
        }
      );

      if (
        this.doneList[currentIndex.value] &&
        this.doneList[currentIndex.value].task_title !==
          selectedItem.value.task_title
      ) {
        this.doneList[currentIndex.value].task_title =
          selectedItem.value.task_title;
      }

      selectedItem.value = {};

      console.log("Updated todoList:", this.todoList);
      console.log("Cleared selectedItem:", selectedItem.value);
    }
  },

  watch: {
    todoList: {
      handler(newTodoList) {
        newTodoList.forEach((task) => {
          const foundIndex = this.doneList.findIndex(
            (doneTask) =>
              doneTask.task_title === task.task_title &&
              doneTask.date === task.date
          );
          console.log("foundIndex: ", foundIndex);
          if (foundIndex !== -1) {
            task.tasks.forEach((keyTask, index) => {
              if (keyTask.checkbox) {
                this.doneList[foundIndex].tasks.push(keyTask);
                this.todoList
                  .find(
                    (savedTask) =>
                      savedTask.task_title === task.task_title &&
                      savedTask.date === task.date
                  )
                  .tasks.splice(index, 1);
                this.moveSuccess("Task has been moved to Done List");
              }
              console.log("DoneTasks:", this.doneList);
            });
          }
        });
      },
      deep: true,
    },
    doneList: {
      handler(newDoneList) {
        newDoneList.forEach((task) => {
          const foundIndex = this.todoList.findIndex(
            (savedTask) =>
              savedTask.task_title === task.task_title &&
              savedTask.date === task.date
          );
          if (foundIndex !== -1) {
            task.tasks.forEach((keyTask, index) => {
              if (!keyTask.checkbox) {
                this.todoList[foundIndex].tasks.push(keyTask);
                this.doneList
                  .find(
                    (doneTask) =>
                      doneTask.task_title === task.task_title &&
                      doneTask.date === task.date
                  )
                  .tasks.splice(index, 1);
                this.moveSuccess("Task has been moved to To-do List");
              }
              console.log("Todo List:", this.todoList);
            });
          }
        });
      },
      deep: true,
    },
  },

  methods: {
    toggleMenu(index) {
      console.log(this.showMenu);
      console.log(index);
      currentIndex.value = index;
    },

    updateTodo() {
      const taskIndex = currentIndex.value;
      const task = this.todoList[taskIndex];
      if (task) {
        selectedItem.value = task;
        console.log("selectedItemTodo:", selectedItem.value);
        this.$router.push({ name: "update-todo", params: { id: taskIndex } });
      } else {
        console.error("Task not found at index:", currentIndex.value);
      }
    },

    deleteTodo(acceptDelete) {
      if (acceptDelete) {
        const indexToDelete = currentIndex.value;

        console.log("makadelete");

        if (indexToDelete !== null && indexToDelete !== -1) {
          this.todoList.splice(indexToDelete, 1);
          this.doneList.splice(indexToDelete, 1);
        }
        this.showNotify(true);
      } else {
        this.showNotify(false);
      }
    },
  },
};
