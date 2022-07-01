import React from 'react';
import Modal from '../Modal';

const props = {
  onClose: jest.fn(),
};

describe('Modal container with overlay and close button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Modal {...props}>
        <h4>any component</h4>
        <div>will have dark overlay and close button top right</div>
        <div>
          clicking those fire a<b>onClose</b>
          prop
        </div>
      </Modal>
    );
  });

  it('Basic render of Modal', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Render Modal with dark overlay', () => {
    wrapper = mount(
      <Modal {...props} dark>
        <h4>another title</h4>
        <div>will have dark overlay and close button top right</div>
        <div>
          clicking those fire a<b>onClose</b>
          prop
        </div>
        <button onClick={console.log} type="button">
          CTA
        </button>
      </Modal>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should close Modal window', () => {
    const closeBtn = wrapper.find('svg[data-id="close-button"]');

    closeBtn.simulate('click');
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should close Modal window by click to the overlay', () => {
    const overlay = wrapper.find('div[data-id="overlay"]');

    overlay.simulate('click');

    expect(props.onClose).toHaveBeenCalled();
  });
});
