import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IApiResponse, IPropertyType, Site } from '../model/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  getAllPropertyType(): Observable<any> {
      return this.http.get<any>(environment.API_URL);
  }

  savePropertyType(obj: IPropertyType):  Observable<any> { console.log('hello', obj);
    return this.http.post<any>(environment.API_URL,obj);
  }

  updatePropertyType(obj: IPropertyType,id: Number) :  Observable<any>  { console.log('hi', obj);
    return this.http.put<any>(environment.API_URL+ `/${id}`,obj)
  }

  deletePropertyType(id: Number) :  Observable<any> {
    return this.http.delete<any>(environment.API_URL+ `/${id}`);
  }

  getAllSites(): Observable<any> {
    return this.http.get<any>(environment.API_SITE_URL);
}

  saveSite(obj: Site): Observable<Site> {  console.log('hey', obj);
    return this.http.post<Site>(environment.API_SITE_URL,obj);
  }

  updateSite(obj: Site,id: Number) :  Observable<Site>  { console.log('hi', obj);
    return this.http.put<any>(environment.API_SITE_URL+ `/${id}`,obj)
  }

  deleteSite(id: Number) :  Observable<any> {
    return this.http.delete<any>(environment.API_SITE_URL+ `/${id}`);
  }

  saveProperty(obj: Site) {
    return this.http.post<any>(environment.API_PROPERTY_URL,obj)
  }

  getAllPropertyMasters()  :  Observable<any> {
    return this.http.get<any>(environment.API_PROPERTY_URL);
  }

}
