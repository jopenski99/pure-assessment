<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Property Agents</h2>

    <!-- Loading state -->
    <p v-if="loading">Loading agents...</p>

    <!-- Error message -->
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <!-- Data table -->
    <table
      v-if="!loading && agents.length > 0"
      class="min-w-full border border-gray-300 rounded-lg"
    >
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-4 py-2 text-left">ID</th>
          <th class="border px-4 py-2 text-left">First Name</th>
          <th class="border px-4 py-2 text-left">Last Name</th>
          <th class="border px-4 py-2 text-left">Email</th>
          <th class="border px-4 py-2 text-left">Mobile</th>
          <th class="border px-4 py-2 text-left">Created At</th>
          <th class="border px-4 py-2 text-left">Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="agent in agents"
          :key="agent.id"
          class="hover:bg-gray-50 transition"
        >
          <td class="border px-4 py-2">{{ agent.id }}</td>
          <td class="border px-4 py-2">{{ agent.firstName }}</td>
          <td class="border px-4 py-2">{{ agent.lastName }}</td>
          <td class="border px-4 py-2">{{ agent.email }}</td>
          <td class="border px-4 py-2">{{ agent.mobileNumber }}</td>
          <td class="border px-4 py-2">{{ formatDate(agent.createdAt) }}</td>
          <td class="border px-4 py-2">{{ formatDate(agent.updatedAt) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Empty state -->
    <p v-if="!loading && agents.length === 0">No agents found.</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface Agent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
  updatedAt: string;
}

const agents = ref<Agent[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

const fetchAgents = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch("/api/agents");
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const data = await res.json();
    agents.value = data;
  } catch (err: any) {
    error.value = err.message || "Failed to load agents.";
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

onMounted(fetchAgents);
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  text-align: left;
}
</style>
