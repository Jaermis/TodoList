<template>
  <div class="width-100">
    <div class="full-width flex justify-center q-mb-md">
      <q-card-section>
        <div style="justify-content: center">
          <q-icon name="error" size="50px" style="color: teal" />
        </div>
        <br />
        <div class="text-h6 text-white text-center">
          Are you sure you want to delete<br />this To-Do List?
        </div>
        <br />
        <p class="text-caption text-white text-center">
          This process cannot be undone. <br />By confirming, this account will
          be deleted. To go back, click "Cancel".
        </p>
        <br />
        <div class="text-center">
          <q-btn
            unelevated
            rounded
            label="Cancel"
            class="cancel-btn"
            @click.stop="closeDialog"
          />
          <q-btn
            unelevated
            rounded
            label="Yes"
            class="delete-btn"
            @click.stop="acceptDelete"
          />
        </div>
      </q-card-section>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useQuasar } from "quasar";
import { ToggleMainDialogState } from "../../../composables/Triggers";

const $q = useQuasar();
let btnLoadingState = ref(false);

const deleteTodo = inject("deleteTodo");

const closeDialog = () => {
  ToggleMainDialogState();
  deleteTodo;
};

const acceptDelete = () => {
  ToggleMainDialogState();
  deleteTodo(true);
};
</script>

<style>
.delete-btn {
  background-color: #249990;
  color: #ffffff;
  text-transform: none;
  margin-right: 10px;
  margin-left: 10px;
  height: 32px;
  width: 128px;
}
.cancel-btn {
  border-color: #249990;
  border-width: 1px;
  border-style: solid;
  color: #ffffff;
  text-transform: none;
  margin-right: 10px;
  margin-left: 10px;
  height: 32px;
  width: 128px;
}
</style>
