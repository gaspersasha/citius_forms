export const customEventPolyfill = () => {
  if (typeof window.CustomEvent === 'function') return false;

  const CustomEvent = (event, params) => {
    const config = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined,
    };
    const evt = document.createEvent('CustomEvent');

    evt.initCustomEvent(
      event,
      config.bubbles,
      config.cancelable,
      config.detail
    );

    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
};
