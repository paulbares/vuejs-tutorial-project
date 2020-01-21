import axios from "axios";
import { User } from "@/types/User";

export class EmployeeService {
    readonly url: string;
    constructor(url: string) {
        this.url = url;
    }

    async getEmployees(): Promise<User[]> {
        return await axios
            .get(this.url)
            .then(r => r.data);
    };

    async addEmployee(e: User): Promise<User> {
        return axios
            .post(this.url, {
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

    async editEmployee(id: number, updatedEmployee: User): Promise<User> {
        return axios
            .put(
                `${this.url}/${id}`,
                updatedEmployee
            )
            .then(r => r.data)
    }

    async deleteEmployee(id: number): Promise<void> {
        return axios.delete(`${this.url}/${id}`);
    }
}