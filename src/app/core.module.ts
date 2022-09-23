import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-ingerceptor.service";
import { ReceipeService } from "./receipes/receipe.service";
import { SHOPPINGLISTSERVICE } from "./shopping-list/shopping-list.service";



@NgModule({
    providers: [SHOPPINGLISTSERVICE,ReceipeService,
        {
            provide:HTTP_INTERCEPTORS, 
          useClass: AuthInterceptorService,
        multi:true}
      ],

})


export class coreModule{}