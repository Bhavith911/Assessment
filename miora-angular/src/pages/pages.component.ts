import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../app/auth.service';



@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnInit {
  addLeaveForm: FormGroup;
  selectedEntry: any;
  editingIndex:number = 0;
  viewOnly:boolean = false;
  editOnly:boolean = false;


  constructor(private fb: FormBuilder,private auth:AuthService){
    this.addLeaveForm = fb.group({
      class:['',Validators.required],
      section:['',Validators.required],
      studentName:['',Validators.required],
      reason:['',Validators.required],
      singleDay:[false,Validators.required],
      multipleDay:[false,Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required],
      statusApproved:[false,Validators.required],
      statusUnApproved:[false,Validators.required],
    });
    
  }
  ngOnInit(): void {
    this.fetchStudents()
  }

  toggleDropdown:boolean =true;
  toggleAddLeavePopup:boolean = false;
  listOfStudents:any=[];
  listOfLeaves:any = [];
  listOfSections:any = ['A','B','C','D'];
  listOfClasses:any = [
    { value: 1, numeral: 'I' },
    { value: 2, numeral: 'II' },
    { value: 3, numeral: 'III' },
    { value: 4, numeral: 'IV' },
    { value: 5, numeral: 'V' },
    { value: 6, numeral: 'VI' },
    { value: 7, numeral: 'VII' },
    { value: 8, numeral: 'VIII' },
    { value: 9, numeral: 'IX' },
    { value: 10, numeral: 'X' },
  ];

  toggleSwitch(){
    this.toggleDropdown = !this.toggleDropdown
  }
  toggleAddLeave(){
    this.viewOnly && (this.enableFormControls() , this.viewOnly = false)
    this.editOnly && (this.editOnly = false)
    this.toggleAddLeavePopup = !this.toggleAddLeavePopup;
  }

  async fetchStudents() {
    try {
      const response = await fetch('https://dummyjson.com/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.listOfStudents = data.users; 
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  }
  resetForm(){
    this.addLeaveForm.reset()
  }
  addLeave(){
    if (this.addLeaveForm.valid) {
      this.listOfLeaves.push({ ...this.addLeaveForm.value });
      this.toggleAddLeave()
    } else {
      this.addLeaveForm.markAllAsTouched();
    }
  }

  viewEntry(entry: any): void {
    this.viewOnly = true
    this.addLeaveForm.patchValue(entry);
    this.selectedEntry = entry; 
    this.toggleAddLeavePopup = !this.toggleAddLeavePopup;
    this.disableFormControls()
  }
  
  editEntry(index: number): void {
    this.editOnly = true;
    const entry = this.listOfLeaves[index];
    this.addLeaveForm.patchValue(entry); 
    this.editingIndex = index;
    this.toggleAddLeavePopup = !this.toggleAddLeavePopup;
    this.enableFormControls()
  }

  private disableFormControls() {
    Object.keys(this.addLeaveForm.controls).forEach(control => {
      this.addLeaveForm.get(control)?.disable();
    });
  }
  
  private enableFormControls() {
    Object.keys(this.addLeaveForm.controls).forEach(control => {
      this.addLeaveForm.get(control)?.enable();
    });
  }

  logout(){
    this.auth.logout();
  }

  editLeave() {
    if (this.addLeaveForm.valid && this.editingIndex !== null) {
      this.listOfLeaves[this.editingIndex] = this.addLeaveForm.value; 
      this.toggleAddLeave()
    }
  }
  
}
 