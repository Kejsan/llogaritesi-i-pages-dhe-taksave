// Nuk ka nevojë për 'import React' pasi ngarkohet globalisht tek index.html

const { useState, useMemo, useEffect } = React;

// --- IKONAT (SVG Inline) ---
// Për të shmangur varësitë e jashtme si lucide-react, përdorim SVG inline
const IconCalculator = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="16" y2="14"></line><line x1="8" y1="18" x2="16" y2="18"></line></svg>
);
const IconUser = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const IconBriefcase = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);
const IconInfo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);
const IconHelp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const IconMail = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
const IconLink = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
);
const IconChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const IconAlertTriangle = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const IconX = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const IconUsers = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const IconSettings = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 .25 1l.01.44a2 2 0 0 1-2 2l-.18.01a2 2 0 0 0-1.73 1l-.25.43a2 2 0 0 0 0 2l.08.15a2 2 0 0 0 .73 2.73l.38.22a2 2 0 0 0 2.73-.73l.1-.15a2 2 0 0 1 1-.25l.43-.01a2 2 0 0 1 2 2v.18a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-.25-1l-.01-.44a2 2 0 0 1 2-2l.18-.01a2 2 0 0 0 1.73-1l.25-.43a2 2 0 0 0 0-2l-.08-.15a2 2 0 0 0-.73-2.73l-.38-.22a2 2 0 0 0-2.73.73l-.1.15a2 2 0 0 1-1 .25l-.43.01a2 2 0 0 1-2-2v-.18a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

