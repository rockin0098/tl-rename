// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function isCapital(text) {
	for (var i = 0; i < text.length; i++) {
		var c = text.charAt(i);
		if (c < 'A' || c > 'Z')
			return false;
	}
	return true;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tl-rename" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.tl-rename', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World!');



		let editor = vscode.window.activeTextEditor
		if (!editor) {
			return
		}
		let selection = editor.selection
		let text = editor.document.getText(selection)

		let s = text.substring(0, 3)
		let tail = text.substring(3)
		if (s === "Get" || s === "Set") {

			let newName = s

			for (var i = 0; i < tail.length; i++) {
				var c = tail.charAt(i);
				if (c < 'A' || c > 'Z') {
					newName = newName + c
				} else {
					let ls = c.toLowerCase()
					newName = newName + "_" + ls
				}
			}

			editor.edit(editBuilder => {
				editBuilder.replace(new vscode.Range(selection.start, selection.end), newName)
			})
		} else {
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
