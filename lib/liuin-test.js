'use babel';

import { Range, Point } from 'atom';

class Main {

    constructor () {
        atom.workspace.observeTextEditors((editor) => {
            editor.onDidSave(() => {
                this.action(editor);
            })
        })
        atom.workspace.observeActivePaneItem((editor) => {
            this.action(editor);
        })


    }

    action (editor) {
        if(editor && editor.editorElement && editor.editorElement.shadowRoot){

            if(!editor.decoration){
                editor.decoration = [];
            }

            let startIndex = [];
            let endIndex = [];

            editor.decoration.forEach((item) => {
                item.destroy(); 
            })

            const linesNum = editor.getLineCount();

            for (let i = 0; i < linesNum; i++) {
                const text = editor.lineTextForScreenRow(i);
                if(text.indexOf('@block') >= 0){
                    startIndex.push(i);
                }
                if(text.indexOf('@!block') >= 0){
                    endIndex.push(i);
                }
            }

            for (let i = 0; i < startIndex.length; i++) {
                if(typeof startIndex[i] != 'undefined' && typeof endIndex[i] != 'undefined' && startIndex[i] < endIndex[i]){
                    const range = new Range(new Point(startIndex[i], 0), new Point(endIndex[i], 0));
                    // console.log('block: ', range.getRows());
                    const marker = editor.markScreenRange(range);
                    const decoration = editor.decorateMarker(marker, { type: 'line', class: 'atom-block' });
                    editor.decoration.push(decoration);
                }
            }
        }
    }

}

export default new Main();
