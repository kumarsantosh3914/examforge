# Deployment

Production runs at **https://examforge.bevritti.in** on a single EC2 instance.

| Item | Value |
| --- | --- |
| Instance | `i-05d0b3a3ddc55c769` (t3.micro, Ubuntu 26.04, ap-south-1), Name tag `examforge` |
| Public IP | Elastic IP `52.66.13.189` (`eipalloc-08cbfbf2fbd95ed7a`) |
| Security group | `sg-0c0fb55c243d6f63b`: 22, 80, 443 open |
| DNS | GoDaddy, `bevritti.in` zone: `A examforge → 52.66.13.189` |
| TLS | Let's Encrypt via `certbot --nginx`; `certbot.timer` renews automatically |
| SSH | `ssh -i dev.pem ubuntu@52.66.13.189` (key pair `dev`) |
| Database | MongoDB Atlas, database `examforge` (dev uses `examforge_dev`) |

## Layout on the server

- App checkout: `/home/ubuntu/examforge` (Node from nvm, currently v24).
- Environment: `/home/ubuntu/examforge/.env.local`, mode 600 — `MONGODB_URI`, `MONGODB_DB=examforge`, `APP_ORIGIN=https://examforge.bevritti.in`, `SESSION_SECRET`, `QUESTION_BANK_DIR=cleaned`, `TRUST_PROXY=true`.
- `examforge.service`: `next start` bound to `127.0.0.1:3000`, restarts on failure, enabled at boot.
- `examforge-expire.timer`: runs `npm run expire` every minute.
- nginx site `/etc/nginx/sites-available/examforge`: proxies to the app, overwrites `X-Forwarded-For` with the client address, HTTP redirects to HTTPS.
- 2 GB swap at `/swapfile` (the build needs it on 1 GB RAM).

## Deploying a new version

```sh
ssh -i dev.pem ubuntu@52.66.13.189
cd ~/examforge && git pull
source ~/.nvm/nvm.sh && npm ci && npm run build
sudo systemctl restart examforge
npm run seed   # only when the question bank changed; idempotent
```

## Checking health

```sh
systemctl status examforge examforge-expire.timer nginx certbot.timer
journalctl -u examforge -n 100 --no-pager
curl -sI https://examforge.bevritti.in
```

## Search engines

The site is indexable: `robots.txt` allows everything except `/api/`, `sitemap.xml` lists the home page, every live exam and every subject page (generated from the database, so new banks appear automatically), and personal pages (`/auth`, `/attempts`, `/results/*`, `/test/*`) send `noindex`. Exam and subject pages are server-rendered with their own titles, descriptions, canonical URLs and share images; unknown exams and subjects return a real 404.

Google Search Console:

1. Add a property. Prefer **Domain** (`bevritti.in`, covers every subdomain) and verify with the DNS TXT record Google shows, added in GoDaddy DNS. Alternatively add a **URL prefix** property for `https://examforge.bevritti.in/`, choose the HTML tag method, put the `content` value in `GOOGLE_SITE_VERIFICATION` in the server's `.env.local`, rebuild and restart.
2. Submit `https://examforge.bevritti.in/sitemap.xml` under Sitemaps.
3. Use URL Inspection on the home page and request indexing.

`APP_ORIGIN` drives canonical URLs, the sitemap and `robots.txt`; it is read at build time for the static files, so rebuild after changing it.
