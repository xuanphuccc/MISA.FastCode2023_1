<template>
  <table class="m-table">
    <thead>
      <tr>
        <th v-if="!oneRowSelect" class="m-table__checkbox-column">
          <template v-if="rowsData.length === 0">
            <misa-loading-skeleton />
          </template>
          <template v-else>
            <misa-checkbox-input
              @checked="$emit('checked-all')"
              @unchecked="$emit('unchecked-all')"
              :isCheck="checkSelectedAll"
            />
          </template>
        </th>
        <div class="m-tbody-viewer">
          <th
            v-for="(column, index) in columnsShow"
            :key="column.id"
            :style="styleTh(column, index)"
          >
            <div class="m-th" :class="`text-align--${column.textAlign}`">
              <div
                class="m-th__text"
                :style="{ cursor: !oneRowSelect ? 'pointer' : 'default' }"
              >
                {{ column.name }}
              </div>
              <div v-if="!oneRowSelect" class="m-th__filter">
                <misa-icon icon="th__filter" height="14px" width="14px" />
              </div>
            </div>
            <div
              class="th__resize"
              @mousedown="mouseDownResizeColumn($event, index)"
            ></div>
          </th>
        </div>
        <th
          v-if="!oneRowSelect"
          style="text-align: end"
          class="m-table__row-function"
        >
          <span style="padding-right: 6px">Chức năng</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="row in rowsLoad"
        :key="row.id"
        :class="this.selectedRows.includes(row.id) ? 'row--selected' : ''"
        @click="this.$emit('clickRow', row.id)"
        @dblclick="this.$emit('doubleClickRow', row.id)"
        style="cursor: pointer"
      >
        <td v-if="!oneRowSelect" class="m-table__checkbox-column">
          <template v-if="rowsData.length === 0">
            <misa-loading-skeleton />
          </template>
          <template v-else>
            <misa-checkbox-input
              @checked="$emit('checked-row', row.id)"
              @unchecked="$emit('unchecked-row', row.id)"
              :isCheck="this.selectedRows.includes(row.id) ? true : false"
            />
          </template>
        </td>
        <td
          v-for="(column, index) in columnsInfo"
          :key="column.id"
          :class="`text-align--${column.textAlign}`"
          :title="row[column.id]"
          :style="styleTd(column, index)"
        >
          <template v-if="rowsData.length === 0">
            <misa-loading-skeleton />
          </template>
          <template v-else>
            {{ formatData(row[column.id], column.format) }}
          </template>
        </td>
        <td v-if="!oneRowSelect" class="m-table__row-function">
          <template v-if="rowsData.length === 0">
            <misa-loading-skeleton />
          </template>
          <template v-else>
            <div class="tbody__row-function">
              <misa-button
                type="link"
                colorText="#0075c0"
                style="
                  font-weight: 600;
                  height: 100%;
                  padding: 6px 1px 6px 16px;
                "
                @clickBtnContainer="$emit('clickFixBtn', row.id)"
                >Sửa</misa-button
              >
              <misa-icon
                icon="dropdown--solid-blue"
                style="height: 100%"
                @click="clickButtonDropdownFunctionContext($event, row.id)"
                @dblclick="
                  (event) => {
                    event.stopPropagation();
                  }
                "
                :ref="`refDropdownBtn-${row.id}`"
              />
            </div>
          </template>
        </td>
      </tr>
    </tbody>

    <div
      class="function__context"
      v-show="isShowFunctionContext"
      :style="styleFunctionContext"
      ref="refFunctionContext"
    >
      <div class="function__item">Nhân bản</div>
      <div @click="clickDeleteBtn" class="function__item">Xóa</div>
      <div class="function__item">Ngừng sử dụng</div>
    </div>
  </table>
</template>

<script>
import { formatToCurrency, formatToDate } from "@/helper/format-helper.js";
import { findIndexByAttribute } from "@/helper/common.js";

