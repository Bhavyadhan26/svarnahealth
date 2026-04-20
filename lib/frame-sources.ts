const frameCount = 240;

export const frameSources = Array.from({ length: frameCount }, (_, index) => {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `/Image_Assets/ezgif-frame-${frameNumber}.jpg`;
});

export const stageCopy = [
  {
    label: 'Purity',
    title: 'Raw herbs in the dark',
    body: 'Amla, turmeric, saffron, and hand-picked botanicals float in quiet suspension.'
  },
  {
    label: 'Convergence',
    title: 'Ingredients begin to assemble',
    body: 'The ritual tightens. Each note locks into a precise Ayurvedic composition.'
  },
  {
    label: 'Extraction',
    title: 'Cold-pressed transformation',
    body: 'The blend is pressed into a fluid gold matrix without compromising vitality.'
  },
  {
    label: 'Elixir',
    title: 'Golden liquid energy',
    body: 'Cellular nutrition becomes luminous and visibly restorative.'
  },
  {
    label: 'Glow',
    title: 'Ritual becomes radiance',
    body: 'The Svarna bottle and aura unify beauty, science, and inner glow.'
  }
];

export const philosophyCards = [
  {
    title: 'Radiance Series',
    body: 'Daily nourishment designed to support clarity, bounce, and complexion from within.'
  },
  {
    title: 'Vitality Line',
    body: 'Functional ingredients shaped around resilience, energy, and long-horizon wellbeing.'
  },
  {
    title: 'Detox Protocol',
    body: 'A refined reset ritual that pairs purity with modern metabolic intelligence.'
  }
];