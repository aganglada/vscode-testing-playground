import * as vscode from 'vscode'
import { getHtml } from './html'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-testing-playground" is now active!')

  let currentPanel: vscode.WebviewPanel | undefined

  vscode.window.registerTerminalLinkProvider({
    handleTerminalLink: (link: any) => {
      if (!currentPanel) {
        const panel = vscode.window.createWebviewPanel(
          'vscode-testing-playground',
          `Testing Playground`,
          vscode.ViewColumn.Beside,
          {
            enableCommandUris: true,
            enableFindWidget: true,
            localResourceRoots: [],
            enableScripts: true,
          },
        )

        currentPanel = panel
      }

      currentPanel.webview.html = getHtml(link.data)
      currentPanel.onDidDispose(() => (currentPanel = undefined))
    },
    provideTerminalLinks: (context, token) => {
      const [testingPlaygroundLink] =
        context.line.match(/https\:\/\/testing-playground.com\/\#markup.*/i) || []

      if (!testingPlaygroundLink) return

      return [
        {
          startIndex: 1,
          length: testingPlaygroundLink.length,
          data: testingPlaygroundLink,
        },
      ]
    },
  })
}

export function deactivate() {}
