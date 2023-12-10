<template>
    <h3>Add new transaction</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <label>
                <input type="text" v-model="text" placeholder="Enter text..." />
            </label>
        </div>
        <div class="form-control">
            <label>
                Amount
                <br />(negative - expense, positive - income)
                <input
                    type="text"
                    v-model="amount"
                    placeholder="Enter amount..."
                />
            </label>
        </div>
        <button class="btn">Add transaction</button>
    </form>
</template>

<script setup>
import { ref } from "vue";
// 彈窗提示
import { useToast } from "vue-toastification";

const text = ref("");
const amount = ref("");
const emit = defineEmits(["transactionSubmitted"]);

// 初始化useToast
const toast = useToast();

const onSubmit = () => {
    if (!text.value || !amount.value) {
        toast.error("Both fields musts be filled");
        return;
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
