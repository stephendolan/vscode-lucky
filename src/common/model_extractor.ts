import * as pluralize from "pluralize";

export class ModelExtractor {
  public static fromPath(path: string): string {
    let pathComponents = path.split("/");
    let lastFolder = pathComponents[pathComponents.length - 2];
    let modelName = pluralize.singular(lastFolder);

    return modelName;
  }
}
