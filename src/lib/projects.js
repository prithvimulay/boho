/**
 * Central project data source.
 * Replace image paths with real assets in /public/projects/.
 * category: "architecture" | "interior"
 * group:    architecture -> "houses-villas" | "apartments" | "hotels"
 *           interior     -> "residential"   | "commercial"
 */
export const PROJECTS = [
  {
    slug: "swarajya-residences",
    title: "Swarajya Residences",
    location: "Pune, Maharashtra",
    client: "Private",
    category: "interior",
    group: "houses-villas",
    thumbnail: "/FOYER AREA.jpeg",
    array: ["/GUEST BEDROOM.png", "/Swarajya/Swarajya10.png", "/Swarajya/Swarajya12.png", "/Swarajya/Swarajya15.png", "/Swarajya/Swarajya16.png", "/Swarajya/Swarajya28.png"],
    excerpt:
      "A contemporary interpretation of Mediterranean living, set into the hills above Barcelona.",
  },
  {
    slug: "vilekars-apartments",
    title: "Project at The Ark",
    location: "Pune, Maharashtra",
    client: "The Ark",
    category: "interior",
    group: "houses-villas",
    thumbnail: "/Vilekars/Vilekars13.png",
    array: ["/Vilekars/Vilekars11.png", "/Vilekars/Vilekars13.png", "/Vilekars/Vilekars10.png", "/Vilekars/Vilekars9.png", "/Vilekars/Vilekars14.png", "/Vilekars/Vilekars16.png", "/Vilekars/Vilekars18.png", "/Vilekars/Vilekars21.png", "/Vilekars/Vilekars28.png", "/Vilekars/Vilekars36.png"],
    excerpt: "Tropical modernism opening fully onto the beach and ocean beyond.",
  },
  // {
  //   slug: "punta-cana-villa",
  //   title: "Punta Cana Villa",
  //   location: "Punta Cana, Dominican Republic",
  //   client: "Private",
  //   category: "architecture",
  //   group: "houses-villas",
  //   thumbnail: "/orrizonte/ashwin/photo/NRD02411.jpg",
  //   array: ["/orrizonte/ashwin/photo/NRD02412.jpg", "/orrizonte/ashwin/photo/NRD02413.jpg", "/orrizonte/ashwin/photo/NRD02414.jpg", "/orrizonte/ashwin/photo/NRD02415.jpg"],
  //   excerpt: "Tropical modernism opening fully onto the beach and ocean beyond.",
  // },
  // {
  //   slug: "marina-towers",
  //   title: "Marina Towers",
  //   location: "Dubai, UAE",
  //   client: "Marina Holdings",
  //   category: "architecture",
  //   group: "apartments",
  //   thumbnail: "/projects/marina.jpg",
  //   array: ["/projects/marina-1.jpg", "/projects/marina-2.jpg"],
  //   excerpt: "A residential high-rise with cascading terraces over the marina.",
  // },
  // {
  //   slug: "the-grove-hotel",
  //   title: "The Grove Hotel",
  //   location: "Lisbon, Portugal",
  //   client: "Grove Group",
  //   category: "architecture",
  //   group: "hotels",
  //   thumbnail: "/projects/grove.jpg",
  //   array: ["/projects/grove-1.jpg", "/projects/grove-2.jpg", "/projects/grove-3.jpg"],
  //   excerpt: "A boutique hotel woven into a restored historic quarter.",
  // },
  // {
  //   slug: "atelier-loft",
  //   title: "Atelier Loft",
  //   location: "Paris, France",
  //   client: "Private",
  //   category: "interior",
  //   group: "residential",
  //   thumbnail: "/projects/atelier.jpg",
  //   array: ["/projects/atelier-1.jpg", "/projects/atelier-2.jpg"],
  //   excerpt: "A warm, material-rich loft balancing rawness and refinement.",
  // },
  // {
  //   slug: "coastal-penthouse",
  //   title: "Coastal Penthouse",
  //   location: "Marbella, Spain",
  //   client: "Private",
  //   category: "interior",
  //   group: "residential",
  //   thumbnail: "/projects/penthouse.jpg",
  //   array: ["/projects/penthouse-1.jpg", "/projects/penthouse-2.jpg"],
  //   excerpt: "An airy penthouse interior dissolving the line between inside and sea.",
  // },
  // {
  //   slug: "nordic-office",
  //   title: "Nordic Office",
  //   location: "Copenhagen, Denmark",
  //   client: "Form Studio",
  //   category: "interior",
  //   group: "commercial",
  //   thumbnail: "/projects/nordic.jpg",
  //   array: ["/projects/nordic-1.jpg", "/projects/nordic-2.jpg"],
  //   excerpt: "A calm, light-filled workspace built around timber and acoustic comfort.",
  // },
  // {
  //   slug: "flagship-store",
  //   title: "Flagship Store",
  //   location: "Milan, Italy",
  //   client: "Maison",
  //   category: "interior",
  //   group: "commercial",
  //   thumbnail: "/projects/flagship.jpg",
  //   array: ["/projects/flagship-1.jpg", "/projects/flagship-2.jpg"],
  //   excerpt: "A sculptural retail interior designed as a continuous gallery walk.",
  // },
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
