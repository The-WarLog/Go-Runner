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
exports.runSave = runSave;
const vscode = __importStar(require("vscode"));
function runSave(filepath, Oldterminal) {
    vscode.workspace.onDidSaveTextDocument((document) => {
        if (Oldterminal === null || vscode.window.terminals.includes(Oldterminal) === false) {
            //new Terminal
            const terminal = vscode.window.createTerminal("Go Runner");
            Oldterminal = terminal;
            terminal.show();
            terminal.sendText(`go run ${filepath}`);
        }
        //if the terminal ref exist then i can just send the command
        else {
            Oldterminal.sendText('clear'); // Clear the terminal before running the new command
            Oldterminal.show();
            Oldterminal.sendText(`go run "${filepath}"`);
        }
    });
}
//# sourceMappingURL=runSave.js.map