<template>
    <div class="m-dialog">
        <div class="m-dialog-container">
            <button class="m-dialog__button--close" @click="onCloseDialog"></button>
            <div class="m-dialog__header">Thông tin chủ đề</div>
            <div class="m-dialog__body">
                <div class="thread__form" style="width: 450px !important;">
                    <div class="m-row">
                        <m-input label="Họ và tên"></m-input>
                        <div class="error-info">Thông tin này không được để trống.</div>
                    </div>
                    <div class="m-row">
                        <m-input label="Tiêu đề"></m-input>
                        <div class="error-info">Thông tin này không được để trống.</div>
                    </div>
                    <div class="control-wrapper flex-1">
                        <label for="">Loại chủ đề</label>
                        <div class="radio-group">
                            <div class="radio-item">
                                <input name="gender" type="radio" />
                                <label for="gender">Hỏi đáp</label>
                            </div>
                            <div class="radio-item">
                                <input name="gender" type="radio" />
                                <label for="gender">Thảo luận</label>
                            </div>
                            <div class="radio-item">
                                <input name="gender" type="radio" />
                                <label for="gender">Chia sẻ</label>
                            </div>
                        </div>
                    </div>
                    <div class="m-row">
                        <textarea name="" id="" cols="30" rows="10" placeholder="Nhập nội dung"></textarea>
                        <div class="error-info">Thông tin này không được để trống.</div>
                    </div>
                </div>
            </div>
            <div class="m-dialog__footer">
                <button class="m-button m-button--cancel">Hủy bỏ</button>
                <button class="m-button m-dialog__button--confirm m-button--primary">
                    Lưu
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "DiscussForm"
}
</script>
<style scoped>
.m-row {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
}

.thread__form {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
}

.error-info {
    color: #ff0000;
    margin-top: 4px;
}
</style>