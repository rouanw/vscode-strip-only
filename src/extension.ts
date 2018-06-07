'use strict';
import * as vscode from 'vscode';
import TextEditor = vscode.TextEditor;
import TextEditorEdit = vscode.TextEditorEdit;
import Range = vscode.Range;

function stripOnly(textEditor: TextEditor, edit: TextEditorEdit, args: any[]) {
  const textDocument = textEditor.document;
  const documentContents = textDocument.getText();

  textEditor.edit((editBuilder: TextEditorEdit) => {
    let regEx = /(it|describe).only\(/ig;
    let match = regEx.exec(documentContents);
    while (match) {
      const [substring] = match;
      const { index } = match;
      const newValue = substring.replace('.only', '');
      const startPos = textEditor.document.positionAt(index);
      const endPos = textEditor.document.positionAt(index + substring.length);
      const range = new Range(startPos, endPos);
      editBuilder.replace(range, newValue);
      match = regEx.exec(documentContents);
    }
  });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerTextEditorCommand('extension.stripOnly', stripOnly);

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
