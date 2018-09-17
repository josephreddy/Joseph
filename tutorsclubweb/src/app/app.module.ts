import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './shared/services/data.service';
import { PaginationService } from './shared/services/PaginationService';
import { SharedModule } from './shared/modules/shared/shared.module'; 
import { ConfigService } from './shared/services/config.service';
import { AuthService } from './shared/services/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http'; 
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    LoginComponent,
    FooterComponent, 
    NotFoundComponent
  ],
  imports: [   
    CommonModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule, 
    SharedModule,
    NgxSpinnerModule,
    NgbModule.forRoot(),
    NgxDatatableModule,

  ],
  entryComponents:[LoginComponent],
  providers: [DataService, PaginationService,ConfigService,AuthService,HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
