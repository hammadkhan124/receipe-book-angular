import { Receipe } from "./receipe.model";
import { Subject } from "rxjs";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { createInjectableType } from "@angular/compiler";
import { SHOPPINGLISTSERVICE } from "../shopping-list/shopping-list.service";


@Injectable()
export class ReceipeService{
   receipesChanged= new Subject<Receipe[]>();

   /*
   receipes:Receipe[]=[
        new Receipe('Fries'
        ,'a Super tasty',
        'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
        [
          new Ingredient('Meat',1),
          new Ingredient('French Fries',20)
        ]),
        new Receipe('Burger',
        'a super tasty',
        'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
        [
          new Ingredient('Buns',1),
          new Ingredient('Meat',20)
        ]),
      ];
      */
     private receipes:Receipe[]=[];

     constructor(private slService:SHOPPINGLISTSERVICE){}

     setReceipes(receipes:Receipe[]){
      this.receipes=receipes;
      this.receipesChanged.next(this.receipes.slice());
     }

      getReceipes(){
        return this.receipes.slice();
      }

      getReceipe(index:number){
        return this.receipes[index];
      }

      addIngredientsToShoppingList(ingredients:Ingredient[]){
this.slService.addIngredients(ingredients);
      }
    addReceipe(receipe: Receipe){
      this.receipes.push(receipe);
      this.receipesChanged.next(this.receipes.slice());
    }
    updateReceipe(index:number,newReceipe:Receipe){
      this.receipes[index]=newReceipe;
      this.receipesChanged.next(this.receipes.slice());
    }
    deleteReceipt(index:number){
      this.receipes.splice(index,1);
        this.receipesChanged.next(this.receipes.slice());
    }
    
    }