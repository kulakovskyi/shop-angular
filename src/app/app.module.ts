import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import {AdminModule} from "./admin/admin.module";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import { ProductComponent } from './product/product.component';
import {QuillViewHTMLComponent} from "ngx-quill";
import { SortingPipe } from './shared/pipes/sorting.pipe';



@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        MainPageComponent,
        ProductPageComponent,
        CartPageComponent,
        ProductComponent,
        SortingPipe,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        AdminModule,
        QuillViewHTMLComponent,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        multi: true,
        useClass: AuthInterceptor
    }],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
