import React, { Fragment } from 'react';
import Headerr from '../Global/Headerr';
import Footer from '../Global/Footer';
import './terms.css';

const Terms = () => {
    return (
        <Fragment>
            <Headerr />
            <div className="terms-container">
                <div className="container">
                    <div className="terms-content">
                        {/* English Version */}
                        <section className="terms-section english-version">
                            <h1 className="terms-title">Terms of Service</h1>
                            <p className="last-updated">Last Updated: November 19, 2025</p>
                            
                            <div className="terms-intro">
                                <p>Welcome to NutriAI. By accessing or using our Service, you agree to be bound by these Terms of Service. Please read them carefully.</p>
                            </div>

                            <div className="policy-section">
                                <h2>1. Acceptance of Terms</h2>
                                <p>By creating an account or using NutriAI services provided by <strong>AMO SP z o.o.</strong> (Szaniawskiego 10, 01-542 Warsaw, Poland, VAT ID: PL5242702719), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.</p>
                            </div>

                            <div className="policy-section">
                                <h2>2. Description of Service</h2>
                                <p>NutriAI is an AI-powered nutrition and wellness platform that provides:</p>
                                <ul>
                                    <li>Personalized meal planning and nutrition advice</li>
                                    <li>Calorie and macro tracking</li>
                                    <li>AI-generated meal recommendations</li>
                                    <li>Health and fitness insights</li>
                                    <li>Community features and content</li>
                                </ul>
                                <p>We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time.</p>
                            </div>

                            <div className="policy-section">
                                <h2>3. User Accounts</h2>
                                <p><strong>Eligibility:</strong> You must be at least 16 years old to use NutriAI. If you are under 18, you must have parental or guardian consent.</p>
                                <p><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized access or security breach.</p>
                                <p><strong>Accurate Information:</strong> You agree to provide accurate, current, and complete information during registration and to update it as necessary.</p>
                            </div>

                            <div className="policy-section">
                                <h2>4. User Conduct</h2>
                                <p>You agree NOT to:</p>
                                <ul>
                                    <li>Use the Service for any illegal or unauthorized purpose</li>
                                    <li>Violate any laws, regulations, or third-party rights</li>
                                    <li>Upload harmful, offensive, or inappropriate content</li>
                                    <li>Attempt to gain unauthorized access to our systems</li>
                                    <li>Interfere with or disrupt the Service or servers</li>
                                    <li>Use automated systems (bots, scrapers) without permission</li>
                                    <li>Impersonate others or provide false information</li>
                                    <li>Harass, abuse, or harm other users</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>5. Medical Disclaimer</h2>
                                <p className="important-notice">⚠️ <strong>IMPORTANT:</strong> NutriAI provides general nutritional information and wellness suggestions. It is NOT a substitute for professional medical advice, diagnosis, or treatment.</p>
                                <ul>
                                    <li>Always consult a qualified healthcare provider before making dietary changes</li>
                                    <li>Do not disregard professional medical advice or delay seeking it because of information from NutriAI</li>
                                    <li>NutriAI is not responsible for any health consequences resulting from use of the Service</li>
                                    <li>If you have allergies, medical conditions, or dietary restrictions, consult a healthcare professional</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>6. Intellectual Property</h2>
                                <p><strong>Our Content:</strong> All content, features, and functionality of NutriAI (including but not limited to text, graphics, logos, software, and AI-generated content) are owned by AMO SP z o.o. and protected by copyright, trademark, and other intellectual property laws.</p>
                                <p><strong>Your Content:</strong> You retain ownership of any content you submit to NutriAI. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display your content solely for providing and improving the Service.</p>
                                <p><strong>Restrictions:</strong> You may not copy, modify, distribute, sell, or reverse engineer any part of our Service without explicit written permission.</p>
                            </div>

                            <div className="policy-section">
                                <h2>7. Subscription and Payment</h2>
                                <p><strong>Free and Premium Tiers:</strong> NutriAI offers both free and premium subscription plans with different features and limitations.</p>
                                <p><strong>Payment:</strong> Premium subscriptions are billed in advance on a recurring basis (monthly or annually). All fees are non-refundable except as required by law.</p>
                                <p><strong>Cancellation:</strong> You may cancel your subscription at any time. Cancellation will take effect at the end of the current billing period.</p>
                                <p><strong>Price Changes:</strong> We reserve the right to modify subscription prices with 30 days' notice. Continued use after price changes constitutes acceptance.</p>
                            </div>

                            <div className="policy-section">
                                <h2>8. Termination</h2>
                                <p>We reserve the right to suspend or terminate your account at our discretion if:</p>
                                <ul>
                                    <li>You violate these Terms of Service</li>
                                    <li>Your actions create legal liability or security risks</li>
                                    <li>Your account remains inactive for an extended period</li>
                                    <li>We discontinue the Service</li>
                                </ul>
                                <p>Upon termination, your right to use the Service will immediately cease. We may delete your data in accordance with our Privacy Policy.</p>
                            </div>

                            <div className="policy-section">
                                <h2>9. Limitation of Liability</h2>
                                <p>To the maximum extent permitted by law:</p>
                                <ul>
                                    <li>NutriAI is provided "AS IS" without warranties of any kind</li>
                                    <li>We do not guarantee uninterrupted, error-free, or secure service</li>
                                    <li>We are not liable for any indirect, incidental, or consequential damages</li>
                                    <li>Our total liability shall not exceed the amount you paid to us in the past 12 months</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>10. Indemnification</h2>
                                <p>You agree to indemnify and hold harmless AMO SP z o.o., its affiliates, and employees from any claims, damages, or expenses arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.</p>
                            </div>

                            <div className="policy-section">
                                <h2>11. Data Protection & Privacy</h2>
                                <p>Your use of NutriAI is also governed by our <a href="/privacy">Privacy Policy</a>, which explains how we collect, use, and protect your personal data in compliance with GDPR and applicable data protection laws.</p>
                            </div>

                            <div className="policy-section">
                                <h2>12. Third-Party Services</h2>
                                <p>NutriAI may integrate with third-party services (payment processors, analytics, APIs). We are not responsible for the content, privacy practices, or functionality of third-party services.</p>
                            </div>

                            <div className="policy-section">
                                <h2>13. Governing Law & Disputes</h2>
                                <p><strong>Jurisdiction:</strong> These Terms are governed by the laws of Poland. Any disputes shall be resolved in the courts of Warsaw, Poland.</p>
                                <p><strong>EU Consumers:</strong> If you are a consumer in the European Union, you retain the right to bring proceedings in your country of residence.</p>
                            </div>

                            <div className="policy-section">
                                <h2>14. Changes to Terms</h2>
                                <p>We may update these Terms from time to time. We will notify you of significant changes via email or in-app notification. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
                            </div>

                            <div className="policy-section">
                                <h2>15. Contact Information</h2>
                                <p>For questions about these Terms of Service, contact us at:</p>
                                <p><strong>Email:</strong> <a href="mailto:support@nutriai.pl">support@nutriai.pl</a></p>
                                <p><strong>Address:</strong> AMO SP z o.o., Szaniawskiego 10, 01-542 Warsaw, Poland</p>
                                <p><strong>VAT ID:</strong> PL5242702719</p>
                            </div>
                        </section>

                        {/* Separator */}
                        <div className="language-separator"></div>

                        {/* Polish Version */}
                        <section className="terms-section polish-version">
                            <h1 className="terms-title">Regulamin Świadczenia Usług</h1>
                            <p className="last-updated">Ostatnia aktualizacja: 19 listopada 2025</p>
                            
                            <div className="terms-intro">
                                <p>Witamy w NutriAI. Korzystając z naszej Usługi, zgadzasz się na przestrzeganie niniejszego Regulaminu. Prosimy o uważne przeczytanie.</p>
                            </div>

                            <div className="policy-section">
                                <h2>1. Akceptacja Regulaminu</h2>
                                <p>Tworząc konto lub korzystając z usług NutriAI świadczonych przez <strong>AMO SP z o.o.</strong> (ul. Szaniawskiego 10, 01-542 Warszawa, Polska, NIP: PL5242702719), potwierdzasz, że przeczytałeś, zrozumiałeś i zgadzasz się na przestrzeganie niniejszego Regulaminu oraz naszej Polityki Prywatności.</p>
                            </div>

                            <div className="policy-section">
                                <h2>2. Opis Usługi</h2>
                                <p>NutriAI to platforma żywieniowa i zdrowotna oparta na sztucznej inteligencji, która zapewnia:</p>
                                <ul>
                                    <li>Spersonalizowane planowanie posiłków i porady żywieniowe</li>
                                    <li>Śledzenie kalorii i makroskładników</li>
                                    <li>Rekomendacje posiłków generowane przez AI</li>
                                    <li>Analizy zdrowotne i fitness</li>
                                    <li>Funkcje społecznościowe i treści</li>
                                </ul>
                                <p>Zastrzegamy sobie prawo do modyfikacji, zawieszenia lub zaprzestania świadczenia dowolnego aspektu Usługi w dowolnym momencie.</p>
                            </div>

                            <div className="policy-section">
                                <h2>3. Konta Użytkowników</h2>
                                <p><strong>Uprawnienia:</strong> Musisz mieć co najmniej 16 lat, aby korzystać z NutriAI. Jeśli masz poniżej 18 lat, musisz uzyskać zgodę rodzica lub opiekuna.</p>
                                <p><strong>Bezpieczeństwo Konta:</strong> Jesteś odpowiedzialny za zachowanie poufności danych logowania. Zgadzasz się niezwłocznie powiadomić nas o wszelkich nieautoryzowanych dostępach lub naruszeniach bezpieczeństwa.</p>
                                <p><strong>Dokładne Informacje:</strong> Zgadzasz się podawać dokładne, aktualne i kompletne informacje podczas rejestracji oraz aktualizować je w razie potrzeby.</p>
                            </div>

                            <div className="policy-section">
                                <h2>4. Zachowanie Użytkownika</h2>
                                <p>Zgadzasz się NIE:</p>
                                <ul>
                                    <li>Używać Usługi w celach nielegalnych lub nieautoryzowanych</li>
                                    <li>Naruszać przepisów prawa, regulacji lub praw osób trzecich</li>
                                    <li>Przesyłać szkodliwych, obraźliwych lub nieodpowiednich treści</li>
                                    <li>Próbować uzyskać nieautoryzowanego dostępu do naszych systemów</li>
                                    <li>Zakłócać działanie Usługi lub serwerów</li>
                                    <li>Używać automatycznych systemów (boty, scrapery) bez pozwolenia</li>
                                    <li>Podszywać się pod innych lub podawać fałszywych informacji</li>
                                    <li>Nękać, obrażać lub szkodzić innym użytkownikom</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>5. Zastrzeżenie Medyczne</h2>
                                <p className="important-notice">⚠️ <strong>WAŻNE:</strong> NutriAI dostarcza ogólnych informacji żywieniowych i sugestii zdrowotnych. NIE jest substytutem profesjonalnej porady medycznej, diagnozy ani leczenia.</p>
                                <ul>
                                    <li>Zawsze konsultuj się z wykwalifikowanym pracownikiem służby zdrowia przed wprowadzeniem zmian dietetycznych</li>
                                    <li>Nie ignoruj profesjonalnej porady medycznej i nie opóźniaj jej szukania z powodu informacji z NutriAI</li>
                                    <li>NutriAI nie ponosi odpowiedzialności za konsekwencje zdrowotne wynikające z korzystania z Usługi</li>
                                    <li>Jeśli masz alergie, schorzenia medyczne lub ograniczenia dietetyczne, skonsultuj się z lekarzem</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>6. Własność Intelektualna</h2>
                                <p><strong>Nasze Treści:</strong> Wszystkie treści, funkcje i funkcjonalności NutriAI (w tym między innymi teksty, grafika, logo, oprogramowanie i treści generowane przez AI) są własnością AMO SP z o.o. i chronione prawami autorskimi, znakami towarowymi i innymi prawami własności intelektualnej.</p>
                                <p><strong>Twoje Treści:</strong> Zachowujesz prawo własności do wszelkich treści przesyłanych do NutriAI. Przesyłając treści, udzielasz nam światowej, niewyłącznej, bezpłatnej licencji na używanie, reprodukowanie i wyświetlanie Twoich treści wyłącznie w celu świadczenia i ulepszania Usługi.</p>
                                <p><strong>Ograniczenia:</strong> Nie możesz kopiować, modyfikować, rozpowszechniać, sprzedawać ani odtwarzać inżynierii wstecznej żadnej części naszej Usługi bez wyraźnej pisemnej zgody.</p>
                            </div>

                            <div className="policy-section">
                                <h2>7. Subskrypcja i Płatności</h2>
                                <p><strong>Plany Darmowe i Premium:</strong> NutriAI oferuje zarówno darmowe, jak i płatne plany subskrypcji z różnymi funkcjami i ograniczeniami.</p>
                                <p><strong>Płatność:</strong> Subskrypcje premium są rozliczane z góry na zasadzie cyklicznej (miesięcznej lub rocznej). Wszystkie opłaty są bezzwrotne, chyba że wymaga tego prawo.</p>
                                <p><strong>Anulowanie:</strong> Możesz anulować subskrypcję w dowolnym momencie. Anulowanie zacznie obowiązywać z końcem bieżącego okresu rozliczeniowego.</p>
                                <p><strong>Zmiany Cen:</strong> Zastrzegamy sobie prawo do modyfikacji cen subskrypcji z 30-dniowym wyprzedzeniem. Dalsze korzystanie po zmianach cen stanowi akceptację.</p>
                            </div>

                            <div className="policy-section">
                                <h2>8. Rozwiązanie Umowy</h2>
                                <p>Zastrzegamy sobie prawo do zawieszenia lub zakończenia Twojego konta według naszego uznania, jeśli:</p>
                                <ul>
                                    <li>Naruszasz niniejszy Regulamin</li>
                                    <li>Twoje działania stwarzają odpowiedzialność prawną lub zagrożenia bezpieczeństwa</li>
                                    <li>Twoje konto pozostaje nieaktywne przez dłuższy okres</li>
                                    <li>Zaprzestaniemy świadczenia Usługi</li>
                                </ul>
                                <p>Po rozwiązaniu umowy Twoje prawo do korzystania z Usługi natychmiast wygasa. Możemy usunąć Twoje dane zgodnie z naszą Polityką Prywatności.</p>
                            </div>

                            <div className="policy-section">
                                <h2>9. Ograniczenie Odpowiedzialności</h2>
                                <p>W maksymalnym zakresie dozwolonym przez prawo:</p>
                                <ul>
                                    <li>NutriAI jest świadczone "TAK JAK JEST" bez jakichkolwiek gwarancji</li>
                                    <li>Nie gwarantujemy nieprzerwanej, bezbłędnej ani bezpiecznej usługi</li>
                                    <li>Nie ponosimy odpowiedzialności za szkody pośrednie, przypadkowe lub następcze</li>
                                    <li>Nasza całkowita odpowiedzialność nie przekroczy kwoty zapłaconej nam w ciągu ostatnich 12 miesięcy</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h2>10. Odszkodowanie</h2>
                                <p>Zgadzasz się zabezpieczyć i chronić AMO SP z o.o., jej podmioty stowarzyszone i pracowników przed wszelkimi roszczeniami, szkodami lub wydatkami wynikającymi z korzystania z Usługi, naruszenia niniejszego Regulaminu lub naruszenia praw osób trzecich.</p>
                            </div>

                            <div className="policy-section">
                                <h2>11. Ochrona Danych i Prywatność</h2>
                                <p>Korzystanie z NutriAI podlega również naszej <a href="/privacy">Polityce Prywatności</a>, która wyjaśnia, w jaki sposób gromadzimy, wykorzystujemy i chronimy Twoje dane osobowe zgodnie z RODO i obowiązującymi przepisami o ochronie danych.</p>
                            </div>

                            <div className="policy-section">
                                <h2>12. Usługi Osób Trzecich</h2>
                                <p>NutriAI może integrować się z usługami osób trzecich (procesory płatności, analityka, API). Nie ponosimy odpowiedzialności za treści, praktyki prywatności lub funkcjonalność usług osób trzecich.</p>
                            </div>

                            <div className="policy-section">
                                <h2>13. Prawo Właściwe i Spory</h2>
                                <p><strong>Jurysdykcja:</strong> Niniejszy Regulamin podlega prawu polskiemu. Wszelkie spory będą rozstrzygane przez sądy w Warszawie, Polska.</p>
                                <p><strong>Konsumenci UE:</strong> Jeśli jesteś konsumentem w Unii Europejskiej, zachowujesz prawo do wniesienia sprawy w kraju swojego zamieszkania.</p>
                            </div>

                            <div className="policy-section">
                                <h2>14. Zmiany w Regulaminie</h2>
                                <p>Możemy od czasu do czasu aktualizować niniejszy Regulamin. Powiadomimy Cię o istotnych zmianach za pośrednictwem poczty elektronicznej lub powiadomienia w aplikacji. Dalsze korzystanie z Usługi po wprowadzeniu zmian stanowi akceptację zaktualizowanego Regulaminu.</p>
                            </div>

                            <div className="policy-section">
                                <h2>15. Informacje Kontaktowe</h2>
                                <p>W przypadku pytań dotyczących niniejszego Regulaminu, skontaktuj się z nami:</p>
                                <p><strong>E-mail:</strong> <a href="mailto:support@nutriai.pl">support@nutriai.pl</a></p>
                                <p><strong>Adres:</strong> AMO SP z o.o., ul. Szaniawskiego 10, 01-542 Warszawa, Polska</p>
                                <p><strong>NIP:</strong> PL5242702719</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Terms;
