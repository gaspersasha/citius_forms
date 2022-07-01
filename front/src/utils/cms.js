/* eslint-disable no-use-before-define */
// const { NEXT_PUBLIC_DEVELOPMENT: isDev } = process.env;
import { ENV } from '~constants';

const { IS_PROD_ENV, IS_LOCAL_ENV } = ENV;

// args: relative url
export function getInfo(rurl) {
  let ENV_URL = 'https://buyacar.test2.didev.co.uk';

  if (IS_PROD_ENV) ENV_URL = 'https://buyacar.co.uk';
  if (IS_LOCAL_ENV) ENV_URL = '/_cms';
  const middle = IS_LOCAL_ENV ? '' : '/_content_api/v1?url=';
  const url = `${ENV_URL}${middle}${rurl}`;

  return fetch(url)
    .then((res) => res.json())
    .then(parse)
    .catch((err) => {
      console.log(
        `SOMETHING WRONG WITH CMS CONNECTION AT: ${ENV_URL} - ${err}`
      );

      return {
        title: 'BuyaCar: the easy way to get a great car deal',
        page_type: '',
        meta: {
          page_title: 'BuyaCar: the easy way to get a great car deal',
          description: 'Buyacar online with no hussle',
          rights: 'Autovia Group Limited, licensed by Felden',
          twitter: {
            title: 'BuyaCar: the easy way to get a great car deal',
            card: 'photo',
            site: '@buy_a_car',
            url: 'https://website',
          },
        },
      };
    });
}

// input object - Drupal Response
function parse({ Title, PageType, Meta }) {
  return {
    title: Title,
    page_type: PageType,
    meta: {
      page_title: Meta.PageTitle,
      description: Meta.Description,
      rights: Meta.Rights,
      canonical: Meta.Canonical,
      twitter: {
        title: Meta.Twitter.Title,
        card: Meta.Twitter.Card,
        site: Meta.Twitter.Site,
        url: Meta.Twitter.Url,
      },
    },
  };
}
