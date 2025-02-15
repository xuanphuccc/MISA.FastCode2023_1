<template>
  <div :style="styleContainer" class="input-container">
    <label
      v-if="labelText !== ''"
      :for="`dp-input-${idInput}`"
      class="label-input"
    >
      {{ labelText }}
      <div v-if="inputRequired" style="color: red; padding-left: 3px">*</div>
    </label>

    <VueDatePicker
      v-model="date"
      :uid="idInput"
      placeholder="DD/MM/YYYY"
      position="right"
      input-class-name="dp-custom-input"
      menu-class-name="dp-custom-menu"
      calendar-class-name="dp-custom-calendar"
      calendar-cell-class-name="dp-custom-cell"
      :clearable="false"
      :enable-time-picker="false"
      :format="'dd/MM/yyyy'"
      :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
      text-input
      auto-apply
      utc
      @open="this.isPickMonthYear = false"
    >
      <template #input-icon> </template>
      <template
        #month-year="{ month, year, updateMonthYear, handleMonthYearChange }"
      >
        <div class="month-year__container">
          <misa-icon
            @click="handleMonthYearChange(false)"
            v-if="!isPickMonthYear"
            icon="arrow-left--black"
          />
          <misa-icon
            v-else
            @click="!isPickMonth ? reduceRangeYear() : reduceYearSelect()"
            icon="arrow-down--black"
          />

          <div class="month-year__info">
            <div
              v-if="!isPickMonthYear"
              class="bold-text"
              style="cursor: pointer"
              @click="openMonthYearSelect"
            >
              Tháng {{ month + 1 }} Năm {{ year }}
            </div>
            <div v-else class="month-year--picker">
              <div
                class="month-year--picker__value bold-text"
                :style="{ cursor: isPickMonth ? 'pointer' : '' }"
                @click="isPickMonth ? backToSelectYear() : ''"
              >
                {{
                  !isPickMonth
                    ? yearRangePicker[0].text +
                      " - " +
                      yearRangePicker[yearRangePicker.length - 1].text
                    : yearSelected
                }}
              </div>

              <misa-arrow-down />
              <div class="select-container">
                <table class="select-table">
                  <tr v-for="countRow in [0, 1, 2, 3]" :key="countRow">
                    <td v-for="countColumn in [0, 1, 2]" :key="countColumn">
                      <div
                        class="select-table__ele"
                        :class="
                          dataSelectRender[countRow * 3 + countColumn].value ===
                          (!isPickMonth ? yearSelected : monthSelected)
                            ? 'select-table__ele--active'
                            : ''
                        "
                        @click="
                          !isPickMonth
                            ? selectYear(
                                dataSelectRender[countRow * 3 + countColumn]
                                  .value
                              )
                            : selectMonth(
                                dataSelectRender[countRow * 3 + countColumn]
                                  .value,
                                updateMonthYear
                              )
                        "
                      >
                        {{ dataSelectRender[countRow * 3 + countColumn].text }}
                      </div>
                    </td>
                  </tr>
                </table>
                <div
                  class="cancel-select"
                  @click="closeMonthYearSelect(month, year)"
                >
                  Hủy bỏ
                </div>
              </div>
            </div>
          </div>

          <misa-icon
            @click="handleMonthYearChange(true)"
            v-if="!isPickMonthYear"
            icon="arrow-right--black"
          />
          <misa-icon
            v-else
            @click="!isPickMonth ? increaseRangeYear() : increaseYearSelect()"
            icon="arrow-up--black"
          />
        </div>
      </template>
      <template #action-extra="{ selectCurrentDate }">
        <div
          @click="selectCurrentDate()"
          title="Chọn ngày hôm nay"
          class="date-picker__current-date"
        >
          <misa-separation-line
            style="
              width: 100%;
              border-top: 1px solid var(--border-color-default);
            "
          />
          <div class="current-date__text">Hôm nay</div>
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "MISADatePicker",
  components: {
    VueDatePicker,
  },
  props: {
    modelValue: {
      required: true,
    },
    idInput: {
      required: true,
      type: String,
    },
    disable: {
      default: false,
    },
    labelText: {
      default: "",
    },
    inputRequired: {
      default: false,
    },
    heightContainer: {
      default: "auto",
    },
    widthContainer: {
      default: "100%",
    },
    errorText: {
      default: "",
    },
  },
  data() {
    return {
      date: this.modelValue,
      isPickMonthYear: false,
      isPickMonth: false,

      yearRangePicker: [],
      monthRange: [
        {
          value: 1,
          text: "Thg 1",
        },
        {
          value: 2,
          text: "Thg 2",
        },
        {
          value: 3,
          text: "Thg 3",
        },
        {
          value: 4,
          text: "Thg 4",
        },
        {
          value: 5,
          text: "Thg 5",
        },
        {
          value: 6,
          text: "Thg 6",
        },
        {
          value: 7,
          text: "Thg 7",
        },
        {
          value: 8,
          text: "Thg 8",
        },
        {
          value: 9,
          text: "Thg 9",
        },
        {
          value: 10,
          text: "Thg 10",
        },
        {
          value: 11,
          text: "Thg 11",
        },
        {
          value: 12,
          text: "Thg 12",
        },
      ],

      yearSelected: "",
      monthSelected: "",
    };
  },
  created() {
    this.resetPickMonthYear(this.modelValue);
    this.date = !this.modelValue ? "" : this.modelValue + "Z";
  },
  methods: {
    /**
     * reset tháng và năm đang được chọn
     * @param {string} dateSelect date hiện tại để tính tháng năm được reset
     */
    resetPickMonthYear(dateSelect) {
      try {
        let tempDate;

        if (!dateSelect) {
          tempDate = new Date(Date.now());
        } else {
          tempDate = new Date(dateSelect);
        }

        let tempYear = tempDate.getFullYear();
        this.yearRangePicker = [];

        for (let i = 0; i < 12; i++) {
          this.yearRangePicker.push({
            value: tempYear - i,
            text: tempYear - i,
          });
        }

        this.yearSelected = tempYear;
        this.monthSelected = tempDate.getMonth() + 1;
      } catch (error) {
        console.log(
          "🚀 ~ file: MISADatePicker.vue:248 ~ resetPickMonthYear ~ error:",
          error
        );
      }
    },

    /**
     * reset lại khoảng năm được chọn
     * @param {int} yearStart năm bắt đầu để tính range year mới
     */
    resetRangeYear(yearStart) {
      try {
        this.yearRangePicker = [];

        for (let i = 0; i < 12; i++) {
          this.yearRangePicker.push({
            value: yearStart - i,
            text: yearStart - i,
          });
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: MISADatePicker.vue:286 ~ resetRangeYear ~ error:",
          error
        );
      }
    },

    /**
     * xử lý việc mở phần chọn tháng và năm
     * @author: TTANH (28/06/2023)
     */
    openMonthYearSelect() {
      try {
        this.isPickMonthYear = true;
      } catch (error) {
        console.log(
          "🚀 ~ file: MISADatePicker.vue:251 ~ openMonthYearSelect ~ error:",
          error
        );
      }
    },

    /**
     * xử lý đóng phần chọn tháng và năm bằng nút "Hủy bỏ"
     * @author: TTANH (28/06/2023)
     */
    closeMonthYearSelect(currentMonth, currentYear) {
      try {
        this.isPickMonthYear = false;
        this.isPickMonth = false;

        let monthTemp = this.monthSelected - 1;

        if (currentMonth === monthTemp && currentYear === this.yearSelected) {
        } else {
          this.resetPickMonthYear(this.modelValue);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: MISADatePicker.vue:275 ~ closeMonthYearSelect ~ error:",
          error
        );
      }
    },

    /**
     * giảm vùng năm đang focus xuống 11 năm
     * @author: TTANH (28/06/2023)
     */
    reduceRangeYear() {
      try {
        let lastYear =
          this.yearRangePicker[this.yearRangePicker.length - 1].value;

        this.resetRangeYear(lastYear);
      } catch (error) {
        console.log(
          "🚀 ~ file: MISADatePicker.vue:284 ~ reduceRangeYear ~ error:",
          error
        );
      }
    },

    /**
     * tăng vùng năm đang focus lên 12 năm
     * @author: TTANH (28/06/2023)
     */
    increaseRangeYear() {
      try {
        let firstYear = this.yearRangePicker[0].value + 11;

        this.resetRangeYear(firstYear);
      } catch (error) {
        console.log(
          "🚀 ~ file: MISADatePicker.vue:293 ~ increaseRangeYear ~ error:",
          error
        );
      }
    },

    /**
     * xử lý việc ấn chọn 1 năm
     * @param {int} yearSelect năm được chọn
     * @author: TTANH (28/06/2023)
     */
    selectYear(yearSelect) {
      try {
        this.yearSelected = yearSelect;
        this.isPickMonth = true;
      } catch (error) {
        console.log(
          "🚀 ~ file: MISADatePicker.vue:328 ~ selectYear ~ error:",
          error
        );
      }
    },

    /**
     * xử lý việc chọn vào 1 tháng
     * @param {int} monthSelect tháng được chọn
     * @param {function} updateMonthYear hàm thay đổi tháng và năm của thư viện
     * @author: TTANH (28/06/2023)
     */
    selectMonth(monthSelect, updateMonthYear) {
      try {
        this.monthSelected = monthSelect;

        this.isPickMonthYear = false;
        this.isPickMonth = false;

        updateMonthYear(this.monthSelected - 1, this.yearSelected);

        this.resetRangeYear(this.yearSelected);
      } catch (error) {
        console.log(
          "🚀 ~ file: MISADatePicker.vue:337 ~ selectMonth ~ error:",
          error
        );
      }
    },

    /**
     * Giảm năm đi 1 ở phần chọn tháng
     * @author: TTANH (28/06/2023)
     */
    reduceYearSelect() {
      try {
        this.yearSelected--;

        this.resetRangeYear(this.yearSelected);
      } catch (error) {
        console.log(
          "🚀 ~ file: MISADatePicker.vue:284 ~ reduceYearSelect ~ error:",
          error
        );
      }
    },

    /**
     * tăng năm lên 1 ở phần chọn tháng
     * @author: TTANH (28/06/2023)
     */
    increaseYearSelect() {
      try {
        this.yearSelected++;

        this.resetRangeYear(this.yearSelected);
      } catch (error) {
        console.log(
          "🚀 ~ file: MISADatePicker.vue:293 ~ increaseYearSelect ~ error:",
          error
        );
      }
    },

    /**
     * trở lại với việc chọn năm
     * @author: TTANH (28/06/2023)
     */
    backToSelectYear() {
      try {
        this.isPickMonth = false;
      } catch (error) {
        console.log(
          "🚀 ~ file: MISADatePicker.vue:414 ~ backToSelectYear ~ error:",
          error
        );
      }
    },
  },
  computed: {
    styleContainer() {
      return {
        width: this.widthContainer,
        height: this.heightContainer,
      };
    },
    dataSelectRender() {
      if (!this.isPickMonth) {
        return this.yearRangePicker;
      } else {
        return this.monthRange;
      }
    },
  },
  watch: {
    date(newValue) {
      this.resetPickMonthYear(newValue);

      this.$emit("update:modelValue", newValue);
    },
  },
};
</script>

<style>
@import url(./date-picker.css);
</style>
