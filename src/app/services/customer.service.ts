import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Customer } from '../interfaces/customer';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  public readonly Customers_Base_URL: string = "https://localhost:7274/api/Customers";
  
  public refreshData = new Subject<boolean>();

  getCustomersList(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.Customers_Base_URL);
  }

  addCustomerData(newCustomer: Customer): Observable<Customer> {
    const request = {
      Name: newCustomer.FullName,
      DateOfBirth: new Date(newCustomer.DateOfBirth)
    }
    return this.http.post<Customer>(this.Customers_Base_URL, request);
  }

  editCustomerData(editedCustomer: any): Observable<Customer> {
    const request = {
      FullName: editedCustomer.fullName,
      DateOfBirth: new Date(editedCustomer.dateOfBirth)
    }
    return this.http.patch<Customer>(this.Customers_Base_URL+"/GUID?guid="+editedCustomer.customerId, request);
  }
  
  filterCustomerDataByAge(age: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.Customers_Base_URL+"/Int?age="+age);
  }
}

