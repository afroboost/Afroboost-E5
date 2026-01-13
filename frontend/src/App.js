import { useState, useEffect, useCallback } from "react";
import "@/App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Translations for FR, EN, DE
const translations = {
  fr: {
    appTitle: "Afroboost",
    conceptDefault: "Le concept Afroboost : cardio + danse afrobeat + casques audio immersifs. Un entraînement fun, énergétique et accessible à tous.",
    chooseSession: "Choisissez votre session",
    chooseOffer: "Choisissez votre offre",
    yourInfo: "Vos informations",
    fullName: "Nom complet",
    emailRequired: "Email (obligatoire)",
    whatsappRequired: "WhatsApp (obligatoire)",
    promoCode: "Code promo",
    total: "Total",
    alreadySubscribed: "Je suis déjà abonné",
    selectProfile: "Sélectionnez votre profil...",
    acceptTerms: "J'accepte les conditions et confirme ma réservation.",
    payAndReserve: "💳 Payer et réserver",
    reserveFree: "Réserver gratuitement",
    loading: "Chargement...",
    copyright: "© Afroboost 2026",
    // Coach Mode
    coachLogin: "Connexion Coach",
    email: "Email",
    password: "Mot de passe",
    login: "Se connecter",
    forgotPassword: "Mot de passe oublié ?",
    cancel: "Annuler",
    coachMode: "Mode Coach",
    back: "← Retour",
    logout: "🚪 Déconnexion",
    reservations: "Réservations",
    conceptVisual: "Concept & Visuel",
    courses: "Cours",
    offers: "Offres",
    payments: "Paiements",
    promoCodes: "Codes promo",
    reservationsList: "Liste des réservations",
    downloadCSV: "📥 Télécharger CSV",
    code: "Code",
    name: "Nom",
    date: "Date",
    offer: "Offre",
    qty: "Qté",
    noReservations: "Aucune réservation pour le moment",
    conceptDescription: "Description du concept",
    mediaUrl: "URL Média Accueil (image ou .mp4)",
    save: "Sauvegarder",
    courseName: "Nom du cours",
    location: "Lieu",
    mapsLink: "Lien Google Maps",
    weekday: "Jour",
    time: "Horaire",
    addCourse: "Ajouter un cours",
    offerName: "Nom de l'offre",
    price: "Prix (CHF)",
    visible: "Visible",
    addOffer: "Ajouter une offre",
    stripeLink: "Lien Stripe",
    paypalLink: "Lien PayPal",
    twintLink: "Lien Twint",
    coachWhatsapp: "WhatsApp Coach",
    codePromo: "Code (ex: GRATUIT)",
    type: "Type",
    value: "Valeur",
    assignedEmail: "Email assigné (optionnel)",
    add: "Ajouter",
    noPromoCode: "Aucun code promo",
    active: "Actif",
    inactive: "Inactif",
    used: "Utilisé",
    // Confirmation
    paymentDone: "Paiement effectué ?",
    paymentConfirmText: "Si vous avez terminé le paiement sur Twint ou Stripe, cliquez ci-dessous pour valider officiellement votre réservation.",
    confirmPayment: "✅ Confirmer mon paiement",
    reservationConfirmed: "Réservation confirmée !",
    reservationCode: "Code",
    print: "🖨️ Imprimer",
    share: "📱 Partager",
    // Errors
    emailWhatsappRequired: "L'email et le numéro WhatsApp sont obligatoires.",
    invalidPromoCode: "Code promo invalide.",
    expiredPromoCode: "Code promo expiré.",
    noPaymentConfigured: "Paiement requis – réservation impossible.",
    subscriberOnlyCode: "Seuls les abonnés peuvent utiliser ce code.",
    wrongCredentials: "Email ou mot de passe incorrect",
    // Days
    sunday: "Dimanche",
    monday: "Lundi",
    tuesday: "Mardi",
    wednesday: "Mercredi",
    thursday: "Jeudi",
    friday: "Vendredi",
    saturday: "Samedi",
  },
  en: {
    appTitle: "Afroboost",
    conceptDefault: "The Afroboost concept: cardio + afrobeat dance + immersive audio headsets. A fun, energetic and accessible workout for everyone.",
    chooseSession: "Choose your session",
    chooseOffer: "Choose your offer",
    yourInfo: "Your information",
    fullName: "Full name",
    emailRequired: "Email (required)",
    whatsappRequired: "WhatsApp (required)",
    promoCode: "Promo code",
    total: "Total",
    alreadySubscribed: "I'm already subscribed",
    selectProfile: "Select your profile...",
    acceptTerms: "I accept the terms and confirm my reservation.",
    payAndReserve: "💳 Pay and reserve",
    reserveFree: "Reserve for free",
    loading: "Loading...",
    copyright: "© Afroboost 2026",
    coachLogin: "Coach Login",
    email: "Email",
    password: "Password",
    login: "Log in",
    forgotPassword: "Forgot password?",
    cancel: "Cancel",
    coachMode: "Coach Mode",
    back: "← Back",
    logout: "🚪 Logout",
    reservations: "Reservations",
    conceptVisual: "Concept & Visual",
    courses: "Courses",
    offers: "Offers",
    payments: "Payments",
    promoCodes: "Promo codes",
    reservationsList: "Reservations list",
    downloadCSV: "📥 Download CSV",
    code: "Code",
    name: "Name",
    date: "Date",
    offer: "Offer",
    qty: "Qty",
    noReservations: "No reservations yet",
    conceptDescription: "Concept description",
    mediaUrl: "Media URL (image or .mp4)",
    save: "Save",
    courseName: "Course name",
    location: "Location",
    mapsLink: "Google Maps link",
    weekday: "Day",
    time: "Time",
    addCourse: "Add course",
    offerName: "Offer name",
    price: "Price (CHF)",
    visible: "Visible",
    addOffer: "Add offer",
    stripeLink: "Stripe link",
    paypalLink: "PayPal link",
    twintLink: "Twint link",
    coachWhatsapp: "Coach WhatsApp",
    codePromo: "Code (e.g. FREE)",
    type: "Type",
    value: "Value",
    assignedEmail: "Assigned email (optional)",
    add: "Add",
    noPromoCode: "No promo code",
    active: "Active",
    inactive: "Inactive",
    used: "Used",
    paymentDone: "Payment done?",
    paymentConfirmText: "If you completed the payment on Twint or Stripe, click below to officially validate your reservation.",
    confirmPayment: "✅ Confirm my payment",
    reservationConfirmed: "Reservation confirmed!",
    reservationCode: "Code",
    print: "🖨️ Print",
    share: "📱 Share",
    emailWhatsappRequired: "Email and WhatsApp number are required.",
    invalidPromoCode: "Invalid promo code.",
    expiredPromoCode: "Expired promo code.",
    noPaymentConfigured: "Payment required – reservation impossible.",
    subscriberOnlyCode: "Only subscribers can use this code.",
    wrongCredentials: "Wrong email or password",
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
  },
  de: {
    appTitle: "Afroboost",
    conceptDefault: "Das Afroboost-Konzept: Cardio + Afrobeat-Tanz + immersive Audio-Kopfhörer. Ein spaßiges, energetisches Training für alle.",
    chooseSession: "Wählen Sie Ihre Sitzung",
    chooseOffer: "Wählen Sie Ihr Angebot",
    yourInfo: "Ihre Informationen",
    fullName: "Vollständiger Name",
    emailRequired: "E-Mail (erforderlich)",
    whatsappRequired: "WhatsApp (erforderlich)",
    promoCode: "Promo-Code",
    total: "Gesamt",
    alreadySubscribed: "Ich bin bereits abonniert",
    selectProfile: "Wählen Sie Ihr Profil...",
    acceptTerms: "Ich akzeptiere die Bedingungen und bestätige meine Reservierung.",
    payAndReserve: "💳 Zahlen und reservieren",
    reserveFree: "Kostenlos reservieren",
    loading: "Laden...",
    copyright: "© Afroboost 2026",
    coachLogin: "Coach-Anmeldung",
    email: "E-Mail",
    password: "Passwort",
    login: "Anmelden",
    forgotPassword: "Passwort vergessen?",
    cancel: "Abbrechen",
    coachMode: "Coach-Modus",
    back: "← Zurück",
    logout: "🚪 Abmelden",
    reservations: "Reservierungen",
    conceptVisual: "Konzept & Visuell",
    courses: "Kurse",
    offers: "Angebote",
    payments: "Zahlungen",
    promoCodes: "Promo-Codes",
    reservationsList: "Reservierungsliste",
    downloadCSV: "📥 CSV herunterladen",
    code: "Code",
    name: "Name",
    date: "Datum",
    offer: "Angebot",
    qty: "Menge",
    noReservations: "Noch keine Reservierungen",
    conceptDescription: "Konzeptbeschreibung",
    mediaUrl: "Medien-URL (Bild oder .mp4)",
    save: "Speichern",
    courseName: "Kursname",
    location: "Ort",
    mapsLink: "Google Maps Link",
    weekday: "Tag",
    time: "Zeit",
    addCourse: "Kurs hinzufügen",
    offerName: "Angebotsname",
    price: "Preis (CHF)",
    visible: "Sichtbar",
    addOffer: "Angebot hinzufügen",
    stripeLink: "Stripe-Link",
    paypalLink: "PayPal-Link",
    twintLink: "Twint-Link",
    coachWhatsapp: "Coach WhatsApp",
    codePromo: "Code (z.B. GRATIS)",
    type: "Typ",
    value: "Wert",
    assignedEmail: "Zugewiesene E-Mail (optional)",
    add: "Hinzufügen",
    noPromoCode: "Kein Promo-Code",
    active: "Aktiv",
    inactive: "Inaktiv",
    used: "Verwendet",
    paymentDone: "Zahlung abgeschlossen?",
    paymentConfirmText: "Wenn Sie die Zahlung bei Twint oder Stripe abgeschlossen haben, klicken Sie unten, um Ihre Reservierung offiziell zu bestätigen.",
    confirmPayment: "✅ Zahlung bestätigen",
    reservationConfirmed: "Reservierung bestätigt!",
    reservationCode: "Code",
    print: "🖨️ Drucken",
    share: "📱 Teilen",
    emailWhatsappRequired: "E-Mail und WhatsApp-Nummer sind erforderlich.",
    invalidPromoCode: "Ungültiger Promo-Code.",
    expiredPromoCode: "Abgelaufener Promo-Code.",
    noPaymentConfigured: "Zahlung erforderlich – Reservierung nicht möglich.",
    subscriberOnlyCode: "Nur Abonnenten können diesen Code verwenden.",
    wrongCredentials: "Falsche E-Mail oder Passwort",
    sunday: "Sonntag",
    monday: "Montag",
    tuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
    saturday: "Samstag",
  }
};

