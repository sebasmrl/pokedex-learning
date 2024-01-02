
export interface HttpAdapater{
    get<T>(url:string): Promise<T>; 
}