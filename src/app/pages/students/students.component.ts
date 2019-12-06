import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  closeResult: string;

  estudiantes: any;
  collectionSize: any;
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;
  estudianteDetalle: any;

  constructor(
    private _studentService: StudentService,
    private modalService: NgbModal
  ) {
    
  }

  ngOnInit() {
    this.cargarEstudiantes();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    this.cargarEstudiantes();
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
    this.cargarEstudiantes();
  }

  loadData() {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this._studentService.cargarEstuadiantes( this.itemsPerPage, this.pageSize ).subscribe((resp:any) => {
      this.collectionSize = resp.cuantos;
      this.estudiantes = resp.students;
      console.log('Gaaa',resp);
    })
  }


  openXl(content) {
     this.modalService.open(content, {size: 'xl'});
  }

 

}
