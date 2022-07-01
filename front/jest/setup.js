import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

// helpers
global.wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

/**
 * Fixes Jest console error: "Warning: An update to component inside a test was not wrapped in act(...)."
 * when there is useEffect(() => {}, []) in the component
 * source - https://github.com/airbnb/enzyme/issues/2073
 * Use this in your test after mounting if you want the query to finish and update the wrapper
 */
global.updateWrapper = async (wrapper, amount = 0) => {
  await act(async () => {
    await wait(amount);
    wrapper.update();
  });
};
