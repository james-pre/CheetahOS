import { Component, ViewChild } from '@angular/core';
// import { DiffEditorModel } from 'ngx-monaco-editor-v2';



@Component({
  selector: 'cos-codeeditor',
  templateUrl: './codeeditor.component.html',
  styleUrl: './codeeditor.component.css'
})
export class CodeeditorComponent {

  // @ViewChild(MonacoEditorComponent, { static: false })
  // monacoComponent: EditorComponent;


  editorOptions = {
    language: 'csharp', // java, javascript, python, csharp, html, markdown, ruby
    theme: 'vs-dark', // vs, vs-dark, hc-black
    automaticLayout: true,
  };
  code = this.getCode();

  getCode() {
    return (
      '<html><!-- // !!! Tokens can be inspected using F1 > Developer: Inspect Tokens !!! -->\n<head>\n	<!-- HTML comment -->\n	<style type="text/css">\n		/* CSS comment */\n	</style>\n	<script type="javascript">\n		// JavaScript comment\n	</' +
      'script>\n</head>\n<body></body>\n</html>'
    );
  }

}
