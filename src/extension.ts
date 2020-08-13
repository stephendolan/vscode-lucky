// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let editModel = vscode.commands.registerCommand("lucky.editModel", () => {
    vscode.window.showInformationMessage("This would open the model file");
  });
  context.subscriptions.push(editModel);

  let editOperation = vscode.commands.registerCommand("lucky.editOperation", () => {
    vscode.window.showInformationMessage("This would open the operation file");
  });
  context.subscriptions.push(editOperation);

  let editPage = vscode.commands.registerCommand("lucky.editPage", () => {
    vscode.window.showInformationMessage("This would open the page file");
  });
  context.subscriptions.push(editPage);

  let editAction = vscode.commands.registerCommand("lucky.editAction", () => {
    vscode.window.showInformationMessage("This would open the action file");
  });
  context.subscriptions.push(editAction);
}
