import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import {AlertComponent} from '../shared/alert/alert.component';
import { PlacehoderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})

export class AuthComponent implements OnDestroy{

    isLoginMode=true;
    isLoading =false;
    error:string = null;
    @ViewChild(PlacehoderDirective) alertHost: PlacehoderDirective;

    private closeSub: Subscription;

    constructor(private authService:AuthService, private router:Router,
        private componentFactoryResolver: ComponentFactoryResolver){}

    onSwitchMode(){
        this.isLoginMode=!this.isLoginMode;
    }

    onSubmit(form: NgForm){
         if(!form.valid){
            return;
         }
const email= form.value.email;
const password=form.value.password;


let authObs:Observable<AuthResponseData>

this.isLoading=true;
if(this.isLoginMode){
 authObs= this.authService.login(email,password);

}else{
  authObs=  this.authService.signup(email,password);

}


authObs.subscribe(
    resData =>{
        console.log(resData);
        this.isLoading=false;
        this.router.navigate(['/receipes']);
        },

    errorMessage =>{
        console.log(errorMessage);
       this.error=errorMessage;
       this.showErrorAlert(errorMessage);
        this.isLoading=false;
    }
)
        form.reset();
    }
    onHandleError(){
        this.error=null;
    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message:string){
//const alertCamp= new AlertComponent();
const alertCampFactory= this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
const hostViewContainerRef= this.alertHost.viewContainerRef;   
hostViewContainerRef.clear();
const componentRef=hostViewContainerRef.createComponent(alertCampFactory);

componentRef.instance.message=message;
this.closeSub=componentRef.instance.close.subscribe(()=>{
    this.closeSub.unsubscribe();
    hostViewContainerRef.clear();
});
}
}