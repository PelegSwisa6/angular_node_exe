import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Domain, Publisher} from "./types";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private apiUrl ="http://localhost:4300/"

    constructor(private http: HttpClient) {
    }

    getPublishers():Observable<Publisher[]> {
        return this.http.get<Publisher[]>(`${this.apiUrl}api/publishers`)
    }

    addPublisher(publisher: Publisher): Observable<Publisher> {
        return this.http.post<Publisher>(`${this.apiUrl}api/publishers`, publisher)
    }
    
    addDomain(publisherName: string, domain: Domain): Observable<Publisher> {
        return this.http.post<Publisher>(`${this.apiUrl}api/domains/${publisherName}/`, domain);
      }
    

}
