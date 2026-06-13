/**
 * Central project data source.
 * Replace image paths with real assets in /public/projects/.
 * category: "architecture" | "interior"
 * group:    architecture -> "houses-villas" | "apartments" | "hotels"
 *           interior     -> "residential"   | "commercial"
 */
export const PROJECTS = [
  {
    slug: "bonanova-residences",
    title: "Bonanova Residences",
    location: "Barcelona, Spain",
    client: "Private",
    category: "architecture",
    group: "houses-villas",
    thumbnail: "/projects/bonanova.jpg",
    excerpt:
      "A contemporary interpretation of Mediterranean living, set into the hills above Barcelona.",
  },
  {
    slug: "antiparos-villas",
    title: "Antiparos Villas",
    location: "Antiparos, Greece",
    client: "Aegean Estates",
    category: "architecture",
    group: "houses-villas",
    thumbnail: "/projects/antiparos.jpg",
    excerpt:
      "A cluster of stone villas nestled into the Cycladic landscape, framing the sea.",
  },
  {
    slug: "punta-cana-villa",
    title: "Punta Cana Villa",
    location: "Punta Cana, Dominican Republic",
    client: "Private",
    category: "architecture",
    group: "houses-villas",
    thumbnail: "/projects/punta-cana.jpg",
    excerpt: "Tropical modernism opening fully onto the beach and ocean beyond.",
  },
  {
    slug: "marina-towers",
    title: "Marina Towers",
    location: "Dubai, UAE",
    client: "Marina Holdings",
    category: "architecture",
    group: "apartments",
    thumbnail: "/projects/marina.jpg",
    excerpt: "A residential high-rise with cascading terraces over the marina.",
  },
  {
    slug: "the-grove-hotel",
    title: "The Grove Hotel",
    location: "Lisbon, Portugal",
    client: "Grove Group",
    category: "architecture",
    group: "hotels",
    thumbnail: "/projects/grove.jpg",
    excerpt: "A boutique hotel woven into a restored historic quarter.",
  },
  {
    slug: "atelier-loft",
    title: "Atelier Loft",
    location: "Paris, France",
    client: "Private",
    category: "interior",
    group: "residential",
    thumbnail: "/projects/atelier.jpg",
    excerpt: "A warm, material-rich loft balancing rawness and refinement.",
  },
  {
    slug: "coastal-penthouse",
    title: "Coastal Penthouse",
    location: "Marbella, Spain",
    client: "Private",
    category: "interior",
    group: "residential",
    thumbnail: "/projects/penthouse.jpg",
    excerpt: "An airy penthouse interior dissolving the line between inside and sea.",
  },
  {
    slug: "nordic-office",
    title: "Nordic Office",
    location: "Copenhagen, Denmark",
    client: "Form Studio",
    category: "interior",
    group: "commercial",
    thumbnail: "/projects/nordic.jpg",
    excerpt: "A calm, light-filled workspace built around timber and acoustic comfort.",
  },
  {
    slug: "flagship-store",
    title: "Flagship Store",
    location: "Milan, Italy",
    client: "Maison",
    category: "interior",
    group: "commercial",
    thumbnail: "/projects/flagship.jpg",
    excerpt: "A sculptural retail interior designed as a continuous gallery walk.",
  },
];

export function getProjectsByCategory(category) {
  return PROJECTS.filter((p) => p.category === category);
}

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

/** Group labels for section headings within a category. */
export const GROUP_LABELS = {
  "houses-villas": "Houses & Villas",
  apartments: "Apartments",
  hotels: "Hotels & Developments",
  residential: "Residential",
  commercial: "Commercial",
};
