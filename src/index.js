/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
import './style.sass';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
// import "froala-editor/js/plugins/fullscreen.min.js"

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/third_party/embedly.min.css';
// import "froala-editor/css/plugins/fullscreen.min.css";

import DatoCmsPlugin from 'datocms-plugins-sdk';
import FroalaEditor from 'froala-editor';

DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();

  const editorWrapper = document.createElement('div');
  editorWrapper.setAttribute('id', 'editor');
  document.body.append(editorWrapper);

  const initialContent = plugin.getFieldValue(plugin.fieldPath);

  const uploadToImageElement = (upload) => {
    if (upload.attributes.is_image) {
      const img = upload.attributes;
      const url = img.url.replace('https://www.datocms-assets.com/22581', 'https://www.oberlo.com/media');
      const { alt, title } = img.default_field_metadata[plugin.locale];
      return `<img src="${url}" alt="${alt}" title="${title}" class="editor-inserted">`;
    }
  };

  FroalaEditor.RegisterCommand('insertDatoImage', {
    title: 'Insert Dato Image',
    icon: 'insertImage',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
      plugin.selectUpload()
        .then((upload) => {
          if (upload) {
            console.log('Upload selected: ', upload);
            this.html.insert(uploadToImageElement(upload));
          } else {
            console.log('Modal closed!');
          }
        });
    },
  });

  FroalaEditor.RegisterCommand('replaceDatoImage', {
    title: 'Replace Dato Image',
    icon: 'imageReplace',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
      plugin.selectUpload()
        .then((upload) => {
          if (upload) {
            console.log('Upload selected: ', upload);
            this.image.remove(this.image.get());
            this.html.insert(uploadToImageElement(upload));
          } else {
            console.log('Modal closed!');
          }
        });
    },
  });

  // eslint-disable-next-line no-unused-vars
  const editor = new FroalaEditor('#editor', {
    toolbarButtons: {
      moreText: {
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
      },
      moreParagraph: {
        buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
      },
      moreRich: {
        buttons: ['insertLink', 'insertDatoImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
      },
      moreMisc: {
        buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
        align: 'right',
        buttonsVisible: 2,
      },
    },
    imageEditButtons: ['replaceDatoImage', 'imageAlign', 'imageCaption', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt'],
    events: {
      initialized: function () {
        this.html.set(initialContent);
      },
      contentChanged: function () {
        plugin.setFieldValue(plugin.fieldPath, this.html.get());
      },
    },
  });

  // -------------

  // const input = document.querySelector('input');

  // input.value = plugin.getFieldValue(plugin.fieldPath);

  // plugin.addFieldChangeListener(plugin.fieldPath, (newValue) => {
  //   editor.html.set(newValue);
  // });

  // input.addEventListener('change', (e) => {
  //   plugin.setFieldValue(plugin.fieldPath, e.target.value);
  // });
});
