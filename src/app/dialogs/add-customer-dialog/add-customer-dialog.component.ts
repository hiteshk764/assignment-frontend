import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerData } from 'src/app/models/customer-data';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.css']
})
export class AddCustomerDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddCustomerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Customer,
              private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  requiredErrorMessage: string = "Required field";

  submit() {
  }

  onNoClick(): void {
      this.dialogRef.close();
  }

  addCustomer(){
     this.customerService.addCustomerData(this.data).subscribe(
      (addedCustomer) => {
        console.log('New customer added:', addedCustomer);
        this.dialogRef.close(1);
        this.customerService.refreshData.next(true);
      },
      (error) => {
        console.error('Error adding new customer:', error);
      }
    );
  }

}
