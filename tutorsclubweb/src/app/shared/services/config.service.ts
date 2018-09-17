import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ConfigService {

    configUrl = 'assets/config.json';

    _base_Url = '';

    _classTypes = {
        'Bank': 1,
        'Services': 2,
        'AgentType': 3,
        'TitleType': 4,
        'Gender': 5,
        'FileType': 6,
        'PersonalIdProofType': 7,
        'FinancialIdProofType': 8,
        'TransactionType': 9,
        'TransactionReasonType': 10,
        'AgentRequestCategory': 11,
        'AgentRequestStatusType': 12,
        'EducationType': 13,
        'QRCodePrintStatus': 14,
        'QR Code Dispatch Status': 15
    };
    _roles={
        'Admin':1,
        'Tutor':2,
        'Learner':3
      }
    constructor(private http: HttpClient) {
        // this.response = this.http.get(this.configUrl);
        // this._base_Url = 'http://192.168.1.166/TutorsClubAPI/';
        this._base_Url = 'http://api.tutorsclub.co/';
        // this._base_Url = 'http://192.168.1.108/TutorsClubAPILatest/';
    }

    // getConfig() {
    //     return this.http.get(this.configUrl);
    //     // return this.response;
    // }

    getApiUrl() {
        return this._base_Url;
    }

    getClassTypes() {
        return this._classTypes;
    }
    getRoles(){
        return this._roles;
    }
}

