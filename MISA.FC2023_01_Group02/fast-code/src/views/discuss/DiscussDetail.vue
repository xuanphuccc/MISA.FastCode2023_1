<template>
  <div class="page-container">
    <div class="page__header">
      <div class="page__title-wrapper">
        <h1 class="page__title">Thảo luận/Hỏi đáp</h1>
        <span class="page__title-icon ms-icon--angle-down-24" title="Dropdown"></span>
      </div>

      <div class="page__header-controls">
        <MISAButton @click="togglePopup" type="primary">Thêm thảo luận/câu hỏi</MISAButton>
      </div>
    </div>

    <div class="page__content">
      <div class="page__main-content">
        <h1>Tiêu đề</h1>
        <div class="author-wrap">
          Người đăng: <span class="author-wrap__name">Nguyễn Văn Mạnh</span>
        </div>
        <p class="main-content__desc">Em cần sắp xếp các sản phẩm</p>
      </div>

      <MISARow>
        <MISACol span="4"
          ><MISAFormGroup for="input-name" class="mb-12">
            <MISAInput tabindex="1" focus id="input-name" placeholder="Nhập họ và tên" />
          </MISAFormGroup>
        </MISACol>
      </MISARow>
      <MISARow>
        <MISACol span="12">
          <MISAFormGroup for="input-content">
            <MISATextArea
              tabindex="2"
              placeholder="Nhập nội dung"
              id="input-content"
            ></MISATextArea>
          </MISAFormGroup>
        </MISACol>
      </MISARow>

      <div class="page__controls">
        <MISAButton type="danger">Huỷ</MISAButton>
        <MISAButton>Trả lời</MISAButton>
      </div>

      <div class="discuss-comment">
        <div class="discuss-comment__title">
          <div class="discuss-comment__title-name">Nguyễn Văn Mạnh</div>
          <div class="discuss-comment__title-time">(21:12:22 17/11/2023)</div>
        </div>
        <div class="discuss-comment__de">Sử dụng thuộc tính flex</div>
      </div>
      <div class="discuss-comment">
        <div class="discuss-comment__title">
          <div class="discuss-comment__title-name">Nguyễn Văn Mạnh</div>
          <div class="discuss-comment__title-time">(21:12:22 17/11/2023)</div>
        </div>
        <div class="discuss-comment__de">Sử dụng thuộc tính flex</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MISARow from "@/components/base/grid/MISARow.vue";
import MISACol from "@/components/base/grid/MISACol.vue";
import MISAFormGroup from "@/components/base/input/MISAFormGroup.vue";
import MISATextArea from "@/components/base/input/MISATextArea.vue";
import MISAInput from "@/components/base/input/MISAInput.vue";
import MISAButton from "@/components/base/button/MISAButton.vue";
</script>

<style scoped>
.page__main-content {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 16px;
  margin-bottom: 12px;
}

.page__content {
  padding: 16px;
}

.author-wrap {
  font-weight: 500;
  margin-top: 8px;
}
.author-wrap__name {
  font-weight: 400;
}

.main-content__desc {
  margin-top: 8px;
}

.page__controls {
  padding: 0 16px;
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  column-gap: 8px;
}

.discuss-comment {
  padding: 16px 0;
}

.discuss-comment__title {
  display: flex;
  font-weight: 500;
  color: var(--primary-color-500);
}

.discuss-comment__title-time {
  margin-left: 4px;
  color: var(--primary-text-color);
  font-weight: 400;
}
</style>
