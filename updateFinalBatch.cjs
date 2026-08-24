const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

const newGalleryData = `
export const galleryData: GalleryProject[] = [
  { id: 1, category: 'Roofing', title: 'Roof Restoration', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/KEqweYg.jpeg' }] },
  { id: 2, category: 'Painting', title: 'Exterior Painting', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/cWcInUB.jpeg' }] },
  { id: 3, category: 'Roofing', title: 'Roof Restoration Project', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/DOS8Cce.jpeg' }] },
  { id: 4, category: 'Waterproofing & Restoration', title: 'Roof Restoration & Waterproofing', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/pFneYY9.jpeg' }] },
  { id: 5, category: 'Roofing', title: 'Roof Restoration Complete', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/W5NGxA6.jpeg' }] },
  { id: 6, category: 'Waterproofing & Restoration', title: 'Waterproofing Application', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/fSpm7qB.jpeg' }] },
  { id: 7, category: 'Painting', title: 'Exterior Painting & Gutters', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/Y8F4PBm.jpeg' }] },
  { id: 8, category: 'Roofing', title: 'Roofing Project', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/jWBRSuX.jpeg' }] },
  { 
    id: 9, category: 'Roofing', title: 'Complete Roof Overhaul', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/w5xhopm.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/PC44OH0.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/7YF7eS1.jpeg' }
    ] 
  },
  { 
    id: 10, category: 'Roofing', title: 'Roof Repair & Restoration', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/dRQqKMj.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/VOP3u6z.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/BAZUsRa.jpeg' }
    ] 
  },
  { 
    id: 11, category: 'Painting', title: 'Interior Painting Transformation', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/5Ll3JjK.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/5RetyeE.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/UvnY9go.jpeg' }
    ] 
  },
  { 
    id: 12, category: 'Waterproofing & Restoration', title: 'Waterproofing Treatment', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/SIM93Pp.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/GZJI6pd.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/hacXIcJ.jpeg' }
    ] 
  },
  { id: 13, category: 'Roofing', title: 'Roof Restoration Update', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/qB05Fch.jpeg' }] },
  { id: 14, category: 'Waterproofing & Restoration', title: 'Waterproofing & Roof Protection', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/IPLfjan.jpeg' }] },
  { 
    id: 15, category: 'Waterproofing & Restoration', title: 'Comprehensive Waterproofing & Restoration', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/LEEMFs8.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/wyuo3N1.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/DWqVy7m.jpeg' }
    ] 
  }
];
`;

content = content.replace(/export const galleryData: GalleryProject\[\] = \[[\s\S]*?\];/, newGalleryData.trim());
fs.writeFileSync('src/data.ts', content);
