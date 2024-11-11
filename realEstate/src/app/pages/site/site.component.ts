import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IProperty, IPropertyType, Site } from '../../model/master';
import { MasterService } from '../../service/master.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { style } from '@angular/animations';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [FormsModule, CommonModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit {
  @ViewChild('propertyModal') modal: ElementRef | undefined;
  currentSiteId: number = 0;

  isFormView = signal<boolean>(false)
  formObj: Site = new Site();
  items: IPropertyType[] = [];
  data: Site[] = [];
  propertyList: IProperty[] = [];
  propertyForm: FormGroup = new FormGroup({});

  masterSrv = inject(MasterService);
  ts = inject(ToastrService);

  ngOnInit() {
     this.getAllPropertyData();
     this.getAllSitesData();
     this.getProperties();
     console.log(this.data);
     this.initializeForm();
  }

  initializeForm() {
    this.propertyForm = new FormGroup({
        propertyId: new FormControl(0),
        propertyNo: new FormControl(''),
        facing: new FormControl(''),
        totalArea: new FormControl(''),
        rate: new FormControl(''),
        siteId: new FormControl(this.currentSiteId)
    })

  }

  getProperties() {
    this.masterSrv.getAllPropertyMasters().subscribe((res:any) => {
      this.propertyList = res.filter((m:any) => m.siteId == this.currentSiteId);
    })
  }

  getAllPropertyData() {
    this.masterSrv.getAllPropertyType().subscribe((res:any) => {
      this.items = res;
    });
  }

  getAllSitesData() {
    this.masterSrv.getAllSites().subscribe((res:any) => {
      this.data = res;
    });
  }

  toggleView() {
    this.formObj= Object.assign(this.formObj,{});console.log(this.formObj);
    this.isFormView.set(!this.isFormView());
  }

  onEdit(d: Site) {
    this.formObj = d;
    this.toggleView();
  }

  onDelete(id: Number) {
    const isDelete = confirm("Are you sure you want to delete?");
    if(isDelete) {
        this.masterSrv.deleteSite(id).subscribe((res:any) => {
          this.ts.success("Data deleted successfully.");
          this.getAllSitesData();
        });
    }

  }

  onSave() {  console.log('happy',this.formObj);
    this.masterSrv.saveSite(this.formObj).subscribe((res:any) => {
        if(res) {
          alert("Data saved successfully.");
          this.getAllSitesData();
          this.toggleView();
        }
    })
  }

  onUpdate(obj: Site) {
    this.masterSrv.updateSite(obj, obj.id).subscribe((res:any) => {
      if(res) {
        alert("Data saved successfully.");
          this.toggleView();
      }
    })
  }

  onModal(data: Site) {
    this.currentSiteId = data.id;
    this.initializeForm();
    if(this.modal) {
      this.modal.nativeElement.style.display = "block"
    }
  }

  onClose() {
    if(this.modal) {
      this.modal.nativeElement.style.display = "none"
    }
  }

  onSaveProperty() {   console.log('vappieee',this.propertyForm.value);
    this.masterSrv.saveProperty(this.propertyForm.value).subscribe((res:any) => {
      if(res) {
        this.ts.success("Data saved successfully.");
        this.getProperties();
      }
  })
  }

}
