import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Receipe } from '../receipe.model';
import { ReceipeService } from '../receipe.service';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit ,OnDestroy{

  receipes: Receipe[];
  subscription:Subscription;


  constructor(private receipeService:ReceipeService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {

    this.subscription=this.receipeService.receipesChanged.subscribe(
      (receipes:Receipe[])=>{
this.receipes=receipes;
      } 
    );
    this.receipes=this.receipeService.getReceipes();
  }

  onNewReceipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}


}
