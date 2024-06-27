<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="todo-list q-px-lg">
      <div class="row items-center justify-between pt-40">
        <h6 class="text-24 text-semibold q-my-none text-primary">To-Do List</h6>
        <q-btn
          unelevated
          rounded
          no-caps
          color="primary"
          label="Create a new task"
          @click="goToCreateTodoList()"
        />
      </div>

      <div class="q-py-md" />
      <div class="flex justify-start">
        <Filters
          dynamicHeight="31"
          :searchVisible="true"
          :filterDateVisible="false"
          :labelVisible="true"
          pathEndPoint="projects"
        />
      </div>

      <!-- In process and in-progress divs -->
      <div class="todo-list row q-pt-lg">
        <div class="col-6">
          <div
            class="in-progress onboarding-bg-accent-0 text-center text-white text-bold q-pt-xs q-mb-xs"
          >
            In-Progress
          </div>

          <div
            class="col q-pa-md onboarding-bg-secondary onboarding-border-accent-0 onboarding-border-radius-10 q-mr-md"
            v-for="(todo, index) in todoList"
            :key="index"
          >
            <q-expansion-item expand-separator label="To-Do List">
              <template v-slot:header="{ expanded }">
                <q-item-section
                  v-if="!expanded"
                  class="onboarding-text-accent-0 text-semibold"
                >
                  {{ todo.task_title }}
                </q-item-section>
                <q-item-section
                  v-if="!expanded"
                  side
                  class="onboarding-text-accent-0 text-semibold"
                >
                  {{ todo.date }}
                </q-item-section>
                <q-item-section
                  v-else
                  class="onboarding-text-accent-0 text-semibold"
                >
                  {{ todo.task_title }}
                </q-item-section>
                <q-item-section v-if="expanded" side @click.stop>
                  <q-btn
                    flat
                    round
                    icon="more_horiz"
                    @click="toggleMenu(index)"
                  >
                    <q-menu v-model="showMenu[index]" auto-close>
                      <q-list style="min-width: 100px" class="bordercolor">
                        <q-item
                          class="select-list"
                          clickable
                          v-close-popup
                          @click="updateTodo()"
                        >
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <div class="delete">
                          <q-item
                            class="select-list"
                            clickable
                            v-close-popup
                            @click="showDeleteDialog"
                          >
                            <q-item-section>Delete</q-item-section>
                          </q-item>
                        </div>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-item-section>
              </template>

              <q-card>
                <q-card-section class="q-pa-none onboarding-bg-secondary">
                  <div class="col">
                    <q-list>
                      <!-- Loop through tasks -->
                      <q-item
                        class="q-py-none"
                        v-for="(task, keyIndex) in todo.tasks"
                        :key="keyIndex"
                      >
                        <q-item-section>
                          <q-checkbox
                            v-model="task.checkbox"
                            :label="task.task_name"
                            @change="handleCheckboxChange(todo, task)"
                          />
                        </q-item-section>
                        <q-item-section>{{ task.time }}</q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                  <div
                    class="text-right onboarding-text-accent-0 text-semibold"
                  >
                    {{ todo.date }}
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
        </div>

        <div class="col-6">
          <div
            class="in-progress onboarding-bg-accent-0 text-center text-white text-bold q-pt-xs q-mb-xs q-mr-md"
          >
            Done
          </div>
          <div
            class="col q-pa-md onboarding-bg-secondary onboarding-border-accent-0 onboarding-border-radius-10"
            v-for="(todo, index) in doneList"
            :key="index"
          >
            <q-expansion-item expand-separator :label="todo.task_title">
              <template v-slot:header="{ expanded }">
                <q-item-section
                  v-if="!expanded"
                  class="onboarding-text-accent-0 text-semibold"
                >
                  {{ todo.task_title }}
                </q-item-section>
                <q-item-section
                  v-if="!expanded"
                  side
                  class="onboarding-text-accent-0 text-semibold"
                >
                  {{ todo.date }}
                </q-item-section>
                <q-item-section
                  v-else
                  class="onboarding-text-accent-0 text-semibold"
                >
                  {{ todo.task_title }}
                </q-item-section>
              </template>

              <q-card>
                <q-card-section class="q-pa-none onboarding-bg-secondary">
                  <div class="col">
                    <q-list>
                      <!-- Loop through tasks -->
                      <q-item
                        class="q-py-none"
                        v-for="(task, keyIndex) in todo.tasks"
                        :key="keyIndex"
                      >
                        <q-item-section>
                          <q-checkbox
                            v-model="task.checkbox"
                            :label="task.task_name"
                            @change="handleCheckboxChange(todo, task)"
                          />
                        </q-item-section>
                        <q-item-section>{{ task.time }}</q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                  <div
                    class="text-right onboarding-text-accent-0 text-semibold"
                  >
                    {{ todo.date }}
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <MainDialog :content="$options.components.DeleteModal" />
</template>

<script src="./scripts/TodoList.js"></script>

<style lang="scss" scope>
@import "./styles/TodoList.scss";
</style>
