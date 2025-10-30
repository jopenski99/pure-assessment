<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Property Agents</h2>
    <p v-if="loading">Loading agents...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Mobile</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="agent in agents"
          :key="agent.id"
          @click="selectAgent(agent)"
          style="cursor: pointer"
        >
          <td>{{ agent.id }}</td>
          <td>{{ agent.firstName }}</td>
          <td>{{ agent.lastName }}</td>
          <td>{{ agent.email }}</td>
          <td>{{ agent.mobileNumber }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="!loading && agents.length === 0">No agents found.</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineExpose, defineEmits  } from "vue";

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
const emit = defineEmits(["agent-selected"]);

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
function selectAgent(agent: Agent) {
  emit("agent-selected", agent.id);
}
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

onMounted(fetchAgents);
defineExpose({ fetchAgents });
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
