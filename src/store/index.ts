import Vue from "vue";
import Vuex from "vuex";
import { User } from "@/types/User";
import { EmployeeService } from "@/service/EmployeeService.ts";
import { EmployeeTableState } from "@/types/EmployeeTableState.ts";

Vue.use(Vuex);

const employeeService: EmployeeService = new EmployeeService(
  "https://jsonplaceholder.typicode.com/users"
);

export class Zob extends Vuex.Store<EmployeeTableState>{

}

export default new Zob({
  state: new EmployeeTableState([], employeeService),
  mutations: {
    setEmployees(state, es: User[]) {
      // debugger;
      state.employees = es;
    },
    addEmployee(state, e: User) {
      state.employees = [...state.employees, e];
    }
  },
  actions: {
    addEmployeeAsync(context, e: User) {
      context.state.employeeService.addEmployee(e).then(u => context.dispatch('addEmployee'));
    }
  }
});
