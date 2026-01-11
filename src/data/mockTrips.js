// src/data/mockTrips.js - THE FINAL, UNIFIED DATA SOURCE

export const tripsData = [
  // Trip 1
  {
    id: 1,
    image: '/property1.png',
    status: 'Upcoming',
    title: 'Ocean View Villa',
    location: 'Malibu, CA',
    dates: 'June 10, 2025 - June 17, 2025',
    guests: 4,
    price: 2100,
    checkIn: 'June 10, 2025',
    checkOut: 'June 17, 2025',
    nights: 7,
    address: '123 Ocean Drive, Malibu, California 90265',
    guestList: [
      { id: 'g1-1', name: 'John Smith', checkedIn: true },
      { id: 'g1-2', name: 'Jane Doe', checkedIn: false },
      { id: 'g1-3', name: 'Peter Jones', checkedIn: false },
      { id: 'g1-4', name: 'Mary Jane', checkedIn: false },
    ],
    amenities: [
      { icon: '🛏️', text: '3 Bedrooms' },
      { icon: '🛁', text: '2 Bathrooms' },
      { icon: '📶', text: 'Free Wifi' },
    ],
    propertyManager: {
      name: 'Sarah Johnson',
      phone: '+91 88664 38865',
      email: 'sarah.j@staymaster.com'
    },
    maintenanceNumber: '+91 88664 38866',
    nearbyPlaces: [
      { image: '/property1.png', category: 'Landmark', name: 'Malibu Pier', rating: 4.5, description: 'Historic pier with stunning ocean views.', distance: '2.1 miles', drive: '5 min drive', tags: ['Sunset views', 'Restaurants'] },
      { image: '/property2.png', category: 'Beach', name: 'Zuma Beach', rating: 4.7, description: 'One of the largest and most popular beaches in Los Angeles County.', distance: '3.5 miles', drive: '8 min drive', tags: ['Surfing', 'Volleyball'] },
    ]
  },
  
  // Trip 2
  {
    id: 2,
    image: '/property2.png',
    status: 'Upcoming',
    title: 'Mountain Retreat Cabin',
    location: 'Aspen, CO',
    dates: 'June 20, 2025 - June 27, 2025',
    guests: 2,
    price: 1800,
    checkIn: 'June 20, 2025',
    checkOut: 'June 27, 2025',
    nights: 7,
    address: '456 Mountain Pass, Aspen, Colorado 81611',
    guestList: [
      { id: 'g2-1', name: 'Akash Sharma', checkedIn: false },
      { id: 'g2-2', name: 'Priya Singh', checkedIn: false },
    ],
    amenities: [
      { icon: '🔥', text: 'Fireplace' },
      { icon: '🌲', text: 'Forest View' },
      { icon: '📶', text: 'Free Wifi' },
    ],
    propertyManager: {
      name: 'Mike Anderson',
      phone: '+1 970 555 1234',
      email: 'mike.a@staymaster.com'
    },
    maintenanceNumber: '+1 970 555 5678',
    nearbyPlaces: [
      { image: '/property1.png', category: 'Ski Resort', name: 'Aspen Mountain', rating: 4.8, description: 'World-class skiing and snowboarding.', distance: '5 miles', drive: '15 min drive', tags: ['Skiing', 'Dining'] },
    ]
  },

  // Trip 3 (Past)
  {
    id: 5,
    image: '/property1.png',
    status: 'Past',
    title: 'Cozy City Loft',
    location: 'Paris, France',
    dates: 'Jan 5, 2024 - Jan 12, 2024',
    guests: 2,
    price: 1100,
    checkIn: 'Jan 5, 2024',
    checkOut: 'Jan 12, 2024',
    nights: 7,
    address: '789 Rue de Rivoli, 75001 Paris, France',
    guestList: [
      { id: 'g5-1', name: 'Michael Chen', checkedIn: true },
      { id: 'g5-2', name: 'Sophia Loren', checkedIn: true },
    ],
    amenities: [
      { icon: '🥐', text: 'Bakery Nearby' },
      { icon: '📶', text: 'Free Wifi' },
    ],
    propertyManager: {
      name: 'Juliette Dubois',
      phone: '+33 6 12 34 56 78',
      email: 'juliette.d@staymaster.com'
    },
    maintenanceNumber: '+33 6 87 65 43 21',
    nearbyPlaces: []
  },
];


export const servicesData = {
  Dining: {
    image: '/images/dining.jpg',
    options: [
      'Restaurant booking', 'Curated Meals', 'Private chef booking',
      'Mixologist on call', 'Barbeque Setup', 'Personalised Culinary'
    ]
  },
  Transport: {
    image: '/images/transport.jpg',
    options: [
      'Airport Pickup', 'Local Car Rental', 'Chauffeur Service', 'Luxury Vehicle Hire'
    ]
  },
  Assistance: {
    image: '/images/assistance.jpg',
    options: [
      '24/7 Concierge', 'Tour Guide Booking', 'Nanny Service', 'Laundry Service'
    ]
  },
  Activities: {
    image: '/images/activities.jpg',
    options: [
      'Spa & Wellness', 'Yoga Sessions', 'Local Sightseeing', 'Adventure Sports'
    ]
  }
};