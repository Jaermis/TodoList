<template>
  <!-- START OF MENU TABLE -->
  <div class="main-menu q-mt-md">
    <div class="onboarding-menu-scroll">
      <q-list>
        <!-- OR NUMBERS -->
        <!--<q-item clickable v-ripple :to="{ name: 'or-numbers' }">
          <q-item-section avatar class="margin-left-10">
            <q-icon
              name="iconfont icon-user-management-fill"
              class="list-icon"
              color="primary"
            />
          </q-item-section>
          <q-item-section class="list-text text-primary"
            >O.R. Numbers</q-item-section
          >
        </q-item>-->
        <!-- OR NUMBERS -->
        <q-item clickable v-ripple :to="{ name: 'todo-list' }">
          <q-item-section avatar class="margin-left-10">
            <q-icon
              name="iconfont icon-task-list-fill"
              class="list-icon"
              color="primary"
            />
          </q-item-section>
          <q-item-section class="list-text text-primary"
            >Todo List</q-item-section
          >
        </q-item>
        <!-- TODO TABLE -->
        <q-item clickable v-ripple :to="{ name: 'table-exercise' }">
          <q-item-section avatar class="margin-left-10">
            <q-icon
              name="iconfont icon-user-management-fill"
              class="list-icon"
              color="primary"
            />
          </q-item-section>
          <q-item-section class="list-text text-primary"
            >Table Exercise</q-item-section
          >
        </q-item>
      </q-list>
      <div class="absolute-bottom">
        <q-list>
          <q-item class="logout-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" class="list-icon" />
            </q-item-section>
            <q-item-section class="list-text onboarding-text-primary"
              >Todo Table</q-item-section
            >
          </q-item>
        </q-list>
      </div>
    </div>
  </div>

  <!-- END OF MENU -->
</template>

<script>
import { ref, computed } from "vue";
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
//IMPORTING SCSS STYLE
@import "../css/components/MainMenu.scss";
</style>
