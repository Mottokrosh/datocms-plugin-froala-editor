import './style.sass';
import FroalaEditor from 'froala-editor';

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();

  const editorWrapper = document.createElement('div');
  editorWrapper.setAttribute('id', 'editor');
  document.body.append(editorWrapper);

  // eslint-disable-next-line no-unused-vars
  const editor = new FroalaEditor('#editor');

  const input = document.querySelector('input');

  input.value = plugin.getFieldValue(plugin.fieldPath);

  plugin.addFieldChangeListener(plugin.fieldPath, (newValue) => {
    input.value = newValue;
  });

  input.addEventListener('change', (e) => {
    plugin.setFieldValue(plugin.fieldPath, e.target.value);
  });
});
