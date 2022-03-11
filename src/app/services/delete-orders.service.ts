import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DeleteOrdersService {

  constructor(private http:HttpClient) { }
  deleteOrders(orderID:any){
    this.http.delete(environment.ordersURL+"/"+orderID+"?"+"companyId=45").subscribe((deleteOrderDataFromApi)=>{
      console.log(deleteOrderDataFromApi,orderID)
    })
  }
}
