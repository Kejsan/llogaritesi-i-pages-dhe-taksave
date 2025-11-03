# llogaritesi-i-pages-dhe-taksave

Ky mjet ju ndihmon të kuptoni sistemin e taksave në Shqipëri, qoftë si punëmarrës, profesionist i lirë apo influencer.

> ℹ️  Pas klonimit të projektit, ekzekutoni `npm install` për të rikthyer varësitë lokale, sepse dosja `node_modules/` përjashtohet nga kontrolli i burimit.

## Zhvillimi lokal

1. Sigurohuni që keni [Node.js](https://nodejs.org/) të instaluar.
2. Ekzekutoni një herë `npm install` për të shkarkuar varësitë.
3. Nisni serverin zhvillues me `npm run dev` dhe hapni adresën e shfaqur në shfletues.
4. Për një kontroll lokal të paketimit për prodhim mund të përdorni `npm run preview`, i cili shërben përmbajtjen e gjeneruar.

> 💡 Mos e hapni direkt skedarin `index.html`, sepse aplikacioni bazohet në bundler-in e Vite dhe do të ngarkojë asetet vetëm përmes serverit të zhvillimit.

## Ndërtimi për prodhim

1. Ekzekutoni `npm run build` për të gjeneruar versionin prodhues në dosjen `dist/`.
2. Kryeni një kontroll lokal të paketimit me `npm run preview` për të shërbyer në mënyrë lokale përmbajtjen e gjeneruar dhe për t'u siguruar që `<script>` në `dist/index.html` referon asetet e bundluara (`./assets/index-*.js` dhe `./assets/index-*.css`).
3. Shërbejeni ose publikojeni **vetëm** përmbajtjen e `dist/` (jo rrënjën e repos) në hostin tuaj.

Nëse përdorni një pipeline publikimi automatike (p.sh. GitHub Pages), sigurohuni që ajo të ekzekutojë `npm run build` dhe të publikojë artefaktet e dosjes `dist/`. Përmes ngarkimit manual, kopjoni vetëm skedarët e `dist/` tek hosti i zgjedhur pas verifikimit lokal me `npm run preview`.