// --- INTERNATIONALIZATION (i18n) ---
const translations = {
    sq: {
        // Navigimi
        navEmployee: "Kalkulatori i Pagës",
        navFreelancer: "Kalkulatori Freelancer",
        navInfo: "Si funksionon?",
        navFAQ: "Pyetje të Shpeshta (FAQ)",
        navLinks: "Burime Zyrtare",
        navContact: "Kontakt",
        // Header
        selectCurrency: "Zgjidhni Monedhën",
        // Përgjithshëm
        gross: "Bruto",
        net: "Neto",
        // Llogaritësi i Punonjësit
        employeeTitle: "Kalkulatori i Pagës së Punëmarrësit",
        tapWarning: "**Vërejtje 2025:** Kllapat e Tatimit (TAP) do të ndryshojnë në Janar 2025. Llogaritja është sipas rregullave aktuale 2024.",
        grossMonthlySalary: "Paga Bruto Mujore",
        workingDays: "Ditë pune në muaj",
        grossSalary: "Paga Bruto",
        netSalary: "Paga Neto (Në dorë)",
        employeeDeductions: "Ndalesat e Punonjësit (Sig. + TAP)",
        employerTotalCost: "Kosto Totale e Punëdhënësit",
        dailyGross: "Paga Bruto Ditore",
        dailyNet: "Paga Neto Ditore",
        deductionBreakdown: "Detajet e Zbritjeve & Kostove",
        employeeContributions: "1. Kontributet e Punonjësit (11.2%)",
        employeeTax: "2. Tatimi mbi Pagën (TAP)",
        employerContributionsLabel: "3. Kontributet e Punëdhënësit (16.7%)",
        employerSocial: "Sig. Shoqërore (15.0%)",
        employerHealth: "Sig. Shëndetësore (1.7%)",
        maxContributionBase: "Baza Maksimale e Kontributeve",
        // Llogaritësi i Freelancer
        freelancerTitle: "Llogaritësi i Detyrimeve (Profesionist i Lirë)",
        legislativeWarning: "VËREJTJE LEGJISLATIVE (2024-2025):",
        legislativeWarningText: "Kllapa e tatimit 15% (për fitimin neto deri në 14 milionë ALL) u shpall **jokushtetuese** në Qershor 2024. Qeveria po përgatit një skemë të re. Ky kalkulator reflekton rregullat më të përditësuara por shkalla e tatimit 0-14M ALL mbetet e paqartë.",
        grossAnnualTurnover: "Xhiro Bruto Vjetore",
        expenseMethod: "Metoda e Shpenzimeve",
        presumedExpenses: "30% Shpenzime të Supozuara",
        actualExpenses: "Shpenzime Aktuale (Kontabilitet)",
        grossAnnualTurnoverCard: "Xhiro Bruto Vjetore",
        netAnnualIncome: "Të Ardhurat Neto (Pas Detyrimeve)",
        obligationBreakdown: "Detajet e Detyrimeve",
        calculatedExpenses: "Shpenzimet e Llogaritura",
        annualContributions: "Kontributet Vjetore (27.9% mbi Pagën Min.)",
        taxableProfit: "Fitimi i Tatueshëm",
        incomeTax: "Tatimi mbi Fitimin",
        taxRateUsed: "Shkalla e Tatimit e Përdorur",
        taxStatusUncertain: "0% Tatim (Status i paqartë pas vendimit të GJK)",
        taxStatusHigh: (threshold) => `23% Tatim mbi fitimin neto mbi ${threshold}`,
        legalObligations: "Detyrimet Themelore Ligjore",
        vatObligation: "Detyrimi për TVSH (VAT):",
        vatYes: (threshold) => `PO (Mbi ${threshold} ALL)`,
        vatNo: (threshold) => `JO (Nën ${threshold} ALL)`,
        divaObligation: "Detyrimi për Deklaratën Vjetore (DIVA):",
        divaYes: (threshold) => `PO (Mbi ${threshold})`,
        divaNo: "JO",
        foreignClients: "Klientët e Huaj:",
        foreignClientsText: "Të ardhurat nga klientët e huaj janë **të tatueshme** në Shqipëri. Ju duhet të lëshoni faturë të fiskalizuar dhe t'i përfshini në xhiron tuaj vjetore.",
        // Info Seksioni
        infoTitle: "Si funksionon Kalkulatori?",
        infoIntro: "Ky mjet ju ndihmon të kuptoni sistemin e taksave në Shqipëri, qoftë si punëmarrës apo si profesionist i lirë. Më poshtë gjeni një shpjegim të thjeshtë të termave kryesorë.",
        infoGrossNetTitle: "Paga Bruto vs. Paga Neto (Për Punëmarrësit)",
        infoGrossNetText: "<strong>Paga Bruto</strong> është shuma totale për të cilën bini dakord me punëdhënësin përpara çdo zbritjeje. <strong>Paga Neto</strong> (ose 'në dorë') është shuma që merrni në llogarinë tuaj bankare pasi të jenë mbajtur kontributet dhe tatimet.",
        infoContributionsTitle: "Kontributet Shoqërore dhe Shëndetësore",
        infoContributionsText: "Këto janë pagesa të detyrueshme për të financuar pensionin tuaj dhe kujdesin shëndetësor publik. Si punonjës, ju paguani <strong>11.2%</strong> të pagës suaj (por jo më shumë se paga maksimale e vlerësueshme, 176,416 ALL). Punëdhënësi juaj paguan <strong>16.7%</strong> shtesë mbi pagën tuaj bruto. Kjo është arsyeja pse <strong>Kostoja Totale e Punëdhënësit</strong> është më e lartë se paga juaj bruto.",
        infoTapTitle: "Tatimi mbi të Ardhurat Personale (TAP)",
        infoTapText: "Ky është tatimi progresiv mbi pagën. Në Shqipëri, shkalla rritet ndërsa të ardhurat rriten. Për vitin 2024, paga nën 40,000 ALL/muaj nuk tatohet. Pjesa e pagës mbi 30,000 ALL deri në 200,000 ALL tatohet me <strong>13%</strong>, dhe çdo shumë mbi 200,000 ALL tatohet me <strong>23%</strong>. Kjo pritet të ndryshojë në 2025.",
        infoFreelancerTitle: "Profesionistët e Lirë (Freelancer)",
        infoFreelancerText: "Si profesionist i lirë (person fizik me NIPT), ju jeni vetë përgjegjës për pagimin e kontributeve dhe tatimeve. Ju paguani vetë të dyja pjesët e kontributeve (<strong>27.9%</strong> e pagës minimale, ose më shumë). Tatimi mbi fitimin neto vjetor është aktualisht në një periudhë tranzicioni ligjor (shih paralajmërimin në kalkulator).",
        // FAQ Seksioni
        faqTitle: "Pyetje të Shpeshta (FAQ)",
        faq1Title: "Sa janë pushimet vjetore të paguara?",
        faq1Text: "Sipas ndryshimit të fundit të Kodit të Punës (Gusht 2024), çdo punëmarrës ka të drejtën e një minimumi prej **22 ditë pune** pushim vjetor të paguar (më parë ishin 4 javë kalendarike).",
        faq2Title: "Çfarë është baza maksimale e kontributeve?",
        faq2Text: "Është kufiri i sipërm i pagës mbi të cilin llogariten kontributet. Për vitin 2024, kjo shumë është **176,416 ALL**. Nëse paga juaj bruto është 200,000 ALL, ju do të paguani kontribute vetëm për 176,416 ALL. Tatimi (TAP), megjithatë, llogaritet mbi të gjithë shumën bruto (200,000 ALL).",
        faq3Title: "Çfarë po ndodh me taksën e profesionistëve të lirë?",
        faq3Text: "Në Qershor 2024, Gjykata Kushtetuese shfuqizoi shkallën 15% të tatimit mbi fitimin neto për profesionistët e lirë (për të ardhura 0-14 milionë ALL/vit). Shkalla 23% për fitimin mbi 14 milionë ALL mbetet në fuqi. Aktualisht, ka një boshllëk ligjor dhe pritet një skemë e re nga qeveria për vitin 2025. Ky kalkulator supozon 0% tatim për shkallën e parë deri në miratimin e ligjit të ri.",
        faq4Title: "A duhet të paguaj TVSH si profesionist i lirë?",
        faq4Text: "Ju duhet të regjistroheni si përgjegjës i TVSH-së vetëm nëse xhiroja juaj vjetore i kalon **10,000,000 ALL**.",
        faq5Title: "A duhet të lëshoj faturë për klientët e huaj?",
        faq5Text: "Po. Të gjitha të ardhurat, pavarësisht nëse vijnë nga klientë vendas apo të huaj, duhet të deklarohen dhe të fiskalizohen. Ato janë pjesë e xhiros suaj vjetore dhe janë të tatueshme në Shqipëri.",
        // Links Seksioni
        linksTitle: "Burime Zyrtare & Lidhje të Dobishme",
        linksDpt: "Drejtoria e Përgjithshme e Tatimeve (DPT)",
        linksQkb: "Qendra Kombëtare e Biznesit (QKB)",
        linksKodiPunes: "Kodi i Punës (Tekst i plotë)",
        linksSigurime: "Instituti i Sigurimeve Shoqërore (ISSH)",
        // Footer
        footerCreatedBy: "Krijuar nga Kejsan Coku",
        footerCopyright: "© 2025. Të gjitha të drejtat e rezervuara. Ky mjet ofrohet vetëm për qëllime informimi.",
    },
    en: {
        // Navigation
        navEmployee: "Salary Calculator",
        navFreelancer: "Freelancer Calculator",
        navInfo: "How does it work?",
        navFAQ: "Frequently Asked Questions (FAQ)",
        navLinks: "Official Resources",
        navContact: "Contact",
        // Header
        selectCurrency: "Select Currency",
        // General
        gross: "Gross",
        net: "Net",
        // Employee Calculator
        employeeTitle: "Employee Salary Calculator",
        tapWarning: "**2025 Warning:** The Payroll Tax (TAP) brackets will change in January 2025. This calculation uses the current 2024 rules.",
        grossMonthlySalary: "Gross Monthly Salary",
        workingDays: "Working days per month",
        grossSalary: "Gross Salary",
        netSalary: "Net Salary (Take-Home)",
        employeeDeductions: "Employee Deductions (Ins. + Tax)",
        employerTotalCost: "Total Employer Cost",
        dailyGross: "Daily Gross Salary",
        dailyNet: "Daily Net Salary",
        deductionBreakdown: "Deduction & Cost Breakdown",
        employeeContributions: "1. Employee Contributions (11.2%)",
        employeeTax: "2. Payroll Income Tax (TAP)",
        employerContributionsLabel: "3. Employer Contributions (16.7%)",
        employerSocial: "Social Ins. (15.0%)",
        employerHealth: "Health Ins. (1.7%)",
        maxContributionBase: "Max. Contribution Base",
        // Freelancer Calculator
        freelancerTitle: "Freelancer Obligation Calculator",
        legislativeWarning: "LEGISLATIVE WARNING (2024-2025):",
        legislativeWarningText: "The 15% tax bracket (for net profit up to 14M ALL) was ruled **unconstitutional** in June 2024. The government is preparing a new scheme. This calculator reflects the latest data, but the 0-14M ALL tax rate remains uncertain.",
        grossAnnualTurnover: "Gross Annual Turnover",
        expenseMethod: "Expense Method",
        presumedExpenses: "30% Presumed Expenses",
        actualExpenses: "Actual Expenses (Bookkeeping)",
        grossAnnualTurnoverCard: "Gross Annual Turnover",
        netAnnualIncome: "Net Annual Income (After Obligations)",
        obligationBreakdown: "Obligation Breakdown",
        calculatedExpenses: "Calculated Expenses",
        annualContributions: "Annual Contributions (27.9% on Min. Wage)",
        taxableProfit: "Taxable Profit",
        incomeTax: "Income Tax",
        taxRateUsed: "Tax Rate Used",
        taxStatusUncertain: "0% Tax (Status unclear after court ruling)",
        taxStatusHigh: (threshold) => `23% Tax on net profit above ${threshold}`,
        legalObligations: "Core Legal Obligations",
        vatObligation: "VAT Obligation:",
        vatYes: (threshold) => `YES (Over ${threshold} ALL)`,
        vatNo: (threshold) => `NO (Under ${threshold} ALL)`,
        divaObligation: "Annual Declaration (DIVA) Obligation:",
        divaYes: (threshold) => `YES (Over ${threshold})`,
        divaNo: "NO",
        foreignClients: "Foreign Clients:",
        foreignClientsText: "Income from foreign clients is **taxable** in Albania. You must issue a fiscalized invoice and include it in your annual turnover.",
        // Info Section
        infoTitle: "How does the Calculator work?",
        infoIntro: "This tool helps you understand the tax system in Albania, whether as an employee or a freelancer. Below is a simple explanation of the key terms.",
        infoGrossNetTitle: "Gross Salary vs. Net Salary (For Employees)",
        infoGrossNetText: "<strong>Gross Salary</strong> is the total amount agreed upon with your employer before any deductions. <strong>Net Salary</strong> (or 'take-home' pay) is the amount you receive in your bank account after contributions and taxes are withheld.",
        infoContributionsTitle: "Social and Health Contributions",
        infoContributionsText: "These are mandatory payments to fund your pension and public healthcare. As an employee, you pay <strong>11.2%</strong> of your salary (up to the maximum assessable wage, 176,416 ALL). Your employer pays an additional <strong>16.7%</strong> on top of your gross salary. This is why the <strong>Total Employer Cost</strong> is higher than your gross salary.",
        infoTapTitle: "Personal Income Tax (TAP)",
        infoTapText: "This is the progressive tax on your salary. In Albania, the rate increases as income increases. For 2024, income below 40,000 ALL/month is not taxed. The portion of salary from 30,000 ALL to 200,000 ALL is taxed at <strong>13%</strong>, and any amount over 200,000 ALL is taxed at <strong>23%</strong>. This is expected to change in 2025.",
        infoFreelancerTitle: "Free Professionals (Freelancers)",
        infoFreelancerText: "As a freelancer (physical person with a NIPT), you are responsible for paying your own contributions and taxes. You pay both parts of the contributions (<strong>27.9%</strong> of the minimum wage, or more). The tax on annual net profit is currently in a legal transition period (see warning on the calculator).",
        // FAQ Section
        faqTitle: "Frequently Asked Questions (FAQ)",
        faq1Title: "How much paid annual leave do I get?",
        faq1Text: "According to the latest change in the Labor Code (August 2024), every employee is entitled to a minimum of **22 working days** of paid annual leave (it was previously 4 calendar weeks).",
        faq2Title: "What is the maximum contribution base?",
        faq2Text: "It's the upper limit of salary on which contributions are calculated. For 2024, this amount is **176,416 ALL**. If your gross salary is 200,000 ALL, you will only pay contributions on 176,416 ALL. The Income Tax (TAP), however, is calculated on the full gross amount (200,000 ALL).",
        faq3Title: "What is happening with the freelancer tax?",
        faq3Text: "In June 2024, the Constitutional Court repealed the 15% tax rate on net profit for freelancers (for income 0-14 million ALL/year). The 23% rate for profit over 14 million ALL remains in effect. There is currently a legal vacuum, and a new scheme is expected from the government for 2025. This calculator assumes a 0% tax for the first bracket until the new law is passed.",
        faq4Title: "Do I have to register for VAT as a freelancer?",
        faq4Text: "You only need to register for VAT (TVSH) if your annual turnover exceeds **10,000,000 ALL**.",
        faq5Title: "Do I have to invoice foreign clients?",
        faq5Text: "Yes. All income, whether from local or foreign clients, must be declared and fiscalized. It is part of your annual turnover and is taxable in Albania.",
        // Links Section
        linksTitle: "Official Resources & Useful Links",
        linksDpt: "General Directorate of Taxes (DPT)",
        linksQkb: "National Business Center (QKB)",
        linksKodiPunes: "Labor Code (Full Text)",
        linksSigurime: "Social Insurance Institute (ISSH)",
        // Footer
        footerCreatedBy: "Created by Kejsan Coku",
        footerCopyright: "© 2024. All rights reserved. This tool is for informational purposes only.",
    },
    it: {
        // Navigazione
        navEmployee: "Calcolatore Stipendio",
        navFreelancer: "Calcolatore Freelancer",
        navInfo: "Come funziona?",
        navFAQ: "Domande Frequenti (FAQ)",
        navLinks: "Risorse Ufficiali",
        navContact: "Contatti",
        // Header
        selectCurrency: "Seleziona Valuta",
        // Generale
        gross: "Lordo",
        net: "Netto",
        // Calcolatore Dipendente
        employeeTitle: "Calcolatore Stipendio Dipendente",
        tapWarning: "**Avviso 2025:** Le aliquote dell'imposta sul reddito (TAP) cambieranno a gennaio 2025. Questo calcolo utilizza le regole attuali del 2024.",
        grossMonthlySalary: "Stipendio Lordo Mensile",
        workingDays: "Giorni lavorativi al mese",
        grossSalary: "Stipendio Lordo",
        netSalary: "Stipendio Netto (In tasca)",
        employeeDeductions: "Trattenute Dipendente (Contr. + Tasse)",
        employerTotalCost: "Costo Totale Datore di Lavoro",
        dailyGross: "Stipendio Lordo Giornaliero",
        dailyNet: "Stipendio Netto Giornaliero",
        deductionBreakdown: "Dettaglio Trattenute e Costi",
        employeeContributions: "1. Contributi Dipendente (11.2%)",
        employeeTax: "2. Imposta sul Reddito (TAP)",
        employerContributionsLabel: "3. Contributi Datore di Lavoro (16.7%)",
        employerSocial: "Contr. Sociali (15.0%)",
        employerHealth: "Contr. Sanitari (1.7%)",
        maxContributionBase: "Base Contributiva Massima",
        // Calcolatore Freelancer
        freelancerTitle: "Calcolatore Obblighi (Libero Professionista)",
        legislativeWarning: "AVVISO LEGISLATIVO (2024-2025):",
        legislativeWarningText: "L'aliquota fiscale del 15% (per profitti netti fino a 14M ALL) è stata dichiarata **incostituzionale** a giugno 2024. Il governo sta preparando un nuovo schema. Questo calcolatore riflette i dati più recenti, ma l'aliquota 0-14M ALL rimane incerta.",
        grossAnnualTurnover: "Fatturato Lordo Annuo",
        expenseMethod: "Metodo di Spesa",
        presumedExpenses: "30% Spese Forfettarie",
        actualExpenses: "Spese Effettive (Contabilità)",
        grossAnnualTurnoverCard: "Fatturato Lordo Annuo",
        netAnnualIncome: "Reddito Netto (Dopo Obblighi)",
        obligationBreakdown: "Dettaglio Obblighi",
        calculatedExpenses: "Spese Calcolate",
        annualContributions: "Contributi Annuali (27.9% su Sal. Min.)",
        taxableProfit: "Utile Imponibile",
        incomeTax: "Imposta sul Reddito",
        taxRateUsed: "Aliquota Fiscale Utilizzata",
        taxStatusUncertain: "0% Tasse (Status incerto post-sentenza)",
        taxStatusHigh: (threshold) => `23% Tasse sull'utile netto sopra ${threshold}`,
        legalObligations: "Obblighi Legali Fondamentali",
        vatObligation: "Obbligo IVA (TVSH):",
        vatYes: (threshold) => `SÌ (Sopra ${threshold} ALL)`,
        vatNo: (threshold) => `NO (Sotto ${threshold} ALL)`,
        divaObligation: "Obbligo Dichiarazione Annuale (DIVA):",
        divaYes: (threshold) => `SÌ (Sopra ${threshold})`,
        divaNo: "NO",
        foreignClients: "Clienti Esteri:",
        foreignClientsText: "I redditi da clienti esteri sono **tassabili** in Albania. È necessario emettere una fattura fiscalizzata e includerla nel fatturato annuale.",
        // Info Sezione
        infoTitle: "Come funziona il Calcolatore?",
        infoIntro: "Questo strumento ti aiuta a capire il sistema fiscale albanese, sia come dipendente che come libero professionista. Di seguito una semplice spiegazione dei termini chiave.",
        infoGrossNetTitle: "Stipendio Lordo vs. Stipendio Netto (Per Dipendenti)",
        infoGrossNetText: "Lo <strong>Stipendio Lordo</strong> è l'importo totale concordato con il datore di lavoro prima di qualsiasi detrazione. Lo <strong>Stipendio Netto</strong> (o 'in tasca') è l'importo che ricevi sul tuo conto bancario dopo che sono stati trattenuti contributi e tasse.",
        infoContributionsTitle: "Contributi Sociali e Sanitari",
        infoContributionsText: "Questi sono pagamenti obbligatori per finanziare la tua pensione e l'assistenza sanitaria pubblica. Come dipendente, paghi l'<strong>11.2%</strong> del tuo stipendio (fino al massimale imponibile di 176,416 ALL). Il tuo datore di lavoro paga un ulteriore <strong>16.7%</strong> in aggiunta al tuo stipendio lordo. Questo è il motivo per cui il <strong>Costo Totale del Datore di Lavoro</strong> è superiore al tuo stipendio lordo.",
        infoTapTitle: "Imposta sul Reddito delle Persone Fisiche (TAP)",
        infoTapText: "Questa è l'imposta progressiva sul tuo stipendio. In Albania, l'aliquota aumenta con l'aumentare del reddito. Per il 2024, il reddito inferiore a 40,000 ALL/mese non è tassato. La porzione di stipendio da 30,000 ALL a 200,000 ALL è tassata al <strong>13%</strong>, e qualsiasi importo superiore a 200,000 ALL è tassato al <strong>23%</strong>. Si prevede che questo cambi nel 2025.",
        infoFreelancerTitle: "Liberi Professionisti (Freelancer)",
        infoFreelancerText: "Come libero professionista (persona fisica con NIPT), sei responsabile del pagamento dei tuoi contributi e tasse. Paghi entrambe le parti dei contributi (<strong>27.9%</strong> del salario minimo, o più). L'imposta sul profitto netto annuale è attualmente in un periodo di transizione legale (vedi avviso sul calcolatore).",
        // FAQ Sezione
        faqTitle: "Domande Frequenti (FAQ)",
        faq1Title: "Quanti giorni di ferie annuali pagate mi spettano?",
        faq1Text: "Secondo l'ultima modifica al Codice del Lavoro (Agosto 2024), ogni dipendente ha diritto a un minimo di **22 giorni lavorativi** di ferie annuali pagate (in precedenza erano 4 settimane di calendario).",
        faq2Title: "Cos'è la base contributiva massima?",
        faq2Text: "È il limite superiore dello stipendio su cui vengono calcolati i contributi. Per il 2024, questo importo è **176,416 ALL**. Se il tuo stipendio lordo è 200,000 ALL, pagherai i contributi solo su 176,416 ALL. L'Imposta sul Reddito (TAP), tuttavia, è calcolata sull'intero importo lordo (200,000 ALL).",
        faq3Title: "Cosa sta succedendo con la tassa per i liberi professionisti?",
        faq3Text: "Nel giugno 2024, la Corte Costituzionale ha abrogato l'aliquota fiscale del 15% sull'utile netto per i liberi professionisti (per redditi 0-14 milioni ALL/anno). L'aliquota del 23% per profitti superiori a 14 milioni ALL rimane in vigore. Attualmente c'è un vuoto legislativo e si attende un nuovo schema dal governo per il 2025. Questo calcolatore assume un'imposta dello 0% per la prima fascia fino all'approvazione della nuova legge.",
        faq4Title: "Devo registrarmi per l'IVA (TVSH) come libero professionista?",
        faq4Text: "Devi registrarti ai fini IVA solo se il tuo fatturato annuo supera i **10,000,000 ALL**.",
        faq5Title: "Devo fatturare ai clienti stranieri?",
        faq5Text: "Sì. Tutti i redditi, sia da clienti locali che stranieri, devono essere dichiarati e fiscalizzati. Fanno parte del tuo fatturato annuo e sono tassabili in Albania.",
        // Links Sezione
        linksTitle: "Risorse Ufficiali e Link Utili",
        linksDpt: "Direzione Generale delle Tasse (DPT)",
        linksQkb: "Centro Nazionale delle Imprese (QKB)",
        linksKodiPunes: "Codice del Lavoro (Testo completo)",
        linksSigurime: "Istituto delle Assicurazioni Sociali (ISSH)",
        // Footer
        footerCreatedBy: "Creato da Kejsan Coku",
        footerCopyright: "© 2024. Tutti i diritti riservati. Questo strumento è fornito solo a scopo informativo.",
    }
};


