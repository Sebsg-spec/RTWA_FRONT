import { PopupService } from './services/popup.service';
import { AlertService } from './services/alert.service';
import { authGuardGuard } from 'src/Guard/auth-guard.guard';


// Component and pages imports
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { DemandPageComponent } from './pages/demand-page/demand-page.component';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { OfferPageComponent } from './pages/offer-page/offer-page.component';
import { PopupComponent } from './components/popup/popup.component';
import { DateRangePickerComponent } from './components/popup/date-range-picker/date-range-picker.component';
import { MultipleSelectComponent } from './components/popup/multiple-select/multiple-select.component';
import { OpenViewComponent } from './open-view/open-view.component';
import { OpenViewTableComponent } from './open-view/open-view-table/open-view-table.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';
import { AlertComponent } from './components/alert/alert.component';
import { UserDetailsComponent } from './open-view/user-details.component';
import { RoleRequestComponent } from './components/role-request/role-request.component';
import { RequestDialogComponent } from './components/request-dialog/request-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { EmailValidatorDirective } from './pages/login/email-validator.directive';


// Material imports
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
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
import { NgbModule, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

// PRIME NG
import { TabViewModule } from 'primeng/tabview';
import { Button, ButtonModule } from 'primeng/button';

//Imports for the warning icon
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
// @angular imports
import { JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LegendComponent } from './components/legend/legend.component';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TopWidgetsComponent } from './components/top-widgets/top-widgets.component';
import { SalesByMonthComponent } from './components/sales-by-month/sales-by-month.component';
import { SalesByCategoryComponent } from './components/sales-by-category/sales-by-category.component';
import { LastFewTransComponent } from './components/last-few-trans/last-few-trans.component';
import { TopThreeProductsComponent } from './components/top-three-products/top-three-products.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'angular-highcharts';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'offer', component: OfferPageComponent, canActivate: [authGuardGuard] },
    { path: 'demand', component: DemandPageComponent, canActivate: [authGuardGuard] },
    { path: 'openView/:packageUID/:nt_user', component: OpenViewComponent, canActivate: [authGuardGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuardGuard] },
    { path: 'home', component: LandingPageComponent, canActivate: [authGuardGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
    providers: [
        PopupService,
        AlertService,
        HttpClient,
        { provide: MatPaginatorIntl, useClass: MaterialTableComponent }
    ],
    bootstrap: [AppComponent],
    declarations: [
        HeaderComponent,
        SidemenuComponent,
        AppComponent,
        DemandPageComponent,
        AppButtonComponent,
        OfferPageComponent,
        PopupComponent,
        MultipleSelectComponent,
        OpenViewComponent,
        OpenViewTableComponent,
        MaterialTableComponent,
        AlertComponent,
        UserDetailsComponent,
        LoginComponent,
        EmailValidatorDirective,
        RoleRequestComponent,
        RequestDialogComponent,
        DashboardComponent,
        LandingPageComponent,
        LegendComponent,
        TopWidgetsComponent,
        SalesByMonthComponent,
        SalesByCategoryComponent,
        LastFewTransComponent,
        TopThreeProductsComponent,
        DateRangePickerComponent,

    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        ChartModule,
        MatDialogModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,

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
        ReactiveFormsModule,
        MatAutocompleteModule,
        FontAwesomeModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        OpenViewTableComponent
    ]
})
export class AppModule {
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon('warning', this.domSanitizer.bypassSecurityTrustResourceUrl(''));
    }
}
