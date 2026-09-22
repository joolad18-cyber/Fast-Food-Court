import { MenuItem, RestaurantLocation, Review } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Burgers
  {
    id: 'court-stack-double',
    name: 'The Court Double Stack',
    category: 'Burgers',
    price: 9.85,
    calories: 780,
    prepTimeMin: 3.5,
    description: 'Two smash-seared 100% Angus patties, double American cheddar, crisp butterhead lettuce, tangy house pickle relish, and our signature Court burger sauce on a toasted brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    isSignature: true,
    isPopular: true,
    ingredients: ['Double Angus Patties', 'Melted Cheddar', 'Butterhead Lettuce', 'House Relish', 'Toasted Brioche', 'Court Secret Sauce']
  },
  {
    id: 'blaze-hot-crispy',
    name: 'Blaze Crispy Chicken',
    category: 'Burgers',
    price: 8.95,
    calories: 690,
    prepTimeMin: 3.8,
    description: '24-hour buttermilk-brined chicken breast fried extra crunchy, dunked in smoked chili honey oil, layered with charred jalapeno slaw and roasted garlic aioli.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    isSignature: true,
    isSpicy: true,
    isPopular: true,
    ingredients: ['Crispy Buttermilk Chicken', 'Smoked Chili Honey', 'Jalapeno Slaw', 'Garlic Aioli', 'Pickled Cucumbers', 'Potato Bun']
  },
  {
    id: 'smoky-bbq-bacon',
    name: 'Smoky Bourbon Bacon',
    category: 'Burgers',
    price: 10.45,
    calories: 840,
    prepTimeMin: 4.0,
    description: 'Thick cut applewood bacon, char-grilled beef, beer-battered crispy onion rings, aged white cheddar, and dark bourbon hickory glaze.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    ingredients: ['Seared Beef Patty', 'Applewood Smoked Bacon', 'Beer-battered Onion Rings', 'Aged White Cheddar', 'Bourbon Hickory BBQ']
  },
  {
    id: 'truffle-mushroom-melt',
    name: 'Truffle & Herb Mushroom',
    category: 'Burgers',
    price: 10.20,
    calories: 720,
    prepTimeMin: 4.2,
    description: 'Caramelized portobello and cremini mushrooms, black truffle fondue cream, baby arugula, and melted Swiss gruyère on a golden toasted brioche.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    isVegetarian: false,
    ingredients: ['Angus Patty', 'Sauteed Wild Mushrooms', 'Truffle Cream', 'Baby Arugula', 'Melted Swiss', 'Toasted Brioche']
  },
  {
    id: 'green-court-plant',
    name: 'Green Court Smash (VG)',
    category: 'Burgers',
    price: 9.40,
    calories: 590,
    prepTimeMin: 3.5,
    description: 'Crispy quinoa and black bean smash patty, avocado cream, Roma tomatoes, baby spinach, and vegan smoky chipotle mayo.',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    ingredients: ['Crispy Quinoa-Bean Patty', 'Fresh Sliced Avocado', 'Vine Tomatoes', 'Baby Spinach', 'Vegan Chipotle Crema']
  },

  // Combos
  {
    id: 'power-box-combo',
    name: 'The Fast Power Box Combo',
    category: 'Combos',
    price: 13.95,
    calories: 1150,
    prepTimeMin: 4.0,
    description: 'Court Double Stack burger + seasoned sea salt flash fries + 4pc crispy golden tenders + choice of craft fountain soda.',
    image: 'https://images.unsplash.com/photo-1619881590738-a111d176d906?auto=format&fit=crop&w=800&q=80',
    isSignature: true,
    isPopular: true,
    ingredients: ['Court Double Stack', 'Large Sea Salt Fries', '4pc Chicken Tenders', 'Court Dip Trio', 'Refill Fountain Drink']
  },
  {
    id: 'spicy-bird-combo',
    name: 'Blaze Bird Box Combo',
    category: 'Combos',
    price: 12.85,
    calories: 1040,
    prepTimeMin: 4.2,
    description: 'Blaze Crispy Chicken sandwich + loaded cheese fries + crispy dill pickles + fountain craft lemonade.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
    isPopular: true,
    ingredients: ['Blaze Chicken Sandwich', 'Loaded Cheese Fries', 'Pickled Cucumber Spears', 'Fresh Lemonade']
  },
  {
    id: 'family-court-feast',
    name: 'Court Crew Feast (4-Pack)',
    category: 'Combos',
    price: 36.50,
    calories: 3200,
    prepTimeMin: 5.5,
    description: '4 classic or spicy burgers, 2 large golden loaded fries, 10pc chicken poppers, 4 fountain drinks, and 4 dipping sauces.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    ingredients: ['4 Selected Burgers', '2 XL Crispy Fries', '10pc Crunchy Poppers', '4 Dipping Sauces', '4 Craft Drinks']
  },

  // Sides
  {
    id: 'flash-crisp-fries',
    name: 'Double-Flash Seasoned Fries',
    category: 'Sides',
    price: 3.90,
    calories: 390,
    prepTimeMin: 2.0,
    description: 'Skin-on Idaho russets, twice-fried in sunflower oil until shatteringly crisp, dusted with smoked rosemary sea salt.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    isSignature: true,
    ingredients: ['Idaho Russet Potatoes', 'Smoked Sea Salt', 'Cracked Pepper', 'Fresh Rosemary Dust']
  },
  {
    id: 'court-loaded-fries',
    name: 'Court Sizzlin’ Loaded Fries',
    category: 'Sides',
    price: 5.95,
    calories: 580,
    prepTimeMin: 2.8,
    description: 'Golden fries smothered in hot cheddar cheese sauce, crispy bacon bits, griddled onions, pickled jalapenos, and Court drizzle.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    ingredients: ['Crisp Fries', 'Warm Cheddar Sauce', 'Smoked Bacon Crumbles', 'Griddled Sweet Onions', 'Jalapeno Coins']
  },
  {
    id: 'crispy-court-tenders',
    name: 'Crisp Herb Chicken Tenders (5pc)',
    category: 'Sides',
    price: 6.80,
    calories: 490,
    prepTimeMin: 3.0,
    description: 'Hand-cut whole breast chicken tossed in cracked black pepper and herb breading, served with your pick of 2 craft dips.',
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    ingredients: ['Tenderloin Chicken', 'Spiced Flour Dredge', 'Buttermilk Marinade', 'Honey Mustard & BBQ']
  },
  {
    id: 'golden-onion-rings',
    name: 'Thick Cut Beer-Battered Rings',
    category: 'Sides',
    price: 4.60,
    calories: 420,
    prepTimeMin: 2.5,
    description: 'Colossal sweet Spanish onions dipped in craft amber ale batter and fried to a shatter-crisp crunch.',
    image: 'https://images.unsplash.com/photo-1639024471287-032f66e5f39e?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Sweet Spanish Onions', 'Amber Ale Batter', 'Smoked Paprika Dip']
  },

  // Drinks
  {
    id: 'smoked-vanilla-shake',
    name: 'Charred Vanilla Bean Shake',
    category: 'Drinks',
    price: 4.95,
    calories: 460,
    prepTimeMin: 1.8,
    description: 'Slow-churned Madagascar vanilla custard whipped with whole milk, toasted marshmallow cream, and golden cookie crumble.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    isSignature: true,
    ingredients: ['Madagascar Vanilla Custard', 'Toasted Marshmallow Fluff', 'Whole Milk', 'Butter Cookie Crumbs']
  },
  {
    id: 'salted-caramel-bourbon-shake',
    name: 'Salted Caramel Crunch Shake',
    category: 'Drinks',
    price: 5.25,
    calories: 510,
    prepTimeMin: 2.0,
    description: 'Velvety custard blended with dark burnt sugar caramel, sea salt flakes, and crispy pretzel brittle.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Vanilla Custard', 'Dark Sea Salt Caramel', 'Crushed Pretzel Toffee', 'Whipped Topping']
  },
  {
    id: 'blood-orange-fizz',
    name: 'Sparkling Blood Orange Craft Soda',
    category: 'Drinks',
    price: 3.50,
    calories: 140,
    prepTimeMin: 1.0,
    description: 'Cold-pressed Sicilian blood orange juice, cane sugar, and effervescent sparkling mountain water.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Blood Orange Extract', 'Raw Cane Sugar', 'Sparkling Spring Water', 'Fresh Mint']
  },

  // Desserts
  {
    id: 'hot-cinnamon-churros',
    name: 'Hot Crispy Court Churro Bites',
    category: 'Desserts',
    price: 4.80,
    calories: 380,
    prepTimeMin: 2.2,
    description: 'Fresh-piped warm churro nuggets rolled in cinnamon brown sugar, served with warm Belgian dark chocolate dipping pot.',
    image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=800&q=80',
    isSignature: true,
    ingredients: ['Fried Choux Pastry', 'Ceylon Cinnamon', 'Brown Sugar', 'Warm Dark Chocolate Pot']
  },
  {
    id: 'fried-apple-handpie',
    name: 'Cast-Iron Fried Apple Handpie',
    category: 'Desserts',
    price: 4.25,
    calories: 340,
    prepTimeMin: 2.0,
    description: 'Flaky golden puff pastry stuffed with spiced honeycrisp apple compote and glazed with warm bourbon sugar.',
    image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Crisp Puff Pastry', 'Honeycrisp Apples', 'Nutmeg & Allspice', 'Vanilla Sugar Drizzle']
  }
];

