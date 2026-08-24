const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// Replace galleryData
const newGalleryData = `
export interface GalleryProject {
  id: number;
  category: string;
  title: string;
  type: 'sequence' | 'single';
  images: { stage: 'Before' | 'During' | 'After' | 'Combined' | 'Final'; url: string }[];
}

export const galleryData: GalleryProject[] = [
  { 
    id: 1, 
    category: 'Waterproofing & Restoration', 
    title: 'Commercial Waterproofing Project',
    type: 'sequence',
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/QlvY66l.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/7ArB8E7.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/lcJOpKY.jpeg' }
    ]
  },
  { 
    id: 2, category: 'Roofing', title: 'Residential Roof Work', type: 'single', 
    images: [{ stage: 'Combined', url: 'https://i.imgur.com/A0mmQOK.jpeg' }] 
  },
  { 
    id: 3, category: 'Roofing', title: 'Roof Maintenance', type: 'single', 
    images: [{ stage: 'Combined', url: 'https://i.imgur.com/acc0hyu.jpeg' }] 
  },
  { 
    id: 6, category: 'Roofing', title: 'Roof Installation', type: 'single', 
    images: [{ stage: 'Combined', url: 'https://i.imgur.com/vpaoSZK.jpeg' }] 
  },
  { 
    id: 7, category: 'Painting', title: 'Exterior Painting', type: 'single', 
    images: [{ stage: 'Combined', url: 'https://i.imgur.com/qdjcEIa.jpeg' }] 
  },
  { 
    id: 8, category: 'Waterproofing & Restoration', title: 'Restoration Project', type: 'single', 
    images: [{ stage: 'Combined', url: 'https://i.imgur.com/iGVxcFw.jpeg' }] 
  },
  { 
    id: 9, category: 'Painting', title: 'Interior Painting', type: 'single', 
    images: [{ stage: 'Combined', url: 'https://i.imgur.com/UEWYH7e.jpeg' }] 
  },
  { 
    id: 10, category: 'Waterproofing & Restoration', title: 'Waterproofing Phase', type: 'single', 
    images: [{ stage: 'Combined', url: 'https://i.imgur.com/0369uN2.jpeg' }] 
  },
  { 
    id: 11, category: 'Roofing', title: 'Roof Repairs', type: 'single', 
    images: [{ stage: 'Combined', url: 'https://i.imgur.com/4Gvbn8A.jpeg' }] 
  },
  { 
    id: 12, category: 'Waterproofing & Restoration', title: 'Structural Restoration', type: 'single', 
    images: [{ stage: 'Combined', url: 'https://i.imgur.com/w8t8XbK.jpeg' }] 
  },
  { 
    id: 13, category: 'Waterproofing & Restoration', title: 'Balcony Waterproofing', type: 'single', 
    images: [{ stage: 'Combined', url: 'https://i.imgur.com/JOHCBMx.jpeg' }] 
  },
  { 
    id: 14, category: 'Painting', title: 'Wall Painting', type: 'single', 
    images: [{ stage: 'Combined', url: 'https://i.imgur.com/MPf7mVr.png' }] 
  }
];
`;

content = content.replace(/export const galleryData = \[[\s\S]*?\];/, newGalleryData.trim());

fs.writeFileSync('src/data.ts', content);
