<script setup>
import { defineProps } from "vue";

const emit = defineEmits(["transactionDeleted"]);

defineProps({
    transactions: {
        type: Array,
        required: true,
    },
});

const deleteTransaction = (transactionId) => {
    emit("transactionDeleted", transactionId);
};
</script>

<template>
    <h3>交易記錄</h3>
    <ul id="list" class="list">
        <li
            v-for="transaction in transactions"
            :key="transaction.id"
            :class="transaction.amount < 0 ? 'minus' : 'plus'"
        >
            {{ transaction.text }}
            <span v-if="transaction.amount > 0"
                >￥+{{ transaction.amount }}</span
            >
            <span v-else>￥{{ transaction.amount }}</span>
            <button
                class="delete-btn"
                @click="deleteTransaction(transaction.id)"
            >
                X
            </button>
        </li>
    </ul>
</template>
