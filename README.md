# Go Runner — Run Go files from VS Code

A small VS Code extension that runs the current Go file in a single reusable terminal and optionally re-runs on save.

**Introduction**
- **Purpose**: Run saved Go files quickly from the editor without creating a new terminal each time.

**Features**
- **Run**: Run the active Go file from the command palette.
- **Auto-run**: Toggle autorun on save so the file re-runs automatically when you save.
- **Terminal reuse**: Uses one shared terminal named `Go Runner` to avoid stacking terminals.

**Commands**
- **Run**: `Go Runner: Run` — runs the active file (file must be saved and be a Go file).
- **Toggle AutoRun**: `Go Runner: Toggle AutoRun` — enable/disable automatic runs on save.

**Usage**
1. Open a Go file and save it.
2. Run the command `Go Runner: Run` from the Command Palette or trigger your Run button.
3. To enable automatic runs on save, run `Go Runner: Toggle AutoRun`.

Notes:
- The extension requires the file to be saved before running. If the terminal used by the extension is closed manually, a new one will be created automatically on next run.


**Important files**
- **Extension entry**: [src/extension.ts](src/extension.ts)
- **Run logic**: [src/runGofile.ts](src/runGofile.ts)
- **Legacy save helper**: [src/runSave.ts](src/runSave.ts) (kept for reference; the current activation registers a single save listener)

**Troubleshooting**
- If you previously observed multiple terminals stacking on every save, that was caused by registering the save listener multiple times and passing the terminal reference by value. This release reuses a single terminal reference and registers the save listener once during activation.
- If the extension does not run a file, confirm the file is saved and its language mode is Go.

**Contributing**
- Pull requests and issues welcome. Keep changes focused and include tests when appropriate.

**License**
- MIT
