import { ExperienceFormat, IslandLocation, SlideData } from '../types';

export const BRAND_NAME = 'Numa';

export const SECTIONS = [
  {
    id: 'paradigm',
    kicker: '01 · The Shift',
    title: 'Beyond superficial stimulation',
    subtitle: 'People seek meaning, immersion, and community—alongside beauty and transcendence.',
  },
  {
    id: 'identity',
    kicker: '02 · Our Essence',
    title: 'Transforming spaces and human perception',
    subtitle: 'The first studio in Florianópolis merging technological art, immersive installations, and conscious wellness.',
  },
  {
    id: 'gallery',
    kicker: '03 · Living Portals',
    title: 'Where paradise meets immersive art',
    subtitle: 'Oceanfront sanctuaries, cliffside halos, and tranquil lagoon pavilions across the island.',
  },
  {
    id: 'ecosystem',
    kicker: '04 · Agile Ecosystem',
    title: 'No fixed walls: the island is our canvas',
    subtitle: 'Curating turnkey ephemeral universes across Florianópolis’ most breathtaking settings.',
  },
  {
    id: 'spectrum',
    kicker: '05 · Experiential Spectrum',
    title: 'Four formats crafted for transcendence',
    subtitle: 'Conscious sunsets, weekend retreats, micro pop-ups, and tailored brand activations.',
  },
  {
    id: 'architecture',
    kicker: '06 · End-to-End Execution',
    title: '100% of the experience architecture',
    subtitle: 'Artistic curation, immersive design, spatial production, and seamless hosting.',
  },
  {
    id: 'portal',
    kicker: '07 · The Portal',
    title: 'Turning ordinary spaces into living portals',
    subtitle: 'Welcome to the new era of entertainment in the Magic Island.',
  },
];

export const SLIDES: SlideData[] = SECTIONS.map((sec, idx) => ({
  id: idx + 1,
  slug: sec.id,
  kicker: sec.kicker,
  title: sec.title,
  subtitle: sec.subtitle,
  presenterNotes: [sec.subtitle, 'Immersive wellness and art production in Florianópolis.'],
}));

// Formats with 100% UNIQUE images (no repeats anywhere)
export const EXPERIENCE_FORMATS: ExperienceFormat[] = [
  {
    id: 'night',
    name: 'Conscious Sunsets & Gatherings',
    shortLabel: 'Conscious Sunsets',
    headline: 'Experimental music, spatial soundscapes, and light installations by the sea.',
    description:
      'Celebrations set at golden hour and dusk centered on deep listening, free movement, and contemplation. Multichannel spatial sound, botanical elixirs, and radiant visual art synchronized with the ocean horizon.',
    image: '/src/assets/images/floripa_sunset_wellness_1793241940629.jpg',
    specs: ['Golden Hour to Starlight', '360° Multichannel Immersion', 'Oceanfront Sanctuaries'],
    vibe: 'Contemplative · Hypnotic · Restorative',
    accentColor: '#FF007F',
  },
  {
    id: 'retreats',
    name: 'Weekend Immersive Retreats',
    shortLabel: 'Immersive Retreats',
    headline: 'Designed for deep reconnection, mindfulness, and creative expansion.',
    description:
      'Three-day immersions set in secluded nature. Open-air mindfulness on panoramic cliff decks, sound meditations under glowing architectural halos, and tranquil moments of shared stillness.',
    image: '/src/assets/images/floripa_beach_portal_1793241345659.jpg',
    specs: ['3-Day Reconnective Journey', 'Coastal Light Portals', 'Deep Restorative Stillness'],
    vibe: 'Regenerative · Sublime · Restorative',
    accentColor: '#00FF66',
  },
  {
    id: 'popups',
    name: 'Natural & Urban Micro Pop-ups',
    shortLabel: 'Micro Pop-ups',
    headline: 'Surprising the island with interactive installations and contemporary rituals.',
    description:
      'Ephemeral gatherings in secret coastal lookouts, hidden white sands, and botanical gardens. Organic light sculptures, ambient acoustic soundscapes, and intimate sunset circles.',
    image: '/src/assets/images/beach_sculpture_dusk_1793242935035.jpg',
    specs: ['Intimate Gatherings', 'Secret Island Hideaways', 'Ephemeral Light Arches'],
    vibe: 'Intimate · Spontaneous · Serene',
    accentColor: '#00FF66',
  },
  {
    id: 'brands',
    name: 'Tailored Brand Activations & Executive Retreats',
    shortLabel: 'Brand & Corporate',
    headline: 'Where technology serves to elevate, inspire, and connect.',
    description:
      'Bespoke executive retreats and cultural activations for visionary teams. Environments where spatial installations, serene architecture, and art foster clarity, empathy, and enduring memories.',
    image: '/src/assets/images/conscious_night_event_1793241347612.jpg',
    specs: ['Custom Spatial Curation', 'Boutique Resort Privacy', 'High-Touch Hospitality'],
    vibe: 'Bespoke · Visionary · Refined',
    accentColor: '#FF007F',
  },
];

