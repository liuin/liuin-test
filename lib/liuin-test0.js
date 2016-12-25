'use babel';

import LiuinTestView from './liuin-test-view';
import { CompositeDisposable } from 'atom';

export default {

  liuinTestView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.liuinTestView = new LiuinTestView(state.liuinTestViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.liuinTestView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'liuin-test:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.liuinTestView.destroy();
  },

  serialize() {
    return {
      liuinTestViewState: this.liuinTestView.serialize()
    };
  },

  toggle() {
    console.log('LiuinTest was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