// --- DATA CONSTANTS (Përditësuar me normat e Punëdhënësit) ---

const CORE_CONSTANTS = {
    PagaMinimale: 40000,
    PagaMaksimale: 176416,
    ShkallaSigSocEmployee: 0.095, // 9.5%
    ShkallaSigShendetEmployee: 0.017, // 1.7%
    TotalEmployeeContributionRate: 0.112, // 11.2%
    
    ShkallaSigSocEmployer: 0.15, // 15%
    ShkallaSigShendetEmployer: 0.017, // 1.7%
    TotalEmployerContributionRate: 0.167, // 16.7%

    TotalSelfEmployedRate: 0.279, // 11.2% + 16.7%
    PresumedExpenseRate: 0.30, // 30% për freelancerët
    IncomeThresholdDIVA: 1200000,
    VatThreshold: 10000000,
};

// Kllapat e TAP 2024
const TAP_BRACKETS_2024 = [
    { min: 0, max: 40000, rate: 0, deduction: 0, fixedTax: 0 },
    // Kujdes: Tatimi 13% llogaritet mbi diferencën (Paga - 30,000)
    { min: 40001, max: 200000, rate: 0.13, deduction: 30000, fixedTax: 0 },
    // Kujdes: Tatimi 23% llogaritet si 22,100 + 23% e (Paga - 200,000)
    { min: 200001, max: Infinity, rate: 0.23, deduction: 200000, fixedTax: 22100 }
];

