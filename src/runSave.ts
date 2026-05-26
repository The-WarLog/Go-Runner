import * as vscode from 'vscode';

export function runSave(filepath: string,Oldterminal: vscode.Terminal | null){
  vscode.workspace.onDidSaveTextDocument((document)=>{
        if(Oldterminal===null || vscode.window.terminals.includes(Oldterminal)===false){
        //new Terminal
        const terminal=vscode.window.createTerminal("Go Runner");
        Oldterminal=terminal;
        terminal.show();
        terminal.sendText(`go run ${filepath}`);

    } 
    //if the terminal ref exist then i can just send the command
    else{
      Oldterminal.sendText('clear'); // Clear the terminal before running the new command
    Oldterminal.show();
    Oldterminal.sendText(`go run "${filepath}"`);
    }
  });
}