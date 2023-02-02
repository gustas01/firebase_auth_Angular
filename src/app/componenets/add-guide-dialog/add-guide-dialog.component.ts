import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-guide-dialog',
  templateUrl: './add-guide-dialog.component.html',
  styleUrls: ['./add-guide-dialog.component.scss']
})
export class AddGuideDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  //criar formgroupd para coletar dados para mandar para o service em addGuide()

  addGuide(){
    //chamar método do service que adiciona o guide
  }
}
