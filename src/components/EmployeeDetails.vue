<template>
  <div>
    <employee-form />
    <employee-table v-bind:employees="employees" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import EmployeeTable from "@/components/EmployeeTable.vue";
import EmployeeForm from "@/components/EmployeeForm.vue";
import { User } from "@/types/User";
import { EmployeeService } from "@/service/EmployeeService.ts";
import { EmployeeTableState } from "@/types/EmployeeTableState";
import { Store } from "vuex";
import store from "@/store";

export default Vue.extend({
  name: "app",
  components: {
    EmployeeForm,
    EmployeeTable
  },
  mounted() {
    const service: EmployeeService = this.store().state.employeeService;
    service.getEmployees().then(users => {
      this.store().commit("setEmployees", users);
    });
  },
  computed: {
    employees(): User[] {
      return this.store().state.employees;
    }
  },
  methods: {
    store(): Store<EmployeeTableState> {
      return this.$store;
    }
  }
});
</script>