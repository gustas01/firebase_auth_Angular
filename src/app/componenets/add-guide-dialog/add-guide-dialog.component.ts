import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-add-guide-dialog',
  templateUrl: './add-guide-dialog.component.html',
  styleUrls: ['./add-guide-dialog.component.scss']
})
export class AddGuideDialogComponent implements OnInit {

  addGuideForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
  })

  constructor(private formBuilder: FormBuilder, private userSerice: UserService) { }

  ngOnInit(): void { }

  addGuide(){
    if(this.addGuideForm.valid){
      this.userSerice.createGuide({
        title: this.addGuideForm.value.title || '',
        content: this.addGuideForm.value.content || ''
      })
    }
  }
}
