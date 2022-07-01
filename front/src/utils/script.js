export const isNodeExist = (node) => {
  const allScripts = [...document.querySelectorAll('script')];
  const checkEqualNode = allScripts.map((i) => i.isEqualNode(node));

  return checkEqualNode.includes(true);
};

export const generateScriptTag = (scriptPath, scriptId = null, isAsync, cb) => {
  if (!scriptPath) return;

  const { body } = window.document;
  const script = document.createElement('script');

  scriptId && (script.id = scriptId);
  script.src = scriptPath;
  isAsync && (script.async = true);
  cb && (script.onload = cb);
  if (isNodeExist(script)) return;
  body.appendChild(script);
};

export const removeNode = (selector) => {
  const node = document.querySelector(selector);

  if (node && node.parentNode) {
    document.body.removeChild(node.parentNode);
  }
};

export const removeScriptTag = (scriptId, selector) => {
  const script = document.getElementById(scriptId);

  if (selector) {
    removeNode(selector);
  }

  if (script) {
    script.remove();
  }
};
