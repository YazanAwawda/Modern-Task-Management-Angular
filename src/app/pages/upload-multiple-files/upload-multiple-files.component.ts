import {Component, Input, OnInit} from '@angular/core';
import {FileUploadService} from "../../services/file-service/file.service";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";
import {allFilesOfTask, DownloadFileTask, UploadTasksFile, UploadTasksFiles} from "../../Models/Tasks/task.model";
import {ToastrService} from "ngx-toastr";
import {allFilesOfProject, uploadFileProject, uploadFilesProject} from "../../Models/Project/project.model";


@Component({
  selector: 'app-upload-multiple-files',
  templateUrl: './upload-multiple-files.component.html',
  styleUrls: ['./upload-multiple-files.component.scss']
})
export class UploadMultipleFilesComponent implements  OnInit{

  selectedFiles : UploadTasksFiles;
  progressInfos: any[] = [];
  message: string[] = [];

   @Input() OwnerId : number ;
   @Input() filesOfTask :  allFilesOfTask[];
   @Input() type: string;
   @Input() typeId: string ;

    selectedProjectFiles : uploadFilesProject ;
    @Input() filesOfProject: allFilesOfProject[]

    iconList = [ // array of icon class list based on type
          { type: "xlsx", icon: "bi bi-filetype-xlsx" },
         { type: "pdf", icon: "bi bi-filetype-pdf" },
         { type: "jpg", icon: "bi bi-file-image" } ,
         {type : 'txt' , icon : "bi bi-filetype-txt"} ,
        {type: 'xls ' , icon: "bi bi-filetype-xls" } ,
        {type: "html" , icon: "bi bi-file-code"}  ,
        {type: "htm" , icon: "bi bi-file-code"}  ,
        {type: "doc" , icon: "bi bi-file-word"}  ,
        {type: "docx" , icon: "bi bi-file-word"}  ,
        {type: "gif" , icon: "bi bi-file-image"}  ,
        {type: "svg" , icon: "bi bi-file-image"}  ,
        {type: "png" , icon: "bi bi-file-image"}  ,
        {type: "tiff" , icon: "bi bi-file-image"}  ,
        {type: "tif" , icon: "bi bi-file-image"}  ,
        {type: "jpeg" , icon: "bi bi-file-image"}  ,
        {type: "ppt" , icon: "bi bi-filetype-ppt"}  ,
        {type: "pptx" , icon: "bi bi-filetype-pptx"} ,
         {type: "rar" , icon: "bi bi-file-zip"}


    ];
  constructor(public  uploadService : FileUploadService,
              private  toasty : ToastrService) {

          this.selectedFiles = {
          OwnerId: this.OwnerId,
          Files: []
          }

          this.selectedProjectFiles = {
          projectId : this.OwnerId ,
          fileProject : []
          }
  }

  selectFiles(event:any) {
       this.message = [] ;
       this.progressInfos = [];
       this.selectedFiles.Files = event.target.files;
        if (this.selectedFiles.Files.length === 0) {
        this.selectedFiles.Files = event.target.files[0];
    }
  }

  projectFilesSelected(event: any){
  this.message = [] ;
  this.progressInfos = [] ;
  this.selectedProjectFiles.fileProject = event.target.files;
  if(this.selectedProjectFiles.fileProject?.length === 0) {
      this.selectedProjectFiles.fileProject = event.target.files[0];
  }
  }

  upload(id :number, file: UploadTasksFile){

   if(file){
     this.uploadService.uploadFileTask(file).subscribe({
       next : (event:HttpEvent<any> | any) => {
       if(event.type === HttpEventType.UploadProgress) {
         this.progressInfos[id].value = Math.round(100 * event.loaded / event.total);
       }
         else if(event instanceof  HttpResponse){
         const msg = "Uploaded the file successfully: "+ file.Files.name ;
         this.toasty.success(msg);
         this.message.push(msg);
         window.location.reload();
       }

        }, error : err => {
         this.toasty.error("Uploaded Failed.")
       }

     }  );
   }

    this.progressInfos[id] =
      {
        value: 0 ,
        fileName : file.Files.name
      };
  }

    uploadProjectFile(id:number, file: uploadFileProject){

        if(file){
            this.uploadService.uploadFileProject(file).subscribe({
                next : (event:HttpEvent<any> | any) => {
                    if(event.type === HttpEventType.UploadProgress) {
                        this.progressInfos[id].value = Math.round(100 * event.loaded / event.total);
                    }
                    else if(event instanceof  HttpResponse){
                        const msg = "Uploaded the file successfully: "+ file.fileProject.name ;
                        this.toasty.success(msg);
                        this.message.push(msg);
                        window.location.reload();
                    }

                }, error : err => {
                    this.toasty.error("Uploaded Failed.")
                }

            }  );
        }

        this.progressInfos[id] =
            {
                value: 0 ,
                fileName : file.fileProject.name
            };
    }

    uploadedFilesProject(){
      this.message = [] ;
      if(this.selectedProjectFiles) {
          for (let i = 0; i < this.selectedProjectFiles.fileProject?.length; i++) {
              if(this.selectedProjectFiles.fileProject?.length > 0 ) {
                  let file: uploadFileProject =
                      {
                          fileProject: this.selectedProjectFiles.fileProject[i] ,
                          projectId: this.OwnerId
                      }

                  this.uploadProjectFile(i ,  file );
              }
              if(this.selectedProjectFiles.fileProject?.length=== 0) {
                  let file: uploadFileProject =
                      {
                          fileProject: this.selectedProjectFiles.fileProject[0] ,
                          projectId: this.OwnerId
                      }

                  this.uploadProjectFile(i ,  file );
              }

          }
      }
    }

    uploadFiles() {
        this.message = [] ;
        if(this.selectedFiles){
            for (let i = 0; i < this.selectedFiles.Files.length; i++) {
   if(this.selectedFiles.Files.length > 0 ) {
       let file: UploadTasksFile =
           {
               Files: this.selectedFiles.Files[i] ,
               OwnerId: this.OwnerId
           }

       this.upload(i ,  file );
   }
         if(this.selectedFiles.Files.length === 0) {
         let file: UploadTasksFile =
             {
                 Files: this.selectedFiles.Files[0] ,
                 OwnerId: this.OwnerId
             }

         this.upload(i ,  file );
     }


            }
        }
    }


    getFileExtension(filename : string) : string { // this will give you icon class name
        let ext = filename.split(".").pop();
        let obj = this.iconList.filter((row: {type: string, icon: string} ) : any  =>
        {
            if (row.type === ext) {
                return true;
            }
        });
        if (obj.length > 0) {
            let icon = obj[0].icon;
            return icon;
        } else {
            return "";
        }
    }

    convertBytesToKB(bytes: string){
      return (Number([bytes])/(10*10*10))+" "+"KB";
    }


  onRemoveFile(ownerId : number , attachmentId:number
               , type:string ,typeId:string) {
      this.uploadService.RemoveFile(
          {OwnerId:ownerId
              , attachmentId:attachmentId ,
              type : type , typeId : typeId}).subscribe(res => {
          console.log(res);
          this.toasty.error("Remove Successfully.");
        window.location.reload();

      });
  }
  ngOnInit(): void {

  }


}
