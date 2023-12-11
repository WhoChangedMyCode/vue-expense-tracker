<script setup>
import { defineProps } from "vue";

defineProps({
    total: {
        type: Number,
        require: true,
    },
});
</script>

<template>
    <h4>當前餘額</h4>
    <h1 id="balance" :class="total > 0 ? 'plus' : 'minus'">￥{{ total }}</h1>
</template>
