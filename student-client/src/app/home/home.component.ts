// import { Component, OnInit } from '@angular/core';
// import axiosInstance from '../api/axiosInstance';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent  {
// // export class HomeComponent implements OnInit {
//   students: any[] = [];

//   async ngOnInit() {
//     try {
//       const response = await axiosInstance.get('/students/get');
//       console.log(response,"===");
    
//       this.students = response.data;
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   }

//   async deleteStudent(id: string) {
//     try {
//       await axiosInstance.delete(`/students/delete/${id}`);
//       // this.students = this.students.filter(student => student._id !== id);
//       this.ngOnInit()
//     } catch (error) {
//       console.error('Failed to delete student:', error);
//     }
//   }

// }

import { Component, OnInit } from '@angular/core';
import axiosInstance from '../api/axiosInstance';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  students: any[] = [];
  isFormOpen = false;
  selectedStudent: any = null;

  isConfirmModalOpen = false;
  deleteId: string | null = null;

  async ngOnInit() {
    try {
      const response = await axiosInstance.get('/students/get');
      // console.log(response,"===");
      this.students = response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }

  openAddStudentModal() {
    this.selectedStudent = null
    this.isFormOpen = true;
  }

  updateStudent(student: any) {
    this.selectedStudent = student; 
    this.isFormOpen = true;
  }

  closeModal() {
    this.isFormOpen = false;
    this.ngOnInit();
  }

  
  confirmDelete(id: string) {
    this.deleteId = id;
    this.isConfirmModalOpen = true;
  }
    async handleDeleteConfirm() {
    if (!this.deleteId) return;

    try {
      await axiosInstance.delete(`/students/delete/${this.deleteId}`);
      await this.ngOnInit(); 
    } catch (error) {
      console.error('delete -failed', error);
    } finally {
      this.closeConfirmModal();
    }
  }

  closeConfirmModal() {
    this.isConfirmModalOpen = false;
    this.deleteId = null;
  }
}
