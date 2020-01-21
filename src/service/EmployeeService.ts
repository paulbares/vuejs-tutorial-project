import axios from "axios";
import { User } from "@/types/User";

export class EmployeeService {
    constructor(url: string) {
    }
    public async getEmployees(): Promise<User[]> {
        return await axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(r => r.data);
    };

    public addEmployee(e: User): Promise<User> {
        return axios
            .post("https://jsonplaceholder.typicode.com/users", {
                name: e.name,
                email: e.email
            })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            }) as Promise<any>;
    }
}