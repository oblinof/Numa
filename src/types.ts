export interface AgencyConfig {
  name: string;
  tagline: string;
  city: string;
  contactEmail: string;
  phone: string;
  theme: 'emerald' | 'cyan' | 'amber' | 'violet';
}

export interface SlideData {
  id: number;
  slug: string;
  kicker: string;
  title: string;
  subtitle?: string;
  presenterNotes: string[];
}

export type ExperienceFormatId = 'popups' | 'night' | 'retreats' | 'brands';

export interface ExperienceFormat {
  id: ExperienceFormatId;
  name: string;
  shortLabel: string;
  headline: string;
  description: string;
  image: string;
  specs: string[];
  vibe: string;
  accentColor: string;
}

export interface IslandLocation {
  id: string;
  name: string;
  region: string;
  type: string;
  description: string;
  specs: string;
  coordinates: { x: number; y: number }; // Percentage on visual map
}