const WEEKDAYS_MAP = {
  fr: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
};

// Helper functions
function getNextOccurrences(weekday, count = 4) {
  const now = new Date();
  const results = [];
  const day = now.getDay();
  let diff = weekday - day;
  if (diff < 0) diff += 7;
  let current = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff);

  for (let i = 0; i < count; i++) {
    results.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }
  return results;
}

function formatDate(d, time, lang) {
  const formatted = d.toLocaleDateString(lang === 'de' ? 'de-CH' : lang === 'en' ? 'en-GB' : 'fr-CH', {
    weekday: "short",
    day: "2-digit",
    month: "2-digit"
  });
  return `${formatted} • ${time}`;
}

// Splash Screen
const SplashScreen = () => (
  <div className="splash-screen">
    <div className="splash-headset">🎧</div>
    <div className="splash-text">Afroboost</div>
  </div>
);

// Language Selector
const LanguageSelector = ({ lang, setLang }) => {
  const [open, setOpen] = useState(false);
  const languages = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' }
  ];

  return (
    <div className="lang-selector" onClick={() => setOpen(!open)} data-testid="lang-selector">
      <span style={{ fontSize: '20px' }}>🌐</span>
      <span style={{ color: 'white', fontWeight: '600' }}>{lang.toUpperCase()}</span>
      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '8px',
          overflow: 'hidden',
          minWidth: '80px'
        }}>
          {languages.map(l => (
            <div
              key={l.code}
              onClick={(e) => { e.stopPropagation(); setLang(l.code); setOpen(false); }}
              style={{
                padding: '10px 16px',
                color: 'white',
                cursor: 'pointer',
                background: lang === l.code ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
                transition: 'background 0.2s'
              }}
              data-testid={`lang-${l.code}`}
            >
              {l.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Coach Login Modal
const CoachLoginModal = ({ t, onLogin, onCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/coach-auth/login`, { email, password });
      if (response.data.success) {
        onLogin();
      } else {
        setError(t('wrongCredentials'));
      }
    } catch (err) {
      setError(t('wrongCredentials'));
    }
  };

  const handleForgotPassword = () => {
    window.location.href = `mailto:contact.artboost@gmail.com?subject=${encodeURIComponent("🔐 Afroboost — Réinitialisation Coach")}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass rounded-xl p-8 max-w-md w-full neon-border" style={{ background: 'rgba(0, 0, 0, 0.95)' }}>
        <form onSubmit={handleSubmit}>
          <h2 className="font-bold mb-6 text-center text-white" style={{ fontSize: '24px' }}>
            {t('coachLogin')}
          </h2>
          {error && (
            <div className="mb-4 p-3 rounded-lg text-center" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
              {error}
            </div>
          )}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block mb-2 text-white">{t('email')}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg neon-input"
                placeholder="coach@afroboost.com"
                data-testid="coach-login-email"
              />
            </div>
            <div>
              <label className="block mb-2 text-white">{t('password')}</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg neon-input"
                placeholder="••••••••"
                data-testid="coach-login-password"
              />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full py-3 rounded-lg font-bold mb-3" data-testid="coach-login-submit">
            {t('login')}
          </button>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-full text-center mb-4"
            style={{ color: '#d91cd2', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
          >
            {t('forgotPassword')}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2 rounded-lg glass text-white"
            data-testid="coach-login-cancel"
          >
            {t('cancel')}
          </button>
        </form>
      </div>
    </div>
  );
};

// Coach Dashboard
const CoachDashboard = ({ t, lang, onBack, onLogout }) => {
  const [tab, setTab] = useState("reservations");
  const [reservations, setReservations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [offers, setOffers] = useState([]);
  const [paymentLinks, setPaymentLinks] = useState({ stripe: "", paypal: "", twint: "", coachWhatsapp: "" });
  const [concept, setConcept] = useState({ description: "", heroImageUrl: "" });
  const [discountCodes, setDiscountCodes] = useState([]);
  const [newCode, setNewCode] = useState({ code: "", type: "", value: "", assignedEmail: "" });
  const [newCourse, setNewCourse] = useState({ name: "", weekday: 0, time: "18:30", locationName: "", mapsUrl: "" });
  const [newOffer, setNewOffer] = useState({ name: "", price: 0, visible: true });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [res, crs, off, lnk, cpt, cds] = await Promise.all([
          axios.get(`${API}/reservations`),
          axios.get(`${API}/courses`),
          axios.get(`${API}/offers`),
          axios.get(`${API}/payment-links`),
          axios.get(`${API}/concept`),
          axios.get(`${API}/discount-codes`)
        ]);
        setReservations(res.data);
        setCourses(crs.data);
        setOffers(off.data);
        setPaymentLinks(lnk.data);
        setConcept(cpt.data);
        setDiscountCodes(cds.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    loadData();
  }, []);

  const exportCSV = () => {
    const rows = [
      [t('code'), t('name'), t('email'), "WhatsApp", t('courses'), t('date'), t('offer'), t('price'), t('qty'), t('total')],
      ...reservations.map(r => [
        r.reservationCode || '', r.userName, r.userEmail, r.userWhatsapp || '',
        r.courseName, new Date(r.datetime).toLocaleDateString('fr-CH'),
        r.offerName, r.price, r.quantity || 1, r.totalPrice || r.price
      ])
    ];
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `afroboost_reservations_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const saveConcept = async () => {
    await axios.put(`${API}/concept`, concept);
    alert("Saved!");
  };

  const savePayments = async () => {
    await axios.put(`${API}/payment-links`, paymentLinks);
    alert("Saved!");
  };

  const addCode = async (e) => {
    e.preventDefault();
    if (!newCode.type || !newCode.value) return;
    const response = await axios.post(`${API}/discount-codes`, {
      code: newCode.code || `CODE-${Date.now().toString().slice(-4)}`,
      type: newCode.type,
      value: parseFloat(newCode.value),
      assignedEmail: newCode.assignedEmail || null,
      courses: [],
      maxUses: null
    });
    setDiscountCodes([...discountCodes, response.data]);
    setNewCode({ code: "", type: "", value: "", assignedEmail: "" });
  };

  const toggleCode = async (code) => {
    await axios.put(`${API}/discount-codes/${code.id}`, { active: !code.active });
    setDiscountCodes(discountCodes.map(c => c.id === code.id ? { ...c, active: !c.active } : c));
  };

  const updateCourse = async (course) => {
    await axios.put(`${API}/courses/${course.id}`, course);
  };

  const addCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.name) return;
    const response = await axios.post(`${API}/courses`, newCourse);
    setCourses([...courses, response.data]);
    setNewCourse({ name: "", weekday: 0, time: "18:30", locationName: "", mapsUrl: "" });
  };

  const updateOffer = async (offer) => {
    await axios.put(`${API}/offers/${offer.id}`, offer);
  };

  const addOffer = async (e) => {
    e.preventDefault();
    if (!newOffer.name) return;
    const response = await axios.post(`${API}/offers`, newOffer);
    setOffers([...offers, response.data]);
    setNewOffer({ name: "", price: 0, visible: true });
  };

  const tabs = [
    { id: "reservations", label: t('reservations') },
    { id: "concept", label: t('conceptVisual') },
    { id: "courses", label: t('courses') },
    { id: "offers", label: t('offers') },
    { id: "payments", label: t('payments') },
    { id: "codes", label: t('promoCodes') }
  ];

  return (
    <div className="w-full min-h-screen p-6" style={{ background: '#000000' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="font-bold text-white" style={{ fontSize: '32px' }}>{t('coachMode')}</h1>
          <div className="flex gap-3">
            <button onClick={onBack} className="px-4 py-2 rounded-lg glass text-white" data-testid="coach-back">{t('back')}</button>
            <button onClick={onLogout} className="px-4 py-2 rounded-lg glass text-white" data-testid="coach-logout">{t('logout')}</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map(tb => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={`coach-tab px-4 py-2 rounded-lg ${tab === tb.id ? 'active' : 'glass'}`}
              style={{ color: 'white' }}
              data-testid={`coach-tab-${tb.id}`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {/* Reservations Tab */}
        {tab === "reservations" && (
          <div className="glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="font-semibold text-white" style={{ fontSize: '24px' }}>{t('reservationsList')}</h2>
              <button onClick={exportCSV} className="csv-btn" data-testid="export-csv">
                {t('downloadCSV')}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="coach-table">
                <thead>
                  <tr>
                    <th>{t('code')}</th>
                    <th>{t('name')}</th>
                    <th>{t('email')}</th>
                    <th>{t('date')}</th>
                    <th>{t('offer')}</th>
                    <th>{t('qty')}</th>
                    <th>{t('total')}</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map(r => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 'bold', color: '#d91cd2' }}>{r.reservationCode || '-'}</td>
                      <td>{r.userName}</td>
                      <td>{r.userEmail}</td>
                      <td>{new Date(r.datetime).toLocaleDateString('fr-CH')}</td>
                      <td>{r.offerName}</td>
                      <td>{r.quantity || 1}</td>
                      <td style={{ fontWeight: 'bold' }}>CHF {r.totalPrice || r.price}</td>
                    </tr>
                  ))}
                  {reservations.length === 0 && (
                    <tr><td colSpan="7" className="text-center py-8" style={{ opacity: 0.6 }}>{t('noReservations')}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Concept Tab */}
        {tab === "concept" && (
          <div className="glass rounded-xl p-6">
            <h2 className="font-semibold text-white mb-6" style={{ fontSize: '24px' }}>{t('conceptVisual')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-white">{t('conceptDescription')}</label>
                <textarea
                  value={concept.description}
                  onChange={(e) => setConcept({ ...concept, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg neon-input"
                  rows={4}
                  data-testid="concept-description"
                />
              </div>
              <div>
                <label className="block mb-2 text-white">{t('mediaUrl')}</label>
                <input
                  type="url"
                  value={concept.heroImageUrl}
                  onChange={(e) => setConcept({ ...concept, heroImageUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg neon-input"
                  placeholder="https://example.com/media.mp4 ou image.jpg"
                  data-testid="concept-media-url"
                />
              </div>
              {concept.heroImageUrl && (
                <div className="mt-4">
                  <p className="text-white mb-2" style={{ opacity: 0.7 }}>Aperçu:</p>
                  {concept.heroImageUrl.toLowerCase().endsWith('.mp4') ? (
                    <video src={concept.heroImageUrl} className="w-full max-h-64 rounded-lg object-cover" autoPlay loop muted />
                  ) : (
                    <img src={concept.heroImageUrl} alt="Preview" className="w-full max-h-64 rounded-lg object-cover" />
                  )}
                </div>
              )}
              <button onClick={saveConcept} className="btn-primary px-6 py-3 rounded-lg" data-testid="save-concept">
                {t('save')}
              </button>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {tab === "courses" && (
          <div className="glass rounded-xl p-6">
            <h2 className="font-semibold text-white mb-6" style={{ fontSize: '24px' }}>{t('courses')}</h2>
            {courses.map((course, idx) => (
              <div key={course.id} className="glass rounded-lg p-4 mb-4" style={{ borderColor: 'rgba(217, 28, 210, 0.4)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-white text-sm">{t('courseName')}</label>
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => { const n = [...courses]; n[idx].name = e.target.value; setCourses(n); }}
                      onBlur={() => updateCourse(course)}
                      className="w-full px-3 py-2 rounded-lg neon-input"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-white text-sm">{t('location')}</label>
                    <input
                      type="text"
                      value={course.locationName}
                      onChange={(e) => { const n = [...courses]; n[idx].locationName = e.target.value; setCourses(n); }}
                      onBlur={() => updateCourse(course)}
                      className="w-full px-3 py-2 rounded-lg neon-input"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-white text-sm">{t('weekday')}</label>
                    <select
                      value={course.weekday}
                      onChange={(e) => { const n = [...courses]; n[idx].weekday = parseInt(e.target.value); setCourses(n); updateCourse({ ...course, weekday: parseInt(e.target.value) }); }}
                      className="w-full px-3 py-2 rounded-lg neon-input"
                    >
                      {WEEKDAYS_MAP[lang].map((d, i) => <option key={i} value={i}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-white text-sm">{t('time')}</label>
                    <input
                      type="time"
                      value={course.time}
                      onChange={(e) => { const n = [...courses]; n[idx].time = e.target.value; setCourses(n); }}
                      onBlur={() => updateCourse(course)}
                      className="w-full px-3 py-2 rounded-lg neon-input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-1 text-white text-sm">{t('mapsLink')}</label>
                    <input
                      type="url"
                      value={course.mapsUrl || ''}
                      onChange={(e) => { const n = [...courses]; n[idx].mapsUrl = e.target.value; setCourses(n); }}
                      onBlur={() => updateCourse(course)}
                      className="w-full px-3 py-2 rounded-lg neon-input"
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* Add Course Form */}
            <form onSubmit={addCourse} className="glass rounded-lg p-4 mt-4" style={{ borderColor: 'rgba(139, 92, 246, 0.4)' }}>
              <h3 className="text-white mb-4 font-semibold">{t('addCourse')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={t('courseName')} value={newCourse.name} onChange={e => setNewCourse({ ...newCourse, name: e.target.value })} className="px-3 py-2 rounded-lg neon-input" required />
                <input type="text" placeholder={t('location')} value={newCourse.locationName} onChange={e => setNewCourse({ ...newCourse, locationName: e.target.value })} className="px-3 py-2 rounded-lg neon-input" />
                <select value={newCourse.weekday} onChange={e => setNewCourse({ ...newCourse, weekday: parseInt(e.target.value) })} className="px-3 py-2 rounded-lg neon-input">
                  {WEEKDAYS_MAP[lang].map((d, i) => <option key={i} value={i}>{d}</option>)}
                </select>
                <input type="time" value={newCourse.time} onChange={e => setNewCourse({ ...newCourse, time: e.target.value })} className="px-3 py-2 rounded-lg neon-input" />
              </div>
              <button type="submit" className="btn-primary px-4 py-2 rounded-lg mt-4">{t('add')}</button>
            </form>
          </div>
        )}

        {/* Offers Tab */}
        {tab === "offers" && (
          <div className="glass rounded-xl p-6">
            <h2 className="font-semibold text-white mb-6" style={{ fontSize: '24px' }}>{t('offers')}</h2>
            {offers.map((offer, idx) => (
              <div key={offer.id} className="glass rounded-lg p-4 mb-4 flex flex-wrap items-center gap-4" style={{ borderColor: 'rgba(217, 28, 210, 0.4)' }}>
                <div className="flex-1 min-w-48">
                  <label className="block mb-1 text-white text-sm">{t('offerName')}</label>
                  <input
                    type="text"
                    value={offer.name}
                    onChange={(e) => { const n = [...offers]; n[idx].name = e.target.value; setOffers(n); }}
                    onBlur={() => updateOffer(offer)}
                    className="w-full px-3 py-2 rounded-lg neon-input"
                  />
                </div>
                <div className="w-32">
                  <label className="block mb-1 text-white text-sm">{t('price')}</label>
                  <input
                    type="number"
                    value={offer.price}
                    onChange={(e) => { const n = [...offers]; n[idx].price = parseFloat(e.target.value); setOffers(n); }}
                    onBlur={() => updateOffer(offer)}
                    className="w-full px-3 py-2 rounded-lg neon-input"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-white text-sm">{t('visible')}</label>
                  <div
                    className={`switch ${offer.visible ? 'active' : ''}`}
                    onClick={() => { const n = [...offers]; n[idx].visible = !offer.visible; setOffers(n); updateOffer({ ...offer, visible: !offer.visible }); }}
                    data-testid={`offer-toggle-${offer.id}`}
                  />
                </div>
              </div>
            ))}
            {/* Add Offer Form */}
            <form onSubmit={addOffer} className="glass rounded-lg p-4 mt-4 flex flex-wrap items-end gap-4" style={{ borderColor: 'rgba(139, 92, 246, 0.4)' }}>
              <div className="flex-1 min-w-48">
                <label className="block mb-1 text-white text-sm">{t('offerName')}</label>
                <input type="text" value={newOffer.name} onChange={e => setNewOffer({ ...newOffer, name: e.target.value })} className="w-full px-3 py-2 rounded-lg neon-input" required />
              </div>
              <div className="w-32">
                <label className="block mb-1 text-white text-sm">{t('price')}</label>
                <input type="number" value={newOffer.price} onChange={e => setNewOffer({ ...newOffer, price: parseFloat(e.target.value) })} className="w-full px-3 py-2 rounded-lg neon-input" />
              </div>
              <button type="submit" className="btn-primary px-4 py-2 rounded-lg">{t('add')}</button>
            </form>
          </div>
        )}

        {/* Payments Tab */}
        {tab === "payments" && (
          <div className="glass rounded-xl p-6">
            <h2 className="font-semibold text-white mb-6" style={{ fontSize: '24px' }}>{t('payments')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-white">{t('stripeLink')}</label>
                <input type="url" value={paymentLinks.stripe} onChange={e => setPaymentLinks({ ...paymentLinks, stripe: e.target.value })} className="w-full px-4 py-3 rounded-lg neon-input" placeholder="https://buy.stripe.com/..." data-testid="payment-stripe" />
              </div>
              <div>
                <label className="block mb-2 text-white">{t('paypalLink')}</label>
                <input type="url" value={paymentLinks.paypal} onChange={e => setPaymentLinks({ ...paymentLinks, paypal: e.target.value })} className="w-full px-4 py-3 rounded-lg neon-input" placeholder="https://paypal.me/..." data-testid="payment-paypal" />
              </div>
              <div>
                <label className="block mb-2 text-white">{t('twintLink')}</label>
                <input type="url" value={paymentLinks.twint} onChange={e => setPaymentLinks({ ...paymentLinks, twint: e.target.value })} className="w-full px-4 py-3 rounded-lg neon-input" placeholder="https://..." data-testid="payment-twint" />
              </div>
              <div>
                <label className="block mb-2 text-white">{t('coachWhatsapp')}</label>
                <input type="tel" value={paymentLinks.coachWhatsapp} onChange={e => setPaymentLinks({ ...paymentLinks, coachWhatsapp: e.target.value })} className="w-full px-4 py-3 rounded-lg neon-input" placeholder="+41791234567" data-testid="payment-whatsapp" />
              </div>
              <button onClick={savePayments} className="btn-primary px-6 py-3 rounded-lg" data-testid="save-payments">{t('save')}</button>
            </div>
          </div>
        )}

        {/* Promo Codes Tab */}
        {tab === "codes" && (
          <div className="glass rounded-xl p-6">
            <h2 className="font-semibold text-white mb-6" style={{ fontSize: '24px' }}>{t('promoCodes')}</h2>
            <form onSubmit={addCode} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <input type="text" placeholder={t('codePromo')} value={newCode.code} onChange={e => setNewCode({ ...newCode, code: e.target.value })} className="px-3 py-2 rounded-lg neon-input" data-testid="new-code-name" />
              <select value={newCode.type} onChange={e => setNewCode({ ...newCode, type: e.target.value })} className="px-3 py-2 rounded-lg neon-input" data-testid="new-code-type">
                <option value="">{t('type')}</option>
                <option value="100%">100% ({t('reserveFree').replace(/[^\w\s]/g, '')})</option>
                <option value="%">%</option>
                <option value="CHF">CHF</option>
              </select>
              <input type="number" placeholder={t('value')} value={newCode.value} onChange={e => setNewCode({ ...newCode, value: e.target.value })} className="px-3 py-2 rounded-lg neon-input" data-testid="new-code-value" />
              <input type="email" placeholder={t('assignedEmail')} value={newCode.assignedEmail} onChange={e => setNewCode({ ...newCode, assignedEmail: e.target.value })} className="px-3 py-2 rounded-lg neon-input" data-testid="new-code-email" />
              <button type="submit" className="btn-primary px-4 py-2 rounded-lg md:col-span-4" data-testid="add-code">{t('add')}</button>
            </form>
            {discountCodes.map(code => (
              <div key={code.id} className="p-4 glass rounded-lg mb-2 flex justify-between items-center flex-wrap gap-2" style={{ borderColor: code.active ? 'rgba(217, 28, 210, 0.4)' : 'rgba(100, 100, 100, 0.4)' }}>
                <div>
                  <span className="text-white font-bold">{code.code}</span>
                  <span className="text-white ml-2 opacity-70">({code.type} {code.value})</span>
                  <span className="text-white ml-2 opacity-50">{code.assignedEmail || 'Tous'}</span>
                  <span className="text-white ml-2 opacity-50">• {t('used')}: {code.used || 0}x</span>
                </div>
                <button onClick={() => toggleCode(code)} className={`px-3 py-1 rounded text-sm ${code.active ? 'bg-green-600' : 'bg-gray-600'}`} style={{ color: 'white' }} data-testid={`toggle-code-${code.id}`}>
                  {code.active ? `✅ ${t('active')}` : `❌ ${t('inactive')}`}
                </button>
              </div>
            ))}
            {discountCodes.length === 0 && <p className="text-center py-4 text-white opacity-60">{t('noPromoCode')}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

// Success Overlay
const SuccessOverlay = ({ t, data, onClose }) => {
  const handlePrint = () => window.print();
  const handleShare = () => {
    const msg = `🎧 ${t('reservationConfirmed')}\n\n👤 ${t('name')}: ${data.userName}\n📧 ${t('email')}: ${data.userEmail}\n💰 ${t('offer')}: ${data.offerName}\n💵 ${t('total')}: CHF ${data.totalPrice}\n📅 ${t('courses')}: ${data.courseName}\n🎫 ${t('code')}: ${data.reservationCode}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="success-overlay">
      <div className="success-message glass rounded-xl p-6 max-w-md w-full text-center neon-border relative print-proof" style={{ background: 'rgba(0,0,0,0.95)' }}>
        <button onClick={onClose} className="absolute top-3 right-4 text-2xl text-white" data-testid="close-success">×</button>
        <div style={{ fontSize: '48px' }}>🎧</div>
        <p className="font-bold text-white my-2" style={{ fontSize: '20px' }}>{t('reservationConfirmed')}</p>
        <div className="my-4 p-4 rounded-lg bg-white/10 border-2 border-dashed" style={{ borderColor: '#d91cd2' }}>
          <p className="text-xs text-white opacity-60">{t('reservationCode')}:</p>
          <p className="text-2xl font-bold tracking-widest text-white" data-testid="reservation-code">{data.reservationCode}</p>
        </div>
        <div className="text-sm text-left space-y-1 mb-6 text-white opacity-80">
          <p><strong>{t('name')}:</strong> {data.userName}</p>
          <p><strong>{t('courses')}:</strong> {data.courseName}</p>
          <p><strong>{t('total')}:</strong> CHF {data.totalPrice}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handlePrint} className="flex-1 p-2 glass rounded-lg text-white text-sm" data-testid="print-btn">{t('print')}</button>
          <button onClick={handleShare} className="flex-1 p-2 glass rounded-lg text-white text-sm" data-testid="share-btn">{t('share')}</button>
        </div>
      </div>
    </div>
  );
};

// Confirm Payment Overlay
const ConfirmPaymentOverlay = ({ t, onConfirm, onCancel }) => (
  <div className="modal-overlay">
    <div className="modal-content glass rounded-xl p-6 max-w-md w-full text-center neon-border" style={{ background: 'rgba(0,0,0,0.95)' }}>
      <div style={{ fontSize: '48px' }}>💳</div>
      <p className="font-bold text-white my-4" style={{ fontSize: '20px' }}>{t('paymentDone')}</p>
      <p className="mb-6 text-white opacity-80">{t('paymentConfirmText')}</p>
      <button onClick={onConfirm} className="w-full btn-primary py-3 rounded-lg font-bold mb-3" data-testid="confirm-payment">{t('confirmPayment')}</button>
      <button onClick={onCancel} className="w-full py-2 glass rounded-lg text-white opacity-60" data-testid="cancel-payment">{t('cancel')}</button>
    </div>
  </div>
);

// Main App
function App() {
  const [lang, setLang] = useState(localStorage.getItem("af_lang") || "fr");
  const [showSplash, setShowSplash] = useState(true);
  const [showCoachLogin, setShowCoachLogin] = useState(false);
  const [coachMode, setCoachMode] = useState(false);

  const [courses, setCourses] = useState([]);
  const [offers, setOffers] = useState([]);
  const [users, setUsers] = useState([]);
  const [paymentLinks, setPaymentLinks] = useState({ stripe: "", paypal: "", twint: "", coachWhatsapp: "" });
  const [concept, setConcept] = useState({ description: "", heroImageUrl: "" });
  const [discountCodes, setDiscountCodes] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userWhatsapp, setUserWhatsapp] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmPayment, setShowConfirmPayment] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [pendingReservation, setPendingReservation] = useState(null);
  const [lastReservation, setLastReservation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Secret click counter for coach access
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const t = useCallback((key) => translations[lang][key] || key, [lang]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem("af_lang", lang);
  }, [lang]);

  // Fetch data
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const [crs, off, usr, lnk, cpt, cds] = await Promise.all([
          axios.get(`${API}/courses`),
          axios.get(`${API}/offers`),
          axios.get(`${API}/users`),
          axios.get(`${API}/payment-links`),
          axios.get(`${API}/concept`),
          axios.get(`${API}/discount-codes`)
        ]);
        if (mounted) {
          setCourses(crs.data);
          setOffers(off.data);
          setUsers(usr.data);
          setPaymentLinks(lnk.data);
          setConcept(cpt.data);
          setDiscountCodes(cds.data);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, []);

  // Splash timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle secret coach access (3 rapid clicks)
  const handleCopyrightClick = () => {
    const now = Date.now();
    if (now - lastClickTime < 500) {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      if (newCount >= 3) {
        setShowCoachLogin(true);
        setClickCount(0);
      }
    } else {
      setClickCount(1);
    }
    setLastClickTime(now);
  };

  const isDiscountFree = (code) => code && (code.type === "100%" || (code.type === "%" && parseFloat(code.value) >= 100));

  const resetForm = () => {
    setPendingReservation(null);
    setSelectedCourse(null);
    setSelectedDate(null);
    setSelectedOffer(null);
    setSelectedSession(null);
    setIsExistingUser(false);
    setSelectedUserId("");
    setUserName("");
    setUserEmail("");
    setUserWhatsapp("");
    setDiscountCode("");
    setHasAcceptedTerms(false);
  };

  const sendWhatsAppNotification = (reservation, isCoach) => {
    const phone = isCoach ? paymentLinks.coachWhatsapp : reservation.userWhatsapp;
    if (!phone?.trim()) return;
    const dateStr = new Date(reservation.datetime).toLocaleDateString('fr-CH');
    const msg = `🎧 ${isCoach ? 'Nouvelle réservation' : 'Confirmation'} Afroboost\n\n👤 ${reservation.userName}\n📧 ${reservation.userEmail}\n💰 ${reservation.offerName} - CHF ${reservation.totalPrice}\n📅 ${reservation.courseName} - ${dateStr}\n🎫 ${reservation.reservationCode}`;
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !selectedDate || !selectedOffer || !hasAcceptedTerms) return;

    const email = isExistingUser ? users.find(u => u.id === selectedUserId)?.email : userEmail;
    const whatsapp = isExistingUser ? users.find(u => u.id === selectedUserId)?.whatsapp : userWhatsapp;

    if (!email?.trim() || !whatsapp?.trim()) {
      setValidationMessage(t('emailWhatsappRequired'));
      setTimeout(() => setValidationMessage(""), 4000);
      return;
    }

    let appliedDiscount = null;
    if (discountCode) {
      try {
        const res = await axios.post(`${API}/discount-codes/validate`, { code: discountCode, email, courseId: selectedCourse.id });
        if (!res.data.valid) {
          setValidationMessage(res.data.message || t('invalidPromoCode'));
          setTimeout(() => setValidationMessage(""), 3000);
          return;
        }
        appliedDiscount = res.data.code;
      } catch {
        setValidationMessage(t('invalidPromoCode'));
        setTimeout(() => setValidationMessage(""), 3000);
        return;
      }
    }

    const user = isExistingUser ? users.find(u => u.id === selectedUserId) : null;
    const [h, m] = selectedCourse.time.split(':');
    const dt = new Date(selectedDate);
    dt.setHours(parseInt(h), parseInt(m), 0, 0);

    const reservation = {
      userId: user?.id || `user-${Date.now()}`,
      userName: user?.name || userName,
      userEmail: email,
      userWhatsapp: whatsapp,
      courseId: selectedCourse.id,
      courseName: selectedCourse.name,
      courseTime: selectedCourse.time,
      datetime: dt.toISOString(),
      offerId: selectedOffer.id,
      offerName: selectedOffer.name,
      price: selectedOffer.price,
      quantity: 1,
      totalPrice: selectedOffer.price,
      discountCode: appliedDiscount?.code || null,
      discountType: appliedDiscount?.type || null,
      discountValue: appliedDiscount?.value || null,
      appliedDiscount
    };

    // Free reservation
    if (appliedDiscount && isDiscountFree(appliedDiscount)) {
      if (!isExistingUser) {
        setValidationMessage(t('subscriberOnlyCode'));
        setTimeout(() => setValidationMessage(""), 4000);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.post(`${API}/reservations`, { ...reservation, totalPrice: 0 });
        await axios.post(`${API}/discount-codes/${appliedDiscount.id}/use`);
        setLastReservation({ ...res.data, totalPrice: "0.00" });
        sendWhatsAppNotification(res.data, true);
        setShowSuccess(true);
        resetForm();
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
      return;
    }

    // Paid reservation
    const hasPayment = paymentLinks.stripe?.trim() || paymentLinks.paypal?.trim() || paymentLinks.twint?.trim();
    if (!hasPayment) {
      setValidationMessage(t('noPaymentConfigured'));
      setTimeout(() => setValidationMessage(""), 4000);
      return;
    }

    setPendingReservation(reservation);
    if (!isExistingUser) {
      try {
        await axios.post(`${API}/users`, { name: userName, email: userEmail, whatsapp: userWhatsapp });
      } catch {}
    }

    // Open payment
    if (paymentLinks.twint?.trim()) window.open(paymentLinks.twint, '_blank');
    else if (paymentLinks.stripe?.trim()) window.open(paymentLinks.stripe, '_blank');
    else if (paymentLinks.paypal?.trim()) window.open(paymentLinks.paypal, '_blank');

    setTimeout(() => setShowConfirmPayment(true), 800);
  };

  const confirmPayment = async () => {
    if (!pendingReservation) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/reservations`, pendingReservation);
      if (pendingReservation.appliedDiscount) {
        await axios.post(`${API}/discount-codes/${pendingReservation.appliedDiscount.id}/use`);
      }
      setLastReservation(res.data);
      sendWhatsAppNotification(res.data, true);
      sendWhatsAppNotification(res.data, false);
      setShowSuccess(true);
      setShowConfirmPayment(false);
      resetForm();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const renderDates = (course) => {
    const dates = getNextOccurrences(course.weekday);
    return (
      <div className="grid grid-cols-2 gap-2 mt-3">
        {dates.map((date, idx) => {
          const sessionId = `${course.id}-${date.getTime()}`;
          const isSelected = selectedSession === sessionId;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => { setSelectedCourse(course); setSelectedDate(date); setSelectedSession(sessionId); }}
              className={`session-btn px-3 py-2 rounded-lg text-sm font-medium ${isSelected ? 'selected' : ''}`}
              style={{ color: 'white' }}
              data-testid={`date-btn-${course.id}-${idx}`}
            >
              {formatDate(date, course.time, lang)} {isSelected && '✔'}
            </button>
          );
        })}
      </div>
    );
  };

  if (showSplash) return <SplashScreen />;

  if (showCoachLogin) {
    return <CoachLoginModal t={t} onLogin={() => { setCoachMode(true); setShowCoachLogin(false); }} onCancel={() => setShowCoachLogin(false)} />;
  }

  if (coachMode) {
    return <CoachDashboard t={t} lang={lang} onBack={() => setCoachMode(false)} onLogout={() => setCoachMode(false)} />;
  }

  const visibleOffers = offers.filter(o => o.visible !== false);
  const uniqueUsers = Array.from(new Map(users.map(u => [u.email, u])).values());
  const currentEmail = isExistingUser ? uniqueUsers.find(u => u.id === selectedUserId)?.email : userEmail;
  const foundCode = discountCodes.find(c => c.code === discountCode && c.active);
  const isFree = isExistingUser && foundCode && isDiscountFree(foundCode) && (!foundCode.assignedEmail || foundCode.assignedEmail.toLowerCase() === (currentEmail || "").toLowerCase());

  return (
    <div className="w-full min-h-screen p-6 relative" style={{ background: '#000000', fontFamily: 'system-ui, sans-serif' }}>
      {/* Language Selector */}
      <LanguageSelector lang={lang} setLang={setLang} />

      {/* Overlays */}
      {showConfirmPayment && <ConfirmPaymentOverlay t={t} onConfirm={confirmPayment} onCancel={() => { setShowConfirmPayment(false); setPendingReservation(null); }} />}
      {showSuccess && lastReservation && <SuccessOverlay t={t} data={lastReservation} onClose={() => setShowSuccess(false)} />}

      <div className="max-w-4xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-bold mb-2 text-white" style={{ fontSize: '48px', textShadow: '0 0 20px rgba(217, 28, 210, 0.5)' }} data-testid="app-title">
            {t('appTitle')}
          </h1>
          <p className="concept-glow max-w-2xl mx-auto text-white opacity-80" style={{ fontSize: '16px' }}>
            {concept.description || t('conceptDefault')}
          </p>
        </div>

        {/* Hero Media */}
        {concept.heroImageUrl && (
          <div className="hero-media-container mb-8">
            {concept.heroImageUrl.toLowerCase().endsWith('.mp4') ? (
              <video src={concept.heroImageUrl} autoPlay loop muted playsInline className="w-full h-full" />
            ) : (
              <img src={concept.heroImageUrl} alt="Afroboost" className="w-full h-full" />
            )}
          </div>
        )}

        {/* Sessions */}
        <div className="mb-8">
          <h2 className="font-semibold mb-4 text-white" style={{ fontSize: '20px' }}>{t('chooseSession')}</h2>
          <div className="space-y-4">
            {courses.map(course => (
              <div key={course.id} className={`course-card glass rounded-xl p-5 ${selectedCourse?.id === course.id ? 'selected' : ''}`} data-testid={`course-card-${course.id}`}>
                <h3 className="font-semibold text-white">{course.name}</h3>
                <p className="text-xs text-white opacity-60 mb-1">📍 {course.locationName}</p>
                {course.mapsUrl && <a href={course.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: '#8b5cf6' }}>🗺️ Google Maps</a>}
                {renderDates(course)}
              </div>
            ))}
          </div>
        </div>

        {/* Offers */}
        {selectedCourse && selectedDate && (
          <div className="mb-8">
            <h2 className="font-semibold mb-4 text-white" style={{ fontSize: '20px' }}>{t('chooseOffer')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {visibleOffers.map(offer => (
                <div key={offer.id} onClick={() => setSelectedOffer(offer)} className={`offer-card glass rounded-xl p-5 text-center ${selectedOffer?.id === offer.id ? 'selected' : ''}`} data-testid={`offer-card-${offer.id}`}>
                  <h3 className="font-semibold text-white">{offer.name}</h3>
                  <p className="font-bold text-xl" style={{ color: '#d91cd2' }}>CHF {offer.price}.-</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        {selectedOffer && (
          <form onSubmit={handleSubmit}>
            <div className="glass rounded-xl p-6 mb-6">
              <h2 className="font-semibold mb-4 text-white" style={{ fontSize: '20px' }}>{t('yourInfo')}</h2>
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer text-white">
                  <input type="checkbox" checked={isExistingUser} onChange={e => setIsExistingUser(e.target.checked)} data-testid="existing-user-checkbox" />
                  <span className="text-sm">{t('alreadySubscribed')}</span>
                </label>
              </div>
              <div className="space-y-4">
                {isExistingUser ? (
                  <select required value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className="w-full p-3 rounded-lg neon-input" data-testid="existing-user-select">
                    <option value="">{t('selectProfile')}</option>
                    {uniqueUsers.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
                  </select>
                ) : (
                  <>
                    <input type="text" required placeholder={t('fullName')} value={userName} onChange={e => setUserName(e.target.value)} className="w-full p-3 rounded-lg neon-input" data-testid="user-name-input" />
                    <input type="email" required placeholder={t('emailRequired')} value={userEmail} onChange={e => setUserEmail(e.target.value)} className="w-full p-3 rounded-lg neon-input" data-testid="user-email-input" />
                    <input type="tel" required placeholder={t('whatsappRequired')} value={userWhatsapp} onChange={e => setUserWhatsapp(e.target.value)} className="w-full p-3 rounded-lg neon-input" data-testid="user-whatsapp-input" />
                  </>
                )}
                <input type="text" placeholder={t('promoCode')} value={discountCode} onChange={e => setDiscountCode(e.target.value)} className="w-full p-3 rounded-lg neon-input" style={{ borderColor: 'rgba(139, 92, 246, 0.5)' }} data-testid="discount-code-input" />
                {validationMessage && <p className="text-red-500 text-sm font-bold" data-testid="validation-message">{validationMessage}</p>}
                <div className="p-4 rounded-lg" style={{ background: 'rgba(217, 28, 210, 0.1)', borderLeft: '4px solid #d91cd2' }}>
                  <p className="font-bold text-white" data-testid="total-price">{t('total')}: CHF {isFree ? "0.00" : selectedOffer.price.toFixed(2)}</p>
                </div>
                <label className="flex items-start gap-2 cursor-pointer text-xs text-white opacity-70">
                  <input type="checkbox" required checked={hasAcceptedTerms} onChange={e => setHasAcceptedTerms(e.target.checked)} data-testid="terms-checkbox" />
                  <span>{t('acceptTerms')}</span>
                </label>
              </div>
            </div>
            <button type="submit" disabled={!hasAcceptedTerms || loading} className="btn-primary w-full py-4 rounded-xl font-bold uppercase tracking-wide" data-testid="submit-reservation-btn">
              {loading ? t('loading') : isFree ? t('reserveFree') : t('payAndReserve')}
            </button>
          </form>
        )}

        {/* Footer with secret coach access */}
        <footer className="mt-12 mb-8 text-center" style={{ opacity: 0.4 }}>
          <span onClick={handleCopyrightClick} className="copyright-secret text-white text-xs" data-testid="copyright-secret">
            {t('copyright')}
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
