import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  forma: FormGroup;
  id: string;
  cargando: boolean;

  constructor(
    private _userService: UserService,
    public router: Router,
    private toastService: ToastService
  ) { }

  sonIguales(campo1: string, campo2:string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    this.forma = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)] ),
      password2: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      name: new FormControl(null, Validators.required)
    }, {validators: this.sonIguales('password', 'password2')});
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 10000 });
  }

  registrarUsuario() {
    this.cargando = true;
    let user = new Usuario(
      this.forma.value.username,
      this.forma.value.password,
      this.forma.value.email,
      this.forma.value.name,
    );
    this._userService.crearUsuario(user).subscribe((resp:any) => {
      this.showSuccess('Usuario creado')
      this.router.navigate(['/usuarios']);
    });


  }

}
