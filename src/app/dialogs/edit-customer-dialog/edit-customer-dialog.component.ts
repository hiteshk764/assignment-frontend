import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.css']
})
export class EditCustomerDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService) { }

  requiredErrorMessage: string = "Required field";

  ngOnInit(): void {
  }

  editCustomer(){
    this.customerService.editCustomerData(this.data).subscribe(
      (response) => {
        console.log('Customer has been edited successfully',response);
        this.dialogRef.close(1); 
      },
      (error) => {
        console.error('Error while editing existing customer:', error);
      }
    );
  }

  submit() {
  }

  onNoClick(): void {
      this.dialogRef.close();
  }

}
