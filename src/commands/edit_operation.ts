import * as vscode from "vscode";

import { FileHelper } from "../common/file_helper";
import { ModelExtractor } from "../common/model_extractor";

export class EditOperation {
  public static execute() {
    let filename = FileHelper.currentFile();

    if (!filename) {
      return;
    }

    if (filename.includes("/pages/")) {
      filename = filename.replace(/\/src\/.+/, `/src/operations/save_${ModelExtractor.fromPath(filename)}.cr`);
    } else if (filename.includes("/actions/")) {
      filename = filename.replace(/\/src\/.+/, `/src/operations/save_${ModelExtractor.fromPath(filename)}.cr`);
    } else if (filename.includes("/models/")) {
      filename = filename.replace("models/", "operations/save_");
    } else {
      vscode.window.showErrorMessage("This can only run on a Lucky Page, Action or Model!");
      return;
    }

    FileHelper.safeOpen(filename, "operation");
  }
}
