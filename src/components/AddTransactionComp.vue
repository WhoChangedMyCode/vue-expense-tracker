<script setup>
import { ref } from "vue";
// 導入通知庫
import { useToast } from "vue-toastification";

const text = ref("");
const amount = ref("");
const emit = defineEmits(["transactionSubmitted"]);

// 初始化useToast
const toast = useToast();

const onSubmit = () => {
    if (!text.value) {
        toast.warning("請輸入交易描述");
    } else if (!amount.value) {
        toast.warning("請輸入交易金額");
    } else {
        const transactionData = {
            text: text.value,
            amount: parseFloat(amount.value),
        };
        emit("transactionSubmitted", transactionData);
        // 清空輸入框
        text.value = "";
        amount.value = "";
    }
};
</script>

<template>
    <h3>添加交易記錄</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <!-- 官方仍建議你顯式地為 input 元素設定 id 相匹配的標簽，以更好地實現無障礙訪問。 -->
            <!-- https://cn.vuejs.org/guide/best-practices/accessibility.html -->
            <!-- <label>
                <input type="text" v-model="text" placeholder="Enter text..." />
            </label> -->
            <label for="text"></label>
            <input
                type="text"
                id="text"
                v-model="text"
                placeholder="輸入描述..."
            />
        </div>
        <div class="form-control">
            <label for="amount"></label>
            <input
                type="text"
                id="amount"
                v-model="amount"
                placeholder="輸入金額（負數：支出，正數：收入）..."
            />
        </div>
        <button class="btn">添加</button>
    </form>
</template>
