/**
 * tìm kiếm vị trí của 1 giá trị
 * @param {Array} arrayFind mảng cần tìm kiếm
 * @param {string} attr thuộc tính cần tìm kiếm
 * @param {*} valueFind giá trị cần tìm kiếm
 * @returns -1 nếu không tìm thấy, 1 số >= 0 nếu tìm thấy
 */
export const findIndexByAttribute = function (arrayFind, attr, valueFind) {
  try {
    if (attr === "") {
      for (let i = 0; i < arrayFind.length; i++) {
        if (arrayFind[i] == valueFind) {
          return i;
        }
      }
    } else {
      for (let i = 0; i < arrayFind.length; i++) {
        if (arrayFind[i][attr] == valueFind) {
          return i;
        }
      }
    }

    return -1;
  } catch (error) {
    console.log("🚀 ~ file: index.js:5 ~ findIndexByAttribute ~ error:", error);
  }
};

/**
 * sắp xếp array theo thuộc tính
 * @param {*} arrayIn array muốn sắp xếp
 * @param {*} attr thuộc tính muốn so sánh
 * @returns array đã được sắp xếp
 */
export const sortArrayByAttribute = function (arrayIn, attr) {
  return mergeSortByAttribute(arrayIn, attr);
};

const mergeSortByAttribute = function (arr, attr) {
  try {
    if (arr.length <= 1) return arr;

    const right = [...arr];

    const middlePoint = arr.length / 2;
    const left = right.splice(0, middlePoint);

    return mergeUnsortedArrsByAttribute(
      mergeSortByAttribute(left, attr),
      mergeSortByAttribute(right, attr),
      attr
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: common.js:38 ~ mergeSortByAttribute ~ error:",
      error
    );
  }
};

const mergeUnsortedArrsByAttribute = function (left, right, attr) {
  try {
    const sortedItems = [];

    while (left.length && right.length) {
      if (left[0][attr] >= right[0][attr]) {
        sortedItems.push(left.shift());
      } else {
        sortedItems.push(right.shift());
      }
    }

    return [...sortedItems, ...left, ...right];
  } catch (error) {
    console.log(
      "🚀 ~ file: common.js:60 ~ mergeUnsortedArrsByAttribute ~ error:",
      error
    );
  }
};

/**
 * hàm tạo ra uuid
 * @author: TTANH (01/07/2023)
 * @returns 1 uuid mới
 */
export const generateUuid = function () {
  try {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  } catch (error) {
    console.log("🚀 ~ file: common.js:30 ~ generateUuid ~ error:", error);
  }
};
