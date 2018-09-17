import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { AuthService } from './auth.service';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

    zipcode: string = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    // userDetails:string="http://timezoneapi.io/api/ip";
    // userDetails:string="http://getcitydetails.geobytes.com/GetCityDetails";
    userDetails:string="http://ip-api.com/json";
    // userDetails:string="http://api.ipstack.com/check?access_key=837b09670eb647e30313bf9ea065108d";
    Key: string = "&key=AIzaSyBkx_EIxNnUMq8hIlEyc0sOHEpWD7u4tZU";
    currency:string="http://free.currencyconverterapi.com/api/v5/convert?q=";
    currency2:string="&compact=y"
    CurrencyDetails:string="https://v3.exchangerate-api.com/bulk/730e417172e829deffe1c5ce/INR"
    _base_Url: string = null;
    constructor(private http: HttpClient, private config_service: ConfigService, private _authService: AuthService) {
        // this.config_service.getConfig()
        //     .subscribe(data => {
        //         this._base_Url = data['Base_Url'];
        //         console.log(this._base_Url);
        //     });
        this._base_Url = config_service.getApiUrl();
    }

    /** GET All */
    // GetUserInfo(userDetails:string): Observable<any> {
    //     // debugger;
    //     return this.http.get<any>(  userDetails)
    //         .pipe(
    //             tap(data => {
    //                 debugger;
    //                  console.log(  userDetails + ' successful'); return data; }),
    //             catchError(this.handleError(  userDetails, []))
    //         );
    // }

    
    GetAll(url: string): Observable<any> {
        // debugger;
        return this.http.get<any>(this._base_Url + url)
            .pipe(
                tap(data => { console.log(this._base_Url + url + ' successful'); return data; }),
                catchError(this.handleError(this._base_Url + url, []))
            );
    }
    /** GET By Id */
    Get(url: string, id: any): Observable<any> {
        return this.http.get<any>(this._base_Url + url + '/' + id)
            .pipe(
                tap(data => { console.log(this._base_Url + url + ' successful'); }),
                catchError(this.handleError<any>(this._base_Url + url))
            );
    }

    /** POST */
    Post(url: string, req: any): Observable<any> {
        return this.http.post<any>(this._base_Url + url, req, httpOptions)
            .pipe(
                tap(data => { console.log(this._base_Url + url + ' successful'); return data; }),
                catchError(this.handleError<any>(this._base_Url + url))
            );
    }

    /** DELETE */
    Delete(url: string, id: any): Observable<any> {
        return this.http.delete<any>(this._base_Url + url + '/' + id)
            .pipe(
                tap(data => { console.log(this._base_Url + url + ' successful'); }),
                catchError(this.handleError<any>(this._base_Url + url))
            );
    }

    /** PUT */
    Put(url: string, req: any): Observable<any> {
        return this.http.put(this._base_Url + url, req, httpOptions)
            .pipe(
                tap(data => { console.log(this._base_Url + url + ' successful'); }),
                catchError(this.handleError<any>(this._base_Url + url))
            );
    }

    GetZipCode(zipCode): Observable<any> {
        //write api url here
        // return this.http.get(this.zipcode+ zipCode);
        return this.http.get(this.zipcode +zipCode);
    }

    GetCurrency(Value): Observable<any> {
        //write api url here
        // return this.http.get(this.zipcode+ zipCode);
        return this.http.get(this.currency +Value+this.currency2);
    }
    GetUserInfo(): Observable<any> {
        debugger
        //write api url here
        return this.http.get(this.userDetails);
    }
    GetCurrencyInfo(): Observable<any> {
        debugger
        //write api url here
        return this.http.get(this.CurrencyDetails);
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        //debugger;
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.log(error); // log to console instead      

            var response: any = {
                IsSuccess: false,
                AffectedRecords: 0,
                EndUserMessage: null,
                Exception: null,
                ValidationErrors: []
            };

            if (error.status == 401) {
                this._authService.logout();
                //toastr.error('Session Expired. Please login to continue.', 'Session Expired');
                response.EndUserMessage = 'Session Expired. Please login to continue.';
                return of(response as T);
            } else {
                debugger;
                // Let the app keep running by returning an empty result.
                return of(error as T);
            }

            // Let the app keep running by returning an empty result.
            //return of(error as T);
        };
    }
}

// export class Response {
//     IsSuccess: boolean;
//     AffectedRecords: number;
//     EndUserMessage: string;
//     ValidationErrors: any;
//     Exception: any;
//   }
