import { Shield, Droplets, PaintBucket, Wrench, Grid2X2, Hammer, Box, PenTool } from 'lucide-react';

export const servicesData = [
  {
    id: 'roof-restoration',
    title: 'Roof Restoration',
    description: 'Complete restoration of aging or damaged roofs using advanced liquid rubber technology.',
    icon: Shield,
    benefits: ['Extends roof lifespan by 15+ years', 'Seamless, waterproof membrane', 'Reflects UV rays, lowering cooling costs'],
    process: ['High-pressure cleaning', 'Crack & joint sealing', 'Primer application', 'Multiple coats of liquid rubber'],
    image: 'https://images.unsplash.com/photo-1632759145355-66774f76261c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'waterproofing',
    title: 'Waterproofing Solutions',
    description: 'Industry-leading waterproofing for slabs, foundations, and retaining walls to prevent moisture damage.',
    icon: Droplets,
    benefits: ['Stops leaks instantly', 'Prevents structural damage & mold', 'Highly flexible to withstand building movement'],
    process: ['Surface preparation', 'Moisture testing', 'Application of waterproof membrane', 'Curing and final inspection'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting',
    title: 'Exterior & Interior Painting',
    description: 'Premium painting services that protect and beautify your property inside and out.',
    icon: PaintBucket,
    benefits: ['Weather-resistant exterior finishes', 'Flawless interior aesthetics', 'Increases property value'],
    process: ['Surface sanding and cleaning', 'Masking and protection', 'Primer coat', 'Two premium top coats'],
    image: 'https://images.unsplash.com/photo-1562259929-b7e181d8d9b7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gutters',
    title: 'Gutters & Fascia',
    description: 'Installation and repair of seamless gutters and fascia boards to direct water safely away.',
    icon: Wrench,
    benefits: ['Prevents foundation erosion', 'Custom-fit seamless design', 'Durable aluminum or PVC options'],
    process: ['Measurement and fabrication', 'Removal of old systems', 'Secure mounting', 'Water flow testing'],
    image: 'https://images.unsplash.com/photo-1613941785501-c8526279f649?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'epoxy',
    title: 'Epoxy Flooring',
    description: 'High-performance, durable epoxy coatings for garages, warehouses, and commercial spaces.',
    icon: Grid2X2,
    benefits: ['Extremely durable and impact resistant', 'Chemical and stain resistant', 'High-gloss, easy to clean finish'],
    process: ['Diamond grinding surface', 'Crack repair', 'Base coat application', 'Top clear coat sealing'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'paving',
    title: 'Paving & Concrete Work',
    description: 'Expert installation of driveways, walkways, and patios using premium pavers or concrete.',
    icon: Box,
    benefits: ['Enhances curb appeal', 'Long-lasting structural integrity', 'Low maintenance'],
    process: ['Excavation and grading', 'Base layer compaction', 'Paver laying or concrete pouring', 'Joint sanding and sealing'],
    image: 'https://images.unsplash.com/photo-1584988701980-60b73b22b9aa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tiling',
    title: 'Tiling & Ceilings',
    description: 'Precision tile installation and ceiling repairs/installation for a polished interior look.',
    icon: Grid2X2,
    benefits: ['Perfect leveling and spacing', 'Wide range of material options', 'Improves acoustic and visual appeal'],
    process: ['Substrate preparation', 'Layout planning', 'Adhesive application and setting', 'Grouting and finishing'],
    image: 'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'plumbing',
    title: 'Plumbing & Finishes',
    description: 'Reliable plumbing repairs, installations, and high-quality finishing touches.',
    icon: PenTool,
    benefits: ['Leak-free guaranteed', 'Modern fixture upgrades', 'Efficient water flow'],
    process: ['System diagnostics', 'Pipe repair or routing', 'Fixture installation', 'Pressure testing'],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  }
];

export const galleryData = [
  { id: 1, category: 'Waterproofing', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' },
  { id: 2, category: 'Roofing', url: 'https://images.unsplash.com/photo-1632759145355-66774f76261c?auto=format&fit=crop&w=800&q=80' },
  { id: 3, category: 'Painting', url: 'https://images.unsplash.com/photo-1562259929-b7e181d8d9b7?auto=format&fit=crop&w=800&q=80' },
  { id: 4, category: 'Flooring', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80' },
  { id: 5, category: 'Waterproofing', url: 'https://images.unsplash.com/photo-1518799175676-a0de7d853472?auto=format&fit=crop&w=800&q=80' },
  { id: 6, category: 'Roofing', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' },
  { id: 7, category: 'Restoration', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' },
  { id: 8, category: 'Painting', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80' },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sibusiso Dlamini',
    role: 'Homeowner',
    content: 'Liquid Rubber Tech completely transformed our leaking roof. Professional team and the finish is incredible. Highly recommend their waterproofing!',
  },
  {
    id: 2,
    name: 'Amanda Maseko',
    role: 'Property Manager',
    content: 'We use them for all our estate maintenance. From painting to epoxy flooring, they deliver top-tier quality every single time.',
  },
  {
    id: 3,
    name: 'Thabo Ndlovu',
    role: 'Business Owner',
    content: 'Fast, efficient, and clean. Their epoxy flooring in our warehouse has withstood heavy forklift traffic without a scratch.',
  }
];
