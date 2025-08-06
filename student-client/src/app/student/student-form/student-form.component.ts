import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import axiosInstance from '../../api/axiosInstance';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  @Input() student: any = null; 
  @Output() onClose = new EventEmitter();
  @Output() onRefresh = new EventEmitter()
  formData = {
    name: '',
    email: '',
    age: '',
    place: ''
  };

  ngOnInit() {
    if (this.student) {
      this.formData = { ...this.student };
    }
  }

  async submitForm() {
    try {
      if (this.student) {
        await axiosInstance.put(`/students/update/${this.student._id}`, this.formData);
      } else {
        await axiosInstance.post('/students/create', this.formData);
      }
      this.onRefresh.emit(); 
      this.onClose.emit();   
    } catch (error) {
      console.error( error);
    }
  }
}