// Gallery moments with 100% UNIQUE images (no repeats anywhere)
export const GALLERY_MOMENTS = [
  {
    title: 'Dune Sunset Tensile Canopy',
    location: 'Joaquina Coastal Dunes',
    image: '/src/assets/images/dune_sunset_canopy_1793243279865.jpg',
    tag: 'Architectural Tensile Structure',
  },
  {
    title: 'Floating Lagoon Light Cube',
    location: 'Lagoa da Conceição',
    image: '/src/assets/images/lagoon_floating_deck_1793243278754.jpg',
    tag: 'Water Deck & Geometric Art',
  },
  {
    title: 'Rainforest Sound Sanctuary',
    location: 'Mata Atlântica North',
    image: '/src/assets/images/forest_sound_dome_1793242935691.jpg',
    tag: 'Acoustic Dome Meditation',
  },
  {
    title: 'Boutique Oceanfront Horizon',
    location: 'East Coast Sanctuary',
    image: '/src/assets/images/boutique_retreat_space_1793241347886.jpg',
    tag: 'Turnkey Luxury Living',
  },
];

export const ISLAND_LOCATIONS: IslandLocation[] = [
  {
    id: 'praia-sul',
    name: 'Secret Beach in the South',
    region: 'South Island (Naufragados & Matadeiro)',
    type: 'Marine Sanctuary & Millenary Cliffs',
    description:
      'Ephemeral pavilions erected on white sand and granite cliffs at sunrise or twilight. Immersive spatial audio and radiant light arches framing the ocean horizon.',
    specs: 'Pristine Ocean Horizon · Private Cliff Decks',
    coordinates: { x: 38, y: 84 },
  },
  {
    id: 'bosque-norte',
    name: 'Canopy Forest in the North',
    region: 'North Island (Ratones & Santo Antônio)',
    type: 'Atlantic Rainforest Reserve',
    description:
      'Sensory pathways and timber glass sanctuaries woven through centenary native trees. Gentle light filaments and sound baths that harmonize with the forest.',
    specs: 'Temperate Rainforest · Natural Acoustic Diffusion',
    coordinates: { x: 48, y: 22 },
  },
  {
    id: 'lagoa-conceicao',
    name: 'Exclusive Pavilion at Lagoa',
    region: 'Lagoa da Conceição',
    type: 'Architectural Water Pavilion & Private Deck',
    description:
      'Minimalist travertine, timber, and glass structure extending over the calm lagoon. Features ambient zen illumination, panoramic water views, and floating meditation decks.',
    specs: 'Calm Lagoon Water · Ambient Floating Deck',
    coordinates: { x: 65, y: 50 },
  },
  {
    id: 'boutique-resorts',
    name: 'Boutique Hotels & Eco-Resorts',
    region: 'East Coast & Hilltop Vistas',
    type: 'Strategic Luxury Partnerships',
    description:
      'Alliances with eight of the island’s most exclusive design sanctuaries. Infinite ocean-facing terraces tailored for turnkey sunsets, banquets, and rituals.',
    specs: 'World-Class Hospitality · Helipad & Private Access',
    coordinates: { x: 76, y: 35 },
  },
];

export const ARCHITECTURE_PILLARS = [
  {
    num: '01',
    number: '01',
    title: 'Artistic Curation',
    desc: 'Composers of ambient soundscapes, contemporary light sculptors, and meditation guides.',
    description: 'Composers of ambient soundscapes, contemporary light sculptors, and meditation guides.',
    accent: '#00FF66',
  },
  {
    num: '02',
    number: '02',
    title: 'Immersive Design',
    desc: 'Spatial sound systems, ambient light installations, and harmonious spatial architecture.',
    description: 'Spatial sound systems, ambient light installations, and harmonious spatial architecture.',
    accent: '#FF007F',
  },
  {
    num: '03',
    number: '03',
    title: 'Spatial Production',
    desc: 'Turnkey assembly, architectural staging, and seamless execution in any terrain.',
    description: 'Turnkey assembly, architectural staging, and seamless execution in any terrain.',
    accent: '#00FF66',
  },
  {
    num: '04',
    number: '04',
    title: 'Field Logistics',
    desc: 'Effortless access to secluded beaches, rainforest lookouts, or waterfront pavilions.',
    description: 'Effortless access to secluded beaches, rainforest lookouts, or waterfront pavilions.',
    accent: '#FF007F',
  },
  {
    num: '05',
    number: '05',
    title: 'Wellness & Hospitality',
    desc: 'Restorative yoga, botanical elixirs, meditation journeys, and heartfelt hosting.',
    description: 'Restorative yoga, botanical elixirs, meditation journeys, and heartfelt hosting.',
    accent: '#00FF66',
  },
];

export const ARCHITECTURE_STEPS = ARCHITECTURE_PILLARS;
