import React, { Fragment } from 'react';
import Headerr from '../Global/Headerr';
import Footer from '../Global/Footer';
import './privacy.css';

const Privacy = () => {
    return (
        <Fragment>
            <Headerr />
            <div className="privacy-policy-container">
                <div className="container">
                    <div className="privacy-content">
                        {/* English Version */}
                        <section className="privacy-section english-version">
                            <h1 className="privacy-title">Privacy Policy</h1>
                            
                            <div className="policy-section">
                                <h2>1. Data Controller</h2>
                                <p>The controller of your personal data is <strong>AMO SP z o.o.</strong>, Szaniawskiego 10, 01-542 Warsaw, Poland, VAT ID: PL5242702719 ("NutriAI", "we", "our").</p>
                            </div>

                            <div className="policy-section">
                                <h2>2. Scope of this Policy</h2>
                                <p>This Privacy Policy explains how we collect, process, store, and protect personal data when you use NutriAI services.</p>
                            </div>

                            <div className="policy-section">
                                <h2>3. Data We Collect</h2>
                                <p>We may collect the following categories of data:</p>
                                <ul>
                                    <li><strong>Account information</strong> – name, email address, password.</li>
                                    <li><strong>Usage data</strong> – interactions with the Service, logs, device information.</li>
                                    <li><strong>Content data</strong> – any content you upload, generate, or provide via the Service.</li>
                                    <li><strong>Payment data</strong> – processed via secure third-party payment providers (we do not store full payment card details).</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>4. Legal Basis for Processing (GDPR)</h2>
                                <p>We process personal data on the following bases:</p>
                                <ul>
                                    <li><strong>Contract performance</strong> – to provide and maintain the Service.</li>
                                    <li><strong>Legitimate interest</strong> – to improve the Service and ensure security.</li>
                                    <li><strong>Consent</strong> – where explicitly granted (e.g., marketing communication).</li>
                                    <li><strong>Legal obligation</strong> – to comply with applicable regulations.</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>5. How We Use Personal Data</h2>
                                <p>We use your data to:</p>
                                <ul>
                                    <li>provide access to the Service,</li>
                                    <li>personalize your experience,</li>
                                    <li>maintain security and prevent fraud,</li>
                                    <li>improve functionality and user experience,</li>
                                    <li>comply with legal requirements.</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>6. Sharing Personal Data</h2>
                                <p>We do not sell your data. We may share data only with:</p>
                                <ul>
                                    <li>trusted service providers (hosting, analytics, payments),</li>
                                    <li>legal authorities when required by law,</li>
                                    <li>business partners strictly necessary for service operation.</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>7. International Data Transfers</h2>
                                <p>If data is transferred outside the European Economic Area (EEA), we ensure an adequate level of protection through legal safeguards such as Standard Contractual Clauses.</p>
                            </div>

                            <div className="policy-section">
                                <h2>8. Data Retention</h2>
                                <p>We store personal data only as long as necessary for:</p>
                                <ul>
                                    <li>providing the Service,</li>
                                    <li>fulfilling legal or contractual obligations,</li>
                                    <li>resolving disputes.</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>9. User Rights (GDPR)</h2>
                                <p>You have the right to:</p>
                                <ul>
                                    <li>access your personal data,</li>
                                    <li>request correction or deletion,</li>
                                    <li>restrict or object to processing,</li>
                                    <li>request data portability,</li>
                                    <li>withdraw consent at any time (without affecting prior processing),</li>
                                    <li>lodge a complaint with a supervisory authority.</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>10. Security Measures</h2>
                                <p>We use technical and organizational measures to protect your data against unauthorized access, loss, or misuse.</p>
                            </div>

                            <div className="policy-section">
                                <h2>11. Cookies & Tracking Technologies</h2>
                                <p>NutriAI uses cookies and similar technologies to improve user experience, analyze traffic, and personalize content.</p>
                            </div>

                            <div className="policy-section">
                                <h2>12. Changes to This Policy</h2>
                                <p>We may update this Privacy Policy from time to time. Continued use of the Service means acceptance of the current version.</p>
                            </div>

                            <div className="policy-section">
                                <h2>13. Contact</h2>
                                <p>For any questions or requests related to your personal data, contact us at:</p>
                                <p><strong>Email:</strong> <a href="mailto:support@nutriai.pl">support@nutriai.pl</a></p>
                                <p><strong>Address:</strong> AMO SP z o.o., Szaniawskiego 10, 01-542 Warsaw, Poland</p>
                            </div>
                        </section>

                        {/* Separator */}
                        <div className="language-separator"></div>

                        {/* Polish Version */}
                        <section className="privacy-section polish-version">
                            <h1 className="privacy-title">Polityka Prywatności</h1>
                            
                            <div className="policy-section">
                                <h2>1. Administrator danych</h2>
                                <p>Administratorem Twoich danych osobowych jest <strong>AMO SP z o.o.</strong>, ul. Szaniawskiego 10, 01-542 Warszawa, Polska, NIP: PL5242702719 ("NutriAI", "my").</p>
                            </div>

                            <div className="policy-section">
                                <h2>2. Zakres Polityki</h2>
                                <p>Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób zbieramy, przetwarzamy, przechowujemy i chronimy dane osobowe podczas korzystania z usług NutriAI.</p>
                            </div>

                            <div className="policy-section">
                                <h2>3. Jakie dane zbieramy</h2>
                                <p>Możemy przetwarzać następujące dane:</p>
                                <ul>
                                    <li><strong>Dane konta</strong> – imię, adres e-mail, hasło.</li>
                                    <li><strong>Dane dotyczące korzystania z Usługi</strong> – interakcje, logi systemowe, informacje o urządzeniu.</li>
                                    <li><strong>Treści użytkownika</strong> – treści generowane lub przesyłane w ramach Usługi.</li>
                                    <li><strong>Dane płatnicze</strong> – przetwarzane wyłącznie przez zewnętrznych dostawców płatności (nie przechowujemy pełnych danych kart płatniczych).</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>4. Podstawa prawna przetwarzania (RODO)</h2>
                                <p>Dane przetwarzamy na podstawie:</p>
                                <ul>
                                    <li><strong>wykonania umowy</strong> – w celu świadczenia Usługi,</li>
                                    <li><strong>prawnie uzasadnionego interesu</strong> – poprawa i zabezpieczenie Usługi,</li>
                                    <li><strong>zgody</strong> – np. na cele marketingowe,</li>
                                    <li><strong>obowiązku prawnego</strong> – np. obowiązki podatkowe.</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>5. Wykorzystanie danych osobowych</h2>
                                <p>Wykorzystujemy dane w celu:</p>
                                <ul>
                                    <li>umożliwienia korzystania z Usługi,</li>
                                    <li>personalizacji doświadczenia użytkownika,</li>
                                    <li>zapewnienia bezpieczeństwa i przeciwdziałania nadużyciom,</li>
                                    <li>ulepszania funkcjonalności i działania Usługi,</li>
                                    <li>wypełniania obowiązków prawnych.</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>6. Udostępnianie danych</h2>
                                <p>Nie sprzedajemy danych osobowych. Dane mogą być udostępniane:</p>
                                <ul>
                                    <li>zaufanym podmiotom technologicznym (hosting, analityka, płatności),</li>
                                    <li>organom publicznym – wyłącznie gdy wymagają tego przepisy prawa,</li>
                                    <li>partnerom biznesowym niezbędnym do działania Usługi.</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>7. Przekazywanie danych poza EOG</h2>
                                <p>Jeśli dane są przekazywane poza Europejski Obszar Gospodarczy, stosujemy odpowiednie zabezpieczenia prawne, takie jak Standardowe Klauzule Umowne.</p>
                            </div>

                            <div className="policy-section">
                                <h2>8. Okres przechowywania danych</h2>
                                <p>Dane przetwarzane są tak długo, jak jest to konieczne do:</p>
                                <ul>
                                    <li>świadczenia Usługi,</li>
                                    <li>realizacji obowiązków prawnych lub umownych,</li>
                                    <li>rozpatrywania roszczeń.</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>9. Prawa użytkownika (RODO)</h2>
                                <p>Przysługują Ci prawa do:</p>
                                <ul>
                                    <li>dostępu do danych,</li>
                                    <li>sprostowania lub usunięcia danych,</li>
                                    <li>ograniczenia lub sprzeciwu wobec przetwarzania,</li>
                                    <li>przeniesienia danych,</li>
                                    <li>wycofania zgody w dowolnym momencie,</li>
                                    <li>złożenia skargi do organu nadzorczego.</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>10. Środki bezpieczeństwa</h2>
                                <p>Stosujemy środki techniczne i organizacyjne chroniące dane przed nieuprawnionym dostępem, utratą lub nadużyciem.</p>
                            </div>

                            <div className="policy-section">
                                <h2>11. Pliki cookies</h2>
                                <p>NutriAI korzysta z plików cookies oraz podobnych technologii w celu poprawy działania strony, analizy ruchu i personalizacji treści.</p>
                            </div>

                            <div className="policy-section">
                                <h2>12. Zmiany Polityki Prywatności</h2>
                                <p>Polityka może być aktualizowana. Dalsze korzystanie z Usługi oznacza akceptację aktualnej wersji.</p>
                            </div>

                            <div className="policy-section">
                                <h2>13. Kontakt</h2>
                                <p>W sprawach związanych z danymi osobowymi skontaktuj się z nami:</p>
                                <p><strong>E-mail:</strong> <a href="mailto:support@nutriai.pl">support@nutriai.pl</a></p>
                                <p><strong>Adres:</strong> AMO SP z o.o., ul. Szaniawskiego 10, 01-542 Warszawa, Polska</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Privacy;
