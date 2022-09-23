
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { EventEmitter } from '@angular/core';


export class SHOPPINGLISTSERVICE{
    ingredientChanged= new Subject<Ingredient[]>();
    startedEditing=new Subject<number>();
    ingredients: Ingredient[]=[
        new Ingredient('apple',5),
        new Ingredient('tomato',4),
      ];



      getIngredients(){
        return this.ingredients.slice();
      }

      getIngredient(index:number){
        return this.ingredients[index];
      }
      addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients:Ingredient[]){
       // for(let ingredient of ingredients){
          //  this.addIngredient(ingredient);
        //}
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
      }

      updateIngredients(index:number,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
      }
      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
      }
}