import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'fs-create-new-student',
  templateUrl: './create-new-student.container.html',
  styleUrls: ['./create-new-student.container.scss']
})
export class CreateNewStudentContainer implements OnInit {
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
