import { Injectable } from "@angular/core";
import { Resolve,ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Receipe } from "./receipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { ReceipeService } from "./receipe.service";




@Injectable({providedIn:'root'})
export class ReceipesResolverService implements Resolve<Receipe[]>{
    constructor(private dataStorageService: DataStorageService,
        private receipesService:ReceipeService){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
const receipes = this.receipesService.getReceipes();

if(receipes.length === 0){
    return this.dataStorageService.fetchReceipes();
}else{
    return receipes;
}     
    }
}