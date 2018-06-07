import * as vscode from 'vscode';
import * as assert from 'assert';

describe('Strip .only', function () {
  it('should remove all .only instances from the file', async function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      assert.ok(editor);
    } else {
      await editor.edit((builder) => builder.insert(new vscode.Position(0,0), `
        describe.only('my functionality', () => {
            it('does useful things', () => {});
            it.only('does new things', () => {});
          });
        `));
      await vscode.commands.executeCommand('extension.stripOnly');
      const updatedText = editor.document.getText();
      assert.equal(false, updatedText.includes('.only'));
    }
  });
});
