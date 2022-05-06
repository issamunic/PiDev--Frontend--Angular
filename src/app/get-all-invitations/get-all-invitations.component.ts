import {Invitation} from "../entity/invitation";
import {InvitationService} from "../services/houssem/invitation.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Customer, Representative} from "../api/customer";
import {Product} from "../api/product";
import {Table} from "primeng/table";
import {CustomerService} from "../service/customerservice";
import {ProductService} from "../service/productservice";
import {User} from "../entity/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignUpEmployeeService} from "../services/houssem/sign-up-employee.service";


function GetAllUsers() {

}

@Component({
  selector: 'app-get-all-invitations',
  templateUrl: './get-all-invitations.component.html',
  styleUrls: ['./get-all-invitations.component.scss'],
    providers: [MessageService, ConfirmationService],
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }
    `]
})
export class GetAllInvitationsComponent implements OnInit {
  AllInvitations : Invitation[];
  invitation : Invitation;

  AllUsers :User[] ;
  user:User;

    customers1: Customer[];

    customers2: Customer[];

    customers3: Customer[];

    selectedCustomers1: Customer[];

    selectedCustomer: Customer;

    representatives: Representative[];

    statuses: any[];

    products: Product[];

    rowGroupMetadata: any;

    expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading:boolean = true;

    msg: any;

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    cols: any[];

    rowsPerPageOptions = [5, 10, 20];
    emailinput: any;

    numberinput: any;
    private invitationadd: Invitation;

    @ViewChild('dt') table: Table;

    @ViewChild('filter') filter: ElementRef;
    private idddd: any;

    constructor(private serviceuser:SignUpEmployeeService,private serviceInvitation:InvitationService,private customerService: CustomerService, private productService: ProductService, private messageService: MessageService, private confirmService: ConfirmationService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.serviceuser.AllUsers().subscribe(res=>this.AllUsers=res);
        this.serviceInvitation.GetAllInvitationsService().subscribe(res=>this.AllInvitations=res);


        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
        this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

        this.representatives = [
            {name: 'Amy Elsner', image: 'amyelsner.png'},
            {name: 'Anna Fali', image: 'annafali.png'},
            {name: 'Asiya Javayant', image: 'asiyajavayant.png'},
            {name: 'Bernardo Dominic', image: 'bernardodominic.png'},
            {name: 'Elwin Sharvill', image: 'elwinsharvill.png'},
            {name: 'Ioni Bowcher', image: 'ionibowcher.png'},
            {name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png'},
            {name: 'Onyama Limba', image: 'onyamalimba.png'},
            {name: 'Stephen Shaw', image: 'stephenshaw.png'},
            {name: 'XuXue Feng', image: 'xuxuefeng.png'}
        ];

        this.statuses = [
            {label: 'Unqualified', value: 'unqualified'},
            {label: 'Qualified', value: 'qualified'},
            {label: 'New', value: 'new'},
            {label: 'Negotiation', value: 'negotiation'},
            {label: 'Renewal', value: 'renewal'},
            {label: 'Proposal', value: 'proposal'}
        ];
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData.representative.name;

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData.representative.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    }
                    else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    expandAll() {
        if(!this.isExpanded){
            this.products.forEach(product => this.expandedRows[product.name] = true);

        } else {
            this.expandedRows={};
        }
        this.isExpanded = !this.isExpanded;
    }

    formatCurrency(value) {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }


    GetAllInvitations() {
        console.log(this.AllUsers);
        console.log(this.AllInvitations);
    }

    deleleinvit(id :any) {
        let resp= this.serviceInvitation.DeleteInvitationService(id);
        resp.subscribe((data)=>this.msg=data);
        window.location.reload();
    }
    openNew(id:any) {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.idddd = id;
    }
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    addcode(id:any) {
        // @ts-ignore
        this.user={idUser:id};
        // @ts-ignore
        this.invitationadd={number: this.numberinput, mailEmployee: this.emailinput,userSender:this.user};
        let resp= this.serviceInvitation.AddInvitationService(this.invitationadd);
        resp.subscribe((data)=>this.msg=data);
        console.log(this.AllInvitations);
        window.location.reload();
    }
}
