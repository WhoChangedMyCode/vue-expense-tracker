<script setup>
// defineProps 和 defineEmits 都是只能在 <script setup> 中使用的编译器宏。
// 他们不需要导入，且会随着 <script setup> 的处理过程一同被编译掉。
// https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits
// import { defineProps } from "vue";

defineProps({
    // 如果一个 prop 的名字很长，应使用 camelCase 形式，
    // 因为它们是合法的 JavaScript 标识符，可以直接在模板的表达式中使用，
    // 也可以避免在作为属性 key 名时必须加上引号。
    // https://cn.vuejs.org/guide/components/props.html
    total: {
        type: Number,
        // Prop校驗，必傳
        // 所有 prop 默认都是可选的，除非声明了 required: true。
        required: true,
    },
});
</script>

<template>
    <h4>當前餘額</h4>
    <h1 id="balance" :class="total > 0 ? 'plus' : 'minus'">￥{{ total }}</h1>
</template>
