import * as vscode from 'vscode'

export async function findgofilepath(): Promise<string | null>{
    //const oldTerminal = getTerminal();
    
    const entryPattern = '**/{index,server,app,main}.{go}'; // matches index.go, server.go, app.go, main.go in any subfolder
    const excludePattern = '**/Grid{node_modules,bower_components,dist,build,out,venv,.venv}/**'; //exclude unecessary folders/files
    try{
        const file= await vscode.workspace.findFiles(entryPattern, excludePattern);
       if (file.length>0){
        console.log(`Found Go file: ${file}`);
        return file[0].fsPath.toString();
       }
    }catch(error){
        vscode.window.showErrorMessage(`Error finding Go file: ${error}`);
        return null;
    }
    return null;




}