"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const runGofile_1 = require("./runGofile");
let oldTerminalRef = null;
let autorunenabled = false;
function activate(context) {
    const getTerminal = () => oldTerminalRef;
    const setTerminal = (t) => { oldTerminalRef = t; };
    const disposable = vscode.commands.registerCommand('go-runner.runGo', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }
        else if (editor.document.languageId !== 'go') {
            vscode.window.showErrorMessage('The active file is not a Go file');
            return;
        }
        else if (editor.document.isDirty) {
            vscode.window.showErrorMessage('Please save the file before running');
            return;
        }
        const filePath = editor.document.fileName;
        (0, runGofile_1.runGOFile)(filePath, getTerminal, setTerminal);
    });
    const toggleAutoRunCommand = vscode.commands.registerCommand('go-runner.toggleAutoRun', () => {
        autorunenabled = !autorunenabled;
        vscode.window.showInformationMessage(`${autorunenabled ? 'Auto-run enabled' : 'Auto-run disabled'}`);
    });
    // Register a single save listener that triggers runs when autorun is enabled
    const saveListener = vscode.workspace.onDidSaveTextDocument((document) => {
        if (!autorunenabled)
            return;
        if (document.languageId === 'go') {
            (0, runGofile_1.runGOFile)(document.fileName, getTerminal, setTerminal);
        }
    });
    context.subscriptions.push(disposable, toggleAutoRunCommand, saveListener);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map