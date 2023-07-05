<template>
  <MISAPopup @close="$emit('close')" :width="420" :title="'Thông tin chủ đề'">
    <template #default>
      <MISARow :gutter="{ x: 8 }">
        <MISACol span="12">
          <MISAFormGroup label="Họ và tên" for="input-name" class="mb-24" required-mark>
            <MISAInput tabindex="1" id="input-name" focus />
          </MISAFormGroup>
        </MISACol>
        <MISACol span="12">
          <MISAFormGroup label="Tiêu đề" for="input-title" class="mb-24" required-mark>
            <MISAInput tabindex="2" id="input-title" />
          </MISAFormGroup>
        </MISACol>
        <MISACol span="12">
          <MISAFormGroup label="Loại chủ đề" for="" class="mb-24">
            <div class="d-flex col-gap-16">
              <MISARadioButton tabindex="3" value="0" label="Hỏi đáp" />
              <MISARadioButton tabindex="4" value="1" label="Thảo luận" />
              <MISARadioButton tabindex="5" value="2" label="Chia sẻ" />
            </div>
          </MISAFormGroup>
        </MISACol>
        <MISACol span="12">
          <MISATextArea tabindex="6" id="input-content" placeholder="Nhập nội dung" />
        </MISACol>
      </MISARow>
    </template>

    <template #controls-right>
      <MISAButton tabindex="7" type="secondary">
        <span>Huỷ bỏ</span>
      </MISAButton>
      <MISAButton tabindex="8" type="primary">
        <span>Lưu</span>
      </MISAButton>
    </template>
  </MISAPopup>
</template>

<script setup>
import MISAPopup from "@/components/base/popup/MISAPopup.vue";
import MISAButton from "@/components/base/button/MISAButton.vue";
import MISAFormGroup from "@/components/base/input/MISAFormGroup.vue";
import MISAInput from "@/components/base/input/MISAInput.vue";
import MISATextArea from "@/components/base/input/MISATextArea.vue";
import MISARadioButton from "@/components/base/radio-button/MISARadioButton.vue";
import MISARow from "@/components/base/grid/MISARow.vue";
import MISACol from "@/components/base/grid/MISACol.vue";

defineEmits(["close", "submit"]);
</script>
