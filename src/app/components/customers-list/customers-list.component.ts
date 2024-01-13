import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerDialogComponent } from 'src/app/dialogs/add-customer-dialog/add-customer-dialog.component';
import { EditCustomerDialogComponent } from 'src/app/dialogs/edit-customer-dialog/edit-customer-dialog.component';
import { fromEvent } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers: Customer[] = [];
  displayedColumns = ['ProfileImage','CustomerId', 'FullName', 'DateOfBirth','Actions'];
  constructor(private customerService : CustomerService, public dialogService: MatDialog,private cdr: ChangeDetectorRef) { }

  @ViewChild('filter',  {static: true}) filter!: ElementRef;

  ngOnInit(): void {
    this.getCustomersData();
    this.getCustomersByAge();
    this.customerService.refreshData.subscribe(res=>{
      if(res=== true){
        this.getCustomersData();
      }
    });
  }

  getCustomersData() {
    this.customerService.getCustomersList().subscribe((response) => {
      this.customers = response;
      this.cdr.detectChanges();
    });
  }

  getCustomersByAge(){
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
       const age = this.filter.nativeElement.value;
       this.customerService.filterCustomerDataByAge(parseInt(age)).subscribe(res=>{
          this.customers = res;
       });
      });
  }

  openEditCustomerDialog(customerId: string){
    let customerData =  this.customers.find(x=>x.CustomerId === customerId);
    const dateOfBirth = this.formatDateToYYYYMMDD(new Date(customerData!.DateOfBirth));
    const dialogRef = this.dialogService.open(EditCustomerDialogComponent, {
      data: {fullName: customerData?.FullName, dateOfBirth: dateOfBirth, customerId: customerData?.CustomerId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getCustomersData();
      }
    });
  }

  private formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  openAddCustomerDialog(){
    const dialogRef = this.dialogService.open(AddCustomerDialogComponent, {
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getCustomersData();
      }
    });
  }

}
