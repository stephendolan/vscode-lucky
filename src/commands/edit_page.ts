import * as vscode from "vscode";

import { FileHelper } from "../common/file_helper";

export class EditPage {
  public static execute() {
    let filename = FileHelper.currentFile();

    if (!filename) {
      return;
    }

    if (filename.includes("/actions/")) {
      filename = filename.replace("actions", "pages");
      filename = filename.replace("/create", "/new");
      filename = filename.replace("/update", "/edit");
      filename = filename.replace(".cr", "_page.cr");
    } else {
      vscode.window.showErrorMessage("This can only run on a Lucky Action!");
      return;
    }

    FileHelper.safeOpen(filename, "page");
  }
}
