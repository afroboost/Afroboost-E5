// /components/index.js - Export centralisé des composants Afroboost
// Compatible Vercel - Architecture modulaire

// === COMPOSANTS OFFRES ===
export { OfferCard, OfferCardSlider } from './OfferCard';
export { OffersSliderAutoPlay } from './OffersSlider';

// === SESSIONS / COURS ===
export { SessionList } from './SessionList';

// === FORMULAIRE DE RÉSERVATION ===
export { BookingForm } from './BookingForm';

// === LECTEUR AUDIO ===
export { AudioPlayer } from './AudioPlayer';

// === SCANNER QR ===
export { QRScannerModal } from './QRScanner';

// === NAVIGATION & RECHERCHE ===
export { 
  NavigationBar, 
  useNavigation, 
  LandingSectionSelector,
  ScrollIndicator,
  useScrollIndicator
} from './SearchBar';

// === WIDGET CHAT IA ===
export { ChatWidget } from './ChatWidget';

// === CAMPAGNES ADMIN ===
export { 
  useContactStats,
  useDirectSend,
  generateWhatsAppLink,
  generateInstagramLink,
  ContactCounter,
  DirectSendPanel,
  CampaignStatusBadge,
  ResultBadge
} from './AdminCampaigns';

// === COMPOSANTS UI DE BASE ===
export { 
  Button, 
  Input, 
  Card, 
  Modal, 
  StatusBadge, 
  Loader, 
  Switch,
  InfoIcon,
  SearchIcon,
  CloseIcon
} from './ui/index.jsx';

// === SELECTOR DE LANGUE ===
export { default as LanguageSelector } from './LanguageSelector';
