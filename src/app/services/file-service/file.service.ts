import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { UploadTasksFile} from "../../Models/Tasks/task.model";
import {uploadFileProject} from "../../Models/Project/project.model";

@Injectable({
  providedIn : 'root'
})
export  class  FileUploadService {


    constructor(private http: HttpClient) {
    }


    uploadFileTask(fileTask: UploadTasksFile): Observable<HttpEvent<any>> {
        let formData: FormData = new FormData();
        formData.append('OwnerId', fileTask.OwnerId.toString());
        formData.append('File', fileTask.Files!);

        const reqPost =
            this.http.post("https://localhost:7011/api/Tasks/Upload", formData,
                {
                    reportProgress: true,
                    observe: "events"
                });

        return reqPost.pipe(
            map(res => {
                return res;
            }))
    }

    uploadFileProject(fileProject : uploadFileProject) : Observable<HttpEvent<any>>{
        let formData: FormData = new FormData();
        formData.append('OwnerId', fileProject.projectId.toString());
        formData.append('File', fileProject.fileProject!);

        const reqPost =
            this.http.post("https://localhost:7011/api/Project/Upload", formData,
                {
                    reportProgress: true,
                    observe: "events"
                });

        return reqPost.pipe(
            map(res => {
                return res;
            }))
    }


    DownloadFiles({OwnerId, attachmentId, type, fileName , typeId}: {
        OwnerId: number, attachmentId: number, type: string,
        fileName: string , typeId: string
    }) {
        this.http.get(`https://localhost:7011/api/${type}/Download?${typeId}=${OwnerId}&attachmentId=${attachmentId}`, {responseType: 'blob' as 'json'}).subscribe(
            (response: any) => {
                let dataType = response.fileType;
                let binaryData = [];
                binaryData.push(response);
                let downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
                if (fileName)
                    downloadLink.setAttribute('download', fileName);
                document.body.appendChild(downloadLink);
                downloadLink.click();
            }
        )
    }


    RemoveFile({OwnerId, attachmentId, type , typeId}: {
        OwnerId: number, attachmentId: number, type: string , typeId:string
    }){

        return this.http.delete(`https://localhost:7011/api/${type}/DeleteAttachment?${typeId}=${OwnerId}&attachmentId=${attachmentId}`);

    }


}
