import axios, { AxiosInstance } from "axios";
import { HttpAdapater } from "../interfaces/http-adapater.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements HttpAdapater{

    private readonly axios: AxiosInstance = axios;


    async get<T>(url: string): Promise<T> {
        try {
            const { data }= await this.axios.get<T>(url);
            return data;
        } catch (error) {
           throw new Error(`Ha ocurrido un error - verifica los logs`); 
        }
    }

}