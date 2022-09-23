import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { SHOPPINGLISTSERVICE } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub:Subscription;


  constructor(private slService:SHOPPINGLISTSERVICE,private loggingservice: LoggingService) { }

  ngOnInit() {
    this.ingredients=this.slService.getIngredients();
    this.igChangeSub=this.slService.ingredientChanged
    .subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=this.ingredients;
      }
    );
    this.loggingservice.printLog('hello form shoppinglist component ngoninit')
  }
  onEditItem(index:number){
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }


}
