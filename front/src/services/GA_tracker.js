import { CAMPAIGN_URL_PARAM } from '~constants/urls';

/**
 * Track GA campaign to differentiate users who came from usual search and from special google advertisement campaign.
 * Set session cookie for such users. We will send this track in Soft credit check form.
 */
export const trackGA = () => {
  window.onload = () => {
    const paramKey = CAMPAIGN_URL_PARAM;

    const myUrlParams = new URLSearchParams(window.location.search);
    const isUserCameFromAdvertisement = myUrlParams.has(paramKey);

    if (isUserCameFromAdvertisement) {
      const value = myUrlParams.get(paramKey);

      document.cookie = `${paramKey}=${value}`;
    }
  };
};
