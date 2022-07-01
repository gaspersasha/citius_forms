import React from 'react';
import PropTypes from 'prop-types';
import { ENV } from '~constants';
import {
  GTM,
  GO,
  Permutive,
  Instana,
  CloudMarketing,
  OptionMonster,
  SourcePoint,
} from '.';

const { IS_PROD_ENV } = ENV;

const GlobalBody = ({ pageType }) => (
  <>
    <script async src="//v038.buyacar.co.uk/script.js" />
    <GTM.GTM_NOJS />
    <GO />
    <Permutive pageType={pageType} />
    {OptionMonster}
    <Instana />
    <CloudMarketing />
    {IS_PROD_ENV && <SourcePoint />}
  </>
);

GlobalBody.propTypes = {
  pageType: PropTypes.string,
};

GlobalBody.defaultProps = {
  pageType: '',
};

export default GlobalBody;
