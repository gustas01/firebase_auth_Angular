import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGuide } from 'src/app/models/iguide';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-update-guide-dialog',
  templateUrl: './update-guide-dialog.component.html',
  styleUrls: ['./update-guide-dialog.component.scss']
})
export class UpdateGuideDialogComponent {

  updateGuideForm = this.formBuilder.group({
    title: [this.data.title, [Validators.required]],
    content: [this.data.content, [Validators.required]],
  })

  constructor(private formBuilder: FormBuilder, private userSerice: UserService, @Inject(MAT_DIALOG_DATA) public data: IGuide) { }


  updateGuide(){
    if(this.updateGuideForm.valid){
      this.userSerice.updateGuide({
        id: this.data.id,
        title: this.updateGuideForm.value.title || '',
        content: this.updateGuideForm.value.content || ''
      })
    }
  }

}
