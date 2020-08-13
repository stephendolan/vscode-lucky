import * as vscode from "vscode";
import * as pluralize from "pluralize";

function modelFor(path: string): string {
  let pathComponents = path.split("/");
  let lastFolder = pathComponents[pathComponents.length - 2];
  let modelName = pluralize.singular(lastFolder);

  return modelName;
}

export function activate(context: vscode.ExtensionContext) {
  let editModel = vscode.commands.registerCommand("lucky.editModel", () => {
    let editor = vscode.window.activeTextEditor;

    if (!editor) {
      return;
    }

    let document = editor.document;
    let filename = document.fileName;

    if (filename.includes("/pages/")) {
      filename = filename.replace(/\/src\/.+/, `/src/models/${modelFor(filename)}.cr`);
    } else if (filename.includes("/actions/")) {
      filename = filename.replace(/\/src\/.+/, `/src/models/${modelFor(filename)}.cr`);
    } else if (filename.includes("/operations/")) {
      filename = filename.replace("operations/save_", "models/");
    } else {
      vscode.window.showErrorMessage("This can only run on a Lucky Page, Action or Operation!");
      return;
    }

    vscode.workspace.openTextDocument(filename).then((doc) => {
      vscode.window.showTextDocument(doc);
    });
  });
  context.subscriptions.push(editModel);

  let editOperation = vscode.commands.registerCommand("lucky.editOperation", () => {
    let editor = vscode.window.activeTextEditor;

    if (!editor) {
      return;
    }

    let document = editor.document;
    let filename = document.fileName;

    if (filename.includes("/pages/")) {
      filename = filename.replace(/\/src\/.+/, `/src/operations/save_${modelFor(filename)}.cr`);
    } else if (filename.includes("/actions/")) {
      filename = filename.replace(/\/src\/.+/, `/src/operations/save_${modelFor(filename)}.cr`);
    } else if (filename.includes("/models/")) {
      filename = filename.replace("models/", "operations/save_");
    } else {
      vscode.window.showErrorMessage("This can only run on a Lucky Page, Action or Model!");
      return;
    }

    vscode.workspace.openTextDocument(filename).then((doc) => {
      vscode.window.showTextDocument(doc);
    });
  });
  context.subscriptions.push(editOperation);

  let editPage = vscode.commands.registerCommand("lucky.editPage", () => {
    let editor = vscode.window.activeTextEditor;

    if (!editor) {
      return;
    }

    let document = editor.document;
    let filename = document.fileName;

    if (filename.includes("/actions/")) {
      filename = filename.replace("actions", "pages");
      filename = filename.replace("/create", "/new");
      filename = filename.replace("/update", "/edit");
      filename = filename.replace(".cr", "_page.cr");
    } else {
      vscode.window.showErrorMessage("This can only run on a Lucky Action!");
      return;
    }

    vscode.workspace.openTextDocument(filename).then((doc) => {
      vscode.window.showTextDocument(doc);
    });
  });
  context.subscriptions.push(editPage);

  let editAction = vscode.commands.registerCommand("lucky.editAction", () => {
    let editor = vscode.window.activeTextEditor;

    if (!editor) {
      return;
    }

    let document = editor.document;
    let filename = document.fileName;

    if (filename.includes("/pages/")) {
      filename = filename.replace("pages", "actions");
      filename = filename.replace("_page.cr", ".cr");
    } else {
      vscode.window.showErrorMessage("This can only run on a Lucky Action!");
      return;
    }

    vscode.workspace.openTextDocument(filename).then((doc) => {
      vscode.window.showTextDocument(doc);
    });
  });
  context.subscriptions.push(editAction);
}
