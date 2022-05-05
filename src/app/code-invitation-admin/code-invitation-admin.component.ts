import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Customer, Representative} from "../api/customer";
import {Product} from "../api/product";
import {Table} from "primeng/table";
import {CustomerService} from "../service/customerservice";
import {ProductService} from "../service/productservice";
import {CodeInvitationCompanyService} from "../services/houssem/code-invitation-company.service";
import {CodeInvitationCompany} from "../entity/code-invitation-company";
import {User} from "../entity/user";

@Component({
  selector: 'app-code-invitation-admin',
  templateUrl: './code-invitation-admin.component.html',
  styleUrls: ['./code-invitation-admin.component.scss'],
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
export class CodeInvitationAdminComponent implements OnInit {
    Allcode: CodeInvitationCompany[];
    codeinvitationcompany : CodeInvitationCompany;
    code : CodeInvitationCompany;
    userCompany : User;

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
    msg : any ;
    @ViewChild('dt') table: Table;

    @ViewChild('filter') filter: ElementRef;

    constructor(private servicecodde:CodeInvitationCompanyService,private customerService: CustomerService, private productService: ProductService, private messageService: MessageService, private confirmService: ConfirmationService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.servicecodde.GetAllCodeInvitationCompany().subscribe(res=>this.Allcode=res);
        this.servicecodde.GetAllCodeInvitationCompany().subscribe(res => {
            // @ts-ignore
            console.log(res);
        })

        // @ts-ignore
        this.servicecodde.GetAllCodeInvitationCompany().subscribe(res=>this.Allcode.forEach(code=>console.log(code.userCompany.trips)));

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

    deleleCode(id :any) {
            let resp= this.servicecodde.DeleteCodeInvitationCompany(id);
            resp.subscribe((data)=>this.msg=data);
    }

    EditCode(codeinvitationcompany: any) {

    }
}
