import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ReceipeService } from '../receipe.service';
import { ActivatedRoute ,Params, Router} from '@angular/router';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-receipe-edit',
  templateUrl: './receipe-edit.component.html',
  styleUrls: ['./receipe-edit.component.css']
})
export class ReceipeEditComponent implements OnInit {
id:number;
editMode=false;
receipeForm:FormGroup;

get ingredientsControls(){
  return (this.receipeForm.get('ingredients')as FormArray).controls;
}

  constructor(private route:ActivatedRoute,
    private recipeService:ReceipeService,
    private router:Router) { }

  ngOnInit()  {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode=params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit(){
   // const newReceipe= new Receipe(
     // this.receipeForm.value['name'],
     // this.receipeForm.value['description'],
     // this.receipeForm.value['imagePath'],
    //  this.receipeForm.value['ingredients']
    //  );
      if(this.editMode){
        this.recipeService.updateReceipe(this.id,this.receipeForm.value);
      }else{
        this.recipeService.addReceipe(this.receipeForm.value);
      }
      this.onCancel();
  }

onAddIngredient(){
  (<FormArray>this.receipeForm.get('ingredients')).push(
    new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    })
  )
}
onDeleteIngredient(index:number){
  (<FormArray>this.receipeForm.get('ingredients')).removeAt(index);
}

onCancel(){
  this.router.navigate(['../'],{relativeTo:this.route})
}

  private initForm(){
    let receipeName='';
    let receipeImagePath='';
    let receipeDescription='';
    let receipeIngredients= new FormArray([])

   
    if(this.editMode){
      const receipe= this.recipeService.getReceipe(this.id);
      receipeName=receipe.name;
      receipeImagePath=receipe.imagePath;
      receipeDescription=receipe.description;
      if(receipe['ingredients']){
        for(let ingredient of receipe.ingredients){
receipeIngredients.push(
  new FormGroup({
    'name':new FormControl(ingredient.name,Validators.required),
    'amount':new FormControl(ingredient.amount,
      [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
  })
)
        }
      }
    }

    this.receipeForm= new FormGroup({
      'name':new FormControl(receipeName,Validators.required),
      'imagePath':new FormControl(receipeImagePath,Validators.required),
      'description':new FormControl(receipeDescription,Validators.required),
    'ingredients':receipeIngredients
    });
  }

}
