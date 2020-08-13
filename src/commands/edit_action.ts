import * as vscode from "vscode";

import { FileHelper } from "../common/file_helper";

export class EditAction {
  public static execute() {
    let filename = FileHelper.currentFile();

    if (!filename) {
      return;
    }

    if (filename.includes("/pages/")) {
      filename = filename.replace("pages", "actions");
      filename = filename.replace("_page.cr", ".cr");
    } else {
      vscode.window.showErrorMessage("This can only run on a Lucky Action!");
      return;
    }

    FileHelper.safeOpen(filename, "action");
  }
}
