import Vue from "vue";
import Vuex from "vuex";
import { User } from "@/types/User";
import { EmployeeService } from "@/service/EmployeeService.ts";
import { EmployeeTableState } from "@/types/EmployeeTableState.ts";

Vue.use(Vuex);

const employeeService: EmployeeService = new EmployeeService(
  "https://jsonplaceholder.typicode.com/users"
);

export default new Vuex.Store<EmployeeTableState>({
  state: new EmployeeTableState([], employeeService),
  mutations: {
    setEmployees(state, es: User[]) {
      // debugger;
      state.employees = es;
    },
    addEmployee(state, e: User) {
      // debugger;
      state.employees = [...state.employees, e];
    },
    editEmployee(state, users: User[]) {
      state.employees = users;
    },
    deleteEmployee(state, id: number) {
      state.employees = state.employees.filter(employee => employee.id !== id);
    }
  },
  actions: {
    addEmployeeAsync(context, e: User) {
      context.state.employeeService.addEmployee(e)
        .then(u => {
          context.commit('addEmployee', u);
          return u;
        })
        .then(u => console.log(JSON.stringify(u) + " added"));
    },
    editEmployeeAsync(context, p: { id: number, u: User }) {
      context.state.employeeService.editEmployee(p.id, p.u)
        .then(user => {
          const res = this.state.employees.map(employee =>
            employee.id === user.id ? user : employee)
          context.commit('editEmployee', res);
          console.log(JSON.stringify(p.u) + " edited");
        });
    },
    deleteAsync(context, u: User) {
      context.state.employeeService.deleteEmployee(u.id)
        .then(() => {
          context.commit("deleteEmployee", u);
          console.log(JSON.stringify(u) + " deleted");
        });
    }
  },
});
