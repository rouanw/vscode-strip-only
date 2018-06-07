import * as vscode from 'vscode';
import * as assert from 'assert';

describe('Strip .only', function () {
  const editor = vscode.window.activeTextEditor;

  beforeEach(async () => {
    if (editor) {
      const end = editor.document.lineAt(editor.document.lineCount - 1).range.end;
      await editor.edit((builder) => builder.replace(
        new vscode.Range(new vscode.Position(0,0), end),
        ''
      ));
    }
  });

  it('should remove all .only instances from the file', async function () {
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

  it('should only remove instances of .only that are part of a mocha expression', async function () {
    if (!editor) {
      assert.ok(editor);
    } else {
      await editor.edit((builder) => builder.insert(new vscode.Position(0,0), `
        describe.only('my functionality', () => {
            it.only('does useful things', () => {});
            it('tributes Orbison', () => {
              roy.onlyTheLonely();
              roy.describeALoveSoBeautiful();
              roy.describe('paper boy');
            });
          });
        `));
      await vscode.commands.executeCommand('extension.stripOnly');
      const updatedText = editor.document.getText();
      assert.equal(false, updatedText.includes('.only('));
      assert.equal(false, updatedText.includes('describe(my functionality'));
      assert.equal(true, updatedText.includes('roy.onlyTheLonely'));
      assert.equal(true, updatedText.includes('roy.describeALoveSoBeautiful();'));
      assert.equal(true, updatedText.includes('roy.describe(\'paper boy\');'));
    }
  });

  it('should support the mocha TDD interface', async function () {
    if (!editor) {
      assert.ok(editor);
    } else {
      await editor.edit((builder) => builder.insert(new vscode.Position(0,0), `
        suite.only('my functionality', () => {
            test.only('does useful things', () => {});
            it('csny', () => {
              csny.suiteJudyBlueEyes();
            });
          });
        `));
      await vscode.commands.executeCommand('extension.stripOnly');
      const updatedText = editor.document.getText();
      assert.equal(false, updatedText.includes('.only('));
      assert.equal(false, updatedText.includes('suite(my functionality'));
      assert.equal(true, updatedText.includes('csny.suiteJudyBlueEyes'));
    }
  });
});
