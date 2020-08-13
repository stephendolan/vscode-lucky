import * as vscode from "vscode";

import { FileHelper } from "../common/file_helper";
import { ModelExtractor } from "../common/model_extractor";

export class EditModel {
  public static execute() {
    let filename = FileHelper.currentFile();

    if (!filename) {
      return;
    }

    if (filename.includes("/pages/")) {
      filename = filename.replace(/\/src\/.+/, `/src/models/${ModelExtractor.fromPath(filename)}.cr`);
    } else if (filename.includes("/actions/")) {
      filename = filename.replace(/\/src\/.+/, `/src/models/${ModelExtractor.fromPath(filename)}.cr`);
    } else if (filename.includes("/operations/")) {
      filename = filename.replace("operations/save_", "models/");
    } else {
      vscode.window.showErrorMessage("This can only run on a Lucky Page, Action or Operation!");
      return;
    }

    FileHelper.safeOpen(filename, "model");
  }
}
