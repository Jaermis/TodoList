import { useRouter } from "vue-router";
import { ref } from "vue";
import { useQuasar } from "quasar";

export const savedTodoForm = ref([]);

export const addNewTodo = (task_title, form, router, showNotify) => {
  const currentDate = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  // Validate form fields
  const newTodoList = {
    task_title: task_title ? task_title.value : null,
    date: formattedDate,
    tasks: form
      ? form.value.map((task) => {
          return {
            checkbox: false,
            task_name: task.task_name,
            time: task.time,
          };
        })
      : null,
  };

  // Save the todo list
  savedTodoForm.value.push(newTodoList);
  console.log(savedTodoForm.value);

  // Show success notification
  if (showNotify && typeof showNotify === "function") {
    showNotify(true);
  } else {
    showNotify(false);
  }

  // Redirect to todo list page
  router.push("todo-list");
};

export default {
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    let pageLoadingState = ref(false);
    let task_title = ref("");

    let form = ref([
      {
        task_name: null,
        time: "",
      },
    ]);

    let showTimePicker = ref([]);

    const goToTodoList = () => {
      router.push({ name: "todo-list" });
    };

    const addTask = () => {
      form.value.push({
        task_name: null,
        time: "",
      });
      showTimePickers.value.push(false);
    };

    const removeTask = (index) => {
      if (index > -1) {
        form.value.splice(index, 1);
        showTimePickers.value.splice(index, 1);
      }
    };

    const toggleTimePicker = (index) => {
      showTimePicker.value[index] = !showTimePicker.value[index];
    };

    const cancelTimePicker = (index) => {
      showTimePicker.value[index] = false;
      form.value[index].time = null;
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
          ? `<div class="text-bold">Success!</div> New To-do List has been added successfully.`
          : `<div class="text-bold">Failed!</div> Failed to add a new To-do List`,
      });
    };
    return {
      goToTodoList,
      addTask,
      form,
      removeTask,
      showTimePicker,
      toggleTimePicker,
      cancelTimePicker,
      task_title,
      router,
      pageLoadingState,
      showNotify,
      addNewTodo: () => addNewTodo(task_title, form, router, showNotify),
    };
  },
};
