<script setup>
import { defineProps } from "vue";
defineProps({
    income: {
        type: Number,
        require: true,
    },
    expenses: {
        type: Number,
        require: true,
    },
});
</script>

<template>
    <div class="inc-exp-container">
        <div>
            <h4>歷史收入</h4>
            <p id="money-plus" class="money plus">￥+{{ income }}</p>
        </div>
        <div>
            <h4>歷史支出</h4>
            <p id="money-minus" class="money minus">￥{{ expenses }}</p>
        </div>
    </div>
</template>
