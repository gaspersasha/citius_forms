/* TODO: suggestion for refactoring in ISSUES on github this project */
/* eslint max-len: ["error", { "ignoreTemplateLiterals": true }] */
export const ampStyles = `
  html, body, div, span,
  h1, h2, h3, h4, h5, h6, p,
  a, img, ul, li, label,
  footer, header, menu, nav {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
  }

  html {
    line-height: 1;
  }

  html {
    line-height: 1.625em;
    font-size: 100%;
    color: #333333;
    font-family: "sofia-pro", sans-serif;
  }

  ol, ul {
    list-style: none;
  }

  header, main,
  menu, section {
    display: block;
  }

  @font-face {
    font-family: 'sofia-pro';
    src:
      url("https://use.typekit.net/af/02ad94/00000000000000003b9b46f3/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"),
      url("https://use.typekit.net/af/02ad94/00000000000000003b9b46f3/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"),
      url("https://use.typekit.net/af/02ad94/00000000000000003b9b46f3/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
    font-display: auto;
    font-style: normal;
    font-weight: 700;
  }
  @font-face {
    font-family: 'sofia-pro';
    src:
      url("https://use.typekit.net/af/ed85d3/00000000000000003b9b46f4/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3") format("woff2"),
      url("https://use.typekit.net/af/ed85d3/00000000000000003b9b46f4/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3") format("woff"),
      url("https://use.typekit.net/af/ed85d3/00000000000000003b9b46f4/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3") format("opentype");
    font-display: auto;
    font-style: italic;
    font-weight: 700;
  }
  @font-face {
    font-family: 'sofia-pro';
    src:
      url("https://use.typekit.net/af/4cc789/00000000000000003b9b46ed/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"),
      url("https://use.typekit.net/af/4cc789/00000000000000003b9b46ed/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"),
      url("https://use.typekit.net/af/4cc789/00000000000000003b9b46ed/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
    font-display: auto;
    font-style: normal;
    font-weight: 400;
  }
  @font-face {
    font-family: 'sofia-pro';
    src:
      url("https://use.typekit.net/af/964ed8/00000000000000003b9b46ee/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3") format("woff2"),
      url("https://use.typekit.net/af/964ed8/00000000000000003b9b46ee/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3") format("woff"),
      url("https://use.typekit.net/af/964ed8/00000000000000003b9b46ee/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3") format("opentype");
    font-display: auto;
    font-style: italic;
    font-weight: 400;
  }

  .page-header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 15px;
    background: #07dda4;
    background: linear-gradient(to right, #03d397 50%, #07dda4 50% 100%);
  }

  .amp-sidebar-mask {
      background: none;
  }

  .menu-toggle {
    position: absolute;
    left: auto;
    right: 0;
    width: 14px;
    height: 12px;
    display: flex;
    flex-direction: column;
    box-sizing: content-box;
    padding: 24px 80px 24px 20px;
    justify-content: space-between;
    transform: rotate(0deg);
    transition: .5s ease-in-out;
    cursor: pointer;
    z-index: 1;
  }

  .menu-toggle:after {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    color: #0f0f26;
    content: "Menu";
  }

  .menu-toggle span:nth-child(1) {
    top: 0px;
    transform-origin: left center;
  }
  .menu-toggle span:nth-child(2) {
    top: 50%;
    transform-origin: left center;
  }
  .menu-toggle span:nth-child(3) {
    top: 100%;
    transform-origin: left center;
  }

  amp-sidebar[open] ~ header .menu-toggle span:nth-child(1) {
    transform: rotate(45deg);
    margin-left: 1px;
  }

  amp-sidebar[open] ~ header .menu-toggle span:nth-child(2) {
    width: 0%;
    margin-left: 50%;
    opacity: 0;
  }

  amp-sidebar[open] ~ header .menu-toggle span:nth-child(3) {
    transform: rotate(-45deg);
    margin-left: 1px;
  }

  .menu-toggle span {
    display: block;
    height: 2px;
    width: 100%;
    border-radius: 9px;
    opacity: 1;
    background-color: #0f0f26;
    margin-left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }

  amp-sidebar {
    top: 60px;
    max-width: 100vw;
    height: unset;
    background-color: #ffffff;
    padding-top: 70px;
    text-align: left;
    box-shadow: 0 0 10px rgb(0 0 0 / 50%);
  }

  header {
    margin-bottom: 0.8125em;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
  }

  header.menu {
    width: 100vw;
    height: 40px;
    background-color: #ffffff;
    padding-right: 0;
    border: 0;
    box-sizing: border-box;
  }

  header.menu:focus {
    outline:0;
  }

  amp-sidebar section:nth-child(6) {
    position: absolute;
    top: -70px;
    height: 55px;
    text-align: center;
  }

  amp-sidebar section:nth-child(6) header {
    height: 55px;
    width: 90vw;
    left: 5vw;
    border-bottom: 1px solid #0f0f26;
  }

  amp-sidebar section:nth-child(6) header a:before {
    content: '';
    width: 19px;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 513.64 513.64'%3E%3Cpath d='M499.66 376.96l-71.68-71.68c-25.6-25.6-69.12-15.359-79.36 17.92-7.68 23.041-33.28 35.841-56.32 30.72-51.2-12.8-120.32-79.36-133.12-133.12-7.68-23.041 7.68-48.641 30.72-56.32 33.28-10.24 43.52-53.76 17.92-79.36l-71.68-71.68c-20.48-17.92-51.2-17.92-69.12 0L18.38 62.08c-48.64 51.2 5.12 186.88 125.44 307.2s256 176.641 307.2 125.44l48.64-48.64c17.921-20.48 17.921-51.2 0-69.12z' fill='%231c1836' data-original='%23000000' xmlns='http://www.w3.org/2000/svg'/%3E%3C/svg%3E");
    background-size: 19px;
    margin-right: 10px;
  }

  amp-sidebar section ul.menu {
    min-width: 60vw;
    list-style: none;
    margin: 0;
  }

  amp-sidebar section ul.menu li.child-element {
    text-align: center;
    background-color: #ffffff;
  }

  amp-sidebar section ul.menu li.child-element a {
    color: #0f0f26;
    border: none;
    text-align: left;
    font-size: 16px;
    padding-left: 30px;
  }

  amp-sidebar section header.i-amp-html-accordion-header a,
  amp-sidebar section header.i-amp-html-accordion-header span {
    display: block;
    height: 40px;
    padding: 5px 15px;
    font-size: 16px;
    color: #0f0f26;
    text-decoration: none;
  }

  amp-sidebar section header.i-amp-html-accordion-header span:focus {
    outline: 0;
  }

  amp-sidebar section ul.menu li a, amp-sidebar section ul.menu li span {
    display: block;
    padding: 5px;
    text-decoration: none;
  }

  amp-sidebar section:nth-child(6) header a {
    height: 55px;
    line-height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  amp-sidebar section header.i-amp-html-accordion-header span:after {
    content: '';
    opacity: 1;
    transition: 0.2s transform, 0.6s opacity;
    border: 3px solid #0f0f26;
    border-bottom: 0;
    border-left: 0;
    width: 8px;
    height: 8px;
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: rotate(135deg);
    box-sizing: border-box;
  }

  amp-sidebar section[expanded] header.menu span:after,
  amp-sidebar section[expanded] ul.menu span:after {
    transform: rotate(315deg);
  }
  amp-sidebar[open] ~ header .menu-toggle:after {
    content: 'Close';
  }

  .separator {
    height: 54px;
    width: 100%;
    backgroundColor: transparent;
  }
`;
