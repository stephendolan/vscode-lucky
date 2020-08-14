import * as vscode from "vscode";
import axios from "axios";

export class ConvertHtml {
  public static execute() {
    let editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage(`Must have an editor open with HTML selected!`);
      return;
    }

    const selectedText = editor.selection;
    if (selectedText.isEmpty) {
      vscode.window.showErrorMessage(`Must have HTML selected!`);
      return;
    }

    const selectedContent = editor.document.getText(selectedText);

    axios.defaults.baseURL = "https://luckyframework.org";
    axios
      .post("/api/html_conversions", {
        input: selectedContent,
      })
      .then(function (response) {
        if (editor) {
          editor.edit((builder) => builder.replace(selectedText, response.data.content));
        }
      })
      .catch(function (error) {
        console.log(error.toJSON());

        // If we get a "Service Unavailable" response, print a slightly different message.
        if (error.response && error.response.status === 503) {
          vscode.window.showErrorMessage(`Lucky HTML Conversion API disabled. Try again later.`);
          return;
        }

        vscode.window.showErrorMessage(`Lucky HTML Conversion failed. Please open a GitHub issue.`);
      });
  }
}
