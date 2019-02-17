'use babel'
/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2019-02-17T15:55:59+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */


import { CompositeDisposable } from 'atom'
import path from 'path'

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'txo-snippets:add-or-update-log': () => this.addOrUpdateLog()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  getCurrentTabNamespace() {
    const currentTabPath = atom.workspace.getActivePaneItem().getURI()
    if (currentTabPath) {
      const [projectPath, relativePath] = atom.project.relativizePath(currentTabPath)
      const { dir, name } = path.parse(relativePath)
      const namespacePath = path.join(dir, name)
      return namespacePath.replace(path.sep, '.')
    }
    return ''
  },

  getLogLines() {
    return (
      `import { Log } from '@txo-peer-dep/log'\n` +
      `const Log = new Log('${this.getCurrentTabNamespace()}')\n`
    )
  },

  replaceCurrentSelection(text) {
    const editor = atom.workspace.getActiveTextEditor()
    editor && editor.insertText(text, { autoIndent: true })
  },

  updateLog() {
    const a = new Log('lib.ueoaueaouaeo-snippets')
  },

  addLog() {
    this.replaceCurrentSelection(this.getLogLines())
  },

  addOrUpdateLog() {

    const editor = atom.workspace.getActiveTextEditor()
    const regex = /new Log\(\'[^\']*\'/g
    var logFound = false
    editor.scan(regex, match => {
      logFound = true
      match.replace(`new Log('${this.getCurrentTabNamespace()}'`)
    })
    !logFound && this.addLog()
  }

}
