import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Invitation} from "../entity/invitation";
import {Customer, Representative} from "../api/customer";
import {Product} from "../api/product";
import {Table} from "primeng/table";
import {InvitationService} from "../services/houssem/invitation.service";
import {CustomerService} from "../service/customerservice";
import {ProductService} from "../service/productservice";
import {Observable} from "rxjs";

@Component({
  selector: 'app-get-invitations-company',
  templateUrl: './get-invitations-company.component.html',
  styleUrls: ['./get-invitations-company.component.scss'],
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
export class GetInvitationsCompanyComponent implements OnInit {

    AllInvitations : Invitation[];
    invitation :Invitation;

    msg: any;

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[];

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];
    emailinput: any;

    numberinput: any;


    constructor(private serviceInvitation:InvitationService,private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.serviceInvitation.GetAllInvitationsService().subscribe(res=>this.AllInvitations=res);
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            {field: 'Email', header: 'Email'},
            {field: 'Number', header: 'Number'},
            {field: 'dateInvitation', header: 'dateInvitation'},
            {field: 'dateAcceptInvitation', header: 'dateAcceptInvitation'},
            {field: 'statusInvitation', header: 'statusInvitation'}
        ];

        this.statuses = [
            {label: 'accpeted', value: 'accpeted'},
            {label: 'pending', value: 'pending'},
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = {...product};
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = {...product};
    }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

    confirmDelete(){
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    GetAllInvitations() {
        this.AllInvitations.forEach(function (value){
            console.log(value);
        });

        this.serviceInvitation.GetAllInvitationsService().subscribe(res => {
            console.log(res);
        })

    }

    deleleinvit(id :any) {
        let resp= this.serviceInvitation.DeleteInvitationService(id);
        resp.subscribe((data)=>this.msg=data);
    }

    addcode() {
        // @ts-ignore
        let resp= this.serviceInvitation.AddInvitationService({number: this.numberinput, mailEmployee: this.emailinput});
        resp.subscribe((data)=>this.msg=data);
        console.log(this.AllInvitations);
    }
}
