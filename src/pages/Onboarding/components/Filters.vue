<template>
  <div class="filters-component">
    <div :class="isLabelVisible && 'flex items-center'">
      <div
        v-if="isLabelVisible"
        class="text-14 onboarding-text-accent-1 q-mr-md"
      >
        Filters:
      </div>
      <div class="flex justify-end">
        <q-select
          v-if="isSelectVisible"
          class="minmax-width onboarding-border-radius-50 onboarding-border-accent-0 onboarding-select-field height-31 q-mr-md"
          dense
          borderless
          v-model="type"
          :label="type !== null ? '' : 'Select'"
          @update:model-value="filter('status')"
          emit-value
          map-options
          option-label="label"
          option-value="value"
          :options="options"
          hide-bottom-space
          :popup-content-class="
            DarkMode
              ? 'onboarding-option-style-dark'
              : 'onboarding-option-style-light'
          "
          options-selected-class="onboarding-selected-class"
          behavior="menu"
        />
        <q-input
          v-if="isSearchVisible"
          :class="`${
            !isLabelVisible ? 'minmax-width-190' : 'minmax-width'
          } onboarding-border-radius-50 onboarding-border-accent-1 onboarding-input-field height-${fieldHeight} use-input q-px-md ${
            isLabelVisible && 'q-mr-md'
          }`"
          dense
          borderless
          v-model="keyword"
          placeholder="Search"
          @keydown.enter="searchKeyword()"
          ><template v-slot:append>
            <q-icon
              v-if="keyword"
              name="close"
              size="14px"
              @click="fetchAll()"
              class="cursor-pointer onboarding-text-accent-1"
            /> </template
        ></q-input>
        <q-select
          v-if="isFilterDateVisible"
          dense
          borderless
          v-model="date_session"
          @update:model-value="filter('time')"
          :options="dateOptions"
          emit-value
          map-options
          option-value="value"
          option-label="label"
          :class="`minmax-width onboarding-border-accent-0 onboarding-border-radius-50 onboarding-select-field height-24 text-14 ${
            isLabelVisible && 'q-mr-md'
          }`"
          :label="date_session !== null ? '' : 'Date'"
          :popup-content-class="
            DarkMode
              ? 'onboarding-option-style-dark'
              : 'onboarding-option-style-light'
          "
          behavior="menu"
        >
          <template v-slot:after-options>
            <q-separator class="onboarding-text-accent-0" />
            <div v-if="isDateRangeVisible" class="q-px-sm">
              <q-item-section class="onboarding-text-accent-2 q-my-sm"
                >Custom Range</q-item-section
              >
              <q-form ref="formDateRange" greedy>
                <div>
                  <label>From</label>
                  <q-input
                    class="onboarding-border-accent-0 onboarding-border-radius-5 onboarding-input-field filter-date-field q-px-sm label-accent-2"
                    v-model="fromDate"
                    readonly
                    borderless
                    dense
                    :rules="[(val) => !!val || '']"
                    hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon
                        name="calendar_today"
                        class="cursor-pointer onboarding-text-accent-2 margin-top-n13 onboarding-text-accent-1 text-14"
                      >
                        <q-popup-proxy
                          ref="startDate"
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            @update:model-value="() => $refs.startDate.hide()"
                            v-model="fromDate"
                            minimal
                            flat
                            class="onboarding-bg-accent-0 text-white"
                            color="white"
                            text-color="black"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="q-mt-xs">
                  <label>To</label>
                  <q-input
                    class="filter-date-field onboarding-border-radius-5 onboarding-input-field onboarding-border-accent-0 label-accent-2 q-px-sm"
                    v-model="toDate"
                    readonly
                    borderless
                    dense
                    :rules="[(val) => !!val || '']"
                    hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon
                        name="calendar_today"
                        class="cursor-pointer onboarding-text-accent-2 margin-top-n13 onboarding-text-accent-1 text-14"
                      >
                        <q-popup-proxy
                          ref="endDate"
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            @update:model-value="() => $refs.endDate.hide()"
                            v-model="toDate"
                            minimal
                            flat
                            class="onboarding-bg-accent-0 text-white"
                            color="white"
                            text-color="black"
                          >
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </q-form>
              <div class="q-mb-md q-mt-sm">
                <q-btn
                  @click="submitDateRange()"
                  class="apply-btn onboarding-border-radius-15 onboarding-bg-accent-0 border-white full-width"
                  label="Apply"
                  :disable="btnLoadingState"
                  flat
                  no-caps
                  dense
                />
              </div>
            </div>
            <div v-else class="q-pa-sm">
              <label>Date</label>
              <q-input
                class="onboarding-border-accent-0 onboarding-border-radius-5 onboarding-input-field filter-date-field q-px-sm label-accent-2"
                :model-value="dateSelected"
                borderless
                dense
                hide-bottom-space
                readonly
              >
                <template v-slot:append>
                  <q-icon
                    name="calendar_today"
                    class="cursor-pointer margin-top-n13 onboarding-text-accent-2 text-14"
                  >
                    <q-popup-proxy
                      ref="selectDate"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        @update:model-value="() => $refs.selectDate.hide()"
                        v-model="dateSelected"
                        minimal
                        flat
                        class="onboarding-bg-accent-0 text-white"
                        color="white"
                        text-color="black"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { GetSearchResult, SearchedParams } from "../composables/Search";
// import { DarkMode } from 'src/core/composables/Triggers';

export default {
  props: {
    labelVisible: {
      type: Boolean,
      default: true,
    },
    selectVisible: {
      type: Boolean,
      default: false,
    },
    searchVisible: {
      type: Boolean,
      default: false,
    },
    filterDateVisible: {
      type: Boolean,
      default: true,
    },
    dynamicOptions: {
      type: Array,
      default: () => [],
    },
    pathEndPoint: {
      type: String,
      default: "",
    },
    dateRangeVisible: {
      type: Boolean,
      default: true,
    },
    dynamicDateOptions: {
      type: Array,
      default: () => [
        {
          value: 0,
          label: "All time",
        },
        {
          value: 1,
          label: "Today",
        },
        {
          value: 2,
          label: "Yesterday",
        },
        {
          value: 3,
          label: "Past 7 days",
        },
        {
          value: 4,
          label: "Past 30 days",
        },
      ],
    },
    parameters: {
      type: Object,
      default: () => {},
    },
    dynamicHeight: {
      type: String,
      default: "24",
    },
  },
  setup(props) {
    const $q = useQuasar();
    let store = useStore();
    let dateSelected = ref(null);
    let fromDate = ref(null);
    let toDate = ref(null);
    let date_session = ref(null);
    let btnLoadingState = ref(false);
    let isLabelVisible = ref(props.labelVisible);
    let isSelectVisible = ref(props.selectVisible);
    let isSearchVisible = ref(props.searchVisible);
    let isFilterDateVisible = ref(props.filterDateVisible);
    let options = ref(props.dynamicOptions);
    let endPoint = ref(props.pathEndPoint);
    let isDateRangeVisible = ref(props.dateRangeVisible);
    const dateOptions = ref(props.dynamicDateOptions);
    let params = ref(props.parameters);
    let fieldHeight = ref(props.dynamicHeight);

    let type = ref(null);
    let keyword = ref(null);

    const filter = (action) => {
      let payload;
      // Date session
      if (action === "time") {
        payload = {
          search: {
            date_session: date_session.value,
          },
        };
        type.value !== null && (payload.search.type = type.value);
        // Date range
      } else if (action === "dates") {
        btnLoadingState.value = true;
        payload = {
          search: {
            from: fromDate.value,
            to: toDate.value,
          },
        };
        type.value !== null && (payload.search.type = type.value);
        // Single date
      } else if (action === "date") {
        payload = {
          search: {
            date: dateSelected.value,
          },
        };
        type.value !== null && (payload.search.type = type.value);
        // Filter type
      } else if (action === "status") {
        // action is equal to status
        payload = {
          search: {
            type: type.value,
          },
        };
        if (fromDate.value && toDate.value) {
          payload.search.from = fromDate.value;
          payload.search.to = toDate.value;
        }
        date_session.value !== null &&
          (payload.search.date_session = date_session.value);
      } else {
        // Search using keywords
        payload = {
          search: {
            keyword: keyword.value,
          },
        };
      }

      // Merge params available
      if (params.value) {
        payload = {
          ...params.value,
          ...payload,
        };
      }

      // Global access
      SearchedParams.value = payload;

      // Send request
      GetSearchResult({
        endpoint: endPoint.value, // Url endpoint
        params: payload, // Payload to send in api
      }).then((response) => {
        // Run when form is submitted
        let status = Boolean(response.status === "success");
        $q.notify({
          position: $q.screen.width < 767 ? "top" : "bottom-right",
          classes: `${
            status ? "onboarding-success-notif" : "onboarding-error-notif"
          } q-px-lg q-pt-none q-pb-none`,
          html: true,
          message: status
            ? `<div class="text-bold">Search results - ${
                response.data.results
                  ? response.data.results.length
                  : response.data.length
              }</div>`
            : `<div class="text-bold">Failed!</div> ${response.message}.`,
        });
        btnLoadingState.value = false;
      });
    };

    // Filter using date range
    const formDateRange = ref(null);
    const submitDateRange = () => {
      formDateRange.value.validate().then((success) => {
        if (success) {
          filter("dates");
        }
      });
    };

    // Filter using single date
    watch(dateSelected, () => {
      dateSelected.value && filter("date");
    });

    // Filter using keyword
    const searchKeyword = () => {
      keyword.value && filter("search");
    };

    // When close icon is clicked in the search input assume that
    // the user wants to bring back all the records fetch on the first page load.
    const fetchAll = () => {
      date_session.value = 0;
      keyword.value = null;
      filter("time");
    };

    let DarkMode = ref(false);
    return {
      DarkMode,
      fromDate,
      toDate,
      date_session,
      filter,
      btnLoadingState,
      type,
      keyword,
      isSelectVisible,
      isSearchVisible,
      isFilterDateVisible,
      options,
      dateOptions,
      isLabelVisible,
      isDateRangeVisible,
      formDateRange,
      submitDateRange,
      dateSelected,
      searchKeyword,
      fetchAll,
      fieldHeight,
    };
  },
};
</script>

<style lang="scss">
.filters-component {
  .minmax-width {
    min-width: 130px;
    max-width: 130px;
    @media screen and (min-width: $breakpoint-sm-max) {
      min-width: 190px;
      max-width: 190px;
    }
  }

  .minmax-width-190 {
    min-width: 190px;
    max-width: 190px;
  }
}

.filter-date-field {
  height: 30px;
  .q-field__control,
  .q-field__marginal {
    height: 30px;
  }
}
</style>
