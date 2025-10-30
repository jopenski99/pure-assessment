<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Agents ref="agentTableRef" @agent-selected="handleAgentSelected" @agent-deleted="clearForm"/>
  <AgentForm ref="agentForm" :id="selectedAgent" @agent-saved="refreshTable"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Agents from './components/Agents.vue'
import AgentForm from './components/AgentForm.vue';

const agentTableRef = ref<InstanceType<typeof Agents> | null>(null);
const agentForm = ref<InstanceType<typeof AgentForm> | null>(null);
const selectedAgent = ref(null);

function refreshTable() {
  console.log("Refreshing table...");
  console.log(agentTableRef.value);
  agentTableRef.value?.fetchAgents();
}
function handleAgentSelected(agent) {
  selectedAgent.value = agent;
}
function clearForm() {
  console.log("Clearing form...");
  selectedAgent.value = null;
  agentForm.value?.clearForm();
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
