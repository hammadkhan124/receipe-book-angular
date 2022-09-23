import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoggingService } from "../logging.service";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlacehoderDirective } from "./placeholder/placeholder.directive";



@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlacehoderDirective,
        DropdownDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlacehoderDirective,
        DropdownDirective,
        CommonModule
    ],
    entryComponents:[
        AlertComponent
      ],
      providers:[LoggingService]
})

export class SharedModule{}