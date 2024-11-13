# VS Code Setup for DEALS 2.0

## Required Extensions

### Core Extensions
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "styled-components.vscode-styled-components",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "streetsidesoftware.code-spell-checker",
    "eamodio.gitlens",
    "christian-kohler.path-intellisense"
  ]
}
```

### Installation
1. Open VS Code
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
3. Paste: `ext install dbaeumer.vscode-eslint esbenp.prettier-vscode styled-components.vscode-styled-components`

## Workspace Settings

### settings.json
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.rulers": [100],
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewLine": true,
  "files.trimFinalNewlines": true,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  "editor.suggestSelection": "first",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "files.eol": "\n"
}
```

## Debugging Configuration

### launch.json
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["${fileBasename}", "--config", "jest.config.js"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Code Snippets

### typescript.json
```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "import styled from 'styled-components';",
      "",
      "interface ${1:${TM_FILENAME_BASE}}Props {",
      "  $2",
      "}",
      "",
      "const ${1:${TM_FILENAME_BASE}}: React.FC<${1:${TM_FILENAME_BASE}}Props> = ($3) => {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  );",
      "};",
      "",
      "export default ${1:${TM_FILENAME_BASE}};"
    ],
    "description": "React Functional Component with TypeScript"
  },
  "Styled Component": {
    "prefix": "sc",
    "body": [
      "const ${1:StyledComponent} = styled.${2:div}<${3:Props}>`",
      "  $0",
      "`;"
    ],
    "description": "Styled Component with TypeScript"
  }
}
```

## Git Integration

### .gitignore
```gitignore
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
```

## Keyboard Shortcuts

### Essential Shortcuts
- Format Document: `Shift + Alt + F`
- Quick Fix: `Ctrl + .`
- Go to Definition: `F12`
- Find References: `Shift + F12`
- Rename Symbol: `F2`
- Toggle Terminal: `` Ctrl + ` ``
- Command Palette: `Ctrl + Shift + P`

### Custom keybindings.json
```json
[
  {
    "key": "ctrl+k ctrl+t",
    "command": "workbench.action.terminal.new"
  },
  {
    "key": "ctrl+k ctrl+r",
    "command": "editor.action.rename",
    "when": "editorHasRenameProvider && editorTextFocus && !editorReadonly"
  }
]
```

## Workspace Organization

### Recommended Layout
```
.vscode/
├── settings.json
├── launch.json
├── tasks.json
└── extensions.json

src/
├── components/
├── styles/
└── pages/
```

## Productivity Tips

### 1. Multi-Cursor Editing
- Add cursor: `Alt + Click`
- Add cursors to line ends: `Shift + Alt + I`
- Select next occurrence: `Ctrl + D`

### 2. File Navigation
- Quick Open: `Ctrl + P`
- Switch Editor: `Ctrl + Tab`
- Go to Symbol: `Ctrl + Shift + O`

### 3. Code Folding
- Fold: `Ctrl + Shift + [`
- Unfold: `Ctrl + Shift + ]`
- Fold All: `Ctrl + K, Ctrl + 0`
- Unfold All: `Ctrl + K, Ctrl + J`

## Extension Configuration

### ESLint
```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### Prettier
```json
{
  "prettier.singleQuote": true,
  "prettier.trailingComma": "es5",
  "prettier.printWidth": 100
}
```

## Troubleshooting

### Common Issues

1. **TypeScript Language Service**
   - Delete `.vscode/ts*` files
   - Reload VS Code
   - Run `npm install`

2. **ESLint Integration**
   - Check ESLint extension is installed
   - Verify `.eslintrc` configuration
   - Run `npm install` to update dependencies

3. **Debugging Not Working**
   - Check source maps are enabled
   - Verify launch configuration
   - Clear browser cache

## Resources

### Documentation
- [VS Code Documentation](https://code.visualstudio.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [ESLint Documentation](https://eslint.org/docs/user-guide/)

### Support
- VS Code GitHub Issues
- Extension Support
- Team Technical Lead
