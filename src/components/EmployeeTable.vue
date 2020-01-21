<template>
  <div id="employee-table">
    <p v-if="employees.length < 1" class="empty-table">No employees</p>
    <table v-else>
      <thead>
        <tr>
          <th>Employee name</th>
          <th>Employee email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td v-if="editing === employee.id">
            <input type="text" v-model="employee.name" />
          </td>
          <td v-else>{{employee.name}}</td>
          <td v-if="editing === employee.id">
            <input type="text" v-model="employee.email" />
          </td>
          <td v-else>{{employee.email}}</td>
          <td v-if="editing === employee.id">
            <button @click="editEmployee(employee)">Save</button>
            <button class="muted-button" @click="cancelEdit(employee)">Cancel</button>
          </td>
          <td v-else>
            <button @click="editMode(employee)">Edit</button>
            <button @click="deleteEmployee(employee.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "@/types/User";
import { EmployeeTableState } from "../types/EmployeeTableState";
import { Store } from "vuex";

export default Vue.extend({
  name: "employee-table",
  props: {
    employees: Array as () => Array<User>
  },
  data() {
    return {
      editing: -1,
      cachedEmployee: { id: 0, name: "", email: "" }
    };
  },

  methods: {
    store(): Store<EmployeeTableState> {
      return this.$store;
    },
    editMode(employee: User) {
      this.cachedEmployee = Object.assign({}, employee);
      this.editing = employee.id;
    },
    cancelEdit(employee: User) {
      Object.assign(employee, this.cachedEmployee);
      this.editing = -1;
    },
    editEmployee(employee: User) {
      if (employee.name === "" || employee.email === "") return;
      this.store().dispatch("editEmployeeAsync", {
        id: employee.id,
        u: employee
      });
      this.editing = -1;
    },
    deleteEmployee(id: number) {
      this.store().dispatch("deleteAsync", id);
    }
  }
});
</script>

<style scoped></style>