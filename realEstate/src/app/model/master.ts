export interface IPropertyType{
   id: number;
    propertyType: string;
}

export interface IApiResponse {
    result: Number;
    message: string;
    data: any;
}

export interface IProperty {
    propertyId: number,
    propertyNo: number,
    facing: string,
    totalArea: string,
    rate: number,
    siteId: number
}

export class Site {
    id:          number;
    siteTitle:       string;
    location:        string;
    propertyTypeId:  number;
    city:            string;
    pincode:         string;
    state:           string;
    totalProperties: number;

    constructor() {
        this.id = 0;
        this.siteTitle= '';
        this.location= '';
        this.propertyTypeId= 0;
        this.city= '';
        this.pincode= '';
        this.state= '';
        this.totalProperties= 0
    }
}