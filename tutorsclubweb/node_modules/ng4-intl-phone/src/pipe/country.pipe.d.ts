import { PipeTransform } from '@angular/core';
import { Country } from "../interface/country.interface";
export declare class CountryPipe implements PipeTransform {
    transform(value: Country[], args?: string): any;
}
