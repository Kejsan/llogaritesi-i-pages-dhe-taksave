const BASE_PROGRAMS = [
    {
        id: 'personal-finance-academy',
        cta: { to: '/contact' },
        translations: {
            sq: {
                title: 'Akademia e Financave Personale',
                subtitle: 'Program 4-javor, live & online',
                badge: 'I ri',
                description:
                    'Trajnim i strukturuar për punonjësit që duan të menaxhojnë pagën, kontributet dhe kursimet vullnetare.',
                benefits: [
                    'Sesione interaktive me shembuj nga paga bruto/neto',
                    'Template për planifikimin e kursimeve dhe simulime familjare',
                    'Qasje në komunitetin e llogaritësi.al për 6 muaj',
                ],
                ctaLabel: 'Rezervo vendin',
            },
            en: {
                title: 'Personal Finance Academy',
                subtitle: '4-week cohort (live online)',
                badge: 'New',
                description:
                    "Structured coaching for employees who want clarity on salary breakdowns, contributions, and voluntary savings.",
                benefits: [
                    'Interactive sessions with gross/net walk-throughs',
                    'Planning templates for family deductions and savings goals',
                    '6 months of access to the llogaritësi.al community',
                ],
                ctaLabel: 'Reserve your seat',
            },
            it: {
                title: 'Academy di Finanza Personale',
                subtitle: 'Percorso di 4 settimane (live online)',
                badge: 'Novità',
                description:
                    'Formazione strutturata per chi vuole capire in dettaglio stipendio, contributi e risparmio volontario.',
                benefits: [
                    'Sessioni interattive con esempi lordo/netto',
                    'Modelli per simulare deduzioni familiari e obiettivi di risparmio',
                    'Accesso alla community llogaritësi.al per 6 mesi',
                ],
                ctaLabel: 'Prenota il posto',
            },
        },
    },
    {
        id: 'freelancer-compliance-bootcamp',
        cta: { to: '/contact' },
        translations: {
            sq: {
                title: 'Bootcamp për Profesionistët e Lirë',
                subtitle: '2 ditë intensive',
                badge: '2025',
                description: 'Nga regjistrimi në QKB deri tek deklarimi elektronik i TVSH-së dhe DIVA-s.',
                benefits: [
                    'Checklist të dokumenteve dhe regjistrimeve',
                    'Skenarë realë për tatimin 0%/23% dhe raportimin mujor',
                    'Mbulim të faturimit për klientë ndërkombëtarë',
                ],
                ctaLabel: 'Apliko tani',
            },
            en: {
                title: 'Freelancer Compliance Bootcamp',
                subtitle: '2-day intensive',
                badge: '2025',
                description: "From business registration to electronic VAT and annual filings—everything a freelancer needs in 2025.",
                benefits: [
                    'Document and registration checklists',
                    'Real-world scenarios for the 0%/23% income tax split',
                    'Guidance on invoicing international clients',
                ],
                ctaLabel: 'Apply now',
            },
            it: {
                title: 'Bootcamp Conformità Freelancer',
                subtitle: 'Intensivo di 2 giorni',
                badge: '2025',
                description: 'Dal registro in QKB alla dichiarazione IVA e DIVA: tutto ciò che serve a freelance e creator.',
                benefits: [
                    'Checklist di documenti e adempimenti',
                    'Casi pratici sulla doppia aliquota 0%/23%',
                    'Linee guida per fatturare clienti internazionali',
                ],
                ctaLabel: 'Iscriviti ora',
            },
        },
    },
    {
        id: 'hr-finance-enablement',
        cta: { to: '/contact' },
        translations: {
            sq: {
                title: 'Programi për HR & Finance Teams',
                subtitle: 'Workshop i personalizuar',
                description:
                    'Trajnim in-house për politikat e pagave, paketat e benefiteve dhe komunikimin me punonjësit.',
                benefits: [
                    'Analizë e legjislacionit 2024-2025 dhe rreziqeve të pajtueshmërisë',
                    'Manual praktik për komunikimin e pagës neto dhe bonuseve',
                    'Dashboard me kalkulatorët tanë të brendshëm për ekipin',
                ],
                ctaLabel: 'Kërko ofertë',
            },
            en: {
                title: 'HR & Finance Enablement Program',
                subtitle: 'Tailored on-site workshop',
                description:
                    'Custom training for teams that manage payroll policies, benefits packages, and employee communications.',
                benefits: [
                    'Compliance briefing on the 2024-2025 legal framework',
                    'Practical handbook for explaining net pay and bonuses',
                    'Internal dashboard access to our premium calculators',
                ],
                ctaLabel: 'Request a quote',
            },
            it: {
                title: 'Programma Team HR & Finance',
                subtitle: 'Workshop personalizzato in sede',
                description:
                    'Training dedicato a chi gestisce payroll, benefit e comunicazione interna con i dipendenti.',
                benefits: [
                    'Aggiornamento normativo 2024-2025 e rischi di compliance',
                    'Manuale pratico per spiegare netto in busta e bonus',
                    'Dashboard riservata con i nostri calcolatori premium',
                ],
                ctaLabel: 'Richiedi un preventivo',
            },
        },
    },
];

const cloneProgram = (program, locale) => {
    const translation = program.translations[locale];
    if (!translation) {
        return null;
    }

    return {
        id: program.id,
        title: translation.title,
        subtitle: translation.subtitle,
        badge: translation.badge,
        description: translation.description,
        benefits: translation.benefits ? [...translation.benefits] : [],
        cta: translation.ctaLabel
            ? {
                  label: translation.ctaLabel,
                  ...(program.cta ? { ...program.cta } : {}),
              }
            : program.cta
              ? { ...program.cta }
              : undefined,
    };
};

const buildProgramsByLocale = () => {
    const accumulator = {};

    for (const program of BASE_PROGRAMS) {
        for (const localeKey of Object.keys(program.translations)) {
            const localized = cloneProgram(program, localeKey);
            if (!localized) continue;
            if (!accumulator[localeKey]) {
                accumulator[localeKey] = [];
            }
            accumulator[localeKey].push(localized);
        }
    }

    return accumulator;
};

export const PROGRAMS_BY_LOCALE = buildProgramsByLocale();

export const getProgramsForLocale = (locale, fallbackLocale = 'en') => {
    if (PROGRAMS_BY_LOCALE[locale]) {
        return PROGRAMS_BY_LOCALE[locale].map((program) => ({
            ...program,
            benefits: program.benefits ? [...program.benefits] : [],
            cta: program.cta ? { ...program.cta } : undefined,
        }));
    }

    if (fallbackLocale && PROGRAMS_BY_LOCALE[fallbackLocale]) {
        return PROGRAMS_BY_LOCALE[fallbackLocale].map((program) => ({
            ...program,
            benefits: program.benefits ? [...program.benefits] : [],
            cta: program.cta ? { ...program.cta } : undefined,
        }));
    }

    return [];
};

export default PROGRAMS_BY_LOCALE;