export default {
  name: "MISATable",
  data() {
    return {
      leftFunctionContext: "0px",
      topFunctionContext: "0px",
      idFunctionContextFocus: "",
      isShowFunctionContext: false,

      //các biến dùng cho việc resize
      prevX: 0,
      rowIndexResize: -1,
    };
  },
  props: {
    /**
     * thông tin cột phải theo định dạn
        {
          id: "EmployeeCode",
          name: "Mã nhân viên",
          size: "150px",
          textAlign: "left", //bao gồm: left, center, right
          format: "text", //bao gồm: text, date, currency
          isShow: true,
          isPin: false,
        },
     * @author: TTANH (26/06/2023)
     */
    columnsInfo: {
      required: true,
      type: Array,
    },
    /* tất cả các record đều phải có id */
    rowsData: {
      default: [],
      required: true,
      type: Array,
    },
    /* id các records đã được chọn */
    selectedRows: {
      default: [],
    },

    /**
     * sử dụng cho table trong combobox chỉ được chọn 1 giá trị
     * và không có nút checkbox và nút sửa
     */
    oneRowSelect: {
      default: false,
    },
  },
  methods: {
    /**
     * format dữ liệu tùy theo loại cần format
     * @author: TTANH (26/06/2023)
     * @param {*} valueRaw dữ liệu cần format
     * @param {string} type loại format: "currency", "gender", "date", ""
     * @returns trả về dữ liệu đã được format
     */
    formatData(valueRaw, type = "") {
      try {
        switch (type) {
          case "currency":
            return formatToCurrency(valueRaw);
            break;

          case "date":
            return formatToDate(valueRaw);
            break;

          default:
            return valueRaw;
            break;
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: MISATable.vue:151 ~ formatData ~ error:",
          error
        );
      }
    },

    /**
     * mở function context
     * @author: TTANH (01/07/2023)
     * @param {*} event
     * @param {string} idFocus id của dòng chứa nút sửa
     */
    clickButtonDropdownFunctionContext(event, idFocus) {
      try {
        if (idFocus !== this.idFunctionContextFocus) {
          //trừ đi kích thước của functionContext
          event.stopPropagation();
          this.leftFunctionContext = event.x - 110 + "px";
          this.topFunctionContext = event.y + "px";
          this.isShowFunctionContext = true;
          this.idFunctionContextFocus = idFocus;

          window.addEventListener("click", this.clickOutSideFunctionContext);
        } else {
          this.closeFunctionContext();
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: MISATable.vue:204 ~ openFunctionContext ~ error:",
          error
        );
      }
    },

    /**
     * đóng function context
     * @author: TTANH (01/07/2023)
     */
    closeFunctionContext() {
      try {
        this.isShowFunctionContext = false;
        this.idFunctionContextFocus = "";
        window.removeEventListener("click", this.clickOutSideFunctionContext);
      } catch (error) {
        console.log(
          "🚀 ~ file: MISATable.vue:240 ~ closeFunctionContext ~ error:",
          error
        );
      }
    },

    /**
     * hàm để check sự kiện clickoutside functionContext
     * @author: TTANH (01/07/2023)
     * @param {*} event
     */
    clickOutSideFunctionContext(event) {
      try {
        if (
          !this.$refs.refFunctionContext.contains(event.target) &&
          !this.$refs[`refDropdownBtn-${this.idFunctionContextFocus}`][0]
            .getIconContainerRef()
            .contains(event.target)
        ) {
          this.closeFunctionContext();
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: MISATable.vue:258 ~ clickOutSideFunctionContext ~ error:",
          error
        );
      }
    },

    /**
     * xử lý khi ấn vào nút xóa ở function context
     * @author: TTANH (01/07/2023)
     */
    clickDeleteBtn() {
      try {
        this.$emit("clickContextDeleteBtn", this.idFunctionContextFocus);
        this.closeFunctionContext();
      } catch (error) {
        console.log(
          "🚀 ~ file: MISATable.vue:294 ~ clickDeleteBtn ~ error:",
          error
        );
      }
    },

    /**
     * thực hiện sự kiện mouse down khi resize
     * @author: TTANH (04/07/2023)
     * @param {*} event
     */
    mouseDownResizeColumn(event, index) {
      try {
        this.prevX = event.clientX;
        this.rowIndexResize = index;

        window.addEventListener("mousemove", this.mouseMoveResizeColumn);
        window.addEventListener("mouseup", this.mouseUpResizeColumn);
      } catch (error) {
        console.log(
          "🚀 ~ file: MISATable.vue:306 ~ mouseDownResizeColumn ~ error:",
          error
        );
      }
    },

    /**
     * thực hiện sự kiện mouse move khi resize
     * @author: TTANH (04/07/2023)
     * @param {*} event
     */
    mouseMoveResizeColumn(event) {
      try {
        if (this.rowIndexResize !== -1) {
          const currentColumnReizer = this.columnsInfo[this.rowIndexResize];
          const currentWidth = currentColumnReizer.size;

          let resizeWidth = currentWidth + (event.clientX - this.prevX);
          this.prevX = event.clientX;

          this.$emit("resizeColumn", this.rowIndexResize, resizeWidth);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: MISATable.vue:324 ~ mouseMoveResizeColumn ~ error:",
          error
        );
      }
    },

    /**
     * xử lý sự kiện mouse up
     * @author: TTANH (04/07/2023)
     * @param {*} event
     */
    mouseUpResizeColumn() {
      this.rowIndexResize = -1;
      window.removeEventListener("mousemove", this.mouseMoveResizeColumn);
      window.removeEventListener("mouseup", this.mouseUpResizeColumn);
    },

    styleTh(column, index) {
      //40 kích thước của checkbox
      let countLeft = 40;

      if (column.isPin) {
        for (let i = 0; i < index; i++) {
          countLeft += this.columnsInfo[i].size;
        }
      }

      return {
        maxWidth: column.size + "px",
        minWidth: column.size + "px",
        width: column.size + "px",
        left: column.isPin ? countLeft + "px" : "",
        zIndex: column.isPin ? 2 : "",
      };
    },

    styleTd(column, index) {
      //40 kích thước của checkbox
      let countLeft = 40;

      if (column.isPin) {
        for (let i = 0; i < index; i++) {
          countLeft += this.columnsInfo[i].size;
        }
      }

      return {
        position: column.isPin ? "sticky" : "",
        left: column.isPin ? countLeft + "px" : "",
        zIndex: column.isPin ? 2 : "",
      };
    },
  },
  computed: {
    /* lọc những column không hiển thị */
    columnsShow() {
      return this.columnsInfo.filter((item) => item.isShow);
    },

    /* tạo progress loading */
    rowsLoad() {
      if (this.rowsData.length === 0) {
        return [
          {
            id: "loading",
          },
          {
            id: "loading",
          },
          {
            id: "loading",
          },
        ];
      } else {
        return this.rowsData;
      }
    },

    styleFunctionContext() {
      return {
        top: this.topFunctionContext,
        left: this.leftFunctionContext,
      };
    },

    checkSelectedAll() {
      if (this.selectedRows.length === 0) {
        return false;
      }

      for (let i = 0; i < this.rowsData.length; i++) {
        if (
          findIndexByAttribute(this.selectedRows, "", this.rowsData[i].id) ===
          -1
        ) {
          return false;
        }
      }

      return true;
    },
  },
};
</script>

<style scoped>
@import url(./table.css);
</style>
