import React from 'react';
import PropTypes from 'prop-types';

const Composer = ({ components, children }) => (
  <>
    {components.reduceRight(
      (acc, Component) => (
        <Component>{acc}</Component>
      ),
      children
    )}
  </>
);

Composer.propTypes = {
  children: PropTypes.node.isRequired,
  components: PropTypes.arrayOf(PropTypes.elementType).isRequired,
};

export default Composer;
