import { getProgramsForLocale } from '../constants/programs';

export const translations = {
    sq: {
        navHome: "Kryefaqja",
        navEmployee: "Punëmarrës",
        navFreelancer: "Freelancer",
        navInfluencer: "Influencer",
        navFreelancerGuide: "Udhëzuesi Tatimor (2025)",
        navCalculators: "Kalkulatorët",
        navNews: "Lajme & Përditësime",
        navInfo: "Si funksionon?",
        navFAQ: "Pyetje të Shpeshta (FAQ)",
        navLinks: "Burime Zyrtare",
        navContact: "Kontakt",
        navPrograms: "Programet",
        navTools: "Mjetet",
        navResources: "Burimet",
        disclaimer: "ℹ️ Ky mjet shërben vetëm për informacion të përgjithshëm. Verifikoni llogaritjet me një këshilltar tatimor ose ligjor përpara se të merrni vendime.",
        home: {
            heroBadge: "Platformë inteligjente",
            heroTitle: "Llogarit pagën, taksat dhe kontributet në pak sekonda",
            heroSubtitle: "Zgjidh kalkulatorin që të duhet për 2025 dhe krahaso skenarët pa spreadsheet.",
            heroPrimaryCta: "Hap kalkulatorin e pagës",
            heroSecondaryCta: "Shiko mjetet për profesionistë",
            calculatorsTitle: "Zgjidh kalkulatorin e duhur",
            calculatorsSubtitle: "Çdo modul është i përditësuar sipas paketës fiskale 2024-2025 dhe mbështet kombinime të ndryshme kontratash.",
            cards: {
                employee: {
                    title: "Kalkulatori i pagës për punëmarrës",
                    description: "Simulo bruto/neto, kontrata të shumëfishta dhe zbritje familjare.",
                },
                freelancer: {
                    title: "Detyrimet e profesionistit të lirë",
                    description: "Analizo fitimin neto dhe pragjet e TVSH-së sipas xhiros vjetore.",
                },
                influencer: {
                    title: "Modelimi për krijues & influencer",
                    description: "Krahaso skenarët bruto/neto për të ardhurat nga platformat digjitale.",
                },
                guide: {
                    title: "Udhëzuesi tatimor 2025",
                    description: "Nenet kryesore, afatet dhe dokumentet e nevojshme të përmbledhura.",
                },
            },
            benefitsTitle: "Çfarë fiton me llogaritësi.al",
            benefitsSubtitle: "Një platformë e vetme për planifikim financiar, pa Excel dhe pa paqartësi ligjore.",
            benefits: [
                {
                    title: "Modelim sipas ligjeve 2025",
                    description: "Algoritmet tona përditësohen me TAP-in e ri, kontributet dhe pensionet minimale/maksimale.",
                },
                {
                    title: "Konvertime automatike të monedhës",
                    description: "Shih rezultatet në ALL, EUR ose USD me kurse të rifreskuara automatikisht.",
                },
                {
                    title: "Analiza të thelluara",
                    description: "Seksionet e burimeve shpjegojnë nenet ligjore, shembujt praktikë dhe skenarët e biznesit.",
                },
            ],
            resourcesTitle: "Burime dhe analiza të fundit",
            resourcesSubtitle: "Lexo përditësimet fiskale, shpjegimet praktike dhe pyetjet më të shpeshta.",
            resources: {
                news: {
                    eyebrow: "Përditësime",
                    title: "Lajmet më të fundit fiskale",
                    description: "Monitorojmë njoftimet zyrtare dhe i përkthejmë në hapa praktikë për profesionistët.",
                },
                info: {
                    eyebrow: "Guidë",
                    title: "Si funksionojnë kontributet",
                    description: "Shpjegojmë rregullat e reja për sigurimet shoqërore, TAP-in dhe deklarimet mujore.",
                },
                faq: {
                    eyebrow: "FAQ",
                    title: "Pyetjet më të shpeshta",
                    description: "Gjej përgjigje të shpejta për skenarë të zakonshëm të punës dhe freelancing-ut.",
                },
            },
        },
        selectCurrency: "Monedha",
        gross: "Bruto",
        net: "Neto",
        employeeTitle: "Kalkulatori i Pagës së Punëmarrësit",
        tapWarning: "**Vërejtje 2025:** Kllapat e Tatimit (TAP) do të ndryshojnë në Janar 2025. Llogaritja është sipas rregullave aktuale 2024.",
        hideTapNotice: "Fshih paralajmërimin",
        showTapNotice: "Shfaq paralajmërimin",
        tapLegalReminder: "Mbani parasysh që ndryshimet ligjore mund të hyjnë në fuqi më herët se Janari 2025. Rekomandohet kontrolli periodik tek burimet zyrtare.",
        salaryInputMode: "Zgjidh mënyrën e inputit",
        modeGrossToNet: "Nga Bruto në Neto",
        modeNetToGross: "Nga Neto në Bruto",
        grossMonthlySalary: "Paga Bruto Mujore",
        netMonthlySalary: "Paga Neto Mujore",
        workingDays: "Ditë pune në muaj",
        jobLayoutLabel: "Zgjidh strukturën e punësimit",
        jobLayoutSingle: "1 kontratë",
        jobLayoutMulti: "2–3 kontrata",
        thirdJobLabel: "Kontrata e tretë (opsionale)",
        thirdJobAdd: "Aktivo kontratën e tretë",
        thirdJobRemove: "Çaktivizo kontratën e tretë",
        thirdJobHelper: "Përdoreni për të simuluar të ardhura shtesë nga një kontratë e tretë ose punë me orë të pjesshme.",
        dependentsLabel: "Fëmijët në ngarkim",
        dependentsTooltip: "Zbritje familjare sipas paketës së TAP 2025.",
        dependentsHelper: "Numri i fëmijëve të deklaruar ul bazën e tatueshme tek kontrata primare.",
        dependentsClampMessage: "Vlera u përshtat automatikisht për t'u mbajtur midis 0 dhe 6.",
        voluntaryPensionLabel: "Kontribut vullnetar në pension (ALL)",
        voluntaryPensionTooltip: (cap) => `Zbritje mujore e lejuar deri në ${new Intl.NumberFormat('sq-AL').format(cap)} ALL.`,
        voluntaryPensionHelper: (cap) => `Shuma aplikohet vetëm në kontratën primare dhe kufizohet në ${new Intl.NumberFormat('sq-AL').format(cap)} ALL.`,
        voluntaryPensionWarning: (cap) => `Për TAP llogaritet vetëm ${new Intl.NumberFormat('sq-AL').format(cap)} ALL. Kontrollo shumën.`,
        jobCards: {
            primary: { title: "Kontrata primare", badge: "Primare" },
            secondary: { title: "Kontrata dytësore", badge: "Sekondare" },
            tertiary: { title: "Kontrata tretësore", badge: "Terciare" },
            grossInputLabel: "Paga bruto mujore",
            netInputLabel: "Paga neto mujore",
            placeholder: "P.sh. 120000",
            modeLabel: "Zgjidh mënyrën e llogaritjes",
            workingDays: "Ditë pune në muaj",
            workingDaysHint: "Përdoret për të llogaritur pagën ditore për këtë kontratë.",
            dailyBreakdown: "Analiza ditore",
            dailyGross: "Bruto ditore",
            dailyNet: "Neto ditore",
            breakdownTitle: "Detajet mujore",
            contributionsLabel: "Kontributet e punonjësit",
            taxLabel: "Tatimi TAP",
            voluntaryLabel: "Pension vullnetar",
            summaryGross: "Paga Bruto",
            summaryDeductions: "Totali i zbritjeve",
            summaryNet: "Paga Neto",
            summaryEmployer: "Kosto e punëdhënësit",
            taxableCaption: "Baza e tatueshme",
        },
        examples: {
            title: "Provo skenarët e vitit 2025",
            subtitle: "Zgjidh një skenar tipik për të parë si ndikojnë kontratat dhe zbritjet familjare.",
            presets: {
                singleFamily: {
                    label: "Primare · 95,000 ALL · 2 fëmijë",
                    description: "Pagë fikse në sektorin publik me kontribut vullnetar 25,000 ALL.",
                },
                dualCreative: {
                    label: "2 kontrata · Neto kreative",
                    description: "Kontratë kryesore 120,000 ALL dhe projekt dytësor me pagesë neto mujore.",
                },
                tripleTeam: {
                    label: "3 kontrata · Mix bruto/neto",
                    description: "Shembull për ekip menaxherial me pension vullnetar maksimal dhe fëmijë në ngarkim.",
                },
            },
        },
        totalMonthlyCard: {
            title: "Total mujor (të gjitha kontratat)",
            subtitle: "Vlerat konvertohen automatikisht sipas monedhës së zgjedhur.",
            gross: "Totali Bruto",
            deductions: "Zbritje",
            net: "Totali Neto",
            employer: "Kosto e punëdhënësit",
            pensionCapAlert: (cap) => `Baza e kontributeve ka arritur ${new Intl.NumberFormat('sq-AL').format(cap)} ALL (maksimumi i pensionit).`,
        },
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
        freelancerCalculator: {
            inputs: {
                heading: "Të dhënat kryesore",
                annualIncome: "Xhiroja e deklaruar (vjetore)",
                currency: "Monedha e inputit",
                localSplitHint: "Përcakto sa e përqendruar është xhiroja tek klientët vendas për të identifikuar rrezikun e punësimit të maskuar.",
                localSplit: "Klientë vendas (%)",
                topClient: "Klienti kryesor vendas (%)",
                topTwoClients: "2 klientët kryesorë vendas (%)",
                percentSuffix: "% e të ardhurave",
            },
            validation: {
                topClientExceedsLocal: "Klienti kryesor vendas nuk mund të kalojë përqindjen totale të klientëve vendas.",
                topTwoClientsExceedsLocal: "Dy klientët kryesorë vendas nuk mund të kalojnë përqindjen totale të klientëve vendas.",
            },
            vatBadges: {
                under: "Nën 10 M ALL – Pa TVSH",
                monitor: "Afër pragut 10 M ALL – Monitoro",
                over: "Mbi 10 M ALL – Regjistrim i detyrueshëm",
            },
            vatDescriptions: {
                under: "Je poshtë pragut ligjor për regjistrim në TVSH, por ruaj evidencat mujore.",
                monitor: "Je brenda 75%-100% të pragut të TVSH-së. Monitoro xhiron çdo muaj për të shmangur penalitetet.",
                over: "Ke kaluar pragun vjetor 10 M ALL. Regjistrimi në TVSH është i detyrueshëm.",
            },
            warnings: {
                title: "Paralajmërime për punësim të maskuar",
                singleClient: {
                    title: "Mbi 80% nga një klient vendas",
                    body: "Kur mbi 80% e të ardhurave vjetore burojnë nga një klient vendas, administrata tatimore mund të kërkojë rishikim si marrëdhënie punësimi.",
                },
                dualClient: {
                    title: "Dy klientë vendas > 90% e xhiros",
                    body: "Mbi 90% e xhiros nga dy klientë vendas sinjalizon rrezik për punësim të maskuar. Diversifiko kontratat ose formalizo marrëdhënien.",
                },
            },
            summary: {
                heading: "Pamje e shpejtë",
                vatLabel: "Statusi i TVSH-së",
                contributionsLabel: "Kontributet SH/SI (23% + 3.4%)",
                profitTaxLabel: "Tatimi mbi fitimin",
                netLabel: "Të ardhurat neto pas tatimit",
                mixLabel: "Shpërndarja e klientëve",
                local: "Vendas",
                foreign: "I huaj",
            },
            explanations: {
                contributions: (minWageALL) => 'Llogaritur me 23% + 3.4% mbi pagën minimale ' + minWageALL + ' çdo muaj, për 12 muaj.',
                profitTax: (thresholdALL) => 'Tatimi 23% aplikohet vetëm mbi fitimin neto që kalon ' + thresholdALL + ' pas kontributeve.',
                vat: (thresholdALL) => 'Pragu ligjor aktual i TVSH-së është ' + thresholdALL + '.',
            },
            profitBands: {
                heading: "Kllapat e tatimit mbi fitimin",
                zeroRate: "0% mbi fitimin e tatueshëm deri në 14 M ALL (pas kontributeve).",
                highRate: "23% mbi pjesën e fitimit neto që kalon 14 M ALL.",
                rangeLabel: (minALL, maxALL) => (maxALL === '∞' ? `Mbi ${minALL}` : `${minALL} – ${maxALL}`),
                rateLabel: (ratePercent) => `Norma ${ratePercent}`,
                amountLabel: "Bazë",
                taxLabel: "Tatimi",
            },
            table: {
                heading: "Tabela e detyrimeve vjetore",
                columns: {
                    obligation: "Detyrimi",
                    amount: "Shuma (monedha e zgjedhur)",
                    notes: "Shpjegimi",
                },
                rows: {
                    gross: {
                        label: "Xhiro bruto",
                        note: "Shuma e deklaruar sipas inputit të mësipërm.",
                    },
                    contributions: {
                        label: "Kontributet shoqërore & shëndetësore",
                        note: (minWageALL) => 'Baza ligjore: paga minimale ' + minWageALL + ' × 12 muaj.',
                    },
                    profitTax: {
                        label: "Tatimi mbi fitimin",
                        note: (thresholdALL) => '0% deri në ' + thresholdALL + ', 23% mbi shumën e mbetur.',
                    },
                    net: {
                        label: "Neto pas tatimit",
                        note: "Xhiro minus kontributet e detyrueshme dhe tatimin mbi fitimin.",
                    },
                },
            },
        },
        freelancerGuide: {
            title: "Udhëzuesi Tatimor për Freelancer (2025)",
            intro: "Përzgjidh xhiron e pritshme dhe profilin e klientëve për të parë çfarë kërkon ligji dhe si të planifikosh tatimin për vitin 2025.",
            filtersTitle: "Parametrat kryesorë",
            revenueLabel: "Xhiroja vjetore",
            revenueCaption: "Zgjidh intervalin që i përshtatet më mirë kontratave të tua të 12 muajve të fundit.",
            clientMixLabel: "Profili i klientëve",
            clientMixCaption: "Sa të përqendruara janë kontratat e tua dhe në cilat tregje operon?",
            mobileNarrativeSummary: "Shfaq rekomandimet e detajuara",
            narrativeHeading: "Çfarë duhet të kesh parasysh",
            actionsHeading: "Hapat që sugjerojmë",
            warningsHeading: "Sinjale për t'u mbajtur mend",
            noWarningsFallback: "Nuk ka paralajmërime të menjëhershme për këtë konfigurim. Mbani dokumentet dhe evidencat mujore të përditësuara.",
            thresholds: {
                vat: "10,000,000 ALL",
                profit: "14,000,000 ALL"
            },
            revenueOptions: {
                under5: "< 5M ALL · Faza e nisjes",
                '5to10': "5M–10M ALL · Nën pragun e TVSH-së",
                '10to14': "10M–14M ALL · Afër tatimit mbi fitimin",
                above14: "> 14M ALL · Tatim i plotë mbi fitimin"
            },
            clientMixOptions: {
                singleLocal: "1 klient vendas kryesor",
                localPortfolio: "2-5 klientë vendas të rregullt",
                balanced: "Mix lokal & ndërkombëtar",
                global: "Kryesisht klientë të huaj"
            },
            table: {
                heading: "Përmbledhje e detyrimeve ligjore",
                obligation: "Detyrimi",
                status: "Statusi",
                notes: "Çfarë nënkupton"
            },
            statuses: {
                required: "I detyrueshëm",
                threshold: "Prag për t'u monitoruar",
                recommended: "E rekomanduar",
                monitor: "Vëzhgo ndryshimet",
                caution: "Kujdes i shtuar"
            },
            statusDescriptions: {
                required: "Duhet të përmbushet menjëherë.",
                threshold: "Aktivohet sapo të kalosh pragun përkatës.",
                recommended: "E dobishme për të shmangur gjoba ose auditime.",
                monitor: "Mbaj evidencë dhe prit qartësime ligjore.",
                caution: "Rrezik i mundshëm që kërkon dokumentim."
            },
            obligationsHeading: "Detyrimet kryesore",
            obligations: {
                registerNipt: {
                    label: "Regjistrimi si NIPT",
                    note: "Apliko në QKB për t'u regjistruar si profesionist i lirë përpara faturimit."
                },
                socialSecurity: {
                    label: "Kontributet shoqërore & shëndetësore",
                    note: "Paguaj 27.9% mbi pagën minimale ose bazën që zgjedh çdo muaj."
                },
                incomeTax: {
                    label: "Tatimi mbi fitimin",
                    note: "Tatimi mbi të ardhurat e biznesit individual ndryshon sipas fitimit neto."
                },
                vat: {
                    label: "TVSH (VAT)",
                    note: "Detyrim për regjistrim pasi kalon pragun vjetor të TVSH-së."
                },
                diva: {
                    label: "Deklarata vjetore DIVA",
                    note: "Dorëzo formularin DIVA deri më 31 Mars për të ardhurat e vitit të kaluar."
                },
                invoicing: {
                    label: "Fiskalizimi i faturave",
                    note: "Lësho fatura elektronike për çdo pagesë, sipas ligjit të fiskalizimit."
                },
                accounting: {
                    label: "Kontabiliteti & dokumentimi",
                    note: "Mbaj evidencë të shpenzimeve dhe kontratave për të justifikuar të ardhurat."
                }
            },
            dynamicNotes: {
                incomeTax: {
                    under5: "Aktualisht fitimet deri në 14M ALL nuk tatohet, por priten udhëzime të reja.",
                    '5to10': "Sigurohu që fitimi të kalkulohet drejt pasi vendimmarrja për shkallën 0-14M ALL mund të ndryshojë.",
                    '10to14': "Je në zonë gri: përgatit rezerva në rast se zbatohet tatim 15% për këtë fashë.",
                    above14: "Fitimi mbi 14M tatohet me 23%; llogarit paraprakisht dhe paguaj këste."
                },
                vat: {
                    under5: "Je larg pragut 10M ALL, por dokumento xhiron për të provuar vëllimin.",
                    '5to10': "Planifiko regjistrimin sapo të parashikosh kalimin e pragut prej 10M ALL.",
                    '10to14': "Duhet të regjistrohesh dhe deklarosh TVSH-në mujore brenda 15 ditëve.",
                    above14: "TVSH e detyrueshme; kontrollo kreditimin e TVSH-së për klientët e huaj."
                },
                accounting: {
                    under5: "Mjafton kontabilitet i thjeshtuar ose software bazë.",
                    '5to10': "Përgatit raporte mujore të shpenzimeve për të optimizuar fitimin neto.",
                    '10to14': "Kërkon ekspert kontabël për të përmbushur TVSH dhe raportimet mujore.",
                    above14: "Rekomandohet kontabilist i licencuar dhe bilanc vjetor i audituar."
                }
            },
            clientNotes: {
                invoicing: {
                    singleLocal: "Klienti vendor kërkon kontratë shërbimi dhe raporte pune për të shmangur 'punësimin e fshehur'.",
                    localPortfolio: "Sigurohu që çdo klient të ketë marrëveshje të qartë dhe fatura mujore.",
                    balanced: "Përdor valutë të saktë dhe shënim për shërbimet e eksportuara pa TVSH.",
                    global: "Për klientët e huaj përdor kode shërbimi dhe ruaj provat e eksportit."
                },
                accounting: {
                    singleLocal: "Dokumento pavarësinë tënde (afate, fatura, pajisje personale) për të mbrojtur statusin.",
                    localPortfolio: "Segmento të ardhurat sipas klientit për të treguar diversifikim.",
                    balanced: "Klasifiko të ardhurat sipas vendndodhjes për raportim statistikor.",
                    global: "Mbaj raport me kursin e këmbimit për të mbyllur librat në ALL."
                }
            },
            warnings: {
                disguisedTitle: "Rreziku i punësimit të fshehur",
                disguisedBody: "Një klient i vetëm vendas mund të interpretohet si marrëdhënie pune. Mbani kontratë shërbimi, orare fleksibël dhe prova të pavarësisë.",
                vatTitle: "Pragu i TVSH-së",
                vatBody: "Pasi të kalosh 10,000,000 ALL në 12 muajt e fundit, regjistrimi në TVSH është i detyrueshëm brenda 15 ditëve.",
                profitTitle: "Tatimi 23% mbi fitimin",
                profitBody: "Fitimi neto mbi 14,000,000 ALL tatohet me 23%. Planifiko paraprakisht këste tremujore dhe konsulto kontabilistin."
            },
            details: {
                under5: {
                    singleLocal: {
                        title: "Startues me një klient vendas",
                        summary: "Je në fazë fillestare me një kontratë të vetme vendase. Pavarësia ligjore është prioritet kryesor ndërsa ndërton portofolin.",
                        actions: [
                            "Formalizo kontratën si shërbim konsulence dhe përcakto qartë oraret fleksibël.",
                            "Kujdesu që kontributet të paguhen çdo muaj për të shmangur kamatat.",
                            "Investo kohë në gjetjen e klientëve të rinj për të ulur riskun e varësisë."
                        ]
                    },
                    localPortfolio: {
                        title: "Freelancer lokal në rritje",
                        summary: "Menaxhon disa klientë vendas nën 5M ALL. Fokusohu në proceset e faturimit dhe në mbajtjen e evidencave të sakta.",
                        actions: [
                            "Implemento një sistem të thjeshtë menaxhimi faturash me fiskalizim të automatizuar.",
                            "Ruaj shpenzimet me faturë për të justifikuar metodën e zgjedhur të zbritjes.",
                            "Planifiko rritjen graduale të bazës së kontributeve pas vitit të parë."
                        ]
                    },
                    balanced: {
                        title: "Portofol i balancuar në fazë nisjeje",
                        summary: "Ke kombinim klientësh vendas e të huaj me xhiro të ulët. Regjistro qartë shërbimet e eksportuara dhe menaxho valutën.",
                        actions: [
                            "Përdor fatura në valutë me shënimin 'shërbim i eksportuar pa TVSH'.",
                            "Konverto pagesat në ALL sipas kursit zyrtar në datën e faturimit.",
                            "Ruaj kontratat në gjuhë të huaj të përkthyera për inspektimet fiskale."
                        ]
                    },
                    global: {
                        title: "Eksporues digjital fillestar",
                        summary: "Kryesisht klientë të huaj me xhiro modeste. Fokusohu në provat e eksportit dhe në menaxhimin e kursit të këmbimit.",
                        actions: [
                            "Arkivo vërtetimet e pagesave ndërkombëtare (Swift, PayPal, Stripe).",
                            "Përdor metoda të sakta për përllogaritjen e fitimit në ALL.",
                            "Monitoro shpenzimet në valutë për të ruajtur marzhin e fitimit."
                        ]
                    }
                },
                '5to10': {
                    singleLocal: {
                        title: "Kontratë e vetme pranë pragut të TVSH-së",
                        summary: "Xhiroja po afrohet me 10M ALL me një klient të vetëm. Diversifikimi është kritik për të shmangur rrezikun e punësimit të fshehur.",
                        actions: [
                            "Negocio klauzola të qarta për pavarësinë dhe të drejtën për të punuar me klientë të tjerë.",
                            "Monitoro xhiron mujore për të parashikuar momentin e regjistrimit në TVSH.",
                            "Rezervo 10-15% të të ardhurave për detyrime tatimore të paparashikuara."
                        ]
                    },
                    localPortfolio: {
                        title: "Freelancer vendor drejt zgjerimit",
                        summary: "Portofoli vendas po rritet dhe po i afrohet pragut 10M ALL. Nevojitet disiplinë në faturim dhe dokumentim.",
                        actions: [
                            "Automatizo raportimin e xhiros për të llogaritur 12 muajt rrotullues.",
                            "Shqyrto hapjen e llogarisë bankare dedikuar biznesit për transparencë.",
                            "Përgatis dokumentacionin për regjistrim në TVSH (NIPT, kontrata, qarkullim)."
                        ]
                    },
                    balanced: {
                        title: "Mix klientësh me xhiro mesatare",
                        summary: "Xhiroja 5-10M ALL me klientë vendas dhe të huaj kërkon menaxhim të dyfishtë të fiskalizimit dhe deklarimeve.",
                        actions: [
                            "Ndarja e faturave me dhe pa TVSH sipas destinacionit të shërbimit.",
                            "Kontrollo marrëveshjet ndërkombëtare për të shmangur tatimin në burim jashtë vendit.",
                            "Përditëso politikat e çmimeve për të mbuluar kostot e ardhshme të TVSH-së."
                        ]
                    },
                    global: {
                        title: "Eksportues me ritëm të qëndrueshëm",
                        summary: "Të ardhurat 5-10M ALL kryesisht nga jashtë. Fokusohu në dokumentimin e eksportit dhe në shlyerjen e taksave në ALL.",
                        actions: [
                            "Ruaj provat e eksportit (kontrata, korrespondencë, dorëzime digjitale).",
                            "Menaxho flukset valutore me kurs mesatar mujor për deklarime.",
                            "Kontrollo marrëveshjet tatimore për të shmangur tatimin e dyfishtë."
                        ]
                    }
                },
                '10to14': {
                    singleLocal: {
                        title: "Kontratë e madhe vendase me TVSH",
                        summary: "Kalimi i 10M ALL me një klient vendas të vetëm nënkupton regjistrim TVSH dhe risk të shtuar për ri-kategorizim si punësim.",
                        actions: [
                            "Deklaro TVSH-në mujore dhe kërko rimbursim të inputeve të lejuara.",
                            "Dokumento rreptësisht oraret, objektivat dhe mjetet e tua të punës.",
                            "Sigurohu që klienti të pranojë faturë me TVSH dhe të paguajë në kohë."
                        ]
                    },
                    localPortfolio: {
                        title: "Agjenci e vogël freelance",
                        summary: "Me disa klientë vendas mbi 10M ALL, duhet kontabilitet profesional dhe monitorim i fitimit neto.",
                        actions: [
                            "Vendos politika pagese për të menaxhuar TVSH-në dalëse dhe hyrëse.",
                            "Përgatit parashikime fitimi për të vlerësuar ndikimin e tatimit të mundshëm 15%.",
                            "Implemento arkivë digjitale për kontratat dhe fletët e punës."
                        ]
                    },
                    balanced: {
                        title: "Portofol i pjekur me TVSH",
                        summary: "Të ardhurat 10-14M ALL me klientë miks kërkojnë koordinim midis faturimit me TVSH dhe shërbimeve të eksportuara.",
                        actions: [
                            "Segmento librat e shitjeve në faturë me TVSH dhe pa TVSH.",
                            "Kontrollo retencione tatimore jashtë vendit dhe aplikimin e marrëveshjeve.",
                            "Planifiko cash-flow për pagesat mujore të TVSH-së dhe sigurimeve."
                        ]
                    },
                    global: {
                        title: "Eksportues i avancuar",
                        summary: "Xhiroja 10-14M ALL nga jashtë. TVSH në shitje nuk aplikohet, por raportimi dhe tatimi mbi fitimin kërkojnë kujdes.",
                        actions: [
                            "Deklaro TVSH-në si eksport me normë 0% dhe kërko kreditimet e inputeve vendase.",
                            "Sigurohu që fitimi të mbështetet me shpenzime të dokumentuara.",
                            "Mbaj kalendar tatimor për parapagimet dhe raportimet ndërkombëtare."
                        ]
                    }
                },
                above14: {
                    singleLocal: {
                        title: "Kontratë e vetme me tatim të plotë",
                        summary: "Mbi 14M ALL me një klient vendas nënkupton tatim 23% dhe auditim të mundshëm për marrëdhënie pune.",
                        actions: [
                            "Paguaj këste tremujore të tatimit mbi fitimin dhe TVSH-së.",
                            "Kërko opinion profesional mbi strukturën kontraktuale për të shmangur ri-klasifikimin.",
                            "Diversifiko të ardhurat për të redukuar riskun operacional."
                        ]
                    },
                    localPortfolio: {
                        title: "Freelancer me volum të lartë vendor",
                        summary: "Një portofol i gjerë vendas mbi 14M ALL kërkon sistem të plotë kontabiliteti dhe kontroll të shpenzimeve.",
                        actions: [
                            "Krijo buxhete mujore për të monitoruar marzhin pas tatimit.",
                            "Përditëso kontratat me klauzola TVSH-je dhe penalitete për pagesa të vonuara.",
                            "Analizo mundësinë e hapjes së një shoqërie për avantazhe tatimore."
                        ]
                    },
                    balanced: {
                        title: "Portofol i matur ndërkombëtar",
                        summary: "Mbi 14M ALL me klientë vendas dhe të huaj kërkon strategji tatimore të integruar dhe kontroll të kursit të këmbimit.",
                        actions: [
                            "Përgatis raporte të ndara për të ardhurat e eksportit dhe ato vendase.",
                            "Optimizoni shpenzimet e zbritshme për të ulur bazën e tatimit 23%.",
                            "Bashkëpuno me kontabilist të licencuar për mbylljen vjetore."
                        ]
                    },
                    global: {
                        title: "Eksportues premium",
                        summary: "Xhiro mbi 14M ALL kryesisht nga klientë të huaj kërkon fokus në marrëveshjet e tatimit të dyfishtë dhe menaxhimin e riskut valutor.",
                        actions: [
                            "Kontrollo nëse vendet e klientëve aplikojnë tatim në burim dhe kërko kreditim.",
                            "Optimizoni shpenzimet në valutë për të mbrojtur fitimin neto.",
                            "Planifiko cash-flow-in për këstet e tatimit dhe kontributet e rritura."
                        ]
                    }
                }
            }
        },
        influencerTitle: "Kalkulatori i Detyrimeve (Influencer)",
        influencerWarning: "VËREJTJE PËR INFLUENCERËT:",
        influencerWarningText: "Trajtimi juaj fiskal është i njëjtë me atë të një **Profesionisti të Lirë**. Dallimi kryesor është tek pagesat në natyrë (barter). Rekomandohet përdorimi i metodës së **shpenzimeve të supozuara (30%)** për shkak të kompleksitetit të vlerësimit të produkteve ose shërbimeve të marra si pagesë.",
        infoTitle: "Si funksionon Kalkulatori?",
        infoIntro: "Ky seksion përmbledh si tatohet paga, cilat janë ndryshimet kryesore për 2025 dhe çfarë detyrimesh shtesë duhet të njihni si punëmarrës ose kontribuues i lirë.",
        infoTopics: [
            {
                title: "Shpërndarja e tatimeve në pagë (2024)",
                content: `
<p>Paga bruto ndahet në tre blloqe kryesore:</p>
<ul>
<li><strong>Kontributet e punonjësit (11.2%)</strong> llogariten mbi pagën bruto deri në bazën maksimale 176,416 ALL.</li>
<li><strong>Tatimi progresiv TAP</strong>: 0% për 30,000 ALL të para, 13% për segmentin nga 30,001 deri në 200,000 ALL, dhe 23% për pjesën mbi 200,000 ALL.</li>
<li><strong>Paga neto</strong> është diferenca pasi zbriten kontributet dhe TAP.</li>
</ul>
<p><strong>Shembull:</strong> Paga bruto 120,000 ALL prodhon kontribute 13,440 ALL dhe TAP 9,953 ALL, duke lënë paga neto rreth 96,607 ALL.</p>
`
            },
            {
                title: "Çfarë ndryshon gjatë 2024–2025",
                content: `
<p>Pakoja fiskale 2025 sjell rregulla të reja që duhen monitoruar:</p>
<ul>
<li><strong>Gjatë 2024</strong> mbeten në fuqi kllapat aktuale TAP 0% / 13% / 23%.</li>
<li><strong>Janar 2025</strong>: futen zbritje familjare për fëmijët në ngarkim dhe pritet rishikim i pragjeve mujore të TAP. Versionet provuese të kalkulatorit i ofrojnë këto opsione për planifikim.</li>
<li><strong>Pensionet vullnetare</strong> do të raportohen në e-Albania me format të unifikuar mujor.</li>
</ul>
<p>Këshillohet të kontrolloni shpesh burimet zyrtare të DPT-së pasi aktet nënligjore mund të ndryshojnë.</p>
`
            },
            {
                title: "Nga neto në bruto: si funksionon llogaritja",
                content: `
<p>Për të kthyer një pagë neto në bruto ndiqen këto hapa:</p>
<ol>
<li>Shtoni kontributet e punonjësit (11.2%) mbi shumën bruto të panjohur.</li>
<li>Përllogarit TAP mbi bazën tatimore (bruto – kontributet).</li>
<li>Rregullo shumën bruto derisa neto të barazohet me shumën e dëshiruar.</li>
</ol>
<p><strong>Shembull praktik:</strong> Për të marrë 90,000 ALL neto nevojiten rreth 111,448 ALL bruto. Kontributet janë ~12,482 ALL dhe TAP rreth 8,966 ALL.</p>
`
            },
            {
                title: "Pensioni vullnetar: rregullat dhe përfitimet",
                content: `
<p>Kontributet vullnetare lejohen deri në 50,000 ALL në muaj për kontratën primare dhe zbriten nga baza tatimore.</p>
<table>
<thead>
<tr><th>Kontribut mujor</th><th>Zbritje vjetore</th><th>Kursim TAP (13%)</th></tr>
</thead>
<tbody>
<tr><td>10,000 ALL</td><td>120,000 ALL</td><td>15,600 ALL</td></tr>
<tr><td>25,000 ALL</td><td>300,000 ALL</td><td>39,000 ALL</td></tr>
<tr><td>50,000 ALL</td><td>600,000 ALL</td><td>78,000 ALL</td></tr>
</tbody>
</table>
<p>Përfitimi fiskal merret vetëm nëse pagesat kryhen përmes një fondi të licencuar dhe raportohen në DPT.</p>
`
            },
            {
                title: "Detyrimi vjetor DIVA",
                content: `
<p>DIVA (Deklarata Individuale Vjetore e të Ardhurave) duhet dorëzuar deri më 30 Prill të vitit pasardhës nëse:</p>
<ul>
<li>Të ardhurat bruto nga paga kalojnë 1.2 milion ALL në vit, edhe nëse vjen nga një punë e vetme.</li>
<li>Keni të ardhura nga më shumë se një punëdhënës ose burim (p.sh. paga + honorare).</li>
<li>Keni të ardhura nga qira, dividentë ose aktivitete të tjera të tatueshme.</li>
</ul>
<p>Mosdorëzimi sjell gjoba. Ruani listëpagesat dhe vërtetimet e tatimit për ta plotësuar me saktësi.</p>
`
            }
        ],
        faqTitle: "Pyetje të Shpeshta (FAQ)",
        faq1Title: "Sa janë pushimet vjetore të paguara?",
        faq1Text: "Sipas ndryshimit të fundit të Kodit të Punës (Gusht 2024), çdo punëmarrës ka të drejtën e një minimumi prej **22 ditë pune** pushim vjetor të paguar (më parë ishin 4 javë kalendarike).",
        faq2Title: "Çfarë është baza maksimale e kontributeve?",
        faq2Text: "Është kufiri i sipërm i pagës mbi të cilin llogariten kontributet. Për vitin 2024, kjo shumë është **176,416 ALL**. Nëse paga juaj bruto është 200,000 ALL, ju do të paguani kontribute vetëm për 176,416 ALL. Tatimi (TAP), megjithatë, llogaritet mbi të gjithë shumën bruto (200,000 ALL).",
        faq3Title: "Çfarë po ndodh me taksën e profesionistëve të lirë/influencerëve?",
        faq3Text: "Në Qershor 2024, Gjykata Kushtetuese shfuqizoi shkallën 15% të tatimit mbi fitimin neto (për të ardhura 0-14 milionë ALL/vit). Shkalla 23% për fitimin mbi 14 milionë ALL mbetet në fuqi. Aktualisht, ka një boshllëk ligjor dhe pritet një skemë e re nga qeveria për vitin 2025. Ky kalkulator supozon 0% tatim për shkallën e parë deri në miratimin e ligjit të ri.",
        faq4Title: "A duhet të paguaj TVSH si profesionist i lirë/influencer?",
        faq4Text: "Ju duhet të regjistroheni si përgjegjës i TVSH-së vetëm nëse xhiroja juaj vjetore i kalon **10,000,000 ALL**.",
        faq5Title: "A duhet të lëshoj faturë për klientët e huaj?",
        faq5Text: "Po. Të gjitha të ardhurat, pavarësisht nëse vijnë nga klientë vendas apo të huaj, duhet të deklarohen dhe të fiskalizohen. Ato janë pjesë e xhiros suaj vjetore dhe janë të tatueshme në Shqipëri.",
        faq6Title: "Si tatohen pagesat në natyrë (barter) për influencerët?",
        faq6Text: "Pagesat në natyrë (p.sh., produkte, shërbime, udhëtime) konsiderohen **e ardhur e tatueshme**. Vlera e tyre e tregut duhet të shtohet në xhiron tuaj bruto vjetore dhe të tatohet si e ardhur normale. Për shkak të vështirësisë së vlerësimit, konsultohuni me një kontabilist. Përdorimi i shpenzimeve të supozuara (30%) mund të thjeshtojë llogaritjen.",
        newsTitle: "Përditësime zyrtare të tatimeve",
        newsSubtitle: "Përditësohuni me njoftimet më të fundit nga institucionet fiskale shqiptare.",
        newsLoading: "Duke ngarkuar përditësimet zyrtare...",
        newsError: "Nuk mundëm të marrim përditësimet. Ju lutemi provoni sërish pas pak.",
        newsRetry: "Provo përsëri",
        newsEmpty: "Aktualisht nuk ka përditësime të reja. Rikthehuni më vonë.",
        newsSourceLabel: "Burimi",
        newsPublished: "Publikuar",
        newsReadMore: "Lexo më shumë",
        newsLastRefreshed: (timestamp) => `Rifreskuar për herë të fundit ${timestamp}`,
        newsErrorOutage: "Shërbimi i lajmeve është përkohësisht i padisponueshëm ndërsa proxy po provon sërish.",
        programsTitle: "Programet & akademitë tona",
        programsSubtitle: "Zgjidh një program të thelluar për të trajnuar ekipin ose për të masteruar detyrimet fiskale.",
        programsEmpty: "Aktualisht nuk kemi programe të publikuara. Na kontaktoni për listën më të fundit.",
        programsList: getProgramsForLocale('sq'),
        linksTitle: "Burime Zyrtare & Lidhje të Dobishme",
        linksDpt: "Drejtoria e Përgjithshme e Tatimeve (DPT)",
        linksQkb: "Qendra Kombëtare e Biznesit (QKB)",
        linksKodiPunes: "Kodi i Punës (Tekst i plotë)",
        linksSigurime: "Instituti i Sigurimeve Shoqërore (ISSH)",
        footerCreatedBy: "Krijuar nga Kejsan Coku",
        footerCopyright: "© 2025. Llogaritjet mund të përmbajnë pasaktësi ose të mos pasqyrojnë përditësimet e fundit ligjore. Konsultohuni me një kontabilist ose këshilltar ligjor përpara se të merrni vendime financiare.",
    },
    en: {
        navHome: "Home",
        navEmployee: "Employee",
        navFreelancer: "Freelancer",
        navInfluencer: "Influencer",
        navFreelancerGuide: "Freelancer Tax Guide",
        navCalculators: "Calculators",
        navNews: "News & Updates",
        navInfo: "How does it work?",
        navFAQ: "Frequently Asked Questions (FAQ)",
        navLinks: "Official Resources",
        navContact: "Contact",
        navPrograms: "Programs",
        navTools: "Tools",
        navResources: "Resources",
        disclaimer: "ℹ️ This tool provides informational guidance only. Verify all calculations with a qualified tax or legal advisor before making decisions.",
        home: {
            heroBadge: "Smart finance hub",
            heroTitle: "Calculate salary, taxes, and contributions in seconds",
            heroSubtitle: "Pick the calculator you need for 2025 and compare scenarios without spreadsheets.",
            heroPrimaryCta: "Open the salary calculator",
            heroSecondaryCta: "Browse freelancer tools",
            calculatorsTitle: "Choose your calculator",
            calculatorsSubtitle: "Every module is tuned to Albania's 2024-2025 fiscal changes and supports multi-contract setups.",
            cards: {
                employee: {
                    title: "Employee salary calculator",
                    description: "Simulate gross/net salary, multiple contracts, and family deductions.",
                },
                freelancer: {
                    title: "Freelancer tax obligations",
                    description: "Project net profit, VAT thresholds, and contribution duties for annual turnover.",
                },
                influencer: {
                    title: "Creator & influencer modeling",
                    description: "Compare gross/net outcomes for digital platform income streams.",
                },
                guide: {
                    title: "2025 tax guide",
                    description: "Key articles, deadlines, and paperwork explained in plain language.",
                },
            },
            benefitsTitle: "Why people trust llogaritësi.al",
            benefitsSubtitle: "Plan with confidence using a single source of truth—no Excel, no guesswork.",
            benefits: [
                {
                    title: "Updated for 2025 reforms",
                    description: "We reflect the latest TAP brackets, contribution caps, and pension thresholds.",
                },
                {
                    title: "Automatic currency conversion",
                    description: "Switch between ALL, EUR, or USD while we keep exchange rates fresh.",
                },
                {
                    title: "Context-rich explanations",
                    description: "Resource sections unpack legal references, worked examples, and compliance tips.",
                },
            ],
            resourcesTitle: "Insights & resources",
            resourcesSubtitle: "Deep dives, explainers, and FAQs curated for Albanian professionals.",
            resources: {
                news: {
                    eyebrow: "Updates",
                    title: "Track fiscal news",
                    description: "Follow government announcements and turn them into actionable next steps.",
                },
                info: {
                    eyebrow: "Guide",
                    title: "Understand contributions",
                    description: "Breakdowns of social security, TAP, and monthly filing obligations.",
                },
                faq: {
                    eyebrow: "FAQ",
                    title: "Most common questions",
                    description: "Quick answers for employment, freelancing, and mixed-income scenarios.",
                },
            },
        },
        selectCurrency: "Currency",
        gross: "Gross",
        net: "Net",
        employeeTitle: "Employee Salary Calculator",
        tapWarning: "**2025 Warning:** The Payroll Tax (TAP) brackets will change in January 2025. This calculation uses the current 2024 rules.",
        hideTapNotice: "Hide warning",
        showTapNotice: "Show warning",
        tapLegalReminder: "Remember that legislative changes may take effect before January 2025. Check official sources regularly.",
        salaryInputMode: "Input mode",
        modeGrossToNet: "Gross to Net",
        modeNetToGross: "Net to Gross",
        grossMonthlySalary: "Gross Monthly Salary",
        netMonthlySalary: "Net Monthly Salary",
        workingDays: "Working days per month",
        jobLayoutLabel: "Choose employment structure",
        jobLayoutSingle: "1 contract",
        jobLayoutMulti: "2–3 contracts",
        thirdJobLabel: "Third contract (optional)",
        thirdJobAdd: "Enable third contract",
        thirdJobRemove: "Disable third contract",
        thirdJobHelper: "Use it to simulate extra income from a third contract or part-time shift.",
        dependentsLabel: "Dependent children",
        dependentsTooltip: "Family deduction under the 2025 TAP package.",
        dependentsHelper: "The declared number of children lowers the taxable base on the primary contract.",
        dependentsClampMessage: "The value was adjusted automatically to stay between 0 and 6.",
        voluntaryPensionLabel: "Voluntary pension contribution (ALL)",
        voluntaryPensionTooltip: (cap) => `Monthly deduction allowed up to ${new Intl.NumberFormat('en-US').format(cap)} ALL.`,
        voluntaryPensionHelper: (cap) => `Applied only to the primary contract and capped at ${new Intl.NumberFormat('en-US').format(cap)} ALL.`,
        voluntaryPensionWarning: (cap) => `Only ${new Intl.NumberFormat('en-US').format(cap)} ALL counts toward the deduction. Adjust the amount.`,
        jobCards: {
            primary: { title: "Primary contract", badge: "Primary" },
            secondary: { title: "Secondary contract", badge: "Secondary" },
            tertiary: { title: "Tertiary contract", badge: "Tertiary" },
            grossInputLabel: "Monthly gross salary",
            netInputLabel: "Monthly take-home salary",
            placeholder: "e.g. 120000",
            modeLabel: "Calculation mode",
            workingDays: "Working days per month",
            workingDaysHint: "Used to calculate daily pay for this contract.",
            dailyBreakdown: "Daily breakdown",
            dailyGross: "Daily gross",
            dailyNet: "Daily net",
            breakdownTitle: "Monthly details",
            contributionsLabel: "Employee contributions",
            taxLabel: "TAP tax",
            voluntaryLabel: "Voluntary pension",
            summaryGross: "Gross pay",
            summaryDeductions: "Total deductions",
            summaryNet: "Net pay",
            summaryEmployer: "Employer cost",
            taxableCaption: "Taxable base",
        },
        examples: {
            title: "Try the 2025 scenarios",
            subtitle: "Pick a typical scenario to see how contracts and family deductions interact.",
            presets: {
                singleFamily: {
                    label: "Primary · 95,000 ALL · 2 kids",
                    description: "Public sector baseline with a 25,000 ALL voluntary pension.",
                },
                dualCreative: {
                    label: "2 contracts · Creative net pay",
                    description: "Primary contract 120,000 ALL plus a secondary net-paid project.",
                },
                tripleTeam: {
                    label: "3 contracts · Mixed gross/net",
                    description: "Management example with max voluntary pension and dependents.",
                },
            },
        },
        totalMonthlyCard: {
            title: "Total monthly (all contracts)",
            subtitle: "Values auto-convert using your selected currency.",
            gross: "Total gross",
            deductions: "Deductions",
            net: "Total net",
            employer: "Employer cost",
            pensionCapAlert: (cap) => `Pension base capped at ${new Intl.NumberFormat('en-US').format(cap)} ALL.`,
        },
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
        freelancerCalculator: {
            inputs: {
                heading: "Key inputs",
                annualIncome: "Declared turnover (annual)",
                currency: "Input currency",
                localSplitHint: "Measure how concentrated your Albanian client revenue is to detect disguised-employment risk.",
                localSplit: "Domestic clients (%)",
                topClient: "Top domestic client (%)",
                topTwoClients: "Top 2 domestic clients (%)",
                percentSuffix: "% of revenue",
            },
            validation: {
                topClientExceedsLocal: "The top domestic client share cannot exceed the domestic client percentage.",
                topTwoClientsExceedsLocal: "The top two domestic clients cannot exceed the domestic client percentage.",
            },
            vatBadges: {
                under: "Under 10M ALL – No VAT",
                monitor: "Near 10M ALL – Monitor",
                over: "Above 10M ALL – VAT required",
            },
            vatDescriptions: {
                under: "You are below the statutory VAT registration limit. Keep monthly records up to date.",
                monitor: "You sit within 75%-100% of the VAT threshold. Track turnover monthly to avoid penalties.",
                over: "You exceeded the 10M ALL annual threshold. VAT registration is mandatory.",
            },
            warnings: {
                title: "Disguised employment alerts",
                singleClient: {
                    title: ">80% from one domestic client",
                    body: "If more than 80% of annual revenue comes from a single Albanian client, the tax authority may reclassify the relationship as employment.",
                },
                dualClient: {
                    title: ">90% from two domestic clients",
                    body: "When over 90% of turnover is earned from two Albanian clients, diversify contracts or formalize the engagement to avoid penalties.",
                },
            },
            summary: {
                heading: "Snapshot",
                vatLabel: "VAT status",
                contributionsLabel: "SH/SI contributions (23% + 3.4%)",
                profitTaxLabel: "Profit tax",
                netLabel: "Net income after tax",
                mixLabel: "Client mix",
                local: "Domestic",
                foreign: "Foreign",
            },
            explanations: {
                contributions: (minWageALL) => 'Calculated at 23% + 3.4% on the minimum wage ' + minWageALL + ' per month, across 12 months.',
                profitTax: (thresholdALL) => 'The 23% band applies only to net profit above ' + thresholdALL + ' after contributions.',
                vat: (thresholdALL) => 'The current VAT registration limit is ' + thresholdALL + '.',
            },
            profitBands: {
                heading: "Profit tax bands",
                zeroRate: "0% on taxable profit up to 14M ALL (after contributions).",
                highRate: "23% on net profit exceeding 14M ALL.",
                rangeLabel: (minALL, maxALL) => (maxALL === '∞' ? 'Above ' + minALL : minALL + ' – ' + maxALL),
                rateLabel: (ratePercent) => ratePercent + ' rate',
                amountLabel: "Base",
                taxLabel: "Tax",
            },
            table: {
                heading: "Annual tax outcomes",
                columns: {
                    obligation: "Obligation",
                    amount: "Amount (converted)",
                    notes: "Explanation",
                },
                rows: {
                    gross: {
                        label: "Gross turnover",
                        note: "The amount you entered above.",
                    },
                    contributions: {
                        label: "Social & health contributions",
                        note: (minWageALL) => 'Legal base: minimum wage ' + minWageALL + ' × 12 months.',
                    },
                    profitTax: {
                        label: "Profit tax",
                        note: (thresholdALL) => '0% up to ' + thresholdALL + ', then 23% on the remaining portion.',
                    },
                    net: {
                        label: "Net after tax",
                        note: "Turnover minus mandatory contributions and profit tax.",
                    },
                },
            },
        },
        freelancerGuide: {
            title: "Freelancer Tax Guide (2025)",
            intro: "Select your expected turnover and client profile to see which compliance steps apply in 2025.",
            filtersTitle: "Key parameters",
            revenueLabel: "Annual turnover",
            revenueCaption: "Choose the range that best matches your last 12 months of signed work.",
            clientMixLabel: "Client profile",
            clientMixCaption: "How concentrated are your contracts and in which markets do you operate?",
            mobileNarrativeSummary: "Show detailed recommendations",
            narrativeHeading: "Key considerations",
            actionsHeading: "Suggested actions",
            warningsHeading: "Signals to keep in mind",
            noWarningsFallback: "No immediate alerts for this setup. Keep your monthly records and compliance documents up to date.",
            thresholds: {
                vat: "10,000,000 ALL",
                profit: "14,000,000 ALL"
            },
            revenueOptions: {
                under5: "< 5M ALL · Early stage",
                '5to10': "5M–10M ALL · Below VAT threshold",
                '10to14': "10M–14M ALL · Near profit tax gate",
                above14: "> 14M ALL · Full profit tax applies"
            },
            clientMixOptions: {
                singleLocal: "One domestic anchor client",
                localPortfolio: "2–5 recurring Albanian clients",
                balanced: "Balanced local & international",
                global: "Mostly foreign clients"
            },
            table: {
                heading: "Compliance obligations overview",
                obligation: "Obligation",
                status: "Status",
                notes: "What it means"
            },
            statuses: {
                required: "Mandatory",
                threshold: "Threshold watch",
                recommended: "Recommended",
                monitor: "Monitor updates",
                caution: "Heightened caution"
            },
            statusDescriptions: {
                required: "Must be satisfied immediately.",
                threshold: "Activates as soon as you cross the relevant limit.",
                recommended: "Helps you avoid penalties or audits.",
                monitor: "Keep records and await regulatory clarity.",
                caution: "Potential risk that requires extra documentation."
            },
            obligationsHeading: "Core obligations",
            obligations: {
                registerNipt: {
                    label: "NIPT registration",
                    note: "Register with the National Business Center before issuing invoices."
                },
                socialSecurity: {
                    label: "Social & health contributions",
                    note: "Pay 27.9% on the minimum wage or your chosen base each month."
                },
                incomeTax: {
                    label: "Profit tax",
                    note: "Business income tax depends on your annual net profit."
                },
                vat: {
                    label: "VAT",
                    note: "VAT registration becomes mandatory once you cross the statutory turnover."
                },
                diva: {
                    label: "Annual DIVA return",
                    note: "File the DIVA form by 31 March for the prior tax year."
                },
                invoicing: {
                    label: "Electronic invoicing",
                    note: "Issue electronic invoices for every payment under the e-invoicing rules."
                },
                accounting: {
                    label: "Accounting & record keeping",
                    note: "Maintain expense records and contracts to justify your deductions."
                }
            },
            dynamicNotes: {
                incomeTax: {
                    under5: "Net profit up to 14M ALL currently carries 0% while we await new guidance.",
                    '5to10': "Track net profit carefully; the 0–14M bracket could change mid-year.",
                    '10to14': "Grey zone: set aside reserves in case a 15% rate is reinstated.",
                    above14: "Net profit above 14M is taxed at 23%; schedule advance payments."
                },
                vat: {
                    under5: "Well below the 10M ALL VAT threshold, but document turnover to prove volume.",
                    '5to10': "Prepare the registration package as soon as forecasts show 10M ALL within 12 months.",
                    '10to14': "You must register and submit monthly VAT returns within 15 days.",
                    above14: "VAT is compulsory; monitor input credits on foreign supplier invoices."
                },
                accounting: {
                    under5: "Simple bookkeeping software is enough at this stage.",
                    '5to10': "Produce monthly expense summaries to defend your profit margin.",
                    '10to14': "Hire an accountant to align VAT ledgers and monthly reports.",
                    above14: "Work with a licensed accountant and prepare an annual financial statement."
                }
            },
            clientNotes: {
                invoicing: {
                    singleLocal: "Service agreements and work logs help prove you are not a disguised employee.",
                    localPortfolio: "Ensure every client signs a clear engagement and receives monthly invoices.",
                    balanced: "Use the right currency and mark exported services as VAT zero-rated.",
                    global: "Apply export service codes and store evidence of cross-border delivery."
                },
                accounting: {
                    singleLocal: "Document independence (schedules, invoices, your own equipment) to defend your status.",
                    localPortfolio: "Segment revenue per client to demonstrate diversification.",
                    balanced: "Classify revenue by country for statistical and tax reporting.",
                    global: "Track exchange rates used for ALL conversions when closing your books."
                }
            },
            warnings: {
                disguisedTitle: "Disguised employment risk",
                disguisedBody: "A single domestic client may be treated as an employment relationship. Keep a service contract, flexible timelines, and proof of independence.",
                vatTitle: "VAT threshold alert",
                vatBody: "Crossing 10,000,000 ALL in any rolling 12 months triggers mandatory VAT registration within 15 days.",
                profitTitle: "23% profit tax applies",
                profitBody: "Net profit above 14,000,000 ALL is taxed at 23%. Plan quarterly installments and consult your accountant."
            },
            details: {
                under5: {
                    singleLocal: {
                        title: "Starter with one domestic client",
                        summary: "You are in an early phase with a single Albanian contract. Legal independence is the priority while you build a pipeline.",
                        actions: [
                            "Frame the contract as consultancy with clearly defined deliverables and flexible hours.",
                            "Pay contributions every month to avoid late-payment interest.",
                            "Invest time in prospecting to reduce reliance on one payer."
                        ]
                    },
                    localPortfolio: {
                        title: "Growing local freelancer",
                        summary: "Managing several Albanian clients under 5M ALL. Focus on invoicing discipline and tidy records.",
                        actions: [
                            "Adopt a lightweight invoicing tool with automated e-fiscalization.",
                            "Keep expense receipts to support your chosen deduction method.",
                            "Plan a gradual increase of the contribution base after your first year."
                        ]
                    },
                    balanced: {
                        title: "Balanced mix in launch phase",
                        summary: "A mix of domestic and foreign clients with low turnover. Track exported services and currency conversions.",
                        actions: [
                            "Invoice in the client currency and note 'exported service – VAT 0%'.",
                            "Convert receipts to ALL using the official rate on the invoice date.",
                            "Store translated contracts for potential tax inspections."
                        ]
                    },
                    global: {
                        title: "Early digital exporter",
                        summary: "Mostly foreign clients at modest turnover. Emphasize export evidence and exchange-rate management.",
                        actions: [
                            "Archive international payment proofs (SWIFT, PayPal, Stripe).",
                            "Use accurate methods to calculate profit in ALL.",
                            "Monitor foreign currency expenses to protect your margin."
                        ]
                    }
                },
                '5to10': {
                    singleLocal: {
                        title: "Single contract near VAT threshold",
                        summary: "Turnover is approaching 10M ALL with one client. Diversifying is crucial to mitigate disguised employment risk.",
                        actions: [
                            "Negotiate clauses that confirm independence and permit work for other clients.",
                            "Track monthly turnover to predict the VAT registration date.",
                            "Set aside 10–15% of revenue for unexpected tax liabilities."
                        ]
                    },
                    localPortfolio: {
                        title: "Local freelancer scaling up",
                        summary: "Your domestic portfolio is growing toward 10M ALL. Discipline in billing and documentation is key.",
                        actions: [
                            "Automate turnover reports to calculate the rolling 12-month figure.",
                            "Consider a dedicated business bank account for transparency.",
                            "Prepare the VAT registration file (NIPT, contracts, turnover evidence)."
                        ]
                    },
                    balanced: {
                        title: "Mid-range mixed portfolio",
                        summary: "Turnover of 5–10M ALL across domestic and foreign clients demands dual VAT and export tracking.",
                        actions: [
                            "Separate invoices that carry VAT from zero-rated export services.",
                            "Review foreign contracts to avoid withholding tax abroad.",
                            "Update pricing to cover the future cost of VAT compliance."
                        ]
                    },
                    global: {
                        title: "Steady exporter",
                        summary: "Revenue of 5–10M ALL mainly from abroad. Focus on export documentation and converting taxes into ALL.",
                        actions: [
                            "Keep export proofs (contracts, correspondence, digital delivery logs).",
                            "Manage currency flows using monthly average rates for filings.",
                            "Check double-tax treaties to avoid foreign withholding taxes."
                        ]
                    }
                },
                '10to14': {
                    singleLocal: {
                        title: "Large domestic contract with VAT",
                        summary: "Crossing 10M ALL with one Albanian client requires VAT registration and increases reclassification scrutiny.",
                        actions: [
                            "File monthly VAT returns and claim input credits where allowed.",
                            "Document timelines, deliverables, and the tools you own.",
                            "Ensure the client accepts VAT invoices and pays on schedule."
                        ]
                    },
                    localPortfolio: {
                        title: "Boutique freelance agency",
                        summary: "Multiple domestic clients above 10M ALL need professional bookkeeping and profit monitoring.",
                        actions: [
                            "Set payment policies to manage output and input VAT.",
                            "Forecast net profit to gauge a potential 15% tax reinstatement.",
                            "Implement a digital archive for contracts and work evidence."
                        ]
                    },
                    balanced: {
                        title: "Mature mixed portfolio with VAT",
                        summary: "Turnover of 10–14M ALL with mixed clients requires coordination between VAT invoices and exported services.",
                        actions: [
                            "Split sales ledgers between VATable and zero-rated invoices.",
                            "Check foreign withholding taxes and apply treaty relief where possible.",
                            "Plan cash flow for monthly VAT and contribution payments."
                        ]
                    },
                    global: {
                        title: "Advanced exporter",
                        summary: "Turnover of 10–14M ALL from abroad. VAT on sales is zero, but reporting and profit tax must be airtight.",
                        actions: [
                            "Declare exports at 0% VAT and recover eligible local input VAT.",
                            "Support net profit with properly documented expenses.",
                            "Maintain a tax calendar for prepayments and cross-border filings."
                        ]
                    }
                },
                above14: {
                    singleLocal: {
                        title: "Single domestic contract under full tax",
                        summary: "Above 14M ALL with one client triggers the 23% profit tax and likely employment audits.",
                        actions: [
                            "Pay quarterly profit-tax and VAT installments on time.",
                            "Seek professional advice on the contract structure to avoid reclassification.",
                            "Diversify revenue streams to reduce operational risk."
                        ]
                    },
                    localPortfolio: {
                        title: "High-volume domestic freelancer",
                        summary: "A large Albanian client base above 14M ALL needs full accounting systems and cost control.",
                        actions: [
                            "Create monthly budgets to monitor post-tax margins.",
                            "Update contracts with VAT clauses and late-payment penalties.",
                            "Assess whether incorporating could provide tax efficiencies."
                        ]
                    },
                    balanced: {
                        title: "Seasoned international portfolio",
                        summary: "Above 14M ALL across local and foreign clients demands integrated tax strategy and currency oversight.",
                        actions: [
                            "Produce separate reports for export and domestic revenue.",
                            "Optimize deductible expenses to lower the 23% tax base.",
                            "Work with a licensed accountant on the year-end close."
                        ]
                    },
                    global: {
                        title: "Premium exporter",
                        summary: "Turnover above 14M ALL mainly from foreign clients calls for focus on double-tax treaties and FX risk.",
                        actions: [
                            "Check if client countries levy withholding tax and claim credits.",
                            "Optimize foreign-currency spending to protect net profit.",
                            "Plan cash flow for higher tax installments and contributions."
                        ]
                    }
                }
            }
        },
        influencerTitle: "Influencer Obligation Calculator",
        influencerWarning: "NOTE FOR INFLUENCERS:",
        influencerWarningText: "Your fiscal treatment is the same as a **Free Professional**. The main difference is in-kind payments (barter). It is recommended to use the **presumed expenses (30%)** method due to the complexity of valuing products or services received as payment.",
        infoTitle: "How does the Calculator work?",
        infoIntro: "This section summarises how salaries are taxed in Albania, highlights the announced 2025 reforms, and lists follow-up obligations for employees and contractors.",
        infoTopics: [
            {
                title: "Salary tax breakdown (2024)",
                content: `
<p>Your gross salary is split across three main components:</p>
<ul>
<li><strong>Employee social & health contributions (11.2%)</strong> are calculated on the gross salary up to the maximum base of 176,416 ALL.</li>
<li><strong>Progressive payroll tax (TAP)</strong>: 0% on the first 30,000 ALL, 13% on the slice between 30,001 and 200,000 ALL, and 23% on anything above 200,000 ALL.</li>
<li><strong>Net salary</strong> is what remains after contributions and TAP are deducted.</li>
</ul>
<p><strong>Example:</strong> A 120,000 ALL gross salary results in 13,440 ALL contributions and 9,953 ALL TAP, leaving a net salary of about 96,607 ALL.</p>
`
            },
            {
                title: "What changes in 2024–2025",
                content: `
<p>The 2025 fiscal package introduces rules you should keep on your radar:</p>
<ul>
<li><strong>During 2024</strong> the existing TAP brackets of 0% / 13% / 23% remain in force.</li>
<li><strong>From January 2025</strong>: family allowances for dependent children reduce the taxable base and the monthly TAP thresholds are expected to be refreshed. Preview modes in this calculator let you model these scenarios.</li>
<li><strong>Voluntary pension plans</strong> move to a unified monthly reporting format on e-Albania.</li>
</ul>
<p>Always double-check official DPT announcements because secondary legislation can shift timelines.</p>
`
            },
            {
                title: "Net to gross: step-by-step",
                content: `
<p>To convert a target net salary into a gross amount you:</p>
<ol>
<li>Add the employee contributions (11.2%) on top of the unknown gross amount.</li>
<li>Apply TAP on the taxable base (gross – contributions) according to the brackets.</li>
<li>Iterate the gross amount until the net result matches the desired figure.</li>
</ol>
<p><strong>Worked example:</strong> To take home 90,000 ALL you need roughly 111,448 ALL gross. Contributions are about 12,482 ALL and TAP is approximately 8,966 ALL.</p>
`
            },
            {
                title: "Voluntary pension rules and benefits",
                content: `
<p>Voluntary pension contributions of up to 50,000 ALL per month on the primary contract are deductible from the taxable base.</p>
<table>
<thead>
<tr><th>Monthly contribution</th><th>Annual deductible amount</th><th>TAP saving (13%)</th></tr>
</thead>
<tbody>
<tr><td>10,000 ALL</td><td>120,000 ALL</td><td>15,600 ALL</td></tr>
<tr><td>25,000 ALL</td><td>300,000 ALL</td><td>39,000 ALL</td></tr>
<tr><td>50,000 ALL</td><td>600,000 ALL</td><td>78,000 ALL</td></tr>
</tbody>
</table>
<p>The tax benefit applies only when payments go through a licensed fund and are reported to the tax administration.</p>
`
            },
            {
                title: "Annual DIVA filing",
                content: `
<p>The DIVA (annual personal income declaration) must be filed by 30 April of the following year if:</p>
<ul>
<li>Your annual employment income exceeds 1.2 million ALL, even from a single employer.</li>
<li>You earn income from more than one payer (e.g. salary plus service fees).</li>
<li>You receive other taxable income such as rent, dividends or capital gains.</li>
</ul>
<p>Missing the deadline triggers fines, so keep your payslips and withholding certificates ready for the submission.</p>
`
            }
        ],
        faqTitle: "Frequently Asked Questions (FAQ)",
        faq1Title: "How much paid annual leave do I get?",
        faq1Text: "According to the latest change in the Labor Code (August 2024), every employee is entitled to a minimum of **22 working days** of paid annual leave (it was previously 4 calendar weeks).",
        faq2Title: "What is the maximum contribution base?",
        faq2Text: "It's the upper limit of salary on which contributions are calculated. For 2024, this amount is **176,416 ALL**. If your gross salary is 200,000 ALL, you will only pay contributions on 176,416 ALL. The Income Tax (TAP), however, is calculated on the full gross amount (200,000 ALL).",
        faq3Title: "What is happening with the freelancer/influencer tax?",
        faq3Text: "In June 2024, the Constitutional Court repealed the 15% tax rate on net profit (for income 0-14 million ALL/year). The 23% rate for profit over 14 million ALL remains in effect. There is currently a legal vacuum, and a new scheme is expected from the government for 2025. This calculator assumes a 0% tax for the first bracket until the new law is passed.",
        faq4Title: "Do I have to register for VAT as a freelancer/influencer?",
        faq4Text: "You only need to register for VAT (TVSH) if your annual turnover exceeds **10,000,000 ALL**.",
        faq5Title: "Do I have to invoice foreign clients?",
        faq5Text: "Yes. All income, whether from local or foreign clients, must be declared and fiscalized. It is part of your annual turnover and is taxable in Albania.",
        faq6Title: "How are in-kind (barter) payments taxed for influencers?",
        faq6Text: "In-kind payments (e.g., products, services, trips) are considered **taxable income**. Their market value must be added to your gross annual turnover and taxed as normal income. Due to the difficulty of valuation, consult an accountant. Using presumed expenses (30%) can simplify the calculation.",
        newsTitle: "Official fiscal updates",
        newsSubtitle: "Stay on top of the latest announcements from Albanian tax institutions.",
        newsLoading: "Loading official updates...",
        newsError: "We couldn’t fetch the latest updates. Please try again shortly.",
        newsRetry: "Try again",
        newsEmpty: "No new updates are available at the moment. Please check back soon.",
        newsSourceLabel: "Source",
        newsPublished: "Published",
        newsReadMore: "Read more",
        newsLastRefreshed: (timestamp) => `Last refreshed ${timestamp}`,
        newsErrorOutage: "The news service is temporarily unavailable while the proxy retries.",
        programsTitle: "Programs & academies",
        programsSubtitle: "Choose a deep-dive cohort or tailored workshop to master Albania's 2025 tax changes.",
        programsEmpty: "No programs are published right now. Contact us to get the latest cohort list.",
        programsList: getProgramsForLocale('en'),
        linksTitle: "Official Resources & Useful Links",
        linksDpt: "General Directorate of Taxes (DPT)",
        linksQkb: "National Business Center (QKB)",
        linksKodiPunes: "Labor Code (Full Text)",
        linksSigurime: "Social Insurance Institute (ISSH)",
        footerCreatedBy: "Created by Kejsan Coku",
        footerCopyright: "© 2025. Calculations may include inaccuracies or omit recent legal updates. Seek advice from a certified accountant or legal professional before making financial decisions.",
    },
    it: {
        navHome: "Home",
        navEmployee: "Dipendente",
        navFreelancer: "Freelancer",
        navInfluencer: "Influencer",
        navFreelancerGuide: "Guida Fiscale Freelancer",
        navCalculators: "Calcolatori",
        navNews: "Notizie & Aggiornamenti",
        navInfo: "Come funziona?",
        navFAQ: "Domande Frequenti (FAQ)",
        navLinks: "Risorse Ufficiali",
        navContact: "Contatti",
        navPrograms: "Programmi",
        navTools: "Strumenti",
        navResources: "Risorse",
        disclaimer: "ℹ️ Questo strumento offre solo indicazioni informative. Verifica tutti i calcoli con un consulente fiscale o legale qualificato prima di prendere decisioni.",
        home: {
            heroBadge: "Hub finanziario smart",
            heroTitle: "Calcola stipendi, tasse e contributi in pochi secondi",
            heroSubtitle: "Scegli lo strumento che ti serve per il 2025 e confronta gli scenari senza fogli Excel.",
            heroPrimaryCta: "Apri il calcolatore stipendio",
            heroSecondaryCta: "Esplora gli strumenti per freelancer",
            calculatorsTitle: "Scegli il calcolatore giusto",
            calculatorsSubtitle: "Ogni modulo è aggiornato alla riforma fiscale 2024-2025 dell'Albania e supporta contratti multipli.",
            cards: {
                employee: {
                    title: "Calcolatore stipendio dipendente",
                    description: "Simula lordo/netto, contratti multipli e detrazioni familiari.",
                },
                freelancer: {
                    title: "Obblighi fiscali del freelancer",
                    description: "Analizza l'utile netto, le soglie IVA e i contributi in base al fatturato annuale.",
                },
                influencer: {
                    title: "Modelli per creator e influencer",
                    description: "Confronta scenari lordo/netto per entrate da piattaforme digitali.",
                },
                guide: {
                    title: "Guida fiscale 2025",
                    description: "Articoli chiave, scadenze e documenti spiegati in modo semplice.",
                },
            },
            benefitsTitle: "Perché fidarsi di llogaritësi.al",
            benefitsSubtitle: "Pianifica con una sola fonte affidabile, senza stime manuali o incertezze normative.",
            benefits: [
                {
                    title: "Aggiornato alle riforme 2025",
                    description: "Recepiamo le nuove aliquote TAP, i massimali contributivi e le soglie pensionistiche.",
                },
                {
                    title: "Conversione valuta automatica",
                    description: "Passa tra ALL, EUR o USD mantenendo tassi di cambio sempre aggiornati.",
                },
                {
                    title: "Spiegazioni ricche di contesto",
                    description: "Le sezioni informative includono riferimenti legali, esempi pratici e consigli di compliance.",
                },
            ],
            resourcesTitle: "Approfondimenti & risorse",
            resourcesSubtitle: "Analisi, guide e FAQ curate per professionisti in Albania.",
            resources: {
                news: {
                    eyebrow: "Aggiornamenti",
                    title: "Segui le notizie fiscali",
                    description: "Monitoriamo i comunicati governativi e li traduciamo in azioni concrete.",
                },
                info: {
                    eyebrow: "Guida",
                    title: "Comprendere i contributi",
                    description: "Spieghiamo previdenza sociale, TAP e adempimenti mensili.",
                },
                faq: {
                    eyebrow: "FAQ",
                    title: "Domande più frequenti",
                    description: "Risposte rapide per lavoro dipendente, freelancing e redditi misti.",
                },
            },
        },
        selectCurrency: "Valuta",
        gross: "Lordo",
        net: "Netto",
        employeeTitle: "Calcolatore Stipendio Dipendente",
        tapWarning: "**Avviso 2025:** Le aliquote dell'imposta sul reddito (TAP) cambieranno a gennaio 2025. Questo calcolo utilizza le regole attuali del 2024.",
        hideTapNotice: "Nascondi avviso",
        showTapNotice: "Mostra avviso",
        tapLegalReminder: "Ricorda che i cambiamenti normativi potrebbero entrare in vigore prima di gennaio 2025. Controlla regolarmente le fonti ufficiali.",
        salaryInputMode: "Modalità di input",
        modeGrossToNet: "Lordo a Netto",
        modeNetToGross: "Netto a Lordo",
        grossMonthlySalary: "Stipendio Lordo Mensile",
        netMonthlySalary: "Stipendio Netto Mensile",
        workingDays: "Giorni lavorativi al mese",
        jobLayoutLabel: "Scegli la struttura dei rapporti di lavoro",
        jobLayoutSingle: "1 contratto",
        jobLayoutMulti: "2–3 contratti",
        thirdJobLabel: "Terzo contratto (opzionale)",
        thirdJobAdd: "Attiva terzo contratto",
        thirdJobRemove: "Disattiva terzo contratto",
        thirdJobHelper: "Usalo per simulare entrate extra da un terzo contratto o da turni part-time.",
        dependentsLabel: "Figli a carico",
        dependentsTooltip: "Detrazione familiare prevista dal pacchetto TAP 2025.",
        dependentsHelper: "Il numero dichiarato di figli riduce la base imponibile del contratto primario.",
        dependentsClampMessage: "Il valore è stato adattato automaticamente per rimanere tra 0 e 6.",
        voluntaryPensionLabel: "Contributo pensione volontaria (ALL)",
        voluntaryPensionTooltip: (cap) => `Deduzione mensile consentita fino a ${new Intl.NumberFormat('it-IT').format(cap)} ALL.`,
        voluntaryPensionHelper: (cap) => `Si applica solo al contratto primario ed è limitata a ${new Intl.NumberFormat('it-IT').format(cap)} ALL.`,
        voluntaryPensionWarning: (cap) => `Ai fini TAP vengono considerati solo ${new Intl.NumberFormat('it-IT').format(cap)} ALL. Controlla l'importo.`,
        jobCards: {
            primary: { title: "Contratto primario", badge: "Primario" },
            secondary: { title: "Contratto secondario", badge: "Secondario" },
            tertiary: { title: "Contratto terziario", badge: "Terziario" },
            grossInputLabel: "Retribuzione lorda mensile",
            netInputLabel: "Retribuzione netta mensile",
            placeholder: "Es. 120000",
            modeLabel: "Modalità di calcolo",
            workingDays: "Giorni lavorativi al mese",
            workingDaysHint: "Serve per calcolare il compenso giornaliero di questo contratto.",
            dailyBreakdown: "Analisi giornaliera",
            dailyGross: "Lordo giornaliero",
            dailyNet: "Netto giornaliero",
            breakdownTitle: "Dettagli mensili",
            contributionsLabel: "Contributi dipendente",
            taxLabel: "Imposta TAP",
            voluntaryLabel: "Pensione volontaria",
            summaryGross: "Retribuzione lorda",
            summaryDeductions: "Totale trattenute",
            summaryNet: "Retribuzione netta",
            summaryEmployer: "Costo azienda",
            taxableCaption: "Base imponibile",
        },
        examples: {
            title: "Prova gli scenari 2025",
            subtitle: "Scegli uno scenario tipico per vedere come interagiscono contratti e detrazioni familiari.",
            presets: {
                singleFamily: {
                    label: "Primario · 95.000 ALL · 2 figli",
                    description: "Base settore pubblico con pensione volontaria da 25.000 ALL.",
                },
                dualCreative: {
                    label: "2 contratti · Netto creativo",
                    description: "Contratto principale da 120.000 ALL e progetto secondario pagato al netto.",
                },
                tripleTeam: {
                    label: "3 contratti · Lordo/netto misto",
                    description: "Esempio manageriale con pensione volontaria massima e figli a carico.",
                },
            },
        },
        totalMonthlyCard: {
            title: "Totale mensile (tutti i contratti)",
            subtitle: "Le cifre si aggiornano automaticamente nella valuta selezionata.",
            gross: "Totale lordo",
            deductions: "Trattenute",
            net: "Totale netto",
            employer: "Costo azienda",
            pensionCapAlert: (cap) => `Base pensionabile al limite di ${new Intl.NumberFormat('it-IT').format(cap)} ALL.`,
        },
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
        freelancerGuide: {
            title: "Guida Fiscale Freelancer (2025)",
            intro: "Seleziona il fatturato atteso e il profilo clienti per vedere quali adempimenti valgono nel 2025.",
            filtersTitle: "Parametri chiave",
            revenueLabel: "Fatturato annuo",
            revenueCaption: "Scegli l'intervallo che riflette meglio gli ultimi 12 mesi di contratti.",
            clientMixLabel: "Profilo clienti",
            clientMixCaption: "Quanto sono concentrate le tue commesse e su quali mercati lavori?",
            mobileNarrativeSummary: "Mostra le raccomandazioni dettagliate",
            narrativeHeading: "Cosa considerare",
            actionsHeading: "Azioni consigliate",
            warningsHeading: "Segnali da ricordare",
            noWarningsFallback: "Nessun avviso immediato per questa configurazione. Mantieni aggiornati registri mensili e documentazione di conformità.",
            thresholds: {
                vat: "10,000,000 ALL",
                profit: "14,000,000 ALL"
            },
            revenueOptions: {
                under5: "< 5M ALL · Fase iniziale",
                '5to10': "5M–10M ALL · Sotto soglia IVA",
                '10to14': "10M–14M ALL · Vicino all'imposta sugli utili",
                above14: "> 14M ALL · Aliquota piena sugli utili"
            },
            clientMixOptions: {
                singleLocal: "Un solo cliente domestico principale",
                localPortfolio: "2–5 clienti albanesi ricorrenti",
                balanced: "Mix locale e internazionale",
                global: "Prevalenza clienti esteri"
            },
            table: {
                heading: "Panoramica obblighi fiscali",
                obligation: "Obbligo",
                status: "Stato",
                notes: "Significato"
            },
            statuses: {
                required: "Obbligatorio",
                threshold: "Soglia da monitorare",
                recommended: "Raccomandato",
                monitor: "Monitorare aggiornamenti",
                caution: "Attenzione elevata"
            },
            statusDescriptions: {
                required: "Da adempiere immediatamente.",
                threshold: "Si attiva appena superi il limite previsto.",
                recommended: "Aiuta a evitare sanzioni o verifiche.",
                monitor: "Conserva la documentazione in attesa di chiarimenti.",
                caution: "Rischio potenziale che richiede ulteriore documentazione."
            },
            obligationsHeading: "Obblighi principali",
            obligations: {
                registerNipt: {
                    label: "Registrazione NIPT",
                    note: "Registrati presso il Centro Nazionale delle Imprese prima di emettere fatture."
                },
                socialSecurity: {
                    label: "Contributi previdenziali e sanitari",
                    note: "Versa il 27,9% sul salario minimo o sulla base scelta ogni mese."
                },
                incomeTax: {
                    label: "Imposta sugli utili",
                    note: "L'imposta sul reddito d'impresa dipende dall'utile netto annuale."
                },
                vat: {
                    label: "IVA",
                    note: "L'iscrizione IVA diventa obbligatoria una volta superata la soglia di fatturato."
                },
                diva: {
                    label: "Dichiarazione annuale DIVA",
                    note: "Presenta il modello DIVA entro il 31 marzo per l'anno precedente."
                },
                invoicing: {
                    label: "Fatturazione elettronica",
                    note: "Emetti fatture elettroniche per ogni pagamento secondo le regole di fiscalizzazione."
                },
                accounting: {
                    label: "Contabilità e archiviazione",
                    note: "Conserva spese e contratti per giustificare le deduzioni."
                }
            },
            dynamicNotes: {
                incomeTax: {
                    under5: "Attualmente l'utile fino a 14M ALL è al 0%, in attesa di nuove istruzioni.",
                    '5to10': "Monitora attentamente l'utile: la fascia 0–14M ALL potrebbe cambiare in corso d'anno.",
                    '10to14': "Zona grigia: accantona riserve nel caso torni l'aliquota del 15%.",
                    above14: "L'utile sopra 14M è tassato al 23%; pianifica i versamenti in acconto."
                },
                vat: {
                    under5: "Ben al di sotto della soglia IVA di 10M ALL, ma documenta il fatturato per provarne il volume.",
                    '5to10': "Prepara la pratica di iscrizione non appena prevedi di superare 10M ALL in 12 mesi.",
                    '10to14': "Devi iscriverti e presentare le liquidazioni IVA mensili entro 15 giorni.",
                    above14: "L'IVA è obbligatoria; controlla i crediti IVA sugli acquisti esteri."
                },
                accounting: {
                    under5: "È sufficiente una contabilità semplificata o un software base.",
                    '5to10': "Produci riepiloghi mensili delle spese per difendere il margine.",
                    '10to14': "Coinvolgi un commercialista per allineare registri IVA e comunicazioni mensili.",
                    above14: "Lavora con un commercialista abilitato e prepara un bilancio annuale."
                }
            },
            clientNotes: {
                invoicing: {
                    singleLocal: "Contratti di servizio e report di lavoro aiutano a dimostrare che non sei un dipendente mascherato.",
                    localPortfolio: "Assicurati che ogni cliente firmi un incarico chiaro e riceva fattura mensile.",
                    balanced: "Usa la valuta corretta e indica i servizi esportati come IVA zero.",
                    global: "Applica i codici per servizi esportati e conserva le prove della consegna transfrontaliera."
                },
                accounting: {
                    singleLocal: "Documenta l'autonomia (scadenze, fatture, attrezzatura propria) per difendere lo status.",
                    localPortfolio: "Segmenta i ricavi per cliente per dimostrare la diversificazione.",
                    balanced: "Classifica i ricavi per paese ai fini statistici e fiscali.",
                    global: "Traccia i cambi utilizzati per convertire in ALL a fine esercizio."
                }
            },
            warnings: {
                disguisedTitle: "Rischio di lavoro subordinato",
                disguisedBody: "Un unico cliente domestico può essere considerato rapporto di lavoro. Mantieni contratto di servizio, scadenze flessibili e prove di autonomia.",
                vatTitle: "Allerta soglia IVA",
                vatBody: "Il superamento di 10,000,000 ALL in 12 mesi mobili impone l'iscrizione IVA entro 15 giorni.",
                profitTitle: "Aliquota 23% sugli utili",
                profitBody: "L'utile netto oltre 14,000,000 ALL è tassato al 23%. Pianifica acconti trimestrali e consulta il commercialista."
            },
            details: {
                under5: {
                    singleLocal: {
                        title: "Avvio con un cliente domestico",
                        summary: "Sei nella fase iniziale con un solo contratto albanese. L'autonomia legale è prioritaria mentre costruisci il portafoglio.",
                        actions: [
                            "Imposta il contratto come consulenza con deliverable chiari e orari flessibili.",
                            "Versa i contributi ogni mese per evitare interessi di mora.",
                            "Dedica tempo alla ricerca di nuovi clienti per ridurre la dipendenza da uno solo."
                        ]
                    },
                    localPortfolio: {
                        title: "Freelancer locale in crescita",
                        summary: "Gestisci diversi clienti albanesi sotto 5M ALL. Concentrati su fatturazione e archiviazione ordinata.",
                        actions: [
                            "Adotta un gestionale leggero con fiscalizzazione automatica.",
                            "Conserva le spese con fattura per sostenere il metodo di deduzione scelto.",
                            "Pianifica un aumento graduale della base contributiva dopo il primo anno."
                        ]
                    },
                    balanced: {
                        title: "Mix bilanciato in fase di lancio",
                        summary: "Un mix di clienti locali e esteri con fatturato contenuto. Traccia i servizi esportati e le conversioni di valuta.",
                        actions: [
                            "Fattura nella valuta del cliente indicando 'servizio esportato – IVA 0%'.",
                            "Converti gli incassi in ALL con il cambio ufficiale della data fattura.",
                            "Archivia contratti tradotti per eventuali verifiche fiscali."
                        ]
                    },
                    global: {
                        title: "Esportatore digitale alle prime armi",
                        summary: "Prevalenza clienti esteri con fatturato modesto. Cura le prove di export e la gestione dei cambi.",
                        actions: [
                            "Archivia le prove di pagamento internazionali (SWIFT, PayPal, Stripe).",
                            "Usa metodi accurati per calcolare l'utile in ALL.",
                            "Monitora le spese in valuta per proteggere il margine."
                        ]
                    }
                },
                '5to10': {
                    singleLocal: {
                        title: "Contratto unico vicino alla soglia IVA",
                        summary: "Il fatturato si avvicina a 10M ALL con un solo cliente. Diversificare è essenziale per evitare il rischio di lavoro subordinato.",
                        actions: [
                            "Negozia clausole che confermino l'autonomia e permettano altri incarichi.",
                            "Controlla il fatturato mensile per prevedere la data di iscrizione IVA.",
                            "Accantona il 10–15% dei ricavi per eventuali imposte impreviste."
                        ]
                    },
                    localPortfolio: {
                        title: "Freelancer locale in espansione",
                        summary: "Il portafoglio domestico cresce verso 10M ALL. Servono disciplina in fatturazione e documentazione.",
                        actions: [
                            "Automatizza i report di fatturato per calcolare i 12 mesi mobili.",
                            "Valuta un conto bancario dedicato all'attività per maggiore trasparenza.",
                            "Prepara la pratica IVA (NIPT, contratti, evidenze di fatturato)."
                        ]
                    },
                    balanced: {
                        title: "Portafoglio misto di fascia media",
                        summary: "Fatturato 5–10M ALL tra clienti locali ed esteri richiede doppio monitoraggio IVA/export.",
                        actions: [
                            "Separa le fatture con IVA da quelle a zero per export.",
                            "Rivedi i contratti esteri per evitare ritenute alla fonte all'estero.",
                            "Aggiorna il listino per coprire i futuri costi di compliance IVA."
                        ]
                    },
                    global: {
                        title: "Esportatore costante",
                        summary: "Ricavi 5–10M ALL soprattutto dall'estero. Concentrati su prove d'export e conversione fiscale in ALL.",
                        actions: [
                            "Conserva prove di export (contratti, corrispondenza, log di consegna digitale).",
                            "Gestisci i flussi valutari usando cambi medi mensili per le dichiarazioni.",
                            "Verifica le convenzioni contro la doppia imposizione per evitare ritenute estere."
                        ]
                    }
                },
                '10to14': {
                    singleLocal: {
                        title: "Grande contratto domestico con IVA",
                        summary: "Superare 10M ALL con un solo cliente albanese richiede iscrizione IVA e aumenta il rischio di riclassificazione.",
                        actions: [
                            "Presenta le liquidazioni IVA mensili e recupera i crediti ammessi.",
                            "Documenta tempistiche, deliverable e strumenti di tua proprietà.",
                            "Assicurati che il cliente accetti fatture con IVA e paghi puntualmente."
                        ]
                    },
                    localPortfolio: {
                        title: "Mini agenzia freelance",
                        summary: "Più clienti domestici oltre 10M ALL richiedono contabilità professionale e controllo dell'utile.",
                        actions: [
                            "Definisci politiche di incasso per gestire IVA a debito e a credito.",
                            "Prevedi l'utile netto per valutare un possibile ritorno dell'aliquota 15%.",
                            "Implementa un archivio digitale per contratti e report di lavoro."
                        ]
                    },
                    balanced: {
                        title: "Portafoglio maturo con IVA",
                        summary: "Fatturato 10–14M ALL misto richiede coordinamento tra fatture IVA e servizi esportati.",
                        actions: [
                            "Dividi i registri vendite tra operazioni imponibili e a zero.",
                            "Controlla le ritenute estere e applica eventuali convenzioni.",
                            "Pianifica il cash flow per IVA mensile e contributi."
                        ]
                    },
                    global: {
                        title: "Esportatore avanzato",
                        summary: "Fatturato 10–14M ALL dall'estero. Le vendite sono a IVA zero ma reportistica e imposta sugli utili devono essere impeccabili.",
                        actions: [
                            "Dichiara gli export a IVA 0% e recupera l'IVA sugli acquisti locali ammessi.",
                            "Sostieni l'utile netto con spese documentate in modo rigoroso.",
                            "Mantieni un calendario fiscale per acconti e adempimenti transfrontalieri."
                        ]
                    }
                },
                above14: {
                    singleLocal: {
                        title: "Contratto domestico con tassazione piena",
                        summary: "Oltre 14M ALL con un solo cliente attiva l'aliquota 23% e probabili verifiche sul rapporto di lavoro.",
                        actions: [
                            "Versa puntualmente acconti trimestrali di imposta sugli utili e IVA.",
                            "Richiedi consulenza professionale sulla struttura contrattuale per evitare riclassificazioni.",
                            "Diversifica le entrate per ridurre il rischio operativo."
                        ]
                    },
                    localPortfolio: {
                        title: "Freelancer domestico ad alto volume",
                        summary: "Un ampio portafoglio albanese sopra 14M ALL necessita di sistemi contabili completi e controllo dei costi.",
                        actions: [
                            "Predisponi budget mensili per monitorare il margine post imposte.",
                            "Aggiorna i contratti con clausole IVA e penali per ritardi.",
                            "Valuta se aprire una società può offrire vantaggi fiscali."
                        ]
                    },
                    balanced: {
                        title: "Portafoglio internazionale maturo",
                        summary: "Oltre 14M ALL tra clienti locali ed esteri richiede strategia fiscale integrata e gestione delle valute.",
                        actions: [
                            "Produci report separati per ricavi export e domestici.",
                            "Ottimizza le spese deducibili per ridurre la base imponibile al 23%.",
                            "Collabora con un commercialista abilitato per la chiusura annuale."
                        ]
                    },
                    global: {
                        title: "Esportatore premium",
                        summary: "Fatturato oltre 14M ALL prevalentemente estero impone attenzione alle convenzioni contro la doppia imposizione e al rischio cambio.",
                        actions: [
                            "Verifica eventuali ritenute nei paesi dei clienti e richiedi i crediti d'imposta.",
                            "Ottimizza le spese in valuta per proteggere l'utile netto.",
                            "Pianifica il cash flow per acconti e contributi più elevati."
                        ]
                    }
                }
            }
        },
        influencerTitle: "Calcolatore Obblighi (Influencer)",
        influencerWarning: "NOTA PER INFLUENCER:",
        influencerWarningText: "Il tuo trattamento fiscale è identico a quello di un **Libero Professionista**. La differenza principale sono i pagamenti in natura (barter). Si raccomanda di utilizzare il metodo delle **spese forfettarie (30%)** a causa della complessità nella valutazione dei prodotti o servizi ricevuti come pagamento.",
        infoTitle: "Come funziona il Calcolatore?",
        infoIntro: "Questa sezione riassume la tassazione dello stipendio in Albania, le novità annunciate per il 2025 e gli adempimenti annuali da non dimenticare.",
        infoTopics: [
            {
                title: "Ripartizione fiscale dello stipendio (2024)",
                content: `
<p>Lo stipendio lordo si divide in tre componenti principali:</p>
<ul>
<li><strong>Contributi a carico del dipendente (11,2%)</strong> calcolati sul lordo fino al massimale di 176.416 ALL.</li>
<li><strong>Imposta progressiva TAP</strong>: 0% sui primi 30.000 ALL, 13% sulla fascia tra 30.001 e 200.000 ALL e 23% oltre 200.000 ALL.</li>
<li><strong>Stipendio netto</strong> è quanto resta dopo contributi e TAP.</li>
</ul>
<p><strong>Esempio:</strong> Uno stipendio lordo di 120.000 ALL genera contributi pari a 13.440 ALL e TAP di 9.953 ALL, lasciando un netto di circa 96.607 ALL.</p>
`
            },
            {
                title: "Cosa cambia nel 2024–2025",
                content: `
<p>Il pacchetto fiscale 2025 introduce diverse novità:</p>
<ul>
<li><strong>Per tutto il 2024</strong> restano in vigore le aliquote TAP attuali 0% / 13% / 23%.</li>
<li><strong>Da gennaio 2025</strong>: le detrazioni familiari per i figli a carico ridurranno la base imponibile e le soglie mensili della TAP verranno aggiornate. Le modalità "anteprima" del calcolatore ti permettono di simularle.</li>
<li><strong>Pensioni volontarie</strong> confluiranno in un modello di rendicontazione mensile unico su e-Albania.</li>
</ul>
<p>Consulta sempre gli avvisi ufficiali della DPT: i regolamenti attuativi possono modificare scadenze e modalità.</p>
`
            },
            {
                title: "Dal netto al lordo: guida pratica",
                content: `
<p>Per risalire dal netto desiderato allo stipendio lordo si procede così:</p>
<ol>
<li>Si aggiungono i contributi del dipendente (11,2%) sull'importo lordo incognito.</li>
<li>Si applica la TAP sulla base imponibile (lordo – contributi) seguendo gli scaglioni.</li>
<li>Si corregge il lordo finché il risultato netto non corrisponde all'obiettivo.</li>
</ol>
<p><strong>Esempio pratico:</strong> Per ricevere 90.000 ALL netti servono circa 111.448 ALL lordi. I contributi ammontano a ~12.482 ALL e la TAP a circa 8.966 ALL.</p>
`
            },
            {
                title: "Pensione volontaria: regole e benefici",
                content: `
<p>I contributi volontari fino a 50.000 ALL al mese sul contratto primario sono deducibili dalla base imponibile.</p>
<table>
<thead>
<tr><th>Contributo mensile</th><th>Deduzione annuale</th><th>Risparmio TAP (13%)</th></tr>
</thead>
<tbody>
<tr><td>10.000 ALL</td><td>120.000 ALL</td><td>15.600 ALL</td></tr>
<tr><td>25.000 ALL</td><td>300.000 ALL</td><td>39.000 ALL</td></tr>
<tr><td>50.000 ALL</td><td>600.000 ALL</td><td>78.000 ALL</td></tr>
</tbody>
</table>
<p>Il vantaggio fiscale è riconosciuto solo se i versamenti avvengono tramite un fondo autorizzato e vengono comunicati all'amministrazione fiscale.</p>
`
            },
            {
                title: "Dichiarazione annuale DIVA",
                content: `
<p>La DIVA (dichiarazione individuale annuale dei redditi) va presentata entro il 30 aprile dell'anno successivo se:</p>
<ul>
<li>I redditi da lavoro dipendente superano 1,2 milioni ALL annui, anche con un solo datore.</li>
<li>Percepisci redditi da più datori di lavoro o da collaborazioni (es. stipendio + compensi).</li>
<li>Hai altri redditi imponibili come locazioni, dividendi o plusvalenze.</li>
</ul>
<p>Le sanzioni per omessa presentazione sono salate: conserva buste paga e certificazioni delle ritenute per compilare la dichiarazione correttamente.</p>
`
            }
        ],
        faqTitle: "Domande Frequenti (FAQ)",
        faq1Title: "Quanti giorni di ferie annuali pagate mi spettano?",
        faq1Text: "Secondo l'ultima modifica al Codice del Lavoro (Agosto 2024), ogni dipendente ha diritto a un minimo di **22 giorni lavorativi** di ferie annuali pagate (in precedenza erano 4 settimane di calendario).",
        faq2Title: "Cos'è la base contributiva massima?",
        faq2Text: "È il limite superiore dello stipendio su cui vengono calcolati i contributi. Per il 2024, questo importo è **176,416 ALL**. Se il tuo stipendio lordo è 200,000 ALL, pagherai i contributi solo su 176,416 ALL. L'Imposta sul Reddito (TAP), tuttavia, è calcolata sull'intero importo lordo (200,000 ALL).",
        faq3Title: "Cosa sta succedendo con la tassa per i liberi professionisti/influencer?",
        faq3Text: "Nel giugno 2024, la Corte Costituzionale ha abrogato l'aliquota fiscale del 15% sull'utile netto (per redditi 0-14 milioni ALL/anno). L'aliquota del 23% per profitti superiori a 14 milioni ALL rimane in vigore. Attualmente c'è un vuoto legislativo e si attende un nuovo schema dal governo per il 2025. Questo calcolatore assume un'imposta dello 0% per la prima fascia fino all'approvazione della nuova legge.",
        faq4Title: "Devo registrarmi per l'IVA (TVSH) come libero professionista/influencer?",
        faq4Text: "Devi registrarti ai fini IVA solo se il tuo fatturato annuo supera i **10,000,000 ALL**.",
        faq5Title: "Devo fatturare ai clienti stranieri?",
        faq5Text: "Sì. Tutti i redditi, sia da clienti locali che stranieri, devono essere dichiarati e fiscalizzati. Fanno parte del tuo fatturato annuo e sono tassabili in Albania.",
        faq6Title: "Come vengono tassati i pagamenti in natura (barter) per gli influencer?",
        faq6Text: "I pagamenti in natura (es. prodotti, servizi, viaggi) sono considerati **reddito imponibile**. Il loro valore di mercato deve essere aggiunto al tuo fatturato lordo annuo e tassato come reddito normale. A causa della difficoltà di valutazione, consulta un commercialista. L'utilizzo delle spese forfettarie (30%) può semplificare il calcolo.",
        newsTitle: "Aggiornamenti fiscali ufficiali",
        newsSubtitle: "Rimani aggiornato con gli ultimi annunci degli enti fiscali albanesi.",
        newsLoading: "Caricamento degli aggiornamenti ufficiali...",
        newsError: "Impossibile recuperare gli aggiornamenti. Riprova tra poco.",
        newsRetry: "Riprova",
        newsEmpty: "Al momento non ci sono nuovi aggiornamenti. Controlla più tardi.",
        newsSourceLabel: "Fonte",
        newsPublished: "Pubblicato",
        newsReadMore: "Scopri di più",
        newsLastRefreshed: (timestamp) => `Ultimo aggiornamento ${timestamp}`,
        newsErrorOutage: "Il servizio di notizie non è momentaneamente disponibile mentre il proxy riprova.",
        programsTitle: "Programmi & Academy",
        programsSubtitle: "Scegli un percorso intensivo o un workshop su misura per affrontare le novità fiscali 2025 in Albania.",
        programsEmpty: "Al momento non ci sono programmi pubblicati. Contattaci per conoscere i prossimi percorsi.",
        programsList: getProgramsForLocale('it'),
        linksTitle: "Risorse Ufficiali e Link Utili",
        linksDpt: "Direzione Generale delle Tasse (DPT)",
        linksQkb: "Centro Nazionale delle Imprese (QKB)",
        linksKodiPunes: "Codice del Lavoro (Testo completo)",
        linksSigurime: "Istituto delle Assicurazioni Sociali (ISSH)",
        footerCreatedBy: "Creato da Kejsan Coku",
        footerCopyright: "© 2025. I calcoli possono contenere imprecisioni o non riflettere gli ultimi aggiornamenti normativi. Confrontati con un consulente fiscale o legale prima di prendere decisioni finanziarie.",
    }
};
