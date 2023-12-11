<!-- 
在Vue2中，<script>和<template>的順序沒有規定，可以任意排列。
但是，在Vue3中，官方文檔中默認將<script>寫在<template>的前面。這有以下幾個原因：
    讓開發者更容易理解組件的結構。在Vue2中，<script>和<template>的順序可以任意排列，這可能會讓開發者感到困惑。
    在Vue3中，將<script>寫在<template>的前面，可以讓開發者更容易理解組件的結構，即數據和邏輯在前，樣式在後。
    提高編譯性能。在編譯時，Vue需要解析<script>中的變量和函數，然後將其轉換為響應式數據和計算屬性。
    如果將<script>寫在<template>的前面，則可以讓 Vue 在解析<template>之前完成這一步，從而提高編譯性能。
當然，這只是官方文檔的默認寫法，開發者可以根據自己的喜好和習慣來決定<script>和<template>的順序。
-->
<script setup>
import { ref, computed, onMounted } from "vue";
// 導入通知庫
import { useToast } from "vue-toastification";

/**
 * 在Vue3中，使用相對路徑和使用絕對路徑在性能上沒有明顯的差別。這主要是因為Vue3的編譯器會將相對路徑轉換為絕對路徑。
 * 在Vue2中，使用相對路徑和使用絕對路徑在性能上可能會有一定的差別。這是因為Vue2的編譯器不會將相對路徑轉換為絕對路徑。
 * 在這種情況下，使用相對路徑時，編譯器需要在運行時解析相對路徑，這會增加一些額外的性能開銷。
 * 以下是一些使用絕對路徑可以提高性能的具體情況：
 * 在使用 import 語句引入組件或其他資源時。
 * 在使用 require() 語句引入模塊時。
 * 在使用 Vue.prototype.component() 方法註冊組件時。
 */
// import Header from "./components/HeaderComp.vue";
import Header from "./components/HeaderComp.vue";
import Balance from "./components/BalanceComp.vue";
import IncomeExpense from "./components/IncomeExpensesComp.vue";
import TransactionList from "./components/TransactionListComp.vue";
import AddTransaction from "./components/AddTransactionComp.vue";

// 初始化useToast
const toast = useToast();
const transactions = ref([]);

onMounted(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (savedTransactions) {
        transactions.value = savedTransactions;
    }
});

// Get total
const total = computed(() => {
    return transactions.value
        .reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0)
        .toFixed(2);
});

// Get income
const income = computed(() => {
    return transactions.value
        .filter((transaction) => transaction.amount > 0)
        .reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0)
        .toFixed(2);
});

// Get expenses
const expenses = computed(() => {
    return transactions.value
        .filter((transaction) => transaction.amount < 0)
        .reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0)
        .toFixed(2);
});

// Add transaction
const handleTransactionSubmitted = (transactionData) => {
    transactions.value.push({
        id: generateUniqueId(),
        text: transactionData.text,
        amount: transactionData.amount,
    });
    savaTransactionsToLocalStorage();
    toast.success("添加交易記錄成功");
};

// Generate unique ID
const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000);
};

// Deleted transaction
const handleTransactionDeleted = (transactionId) => {
    transactions.value = transactions.value.filter((transaction) => {
        return transaction.id !== transactionId;
    });
    savaTransactionsToLocalStorage();
    toast.success("刪除交易記錄成功");
};

// Sava to local storage
const savaTransactionsToLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
</script>

<template>
    <Header />
    <div class="container">
        <Balance :total="+total" />
        <!-- +號確保是傳遞Number類型 -->
        <IncomeExpense :income="+income" :expenses="+expenses" />
        <TransactionList
            :transactions="transactions"
            @transactionDeleted="handleTransactionDeleted"
        />
        <!-- 為甚麼不能寫() -->
        <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
    </div>
</template>
