import * as vscode from "vscode";

export class ExtractMethod {
  public static execute() {
    let editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage(`Must have an editor open with content selected!`);
      return;
    }

    const selectedText = editor.selection;
    if (selectedText.isEmpty) {
      vscode.window.showErrorMessage(`Must have HTML selected!`);
      return;
    }

    const selectedContent = editor.document.getText(selectedText);

    vscode.window
      .showInputBox({
        prompt: "Method signature",
        placeHolder: "render_my_content(parameter_one, parameter_two)",
      })
      .then((methodSignature) => {
        if (!methodSignature) {
          return;
        }

        const replaceEditor = vscode.window.activeTextEditor;
        if (!replaceEditor) {
          return;
        }
        replaceEditor
          .edit((builder) => builder.replace(selectedText, methodSignature))
          .then(() => {
            const insertEditor = vscode.window.activeTextEditor;
            if (!insertEditor) {
              return;
            }
            insertEditor.edit((builder) => {
              if (!insertEditor) {
                return;
              }

              builder.insert(
                new vscode.Position(insertEditor.document.lineAt(insertEditor.document.lineCount - 2).lineNumber, 0),
                `\n\tprivate def ${methodSignature}\n${selectedContent}\n\tend\n`
              );
            });
          });
      });
  }
}
