import { TripComponent } from './trip/trip.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';
import { CrudComponent } from './components/crud/crud.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import {GetAllInvitationsComponent} from "./get-all-invitations/get-all-invitations.component";
import {GetInvitationsCompanyComponent} from "./get-invitations-company/get-invitations-company.component";
import {SubscriptionComponent} from "./subscription/subscription.component";
import {HistorySubscriptionCompanyComponent} from "./history-subscription-company/history-subscription-company.component";
import {SubAdminComponent} from "./sub-admin/sub-admin.component";
import {ListCompanyEmployeeAdminComponent} from "./list-company-employee-admin/list-company-employee-admin.component";
import {CodeInvitationComponent} from "./code-invitation/code-invitation.component";
import {CodeInvitationAdminComponent} from "./code-invitation-admin/code-invitation-admin.component";
import {UploadFilesComponent} from "./upload-files/upload-files.component";
import {SignUpEmployeeComponent} from "./sign-up-employee/sign-up-employee.component";
@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: 'trip', component: TripComponent},
            {path: 'invitations',component:GetInvitationsCompanyComponent},
            {path: 'sub', component:SubscriptionComponent},
            {path: 'historysub',component:HistorySubscriptionCompanyComponent},
            {path: 'codeinvitation',component:CodeInvitationComponent},
            {path: 'upload',component:UploadFilesComponent},
            {path:'signupemployee',component:SignUpEmployeeComponent},
            {path: 'admin/invitations' , component:GetAllInvitationsComponent},
            {path: 'admin/codeinvitation',component:CodeInvitationAdminComponent},
            {path: 'admin/sub',component:SubAdminComponent},
            {path: 'admin/listecompanyemployee',component:ListCompanyEmployeeAdminComponent},///
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardComponent},
                    {path: 'uikit/formlayout', component: FormLayoutComponent},
                    {path: 'uikit/input', component: InputComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateComponent},
                    {path: 'uikit/button', component: ButtonComponent},
                    {path: 'uikit/table', component: TableComponent},
                    {path: 'uikit/list', component: ListComponent},
                    {path: 'uikit/tree', component: TreeComponent},
                    {path: 'uikit/panel', component: PanelsComponent},
                    {path: 'uikit/overlay', component: OverlaysComponent},
                    {path: 'uikit/media', component: MediaComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/message', component: MessagesComponent},
                    {path: 'uikit/misc', component: MiscComponent},
                    {path: 'uikit/charts', component: ChartsComponent},
                    {path: 'uikit/file', component: FileComponent},
                    {path: 'pages/crud', component: CrudComponent},
                    {path: 'pages/timeline', component: TimelineComponent},
                    {path: 'pages/empty', component: EmptyComponent},
                    {path: 'icons', component: IconsComponent},
                    {path: 'pages/access', component: BlocksComponent},
                    {path: 'documentation', component: DocumentationComponent}
                ],
            },
            {path:'pages/landing', component: LandingComponent},
            {path:'pages/login', component: LoginComponent},
            {path:'pages/error', component: ErrorComponent},
            {path:'pages/notfound', component: NotfoundComponent},
            {path:'pages/access', component: AccessComponent},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
