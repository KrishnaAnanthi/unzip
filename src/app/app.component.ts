import { Component } from "@angular/core";
import { ZipService } from "./service/zip.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "unzip";
  fileContent = [];
  constructor(public zipService: ZipService) {}
  fileChanged(event) {
    const file = event.target.files[0];
    console.log(file);
    this.zipService.getEntries(file).subscribe((response) => {
      console.log(response);
      response.forEach((entry) => {
        let { progress, data } = this.zipService.getData(entry);
        data.subscribe((fileContent) => {
          // console.log(fileContent);
          this.convertBlobTOText(fileContent);
        });
      });
    });
  }

  async convertBlobTOText(fileContent) {
    let text = await new Response(fileContent).text();
    console.log(text);
    text === "" ? (text = "File is empty") : text;
    this.fileContent.push(text);
  }
}
