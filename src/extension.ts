import * as vscode from "vscode";

import { EditModel } from "./commands/edit_model";
import { EditOperation } from "./commands/edit_operation";
import { EditPage } from "./commands/edit_page";
import { EditAction } from "./commands/edit_action";
import { ExtractMethod } from "./commands/extract_method";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand("lucky.editModel", EditModel.execute));
  context.subscriptions.push(vscode.commands.registerCommand("lucky.editOperation", EditOperation.execute));
  context.subscriptions.push(vscode.commands.registerCommand("lucky.editPage", EditPage.execute));
  context.subscriptions.push(vscode.commands.registerCommand("lucky.editAction", EditAction.execute));
  context.subscriptions.push(vscode.commands.registerCommand("lucky.extractMethod", ExtractMethod.execute));
}
