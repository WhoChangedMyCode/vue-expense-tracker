<script setup>
// defineProps 和 defineEmits 都是只能在 <script setup> 中使用的编译器宏。
// 他们不需要导入，且会随着 <script setup> 的处理过程一同被编译掉。
// https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits
// import { defineProps } from "vue";

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
