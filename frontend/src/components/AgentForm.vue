<template>
    <div class="agent-form">
        <h2 class="text-lg font-bold mb-4">
            {{ isEdit ? "Edit Agent" : "Create Agent" }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-3">
            <div>
                <label class="block text-sm font-medium mb-1">First Name</label>
                <input v-model="form.firstName" type="text" class="border rounded w-full p-2" required />
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Last Name</label>
                <input v-model="form.lastName" type="text" class="border rounded w-full p-2" required />
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input v-model="form.email" type="email" class="border rounded w-full p-2" required />
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Mobile Number</label>
                <input v-model="form.mobileNumber" type="text" class="border rounded w-full p-2" required />
            </div>

            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {{ isEdit ? "Update" : "Create" }} Agent
            </button>
        </form>

        <p v-if="message" class="mt-3 text-green-600">{{ message }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineEmits } from "vue";

interface Agent {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
}


const props = defineProps<{ id?: number }>();


const form = ref<Agent>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
});

const message = ref("");
const emit = defineEmits(["agent-saved"]);

const isEdit = computed(() => !!props.id);

onMounted(async () => {
    if (isEdit.value && props.id) {
        try {
            const res = await fetch(`/api/agents/${props.id}`);
            form.value = res.data;
        } catch (err) {
            console.error("Failed to load agent:", err);
        }
    }
});


const handleSubmit = async () => {
    try {
        if (isEdit.value && props.id) {
            await await fetch(`/api/agents/${props.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form.value)
            })
            emit("agent-saved");
            message.value = "Agent updated successfully!";
        } else {
            await await fetch("/api/agents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form.value)
            }).then(console.log)
                .catch(console.error);;
            message.value = "Agent created successfully!";
            emit("agent-saved");
            form.value = { firstName: "", lastName: "", email: "", mobileNumber: "" };
        }

    } catch (err) {
        console.error("Error submitting agent:", err);
        message.value = "Error submitting agent.";
    }
};
</script>

<style scoped>
.agent-form {
    max-width: 400px;
    margin: 0 auto;
}
</style>
