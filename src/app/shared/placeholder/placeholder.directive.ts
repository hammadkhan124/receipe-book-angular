import { Directive, ViewContainerRef } from "@angular/core";


@Directive({
    selector:'[applePlaceholder]'
})
export class PlacehoderDirective{

    constructor(public viewContainerRef:ViewContainerRef){}
}