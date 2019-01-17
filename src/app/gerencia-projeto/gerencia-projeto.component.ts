import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Project } from '../model/project.model';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-gerencia-projeto',
  templateUrl: './gerencia-projeto.component.html',
  styleUrls: ['./gerencia-projeto.component.css']
})
export class GerenciaProjetoComponent implements OnInit {

  formProject: FormGroup;
  labelButton: string;
  project: Project;
  projects$: Observable<Project[]>;
  edit: boolean;
  messages: string;
  id: string;
    //Para upload da imagem
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;
  caminhoImagem: string;

  constructor(private storage: AngularFireStorage, private projectService: ProjectService, private form: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.labelButton = 'Save';
    this.projects$ = this.projectService.getAllProjects();
    this.project = new Project();
  }
  initForm() {
    this.formProject = this.form.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
upload(event) {
    this.complete = false;
    const file = event.target.files[0];
    const path = `imagens/${file.name}`;
    const fileRef = this.storage.ref(path.replace(/\s/g, ''));
    this.task = this.storage.upload(path.replace(/\s/g, ''), file);
    this.task.then(up => {
      fileRef.getDownloadURL().subscribe(url => {
        this.complete = true;
        this.caminhoImagem = url;

      });
    });
    this.uploadPercent = this.task.percentageChanges();
  }
  saveProject() {
    if (this.formProject.invalid) {
      this.messages = `Verifique os campo sobrigatórios!`;
      return;
    }
    this.project = this.formProject.value;
    if (!this.edit) {
      this.projectService.save(this.project)
        .then(() => {
          this.messages = `Projeto Salvo com sucesso!`;
          this.formProject.reset();

        })
        .catch((erro) => { this.messages = `Erro ao salvar o projeto: ${erro}`; });
    } else {
      this.project.idProject = this.id;
      this.projectService.update(this.project)
        .then(() => {
          this.messages = `Projeto Atulizado com sucesso!`;
          this.formProject.reset();
          this.labelButton = 'Save';

        })
        .catch((erro) => { this.messages = `Erro ao atualizar o projeto: ${erro}`; });
    }
  }
}
