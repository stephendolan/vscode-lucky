import * as vscode from "vscode";

export class FileHelper {
  public static currentFile(): string | undefined {
    let editor = vscode.window.activeTextEditor;

    if (!editor) {
      return;
    }

    let document = editor.document;
    return document.fileName;
  }

  public static safeOpen(filename: string, targetType: string) {
    vscode.workspace.fs.stat(vscode.Uri.file(filename)).then(
      () => {
        vscode.workspace.openTextDocument(filename).then((doc) => {
          vscode.window.showTextDocument(doc);
        });
      },
      () => {
        vscode.window.showInformationMessage(`Couldn't match this file to a Lucky ${targetType}.`);
      }
    );
  }
}
