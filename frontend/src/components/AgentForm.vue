<template>
    <div class="agent-form">

        <form @submit.prevent="handleSubmit"
            class="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4 border border-gray-100">
            <h2 class="text-2xl font-semibold text-gray-700 mb-4 text-center">
                {{ isEdit ? "Edit Agent" : "Create New Agent" }}
            </h2>

            <div class="form-control">
                <label class="label">
                    <span class="label-text font-medium text-gray-600">First Name</span>
                </label>
                <input v-model="form.firstName" type="text" placeholder="Enter first name"
                    class="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div class="form-control">
                <label class="label">
                    <span class="label-text font-medium text-gray-600">Last Name</span>
                </label>
                <input v-model="form.lastName" type="text" placeholder="Enter last name"
                    class="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div class="form-control">
                <label class="label">
                    <span class="label-text font-medium text-gray-600">Email</span>
                </label>
                <input v-model="form.email" type="email" placeholder="example@email.com"
                    class="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div class="form-control">
                <label class="label">
                    <span class="label-text font-medium text-gray-600">Mobile Number</span>
                </label>
                <input v-model="form.mobileNumber" type="text" placeholder="09xxxxxxxxx"
                    class="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div class="form-control mt-6 flex justify-between full-width">
                <button type="submit"
                    class="btn btn-primary w-full hover:scale-[1.02] transition-transform duration-150 full-width">
                    {{ isEdit ? "Update Agent" : "Create Agent" }}
                </button>
            </div>
        </form>


        <p v-if="message" class="mt-3 text-green-600">{{ message }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineEmits, watch } from "vue";

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

watch(
    () => props.id,
    async (newId) => {
        if (newId) {

            try {
                const res = await fetch(`/api/agents/${newId}`);
                if (res.ok) {
                    const data = await res.json();
                    form.value = data;
                }
            } catch (err) {
                console.error("Failed to load agent", err);
            }
        } else {

            form.value = {
                id: null,
                firstName: "",
                lastName: "",
                email: "",
                mobileNumber: "",
            };
        }
    },
    { immediate: true }
);
const handleSubmit = async () => {
    try {
        if (isEdit.value && props.id) {
            await await fetch(`/api/agents/${props.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form.value)
            })
            emit("agent-saved");
            message.value = "Agent updated successfully!";
            form.value = { firstName: "", lastName: "", email: "", mobileNumber: "" };
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

.label{
    text-align: left;
}
.full-width {
    width: 100%;
    margin-top: 10px;
}
.form-control {
    display: flex;
    justify-content: space-between;
}
</style>
