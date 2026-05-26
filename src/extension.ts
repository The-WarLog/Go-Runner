// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { runGOFile } from './runGofile';

let oldTerminalRef: vscode.Terminal | null = null;
let autorunenabled = false;

export function activate(context: vscode.ExtensionContext) {
	const getTerminal = () => oldTerminalRef;
	const setTerminal = (t: vscode.Terminal | null) => { oldTerminalRef = t; };

	const disposable = vscode.commands.registerCommand('go-runner.runGo', () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage('No active editor found');
			return;
		} else if (editor.document.languageId !== 'go') {
			vscode.window.showErrorMessage('The active file is not a Go file');
			return;
		} else if (editor.document.isDirty) {
			vscode.window.showErrorMessage('Please save the file before running');
			return;
		}

		const filePath = editor.document.fileName;
		runGOFile(filePath, getTerminal, setTerminal);
	});

	const toggleAutoRunCommand = vscode.commands.registerCommand('go-runner.toggleAutoRun', () => {
		autorunenabled = !autorunenabled;
		vscode.window.showInformationMessage(`${autorunenabled ? 'Auto-run enabled' : 'Auto-run disabled'}`);
	});

	// Register a single save listener that triggers runs when autorun is enabled
	const saveListener = vscode.workspace.onDidSaveTextDocument((document) => {
		if (!autorunenabled) return;
		if (document.languageId === 'go') {
			runGOFile(document.fileName, getTerminal, setTerminal);
		}
	});

	context.subscriptions.push(disposable, toggleAutoRunCommand, saveListener);
}

export function deactivate() {}
