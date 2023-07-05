<template>
    <div class="page">
        <div class="page__header">
            <div class="page__title">Thảo luận/ Hỏi đáp</div>
        </div>
        <div class="page__container">
            <div class="thread__detail">
                <div class="thread__title">Tiêu đề: Cần giúp đỡ về việc sử dụng thuộc tính flex?</div>
                <div class="thread__user"><span class="user__label">Người đăng:</span> Nguyễn Văn Mạnh</div>
                <div class="thread__content">"Em cần sắp xếp các sản phẩm tự động theo từng hàng, nếu chiều rộng không đủ để
                    chứa hết các sản phẩm thì làm thế nào để có thể tự xuống dòng?"</div>
                <!-- <div class="thread__line">Trả lời</div> -->
                <div class="thread__user-answer" v-if="showReply">
                    <input type="text" placeholder="Nhập họ và tên" style="width: 200px;">
                    <textarea name="" id="" cols="30" rows="10" placeholder="Nhập nội dung"></textarea>
                    <div class="error-info">Thông tin này không được để trống.</div>
                </div>
                <div class="thread__button">
                    <button class="m-button m-button--delete" v-if="showReply">Hủy</button>
                    <button class="m-button m-button--default" style="width: 100px; float: right;"><i class="icofont-reply"
                            @click="onShowReply"></i> Trả lời</button>
                </div>
                <div class="thread__answers">
                    <div class="answer">
                        <div class="answer__name">Nguyễn Văn Toàn <span class="time-info">(21:12:22 17/11/2022)</span></div>
                        <div class="answer__content">Sử dụng thuộc tính flex-wrap.</div>
                    </div>
                    <div class="answer">
                        <div class="answer__name">Đỗ Văn Cường <span class="time-info">(06:56:22 10/09/2022)</span></div>
                        <div class="answer__content">Không cần sử dụng flex cũng được.</div>
                    </div>
                    <div class="answer">
                        <div class="answer__name">Trần Văn Quân <span class="time-info">(03:11:00 07/07/2022)</span></div>
                        <div class="answer__content">Sử dụng position thử xem.</div>
                    </div>
                </div>
            </div>
            <div class="thread__footer">
                <button class="m-button m-button--default">Quay lại</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "DiscussDetail",
    created() {

    },
    methods: {
        onShowReply() {
            this.showReply = !this.showReply;
        }
    },
    data() {
        return {
            showReply: false,
        }
    },
}
</script>
<style scoped>
.page__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.user__label {
    text-decoration: underline;
    font-weight: 700;
}

.thread__line {
    font-weight: 700;
    text-decoration: underline;
}

.thread__detail {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.thread__title {
    font-weight: 700;
    font-size: 20px;
}

.thread__content {
    border-bottom: 1px dashed var(--border-color-default);
    padding-bottom: 16px;
}

.page__container {
    padding: 16px;
}

.thread__user-answer {
    display: flex;
    flex-direction: column;
}

.thread__user-answer textarea {
    margin-top: 10px;
}

.answer__name {
    font-weight: 700;
    color: var(--color-primary);
}

.thread__button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 10px;
}

.thread__answers {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
}

.time-info {
    color: #535353;
}

.error-info {
    color: #ff0000;
    margin-top: 4px;
}
</style>