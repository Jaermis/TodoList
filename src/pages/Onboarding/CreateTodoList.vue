<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="create-todo-list">
      <div v-if="!pageLoadingState">
        <div class="row items-center q-pl-lg pt-40">
          <q-icon
            name="iconfont icon-arrow-left-line"
            class="cursor-pointer"
            @click="goToTodoList"
            size="18px"
          />
          <h6 class="text-24 text-semibold q-ml-sm text-primary q-my-none">
            Create A New Task
          </h6>
        </div>

        <!-- task title -->
        <q-form @submit="addNewTodo()" greedy class="q-ml-lg q-mt-md">
          <q-item-label class="label q-mb-sm q-mt-md"
            >Task Title<span class="text-negative">*</span></q-item-label
          >
          <q-input
            v-model="task_title"
            dense
            borderless
            placeholder="Task Title"
            :rules="[(val) => (val !== null && val !== '') || '']"
            hide-bottom-space
            class="onboarding-input-field standard-form-width onboarding-border-accent-0 onboarding-border-radius-10"
          />

          <!-- Task Details -->
          <div v-for="(task, index) in form" :key="index">
            <div
              class="q-mt-lg onboarding-border-accent-0 onboarding-border-radius-15 standard-form-width"
            >
              <q-expansion-item
                expand-separator
                label="To-Do List"
                expand-icon-class="hidden"
              >
                <template v-slot:header="{ expanded }">
                  <q-item-section v-if="!expanded">
                    <!-- Delete button -->
                    <div class="row justify-end items-center q-px-none">
                      <q-btn
                        flat
                        dense
                        color="primary"
                        size="16px"
                        icon="iconfont icon-delete-fill"
                        @click="removeTask(index)"
                      />
                      <q-icon
                        size="25px"
                        name="arrow_drop_down"
                        color="primary"
                      />
                    </div>
                  </q-item-section>
                  <q-item-section v-else>
                    <!-- Delete button -->
                    <div class="row justify-end items-center q-px-none">
                      <q-btn
                        flat
                        dense
                        color="primary"
                        size="16px"
                        icon="iconfont icon-delete-fill"
                        @click="removeTask(index)"
                      />
                      <q-icon
                        size="25px"
                        name="arrow_drop_up"
                        color="primary"
                      />
                    </div>
                  </q-item-section>
                </template>

                <div class="field">
                  <!-- Task Name Field -->
                  <div class="q-px-md q-pb-md">
                    <q-item-label class="q-mb-sm"
                      >Task Name:<span class="text-negative"
                        >*</span
                      ></q-item-label
                    >

                    <q-input
                      v-model="task.task_name"
                      dense
                      borderless
                      placeholder="Task Name"
                      :rules="[(val) => (val !== null && val !== '') || '']"
                      hide-bottom-space
                      class="onboarding-input-field onboarding-border-accent-0 onboarding-border-radius-10 q-px-md"
                    />
                  </div>

                  <!-- Time Field -->
                  <div class="q-px-md q-pb-md">
                    <q-item-label class="q-mb-sm">Time</q-item-label>

                    <q-input
                      v-model="task.time"
                      mask="time"
                      dense
                      borderless
                      placeholder="00:00"
                      hide-bottom-space
                      class="onboarding-input-field onboarding-border-accent-0 onboarding-border-radius-10 q-px-md"
                    >
                      <template v-slot:append>
                        <q-btn
                          flat
                          dense
                          round
                          icon="access_time_filled"
                          @click="toggleTimePicker(index)"
                          :color="showTimePicker[index] ? 'primary' : ''"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-expansion-item>
            </div>
            <div
              v-if="showTimePicker[index]"
              class="column items-center onboarding-border-accent-0 standard-form-width q-mt-md onboarding-border-radius-10 q-px-xl"
            >
              <q-time v-model="task.time" flat />
              <div class="flex justify-center items-center q-py-md custom-time">
                <q-btn
                  rounded
                  dense
                  flat
                  no-caps
                  label="Cancel"
                  class="onboarding-border-accent-4 text-primary onboarding-bg-accent-4 q-px-xl q-mr-xl"
                  @click="cancelTimePicker(index)"
                />
                <q-btn
                  rounded
                  dense
                  flat
                  no-caps
                  label="Save"
                  class="onboarding-border-accent-0 text-white onboarding-bg-accent-0 q-px-xl"
                  @click="toggleTimePicker(index)"
                />
              </div>
            </div>
          </div>
          <!-- Separate container for q-time -->

          <!-- add border dashed div -->
          <div
            class="border-dashed onboarding-border-radius-8 flex justify-center standard-form-width q-my-md q-pa-md"
          >
            <q-btn
              dense
              flat
              round
              class="onboarding-bg-accent-0 text-white onboarding-text-accent-1"
              id="generateKeyInput"
              @click="addTask(index, 1)"
              size="12px"
              no-caps
              icon="add"
            />
          </div>

          <!-- action buttons -->
          <div class="row justify-start q-pb-md">
            <q-btn
              rounded
              dense
              flat
              no-caps
              label="Cancel"
              class="onboarding-border-accent-4 text-primary onboarding-bg-accent-4 q-px-xl q-mr-md"
              @click="goToTodoList()"
            />
            <q-btn
              type="submit"
              rounded
              dense
              flat
              no-caps
              label="Save"
              class="onboarding-border-accent-0 text-white onboarding-bg-accent-0 q-px-xl"
            />
          </div>
        </q-form>
      </div>
      <q-inner-loading
        class="absolute-center onboarding-bg-primary text-20 full-width full-height onboarding-text-accent-0"
        :showing="pageLoadingState"
      />
    </div>
  </transition>
</template>

<script src="./scripts/CreateTodoList.js"></script>

<style lang="scss" scoped>
@import "./styles/CreateTodoList.scss";
</style>
