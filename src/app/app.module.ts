import { PopupService } from './components/popup/popup.service';
// Component and pages imports
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { LackPageComponent } from './lack-page/lack-page.component';
import { TabelComponent } from './components/tabel/tabel.component';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { SurplusPageComponent } from './surplus-page/surplus-page.component';
import { PopupComponent } from './components/popup/popup.component';
import { DateRangePickerComponent } from './components/popup/date-range-picker/date-range-picker.component';
import { MultipleSelectComponent } from './components/popup/multiple-select/multiple-select.component';
import { OpenViewComponent } from './open-view/open-view.component';
import { OpenViewTableComponent } from './open-view/open-view-table/open-view-table.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';

// Material imports
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';

// NGX Bootstrap
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

// PRIME NG
import { TabViewModule } from 'primeng/tabview';
import { Button, ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

//Imports for the warning icon
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// @angular imports
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { authGuardGuard } from 'src/Guard/auth-guard.guard';
import { UserDetailsComponent } from './open-view/user-details.component';
import { NgbModule, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule, NgxTimepickerFieldComponent } from 'ngx-material-timepicker';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MessageService } from 'primeng/api';


const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'lackPage', component: LackPageComponent, canActivate: [authGuardGuard] },
    { path: 'surplusPage', component: SurplusPageComponent, canActivate: [authGuardGuard] },
    { path: 'openView/:requestUID/:nt_user', component: OpenViewComponent, canActivate: [authGuardGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },



];
@NgModule({
    providers: [
        PopupService,
        AlertService,
        MessageService
    ],
    bootstrap: [AppComponent],
    declarations: [
        HomeComponent,
        HeaderComponent,
        SidemenuComponent,
        TopBarComponent,
        AppComponent,
        LackPageComponent,
        TabelComponent,
        AppButtonComponent,
        SurplusPageComponent,
        PopupComponent,
        MultipleSelectComponent,
        OpenViewComponent,
        OpenViewTableComponent,
        MaterialTableComponent,
        AlertComponent,
        UserDetailsComponent,
        RegisterComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        DateRangePickerComponent,
        MatSelectModule,
        MatOptionModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        HttpClientModule,
        FormsModule,
        MatIconModule,
        TimepickerModule,
        TabViewModule,
        ButtonModule,
        MatNativeDateModule,
        MatRadioModule,
        JsonPipe,
        NgbTimepickerModule,
        NgbTimepicker,
        NgbModule,
        NgxMaterialTimepickerModule,
        MatTooltipModule,
        BrowserModule,
        CardModule,
        ReactiveFormsModule,
        ButtonModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    exports: [
        OpenViewTableComponent
    ]
})
export class AppModule {
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        // Register the warning icon
        this.matIconRegistry.addSvgIcon('warning', this.domSanitizer.bypassSecurityTrustResourceUrl(''));
    }
}
