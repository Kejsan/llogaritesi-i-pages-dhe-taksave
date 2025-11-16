export const Footer = ({ t }) => (
    <footer className="theme-footer mt-16 border-t theme-border-strong">
        <div className="relative max-w-7xl mx-auto flex flex-col gap-10 px-6 py-10">
            <div>
                <div className="flex items-center gap-3">
                    <img src="/Llogaritësi i Pagës dhe Taksave.png" alt="Llogaritësi" className="h-14 w-auto object-contain" />
                    <div>
                        <p className="text-xl font-bold text-brand-navy">Llogaritësi i Pagës dhe Taksave</p>
                        <p className="text-sm theme-text-muted">{t.footerCopyright}</p>
                    </div>
                </div>
                <p className="mt-4 max-w-xl text-sm theme-text-muted">
                    {t.footerCreatedBy} –{' '}
                    <a
                        href="https://kejsancoku.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand-navy hover:text-brand-navy/80"
                    >
                        Kejsan Coku
                    </a>
                </p>
            </div>
        </div>
    </footer>
);
