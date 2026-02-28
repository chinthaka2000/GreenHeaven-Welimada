import { Shovel, Sun, Droplets, Utensils, Bike } from 'lucide-react';

export const roomsData = [
  {
    name: 'Paddy View Villa',
    price: '$150 / night',
    desc: 'Wake up to panoramic views of our vibrant rice fields. This luxury eco-villa features an open-concept tropical design, allowing the gentle breeze to flow naturally. Step out onto your private deck and slip into the infinity plunge pool as the golden hour sun sets over the farmland.',
    image: '/images/room_paddy_villa.png',
    amenities: ['King-sized Canopy Bed', 'Private Plunge Pool', 'Outdoor Rain Shower', 'Eco-Cooling System', 'Private Sun Deck']
  },
  {
    name: 'The Treehouse',
    price: '$180 / night',
    desc: 'Elevate your stay high amidst the lush coconut palm canopy. Crafted entirely from reclaimed wood, this breathtaking treehouse offers ultimate privacy and romance. Enjoy a relaxing soak in the luxury copper bathtub on your private deck while surrounded by the rustling leaves.',
    image: '/images/room_treehouse.png',
    amenities: ['Elevated Canopy View', 'Outdoor Copper Bathtub', 'Wrap-around Deck', 'Romantic Netting', 'Sunset Vantage Point']
  },
  {
    name: 'Mud Chalet',
    price: '$120 / night',
    desc: 'Experience authentic Sri Lankan architecture without sacrificing modern luxury. Our mud chalets are built using traditional wattle and daub techniques with smooth earthen walls and terracotta clay roofs, ensuring the interior stays naturally cool during the tropical days.',
    image: '/images/room_mud_chalet.png',
    amenities: ['Natural Earth Cooling', 'Private Jungle Garden', 'Shaded Veranda', 'Reclaimed Wood Furnishings', 'Organic Cotton Linens']
  }
];

export const experiencesData = [
  {
    title: 'Be a Farmer for a Day',
    desc: 'Get your hands dirty in the paddy fields. Learn traditional harvesting techniques and understand where your food comes from.',
    icon: <Shovel className="w-8 h-8 text-golden-amber" />,
    tags: ['Guided', 'Hands-on', '3 Hours'],
    featured: true,
    image: '/images/exp_farmer.png'
  },
  {
    title: 'Sunrise Yoga',
    desc: 'Greet the sun on our floating deck overlooking the lotus pond.',
    icon: <Sun className="w-6 h-6 text-sage-green" />,
    tags: ['Wellness', 'Morning'],
    featured: false,
    image: '/images/exp_yoga.png'
  },
  {
    title: 'Clay Pottery',
    desc: 'Mold natural clay from our river banks into your own keepsake.',
    icon: <Droplets className="w-6 h-6 text-terracotta-clay" />,
    tags: ['Creative', 'Workshop'],
    featured: false,
    image: '/images/exp_pottery.png'
  },
  {
    title: 'Harvest Cooking',
    desc: 'Cook traditional clay pot curry with vegetables you picked.',
    icon: <Utensils className="w-6 h-6 text-terracotta-clay" />,
    tags: ['Culinary', 'Lunch'],
    featured: false,
    image: '/images/exp_cooking.png'
  },
  {
    title: 'Village Cycling',
    desc: 'Explore the surrounding ancient temples and village life.',
    icon: <Bike className="w-6 h-6 text-golden-amber" />,
    tags: ['Adventure', 'Guided'],
    featured: false,
    image: '/images/exp_cycling.png'
  }
];

export const testimonialsData = [
  {
    text: 'A spiritual reset. The silence here is loud.',
    author: 'Sarah J.'
  },
  {
    text: 'The food was harvested right in front of us.',
    author: 'Michael T.'
  },
  {
    text: 'Waking up to the mist over the paddy fields changed me.',
    author: 'Elena R.'
  },
  {
    text: 'Luxury without losing the connection to earth.',
    author: 'David K.'
  },
  {
    text: 'The most authentic Sri Lankan experience.',
    author: 'Priya M.'
  }
];

export const statsData = [
  {
    value: '47',
    label: 'Acres of Land',
    suffix: ''
  },
  {
    value: '200',
    label: 'Happy Guests',
    suffix: '+'
  },
  {
    value: '12',
    label: 'Seasonal Crops',
    suffix: ''
  },
  {
    value: '100',
    label: 'Organic',
    suffix: '%'
  }
];
