import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { IApiResponse, IPropertyType } from '../../model/master';

@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.css'
})
export class PropertyTypeComponent {
  formSign!: FormGroup
  masterSrv = inject(MasterService);
  gridData: IPropertyType [] = [];
  isEdit: boolean = false;
  id: Number = 0;

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    // this.isEdit
    this.getGridData();
  }

  getGridData() {
    this.masterSrv.getAllPropertyType().subscribe((res:any) => {
        this.gridData = res;
    })
  }

  initializeForm() {
      this.formSign = new FormGroup({
        // propertyTypeId: new FormControl<number>(0),
        propertyType: new FormControl<string>('',[Validators.required, Validators.minLength(3)])
      })
  }

  onSave() { console.log(this.formSign.value);  
    this.masterSrv.savePropertyType(this.formSign.value).subscribe((res:any) => {
      if(res) {
        alert('Data saved successfully!');
        this.getGridData();
      }
    })
  }

  onEdit(item:IPropertyType) {
    this.id = item.id 
    this.isEdit = true;
    // this.formSign.controls['propertyType'].value =item.propertyType
    this.formSign.setValue({
      propertyType: item.propertyType  
    }); 
    // console.log(this.formSign);  
  }

  onUpdate() {
    this.masterSrv.updatePropertyType(this.formSign.value,this.id).subscribe((res: any) => {
        if(res) {
          alert('Data updated successfully!');
          this.formSign.reset();
          this.getGridData();
          this.isEdit = false;
        }
    })

  }

  onDelete(id: Number) {
      const isDelete = confirm("Are you sure you want to delete?");
      if(isDelete) {
      this.masterSrv.deletePropertyType(id).subscribe((res: any) => {
        if(res) {
          alert('Data deleted successfully!');
          this.getGridData();
        }
      })
    }
  }

}
