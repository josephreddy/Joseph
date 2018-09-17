import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { RegistrationComponent } from "./registration.component";
import { Observable } from "rxjs";

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<RegistrationComponent> {
    canDeactivate(component: RegistrationComponent, 
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot, 
        nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
return component.canDeactivate(); //the function will be called on the component, that's why we'll implement the function on the component.
}   
}