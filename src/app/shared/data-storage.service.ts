import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Receipe } from "../receipes/receipe.model";
import { ReceipeService } from "../receipes/receipe.service";
import { map,tap,take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class DataStorageService{

    constructor(private http:HttpClient,private receipeService:ReceipeService,
        private authService: AuthService){}

    storeReceipes(){
        const receipes=this.receipeService.getReceipes();
      return this.http.put('https://ng-module-receipebook-default-rtdb.firebaseio.com/receipes.json',
      receipes)
      .subscribe(response =>{
        console.log(response);
      })
    }

    fetchReceipes(){
     
            return this.http
            .get<Receipe[]>(
               'https://ng-module-receipebook-default-rtdb.firebaseio.com/receipes.json'
              
               )
               .pipe(
        
map(receipes =>{
    return receipes.map(receipe =>{
        return{
            ...receipe,
            ingredients: receipe.ingredients ? receipe.ingredients:[]
        };
    });
}),
tap(receipes =>{
    this.receipeService.setReceipes(receipes);
})

        );
    }
}