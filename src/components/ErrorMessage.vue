<template>
    <div class="text-sm w-full px-4 bg-red-100 text-red-500 py-2 rounded-xl mb-5">
        {{ message }}
    </div>
</template>

<script setup>

defineProps({
    message: {
        type: String,
        required: true,
    },
});

</script>