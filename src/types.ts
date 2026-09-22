export type CategoryType = 'Burgers' | 'Combos' | 'Sides' | 'Drinks' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  calories: number;
  prepTimeMin: number;
  description: string;
  image: string;
  isSignature?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  isVegetarian?: boolean;
  ingredients: string[];
}

export interface RestaurantLocation {
  id: string;
  name: string;
  subname: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  hours: {
    weekdays: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  features: string[];
  lat: number;
  lng: number;
  status: 'Open Now' | 'Closing Soon';
  closeTime: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  quote: string;
  dishOrdered: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedOptions?: {
    size?: string;
    extraCheese?: boolean;
    makeCombo?: boolean;
    specialNotes?: string;
  };
}
