# llogaritesi-i-pages-dhe-taksave

Ky mjet ju ndihmon të kuptoni sistemin e taksave në Shqipëri, qoftë si punëmarrës, profesionist i lirë apo influencer.

## Zhvillimi lokal

1. Sigurohuni që keni [Node.js](https://nodejs.org/) të instaluar.
2. Ekzekutoni një herë `npm install` për të shkarkuar varësitë.
3. Nisni serverin zhvillues me `npm run dev` dhe hapni adresën e shfaqur në shfletues.
4. Për një kontroll lokal të paketimit për prodhim mund të përdorni `npm run preview`, i cili shërben përmbajtjen e gjeneruar.

> 💡 Mos e hapni direkt skedarin `index.html`, sepse aplikacioni bazohet në bundler-in e Vite dhe do të ngarkojë asetet vetëm përmes serverit të zhvillimit.

## Ndërtimi për prodhim

Ekzekutoni `npm run build` për të gjeneruar versionin prodhues në dosjen `dist/`. Shërbejeni ose publikojeni këtë direktori (jo rrënjën e repos) në hostin tuaj, në mënyrë që `<script>` në `dist/index.html` të referojë asetet e bundluara (`./assets/index-*.js` dhe `./assets/index-*.css`).

Nëse përdorni një pipeline publikimi automatike, sigurohuni që ajo të marrë përmbajtjen e `dist/` pas komandës `npm run build`. Përmes ngarkimit manual, kopjoni vetëm skedarët e `dist/` tek hosti i zgjedhur.
