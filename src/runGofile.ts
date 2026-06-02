import * as vscode from 'vscode';

export function runGOFile(
    filepath: any,
    getTerminal: () => vscode.Terminal | null,
    setTerminal: (t: vscode.Terminal | null) => void
){
    const oldTerminal = getTerminal();
    

    if (oldTerminal === null || vscode.window.terminals.includes(oldTerminal) === false) {
        const terminal = vscode.window.createTerminal('Go Runner');
        setTerminal(terminal);
        terminal.show();
        terminal.sendText(`go run ${filepath}`);
    } else {
        oldTerminal.sendText('clear');
        oldTerminal.show();
        oldTerminal.sendText(`go run ${filepath}`);
    }
}

