# Deploying on Laravel Forge

The site is plain static HTML. The finished pages are committed in `public/`, so the server needs
**no build step, no Node and no PHP**: Forge only has to pull the repository and point Nginx at `public/`.

## 1. Create the site

| Forge setting | Value |
|---|---|
| Domain | your domain, e.g. `openrent.me` (add `www.openrent.me` as an alias if you want it) |
| Project / site type | **Static HTML** (if your Forge only offers PHP types, pick *Generic PHP*; PHP is never used) |
| Web directory | **`/public`** (the Forge default for most types, so usually nothing to change) |
| Zero-downtime deployments | either is fine; on is the Forge default |
| Repository | `larasoft-io/openrent`, branch `main` |
| Composer / npm install, migrations | **off** (there is nothing to install) |

## 2. Deploy script

With zero-downtime deployments (the default), replace the script with:

```bash
$CREATE_RELEASE()

cd $FORGE_RELEASE_DIRECTORY

$ACTIVATE_RELEASE()
```

Without zero-downtime deployments:

```bash
cd $FORGE_SITE_PATH
git pull origin $FORGE_SITE_BRANCH
```

Turn on **Quick deploy** if you want every push to `main` to go live.

## 3. Nginx

Open the site's Nginx configuration in Forge and, inside the `server { … }` block for port 443:

1. Replace the existing `location / { … }` block with:

   ```nginx
   location / {
       try_files $uri $uri/ $uri.html =404;
   }
   ```

2. Replace any existing `error_page 404 …` line (Forge often has `error_page 404 /index.php;`) with:

   ```nginx
   error_page 404 /404.html;
   error_page 500 502 503 504 /500.html;
   ```

3. Optional, for faster repeat visits:

   ```nginx
   location ~* \.(?:css|js|svg|png|jpg|webp|woff2)$ {
       expires 7d;
       add_header Cache-Control "public";
       try_files $uri =404;
   }
   ```

4. Optional, to keep the mock-up out of search engines (all people and figures in it are invented):

   ```nginx
   add_header X-Robots-Tag "noindex, nofollow" always;
   ```

If the config has a `location ~ \.php$ { … }` block, it can stay; no `.php` files exist.

Then enable **SSL** (Let's Encrypt) on the site and press **Deploy now**.

## What you get

- `https://your-domain/` opens the marketing home page (`public/index.html`).
- `https://your-domain/app/` opens the hub linking to every dashboard.
- Every link is relative, so the site works at the domain root (and in a sub-folder too).
- A missing URL anywhere, e.g. `/app/tenant/nope`, shows the styled 404 page with working links.
- Pretty URLs work as a bonus: `/pricing` serves `pricing.html`.

## Changing the pages

Edit the sources in `source/src/`, then rebuild `public/` and commit it:

```bash
cd source
npm ci              # once
npm run publish-site   # builds, checks every link, then replaces ../public with the new build
```

`npm run build` builds into `source/dist/` and checks links without touching `public/`.
