import { ref, inject } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { selectedItem } from "../TodoList";

export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    let pageLoadingState = ref(false);
    let showTimePicker = ref([]);

    const addKeyResult = () => {
      selectedItem.value.tasks.push({
        result_name: null,
        time: "",
        checkbox: false,
      });
      console.log("Added new key result:", selectedItem.value.tasks);
    };

    console.log("SelectedItemUpdate:", selectedItem.value);

    const removeKeyResult = (kIndex) => {
      if (selectedItem.value && kIndex > -1) {
        selectedItem.value.tasks.splice(kIndex, 1);
      }
    };

    const goToTodoList = () => {
      router.push({ name: "todo-list" });
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
          ? `<div class="text-bold">Success!</div> New To-do List has been updated successfully.`
          : `<div class="text-bold">Failed!</div> Failed to update To-do List`,
      });
    };

    return {
      route,
      router,
      selectedItem,
      addKeyResult,
      removeKeyResult,
      showNotify,
      pageLoadingState,
      showTimePicker,
      toggleTimePicker,
      cancelTimePicker,
      goToTodoList,
    };
  },
  methods: {
    updateTodo() {
      console.log("Selected Item Updated: ", selectedItem.value);
      this.$router.push({ name: "todo-list" });
      this.showNotify();
    },
  },
};
