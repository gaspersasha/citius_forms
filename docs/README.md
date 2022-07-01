## development

### in ~/front:
 - `npm i`

### Docker (in root folder):
 - `docker-compose up  --build`

Now all dependencies installed inside container, but changing local files will execute `hot-reload` in browser.

Visit `localhost:`.

After build generated resources are populated in `.next` folder (index.html, *.js, *.css, aswell as *.gz versions).

## BDD
  - `cd bdd/browserstack`
  - `npm i`
  - `npm test`
  - `npm test:tags <@tag> (run only tests with a tag)`