// Normat e Tatimit për Profesionistët e Lirë
const FREE_PROF_TAX_RATES = {
    AnnualThreshold1: 14000000,
    RateHigh: 0.23,
    RateLow: 0.15, // E shpallur jokushtetuese në Qershor 2024
};

// --- FUNKSIONET NDIHMËSE ---

// Formaton numrin si monedhë ALL pa presje dhjetore
const formatALL = (value) => {
    return new Intl.NumberFormat('sq-AL', {
        style: 'currency',
        currency: 'ALL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

// Formaton monedhën bazuar në zgjedhjen e përdoruesit
const formatCurrency = (value, currency, rates) => {
    const rate = rates[currency] || 1;
    const convertedValue = value / rate;
    
    return new Intl.NumberFormat(currency === 'ALL' ? 'sq-AL' : (currency === 'USD' ? 'en-US' : 'de-DE'), {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(convertedValue);
};

// --- LOGJIKA KRYESORE E LLOGARITJES ---

// Llogaritjet për Punëmarrësin
const calculateEmployeeTax = (grossMonthlySalary) => {
    // 1. Përcakto bazën e kontributeve
    let contributionBase = Math.min(grossMonthlySalary, CORE_CONSTANTS.PagaMaksimale);
    contributionBase = Math.max(contributionBase, CORE_CONSTANTS.PagaMinimale); 
    
    // 2. Kontributet e Punonjësit
    const employeeSocial = contributionBase * CORE_CONSTANTS.ShkallaSigSocEmployee;
    const employeeHealth = contributionBase * CORE_CONSTANTS.ShkallaSigShendetEmployee;
    const totalEmployeeContributions = employeeSocial + employeeHealth;

    // 3. Kontributet e Punëdhënësit
    const employerSocial = contributionBase * CORE_CONSTANTS.ShkallaSigSocEmployer;
    const employerHealth = contributionBase * CORE_CONSTANTS.ShkallaSigShendetEmployer;
    const totalEmployerContributions = employerSocial + employerHealth;

    // 4. Tatimi mbi të Ardhurat (TAP)
    let taxAmount = 0;
    
    if (grossMonthlySalary > 200000) {
        taxAmount = TAP_BRACKETS_2024[2].fixedTax + (grossMonthlySalary - TAP_BRACKETS_2024[2].deduction) * TAP_BRACKETS_2024[2].rate;
    } else if (grossMonthlySalary > 40000) {
         // Kujdes: Për 40,001-50,000, zbritja është (Paga - 30,000) * 13%
         // Kjo vlen edhe për 50,001-200,000
        taxAmount = (grossMonthlySalary - TAP_BRACKETS_2024[1].deduction) * TAP_BRACKETS_2024[1].rate;
    }
    
    taxAmount = Math.max(0, taxAmount);

    // 5. Paga Neto & Kostot Totale
    const totalEmployeeDeductions = totalEmployeeContributions + taxAmount;
    const netSalary = grossMonthlySalary - totalEmployeeDeductions;
    const totalEmployerCost = grossMonthlySalary + totalEmployerContributions;

    return {
        grossSalary: grossMonthlySalary,
        netSalary,
        employeeSocial,
        employeeHealth,
        totalEmployeeContributions,
        taxAmount,
        totalEmployeeDeductions,
        employerSocial,
        employerHealth,
        totalEmployerContributions,
        totalEmployerCost,
        contributionBase,
    };
};

// Llogaritjet për Profesionistin e Lirë
const calculateFreeProfTax = (grossAnnualTurnover, expenseMethod, actualExpenses = 0) => {
    // 1. Llogarit shpenzimet e zbritshme
    let deductibleExpenses;
    let profitBeforeSocial;

    if (expenseMethod === 'presumed') {
        deductibleExpenses = grossAnnualTurnover * CORE_CONSTANTS.PresumedExpenseRate;
    } else { 
        deductibleExpenses = actualExpenses;
    }
    profitBeforeSocial = grossAnnualTurnover - deductibleExpenses;


    // 2. Kontributet Shoqërore & Shëndetësore (Të vetëpunësuarit)
    // Të bazuara në pagën minimale, të paguara 12 herë në vit.
    const annualMinWageContributions = (CORE_CONSTANTS.PagaMinimale * CORE_CONSTANTS.TotalSelfEmployedRate) * 12;
    
    // 3. Fitimi i Tatueshëm
    // Kontributet konsiderohen shpenzim i zbritshëm.
    const taxableProfit = Math.max(0, profitBeforeSocial - annualMinWageContributions);

    // 4. Tatimi mbi Fitimin
    let taxAmount = 0;
    let isUncertain = false;

    if (taxableProfit > FREE_PROF_TAX_RATES.AnnualThreshold1) {
        const amountOverThreshold = taxableProfit - FREE_PROF_TAX_RATES.AnnualThreshold1;
        // Llogaritja POST-vendimit të GJK (supozon 0% për shkallën 0-14M)
        taxAmount = amountOverThreshold * FREE_PROF_TAX_RATES.RateHigh;
        isUncertain = true; 
    } else if (taxableProfit > 0) {
        // Kjo është kllapa 0-14M ALL e shpallur jokushtetuese.
        taxAmount = 0;
        isUncertain = true;
    }

    // 5. Të Ardhurat Neto Vjetore
    const netAnnualIncome = profitBeforeSocial - annualMinWageContributions - taxAmount;
    
    const requiresDIVA = grossAnnualTurnover > CORE_CONSTANTS.IncomeThresholdDIVA;
    const requiresVAT = grossAnnualTurnover > CORE_CONSTANTS.VatThreshold;

    return {
        grossAnnualTurnover,
        deductibleExpenses,
        annualMinWageContributions,
        taxableProfit,
        taxAmount,
        netAnnualIncome,
        requiresDIVA,
        requiresVAT,
        isUncertain,
    };
};


// --- KOMPONENTËT UI ---

const Sidebar = ({ activePage, setActivePage, t }) => {
    const navItems = [
        { id: 'employee', label: t.navEmployee, icon: <IconUser /> },
        { id: 'freelancer', label: t.navFreelancer, icon: <IconBriefcase /> },
        { id: 'info', label: t.navInfo, icon: <IconInfo /> },
        { id: 'faq', label: t.navFAQ, icon: <IconHelp /> },
        { id: 'links', label: t.navLinks, icon: <IconLink /> },
        { id: 'contact', label: t.navContact, icon: <IconMail /> },
    ];

    return (
        <aside className="w-64 bg-brand-navy text-white p-6 hidden lg:flex flex-col flex-shrink-0 min-h-screen sticky top-0">
            <div className="flex items-center space-x-3 mb-10">
                <div className="bg-brand-cyan p-2 rounded-lg">
                    <IconCalculator />
                </div>
                <span className="text-xl font-bold">Llogaritësi.al</span>
            </div>
            <nav className="flex-grow">
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActivePage(item.id)}
                                className={`flex items-center w-full space-x-3 p-3 rounded-lg transition-all duration-200 ${
                                    activePage === item.id 
                                    ? 'bg-brand-cyan text-white' 
                                    : 'hover:bg-white/10'
                                }`}
                            >
                                {item.icon}
                                <span className="font-semibold">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

const Header = ({ lang, setLang, currency, setCurrency, t }) => {
    return (
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
            <div className="flex justify-end items-center space-x-4">
                <CurrencySelector currency={currency} setCurrency={setCurrency} t={t} />
                <LanguageSelector lang={lang} setLang={setLang} />
            </div>
        </header>
    );
};

const LanguageSelector = ({ lang, setLang }) => {
    const languages = [
        { code: 'sq', flag: '🇦🇱' },
        { code: 'en', flag: '🇬🇧' },
        { code: 'it', flag: '🇮🇹' },
    ];
    return (
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {languages.map(l => (
                <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`px-3 py-1.5 rounded-md text-sm font-semibold flex items-center transition-all duration-200 ${
                        lang === l.code
                            ? 'bg-white text-brand-cyan shadow'
                            : 'text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    <span className="mr-2">{l.flag}</span>
                    {l.code.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

const CurrencySelector = ({ currency, setCurrency, t }) => {
    const currencies = ['ALL', 'EUR', 'USD'];
    return (
        <div>
            <label htmlFor="currency" className="sr-only">{t.selectCurrency}</label>
            <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-gray-100 border-none p-2.5 rounded-lg text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-brand-cyan"
            >
                {currencies.map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
        </div>
    );
};

const Footer = ({ t }) => (
    <footer className="bg-brand-navy text-white p-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="mb-2 md:mb-0">{t.footerCopyright}</p>
            <p>
                {t.footerCreatedBy} - <a 
                    href="https://kejsan-coku.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-cyan hover:underline"
                >
                    kejsan-coku.netlify.app
                </a>
            </p>
        </div>
    </footer>
);

const ResultCard = ({ title, value, currency, rates, isNet = false }) => (
    <div className={`p-4 rounded-xl shadow-md ${isNet ? 'bg-brand-cyan' : 'bg-brand-navy'} text-white`}>
        <div className="text-sm font-medium opacity-90">{title}</div>
        <div className={`text-3xl font-bold`}>
            {formatCurrency(value, currency, rates)}
        </div>
    </div>
);

const SectionTitle = ({ icon: Icon, title }) => (
    <h2 className="text-2xl font-bold text-brand-navy mb-5 flex items-center border-b border-gray-200 pb-3">
        <Icon className="w-7 h-7 mr-3 text-brand-cyan" />
        {title}
    </h2>
);

const InfoAlert = ({ title, children, type = 'info' }) => {
    let colors = {
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-400',
            icon: 'text-blue-600',
            IconComp: IconInfo
        },
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-400',
            icon: 'text-yellow-600',
            IconComp: IconAlertTriangle
        }
    }[type];

    return (
        <div className={`p-4 mb-6 rounded-xl border-l-4 ${colors.border} ${colors.bg}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <colors.IconComp className={`w-5 h-5 ${colors.icon}`} />
                </div>
                <div className="ml-3">
                    <p className="font-bold text-gray-800">{title}</p>
                    <div className="text-sm mt-1 text-gray-700" dangerouslySetInnerHTML={{ __html: children }} />
                </div>
            </div>
        </div>
    );
};

const InputGroup = ({ label, value, onChange, placeholder, currency, isAnnual = false }) => (
    <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
        </label>
        <div className="relative rounded-lg shadow-sm">
            <input
                type="number"
                min="0"
                step="100"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-4 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-brand-cyan focus:border-brand-cyan text-xl"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-base font-semibold">{currency}</span>
            </div>
        </div>
    </div>
);

// --- LLOGARITËSI I PUNONJËSIT ---

const EmployeeCalculator = ({ t, currency, rates }) => {
    const [inputValue, setInputValue] = useState(74010);
    const [workingDays, setWorkingDays] = useState(22);
    const [showAlert, setShowAlert] = useState(true);

    // Gjithmonë konverto inputin në ALL për llogaritje
    const grossSalaryALL = useMemo(() => {
        return inputValue * (rates[currency] || 1);
    }, [inputValue, currency, rates]);

    const handleSalaryChange = (e) => {
        const value = e.target.value;
        setInputValue(value === '' ? 0 : parseFloat(value));
    };
    
    const handleDaysChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setWorkingDays(isNaN(value) || value < 1 ? 1 : value);
    };

    const calculation = useMemo(() => calculateEmployeeTax(grossSalaryALL), [grossSalaryALL]);
    
    const dailyGross = calculation.grossSalary / workingDays;
    const dailyNet = calculation.netSalary / workingDays;

    return (
        <div className="p-4 md:p-8">
            <SectionTitle icon={IconUser} title={t.employeeTitle} />
            
            {showAlert && (
                <div className="mb-6 p-4 rounded-xl bg-brand-red/10 border border-brand-red text-brand-red flex justify-between items-start">
                    <p className="text-sm font-medium flex items-center">
                        <IconAlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: t.tapWarning }} />
                    </p>
                    <button onClick={() => setShowAlert(false)} className="text-brand-red hover:opacity-75 ml-2">
                         <IconX className="w-5 h-5" />
                    </button>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                    label={t.grossMonthlySalary}
                    value={inputValue}
                    onChange={handleSalaryChange}
                    placeholder="P.sh. 74010"
                    currency={currency}
                />
                 <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.workingDays}
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="31"
                        value={workingDays}
                        onChange={handleDaysChange}
                        className="w-full pl-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-cyan focus:border-brand-cyan text-xl"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-8">
                <ResultCard title={t.grossSalary} value={calculation.grossSalary} currency={currency} rates={rates} />
                <ResultCard title={t.netSalary} value={calculation.netSalary} currency={currency} rates={rates} isNet={true} />
                <ResultCard title={t.employerTotalCost} value={calculation.totalEmployerCost} currency={currency} rates={rates} />
            </div>

            <SectionTitle icon={IconSettings} title={t.deductionBreakdown} />

            <div className="space-y-6">
                {/* Ndarja Ditore */}
                <div className="p-5 border rounded-xl shadow-sm bg-white">
                     <h3 className="font-semibold text-lg text-gray-800 flex items-center mb-3">Paga Ditore (Bazuar në {workingDays} ditë)</h3>
                     <div className="space-y-2">
                        <DetailRow label={t.dailyGross} value={dailyGross} currency={currency} rates={rates} />
                        <DetailRow label={t.dailyNet} value={dailyNet} currency={currency} rates={rates} />
                     </div>
                </div>

                {/* Ana e Punonjësit */}
                <div className="p-5 border rounded-xl shadow-sm bg-white">
                    <h3 className="font-semibold text-lg text-gray-800 flex items-center mb-3"><IconUser className="w-5 h-5 mr-2" />Punonjësi</h3>
                    <DetailRow label={t.employeeContributions} value={calculation.totalEmployeeContributions} currency={currency} rates={rates} isHeader={true}/>
                    <DetailRow label={t.employeeTax} value={calculation.taxAmount} currency={currency} rates={rates} isHeader={true}/>
                    <div className="border-t pt-3 mt-3">
                        <DetailRow label={t.employeeDeductions} value={calculation.totalEmployeeDeductions} currency={currency} rates={rates} isTotal={true}/>
                    </div>
                </div>
                
                {/* Ana e Punëdhënësit */}
                <div className="p-5 border rounded-xl shadow-sm bg-white">
                     <h3 className="font-semibold text-lg text-gray-800 flex items-center mb-3"><IconUsers className="w-5 h-5 mr-2" />Punëdhënësi</h3>
                    <DetailRow label={t.employerContributionsLabel} value={calculation.totalEmployerContributions} currency={currency} rates={rates} isHeader={true}/>
                    <div className="pl-4 text-sm space-y-1 mt-2">
                        <DetailRow label={t.employerSocial} value={calculation.employerSocial} currency={currency} rates={rates} />
                        <DetailRow label={t.employerHealth} value={calculation.employerHealth} currency={currency} rates={rates} />
                    </div>
                     <div className="border-t pt-3 mt-3">
                        <DetailRow label={t.employerTotalCost} value={calculation.totalEmployerCost} currency={currency} rates={rates} isTotal={true}/>
                    </div>
                </div>

                <div className="border-t pt-4 mt-4 text-center">
                    <DetailRow label={t.maxContributionBase} value={CORE_CONSTANTS.PagaMaksimale} currency={currency} rates={rates} isConstant={true} />
                </div>
            </div>
        </div>
    );
};

// --- LLOGARITËSI I FREELANCER ---

const FreeProfCalculator = ({ t, currency, rates }) => {
    const [inputValue, setInputValue] = useState(5000000 / (rates['ALL'] || 1)); // Fillo me 5M ALL
    const [expenseMethod, setExpenseMethod] = useState('presumed');
    const [actualExpensesInput, setActualExpensesInput] = useState(0);

    // Gjithmonë konverto inputin në ALL për llogaritje
    const grossTurnoverALL = useMemo(() => {
        return inputValue * (rates[currency] || 1);
    }, [inputValue, currency, rates]);
    
    const actualExpensesALL = useMemo(() => {
        return actualExpensesInput * (rates[currency] || 1);
    }, [actualExpensesInput, currency, rates]);


    const handleTurnoverChange = (e) => {
        const value = e.target.value;
        setInputValue(value === '' ? 0 : parseFloat(value));
    };
    
    const handleExpenseChange = (e) => {
        const value = e.target.value;
        setActualExpensesInput(value === '' ? 0 : parseFloat(value));
    };

    const calculation = useMemo(
        () => calculateFreeProfTax(grossTurnoverALL, expenseMethod, actualExpensesALL),
        [grossTurnoverALL, expenseMethod, actualExpensesALL]
    );

    let taxStatusText = t.taxStatusUncertain;
    let taxStatusClass = "bg-yellow-100 text-yellow-800";
    if (calculation.taxableProfit > FREE_PROF_TAX_RATES.AnnualThreshold1) {
        taxStatusText = t.taxStatusHigh(formatCurrency(FREE_PROF_TAX_RATES.AnnualThreshold1, currency, rates));
        taxStatusClass = "bg-brand-red/10 text-brand-red";
    } else if (calculation.isUncertain) {
         taxStatusClass = "bg-yellow-100 text-yellow-800";
         taxStatusText = t.taxStatusUncertain;
    } else {
        taxStatusClass = "bg-green-100 text-green-800";
        taxStatusText = "0% Tax";
    }

    return (
        <div className="p-4 md:p-8">
            <SectionTitle icon={IconBriefcase} title={t.freelancerTitle} />

            <InfoAlert title={t.legislativeWarning} type="warning">
                {t.legislativeWarningText}
            </InfoAlert>

            <InputGroup
                label={t.grossAnnualTurnover}
                value={inputValue}
                onChange={handleTurnoverChange}
                placeholder="P.sh. 5000000"
                currency={currency}
                isAnnual={true}
            />

            <SectionTitle icon={IconSettings} title={t.expenseMethod} />
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => setExpenseMethod('presumed')}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        expenseMethod === 'presumed'
                            ? 'bg-brand-cyan text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {t.presumedExpenses}
                </button>
                <button
                    onClick={() => setExpenseMethod('actual')}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        expenseMethod === 'actual'
                            ? 'bg-brand-cyan text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {t.actualExpenses}
                </button>
            </div>
            
            {expenseMethod === 'actual' && (
                <InputGroup
                    label="Shpenzimet Aktuale të Zbritshme (Vjetore)"
                    value={actualExpensesInput}
                    onChange={handleExpenseChange}
                    placeholder="Fut shpenzimet totale"
                    currency={currency}
                    isAnnual={true}
                />
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-8">
                <ResultCard title={t.grossAnnualTurnoverCard} value={calculation.grossAnnualTurnover} currency={currency} rates={rates} />
                <ResultCard title={t.netAnnualIncome} value={calculation.netAnnualIncome} currency={currency} rates={rates} isNet={true} />
            </div>

            <SectionTitle icon={IconSettings} title={t.obligationBreakdown} />

            <div className="p-5 border rounded-xl shadow-sm bg-white space-y-3">
                <DetailRow 
                    label={`${t.calculatedExpenses} (${expenseMethod === 'presumed' ? '30%' : 'Manuale'})`} 
                    value={calculation.deductibleExpenses} 
                    currency={currency} rates={rates} isHeader={true}
                />
                <DetailRow label={t.annualContributions} value={calculation.annualMinWageContributions} currency={currency} rates={rates} isHeader={true} />
                <DetailRow label={t.taxableProfit} value={calculation.taxableProfit} currency={currency} rates={rates} isHeader={true} />
                <DetailRow label={t.incomeTax} value={calculation.taxAmount} currency={currency} rates={rates} isHeader={true} isTotal={true}/>
                
                <div className="mt-4 pt-4 border-t border-dashed">
                    <div className="flex justify-between items-center text-sm sm:text-base font-bold">
                        <span>{t.taxRateUsed}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${taxStatusClass}`}>
                           {taxStatusText}
                        </span>
                    </div>
                </div>
            </div>

            <SectionTitle icon={IconInfo} title={t.legalObligations} />

            <div className="p-5 border rounded-xl shadow-sm bg-white space-y-4">
                <div className="flex justify-between items-center text-gray-700">
                    <span className="font-medium">{t.vatObligation}</span>
                    <span className={`px-3 py-1 rounded-full font-bold text-xs ${calculation.requiresVAT ? 'bg-brand-red text-white' : 'bg-green-500 text-white'}`}>
                        {calculation.requiresVAT ? t.vatYes(formatALL(CORE_CONSTANTS.VatThreshold / (rates['ALL'] || 1))) : t.vatNo(formatALL(CORE_CONSTANTS.VatThreshold / (rates['ALL'] || 1)))}
                    </span>
                </div>
                 <div className="flex justify-between items-center text-gray-700">
                    <span className="font-medium">{t.divaObligation}</span>
                    <span className={`px-3 py-1 rounded-full font-bold text-xs ${calculation.requiresDIVA ? 'bg-brand-red text-white' : 'bg-green-500 text-white'}`}>
                        {calculation.requiresDIVA ? t.divaYes(formatALL(CORE_CONSTANTS.IncomeThresholdDIVA / (rates['ALL'] || 1))) : t.divaNo}
                    </span>
                </div>
                <InfoAlert title={t.foreignClients}>
                    {t.foreignClientsText}
                </InfoAlert>
            </div>
        </div>
    );
};

// --- KOMPONENTËT E PËRMBAJTJES ---

const InfoSection = ({ t }) => (
    <div className="p-4 md:p-8">
        <SectionTitle icon={IconInfo} title={t.infoTitle} />
        <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-600">{t.infoIntro}</p>
            
            <h3 className="text-xl font-semibold text-gray-800">{t.infoGrossNetTitle}</h3>
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t.infoGrossNetText }} />
            
            <h3 className="text-xl font-semibold text-gray-800">{t.infoContributionsTitle}</h3>
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t.infoContributionsText }} />
            
            <h3 className="text-xl font-semibold text-gray-800">{t.infoTapTitle}</h3>
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t.infoTapText }} />
            
            <h3 className="text-xl font-semibold text-gray-800">{t.infoFreelancerTitle}</h3>
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t.infoFreelancerText }} />
        </div>
    </div>
);

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-5 text-left text-lg font-semibold text-gray-800"
            >
                <span>{title}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <IconChevronDown />
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pb-5 pr-10 text-gray-600" dangerouslySetInnerHTML={{ __html: children }} />
            </div>
        </div>
    );
};

const FAQSection = ({ t }) => (
    <div className="p-4 md:p-8">
        <SectionTitle icon={IconHelp} title={t.faqTitle} />
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <AccordionItem title={t.faq1Title}>{t.faq1Text}</AccordionItem>
            <AccordionItem title={t.faq2Title}>{t.faq2Text}</AccordionItem>
            <AccordionItem title={t.faq3Title}>{t.faq3Text}</AccordionItem>
            <AccordionItem title={t.faq4Title}>{t.faq4Text}</AccordionItem>
            <AccordionItem title={t.faq5Title}>{t.faq5Text}</AccordionItem>
        </div>
    </div>
);

const LinksSection = ({ t }) => (
    <div className="p-4 md:p-8">
        <SectionTitle icon={IconLink} title={t.linksTitle} />
        <div className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="https://www.tatime.gov.al/" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:shadow-md hover:border-brand-cyan transition-all">
                <span className="font-semibold text-brand-navy">{t.linksDpt}</span>
                <p className="text-sm text-gray-500">Burimi zyrtar për taksat dhe legjislacionin fiskal.</p>
            </a>
            <a href="https://qkb.gov.al/" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:shadow-md hover:border-brand-cyan transition-all">
                <span className="font-semibold text-brand-navy">{t.linksQkb}</span>
                <p className="text-sm text-gray-500">Për regjistrimin e biznesit tuaj si profesionist i lirë.</p>
            </a>
            <a href="https://www.issh.gov.al/" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:shadow-md hover:border-brand-cyan transition-all">
                <span className="font-semibold text-brand-navy">{t.linksSigurime}</span>
                <p className="text-sm text-gray-500">Informacion mbi kontributet shoqërore dhe shëndetësore.</p>
            </a>
            <a href="https://qbz.gov.al/eli/html/00000000-0000-0000-0000-00000007961a" target="_blank" rel="noopener noreferrer" className="p-4 border rounded-lg hover:shadow-md hover:border-brand-cyan transition-all">
                <span className="font-semibold text-brand-navy">{t.linksKodiPunes}</span>
                <p className="text-sm text-gray-500">Të drejtat dhe detyrimet tuaja si punëmarrës.</p>
            </a>
        </div>
    </div>
);

const ContactSection = ({ t }) => (
    <div className="p-4 md:p-8">
        <SectionTitle icon={IconMail} title={t.navContact} />
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-700">
                Keni pyetje ose sugjerime? Na kontaktoni në: <a href="mailto:info@llogaritesi.al" className="text-brand-cyan font-semibold hover:underline">info@llogaritesi.al</a>
            </p>
             <p className="text-gray-500 text-sm mt-4">
                Ky mjet është krijuar nga <a href="https://kejsan-coku.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-navy hover:underline">Kejsan Coku</a> dhe ofrohet falas për komunitetin.
             </p>
        </div>
    </div>
);


const DetailRow = ({ label, value, currency, rates, isConstant = false, isHeader = false, isTotal = false }) => (
    <div className={`flex justify-between items-center py-1.5 ${isTotal ? 'text-base' : 'text-sm'}`}>
        <span className={`${isConstant ? 'text-gray-500' : isHeader ? 'font-medium text-gray-800' : 'text-gray-700'}`}>
            {label}
        </span>
        <span className={`font-semibold ${isConstant ? 'text-gray-500' : isTotal ? 'text-brand-navy text-lg' : 'text-brand-cyan'}`}>
            {formatCurrency(value, currency, rates)}
        </span>
    </div>
);

// --- KOMPONENTI KRYESOR APP ---

const App = () => {
    const [activePage, setActivePage] = useState('employee');
    const [language, setLanguage] = useState('sq');
    const [currency, setCurrency] = useState('ALL');
    const [rates, setRates] = useState({ 'ALL': 1, 'EUR': 0.0093, 'USD': 0.0098 }); // Vlera fallback
    
    const t = useMemo(() => translations[language], [language]);

    // 1. API për kursin e këmbimit
    useEffect(() => {
        // Funksion për të marrë kursin e këmbimit
        const fetchRates = async () => {
            try {
                // Përdorim EUR si bazë sepse është më stabël dhe shumica e API-ve e ofrojnë falas
                const response = await fetch('https://open.er-api.com/v6/latest/EUR');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                
                // Ruajmë normat e konvertimit. Llogaritjet tona janë në ALL,
                // kështu që na duhet sa EUR/USD është 1 ALL.
                const rateALL = data.rates.ALL; // Sa ALL është 1 EUR
                const rateUSD = data.rates.USD; // Sa USD është 1 EUR

                setRates({
                    'ALL': 1,
                    'EUR': 1 / rateALL,         // Sa EUR është 1 ALL
                    'USD': rateUSD / rateALL   // Sa USD është 1 ALL
                });
                
            } catch (error) {
                console.error("Failed to fetch exchange rates, using fallback.", error);
                // Në rast dështimi, përdorim vlerat fallback
                setRates({ 'ALL': 1, 'EUR': 0.0093, 'USD': 0.0098 });
            }
        };

        fetchRates();
        // E thërrasim vetëm një herë në ngarkim
    }, []);
    
    // 2. Ruaj preferencat e përdoruesit
    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    // Përcakto komponentin aktiv
    let ActiveComponent;
    switch (activePage) {
        case 'employee':
            ActiveComponent = <EmployeeCalculator t={t} currency={currency} rates={rates} />;
            break;
        case 'freelancer':
            ActiveComponent = <FreeProfCalculator t={t} currency={currency} rates={rates} />;
            break;
        case 'info':
            ActiveComponent = <InfoSection t={t} />;
            break;
        case 'faq':
            ActiveComponent = <FAQSection t={t} />;
            break;
        case 'links':
            ActiveComponent = <LinksSection t={t} />;
            break;
        case 'contact':
            ActiveComponent = <ContactSection t={t} />;
            break;
        default:
            ActiveComponent = <EmployeeCalculator t={t} currency={currency} rates={rates} />;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <Sidebar activePage={activePage} setActivePage={setActivePage} t={t} />
            <div className="flex-1 flex flex-col">
                <Header 
                    lang={language} 
                    setLang={setLanguage} 
                    currency={currency} 
                    setCurrency={setCurrency} 
                    t={t} 
                />
                <main className="flex-grow p-4 md:p-8 main-content">
                    {ActiveComponent}
                </main>
                <Footer t={t} />
            </div>
        </div>
    );
};

// Ngarkimi i Aplikacionit React në DOM
ReactDOM.render(<App />, document.getElementById('root'));
