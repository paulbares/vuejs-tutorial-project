import { User } from "./User";
import { EmployeeService } from "@/service/EmployeeService";

export class EmployeeTableState {
    employees: User[];
    employeeService: EmployeeService;

    constructor(employee: User[], employeeService: EmployeeService) {
        this.employees = employee;
        this.employeeService = employeeService;
    }
}