export const RESTAURANT_LOCATIONS: RestaurantLocation[] = [
  {
    id: 'loc-downtown',
    name: 'Fast Meals Court — Downtown Central',
    subname: 'Flagship Kitchen & Express Pickup',
    address: '425 Grand Avenue, Suite 101',
    city: 'Downtown Core',
    postalCode: '90012',
    phone: '+1 (555) 327-8631',
    hours: {
      weekdays: '10:00 AM – 11:30 PM',
      friday: '10:00 AM – 1:00 AM',
      saturday: '10:00 AM – 1:00 AM',
      sunday: '10:30 AM – 11:00 PM'
    },
    features: ['Dine-In', 'Takeaway', 'Express Pickup Kiosk', 'Delivery Partners', 'Late Night Window'],
    lat: 34.0522,
    lng: -118.2437,
    status: 'Open Now',
    closeTime: '11:30 PM'
  },
  {
    id: 'loc-metro-plaza',
    name: 'Fast Meals Court — Metro Hub Plaza',
    subname: 'High-Volume Court & Drive-Thru',
    address: '1880 Boulevard Parkway',
    city: 'Metro Financial',
    postalCode: '90028',
    phone: '+1 (555) 749-2240',
    hours: {
      weekdays: '09:30 AM – 11:00 PM',
      friday: '09:30 AM – 12:30 AM',
      saturday: '10:00 AM – 12:30 AM',
      sunday: '10:00 AM – 10:30 PM'
    },
    features: ['Dual Drive-Thru', 'Dine-In Seating', 'Curbside Runners', 'App Locker Pickup'],
    lat: 34.0928,
    lng: -118.3287,
    status: 'Open Now',
    closeTime: '11:00 PM'
  },
  {
    id: 'loc-westside',
    name: 'Fast Meals Court — Westside Station',
    subname: 'Transit Fast-Lane',
    address: '710 West Olympic Blvd',
    city: 'Westside Terminal',
    postalCode: '90015',
    phone: '+1 (555) 883-9104',
    hours: {
      weekdays: '07:00 AM – Midnight',
      friday: '07:00 AM – 2:00 AM',
      saturday: '08:00 AM – 2:00 AM',
      sunday: '08:00 AM – Midnight'
    },
    features: ['Breakfast Window', 'Express Grab & Go', 'Bike Courier Hub', 'Dine-In Bar'],
    lat: 34.0435,
    lng: -118.2612,
    status: 'Open Now',
    closeTime: 'Midnight'
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Marcus Vance',
    role: 'Local Food Critic & Commuter',
    rating: 5,
    quote: 'Ordered on the screen, food was handed to me hot in exactly 3 minutes 20 seconds. The Court Double Stack crust is ridiculous — deep sear, dripping cheddar, and piping hot fries.',
    dishOrdered: 'The Court Double Stack Combo',
    date: '2 days ago',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Elena Rodriguez',
    role: 'Verified Takeaway Customer',
    rating: 5,
    quote: 'Most fast casual spots take 15 minutes during the lunch rush. Fast Meals Court had my Blaze Chicken Box ready while my receipt was still printing. Absolute fire.',
    dishOrdered: 'Blaze Crispy Chicken Box',
    date: 'Yesterday',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Darren K.',
    role: 'Tech Lead & Weekly Regular',
    rating: 5,
    quote: 'Crispy rosemary fries that actually stay crispy till you get back to your desk. Quality of a $22 gourmet burger at quick-service speed and pricing.',
    dishOrdered: 'Smoky Bourbon Bacon + Loaded Fries',
    date: '4 days ago',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Sophia Chen',
    role: 'Food Blogger @BiteCity',
    rating: 5,
    quote: 'The toasted marshmallow shake is legendary. You can taste the real flame sear on the patties. Fast Meals Court has set a whole new standard for quick-service.',
    dishOrdered: 'Charred Vanilla Bean Shake & Churros',
    date: 'Last week',
    verified: true
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'The Sizzle Line',
    tag: 'Kitchen Action',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
    caption: '100% Angus patties smashed at 450°F on polished chrome flat-tops for that hyper-crisp Maillard sear.'
  },
  {
    id: 'gal-2',
    title: 'Flash-Fried Crunch',
    tag: 'Sides Bar',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
    caption: 'Double-flash fried russets tossed in hot sea salt and cracked rosemary right out of the vat.'
  },
  {
    id: 'gal-3',
    title: 'Modern Court Interior',
    tag: 'The Space',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    caption: 'Bold Burgundy accents, raw concrete, Warm Gold lighting, and rapid self-order touchscreen lanes.'
  },
  {
    id: 'gal-4',
    title: 'The Blaze Chicken Stack',
    tag: 'Signature Item',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Buttermilk-brined breast drenched in smoked chili honey oil with crunchy jalapeno slaw.'
  },
  {
    id: 'gal-5',
    title: 'Fresh Pack & Go',
    tag: 'Eco Packaging',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=1000&q=80',
    caption: 'Steam-vented thermal boxes keep your food blazing hot and crisp from counter to couch.'
  },
  {
    id: 'gal-6',
    title: 'Handcrafted Shakes',
    tag: 'Cold Bar',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80',
    caption: 'Slow-churned Madagascar vanilla custard spun with toasted marshmallow fluff and crunchy brittle.'
  }
];

export const BRAND_STATS = [
  { value: '3.4m', label: 'Avg Ticket Prep Time', desc: 'From touch-screen order to counter tray' },
  { value: '450°F', label: 'Flash Grill Sear', desc: 'Maximized flavor crust on 100% Angus' },
  { value: '100%', label: 'Fresh, Never Frozen', desc: 'Delivered daily, prep-cut each morning' },
  { value: '0', label: 'Compromises Made', desc: 'Fast food speed with craft culinary standards' },
];
