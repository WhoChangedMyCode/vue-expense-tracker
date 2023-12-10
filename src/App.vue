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

<script setup>
import { ref, computed, onMounted } from "vue";
// 彈窗提示
import { useToast } from "vue-toastification";

import Header from "./components/HeaderComp.vue";
import Balance from "./components/BalanceComp.vue";
import IncomeExpense from "./components/IncomeExpensesComp.vue";
import TransactionList from "./components/TransactionListComp.vue";
import AddTransaction from "./components/AddTransactionComp.vue";

// 初始化useToast
const toast = useToast();
// const transactions = ref([
//     { id: 1, text: "Flower", amount: -19.99 },
//     { id: 2, text: "Salary", amount: 298.97 },
//     { id: 3, text: "Book", amount: -10 },
//     { id: 4, text: "Camera", amount: 150 },
// ]);
const transactions = ref([]);

onMounted(() => {
    let savedTransactions = JSON.parse(localStorage.getItem("transactions"));
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
    toast.success("Transaction added");
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
    toast.success("Transaction deleted");
};

// Sava to local storage
const savaTransactionsToLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
</script>
