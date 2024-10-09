const mockEventData = [
  {
    title: "Tech Meetup 2024",
    hostedBy: "Tech Innovators",
    date: new Date("2024-11-19"),
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    attendees: 120,
    admission: "Free",
    eventId: "100",
    imageSrc: `https://picsum.photos/id/100`,
    imageAlt: "Tech Meetup",
    description:
      "Join us for a tech meetup where innovators and enthusiasts will gather to discuss the latest trends in the industry.",
    tags: ["Technology", "Networking", "Innovation"],
    location: "123 Tech Street, San Francisco, CA",
  },
  {
    title: "Music Lovers Hangout",
    hostedBy: "Music Enthusiasts",
    date: new Date("2024-11-30"),
    startTime: "5:00 PM",
    endTime: "8:00 PM",
    attendees: 50,
    admission: "$10",
    eventId: "101",
    imageSrc: `https://picsum.photos/id/101`,
    imageAlt: "Music Hangout",
    description:
      "A gathering for music lovers to hang out, share playlists, and talk about their favorite artists.",
    tags: ["Music", "Social", "Entertainment"],
    location: "456 Melody Lane, Los Angeles, CA",
  },
  {
    title: "Outdoor Adventure Club",
    hostedBy: "Nature Explorers",
    date: new Date("2024-10-14"),
    startTime: "9:00 AM",
    endTime: "1:00 PM",
    attendees: 30,
    admission: "Free",
    eventId: "102",
    imageSrc: `https://picsum.photos/id/102`,
    imageAlt: "Outdoor Adventure",
    description:
      "Join us for a day of outdoor adventure and exploration. Perfect for nature lovers!",
    tags: ["Outdoors", "Adventure", "Hiking"],
    location: "789 Mountain Road, Denver, CO",
  },
  {
    title: "Startup Networking",
    hostedBy: "Entrepreneur Circle",
    date: new Date("2024-11-04"),
    startTime: "2:00 PM",
    endTime: "5:00 PM",
    attendees: 200,
    admission: "$25",
    eventId: "103",
    imageSrc: `https://picsum.photos/id/103`,
    imageAlt: "Startup Networking",
    description:
      "Meet fellow entrepreneurs and investors to network and discuss new startup ideas.",
    tags: ["Business", "Networking", "Entrepreneurship"],
    location: "123 Startup Blvd, New York, NY",
  },
  {
    title: "Art & Craft Workshop",
    hostedBy: "Creative Minds",
    date: new Date("2024-10-24"),
    startTime: "10:00 AM",
    endTime: "1:00 PM",
    attendees: 40,
    admission: "$15",
    eventId: "104",
    imageSrc: `https://picsum.photos/id/104`,
    imageAlt: "Art Workshop",
    description:
      "Unleash your creativity with our fun and interactive art & craft workshop. Materials provided!",
    tags: ["Creativity", "Art", "Workshop"],
    location: "456 Art Street, Chicago, IL",
  },
  {
    title: "AI & Machine Learning Expo",
    hostedBy: "Tech Pioneers",
    date: new Date("2024-10-26"),
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    attendees: 150,
    admission: "$50",
    eventId: "105",
    imageSrc: `https://picsum.photos/id/105`,
    imageAlt: "AI Expo",
    description:
      "Explore the latest advancements in AI and machine learning at our annual expo. Perfect for tech professionals and enthusiasts.",
    tags: ["Technology", "AI", "Innovation"],
    location: "789 AI Road, Boston, MA",
  },
  {
    title: "Health & Wellness Retreat",
    hostedBy: "Wellness Gurus",
    date: new Date("2024-11-15"),
    startTime: "8:00 AM",
    endTime: "5:00 PM",
    attendees: 100,
    admission: "$100",
    eventId: "106",
    imageSrc: `https://picsum.photos/id/106`,
    imageAlt: "Wellness Retreat",
    description:
      "Recharge your mind and body at our health and wellness retreat. Yoga, meditation, and healthy meals included.",
    tags: ["Health", "Wellness", "Fitness"],
    location: "123 Wellness Ave, Miami, FL",
  },
  {
    title: "Cooking Masterclass",
    hostedBy: "Top Chefs",
    date: new Date("2024-11-20"),
    startTime: "6:00 PM",
    endTime: "9:00 PM",
    attendees: 25,
    admission: "$75",
    eventId: "107",
    imageSrc: `https://picsum.photos/id/107`,
    imageAlt: "Cooking Masterclass",
    description:
      "Learn from top chefs in this hands-on cooking masterclass. Perfect for food enthusiasts.",
    tags: ["Food", "Cooking", "Masterclass"],
    location: "456 Gourmet St, San Francisco, CA",
  },
  {
    title: "Photography Basics Workshop",
    hostedBy: "Photo Pros",
    date: new Date("2024-11-12"),
    startTime: "11:00 AM",
    endTime: "2:00 PM",
    attendees: 30,
    admission: "$30",
    eventId: "108",
    imageSrc: `https://picsum.photos/id/108`,
    imageAlt: "Photography Workshop",
    description:
      "Get started with the basics of photography. Learn about composition, lighting, and camera settings.",
    tags: ["Photography", "Workshop", "Creativity"],
    location: "789 Camera Lane, Seattle, WA",
  },
  {
    title: "Startup Pitch Night",
    hostedBy: "Investors Club",
    date: new Date("2024-12-05"),
    startTime: "7:00 PM",
    endTime: "9:00 PM",
    attendees: 80,
    admission: "Free",
    eventId: "109",
    imageSrc: `https://picsum.photos/id/109`,
    imageAlt: "Startup Pitch",
    description:
      "Pitch your startup idea to a panel of investors and get valuable feedback.",
    tags: ["Business", "Pitching", "Entrepreneurship"],
    location: "123 Innovation Way, Austin, TX",
  },
  {
    title: "Digital Marketing Bootcamp",
    hostedBy: "Marketing Pros",
    date: new Date("2024-12-10"),
    startTime: "9:00 AM",
    endTime: "4:00 PM",
    attendees: 60,
    admission: "$100",
    eventId: "110",
    imageSrc: `https://picsum.photos/id/110`,
    imageAlt: "Marketing Bootcamp",
    description:
      "Join our intensive digital marketing bootcamp to learn the latest techniques in SEO, social media marketing, and more.",
    tags: ["Marketing", "Bootcamp", "Technology"],
    location: "500 Market Street, Boston, MA",
  },
  {
    title: "Craft Beer Tasting",
    hostedBy: "Beer Enthusiasts",
    date: new Date("2024-11-21"),
    startTime: "6:00 PM",
    endTime: "9:00 PM",
    attendees: 80,
    admission: "$40",
    eventId: "111",
    imageSrc: `https://picsum.photos/id/111`,
    imageAlt: "Beer Tasting",
    description:
      "Sample some of the best craft beers from local breweries and learn the art of beer tasting.",
    tags: ["Food & Drinks", "Beer", "Social"],
    location: "123 Brewery Lane, Portland, OR",
  },
  {
    title: "Blockchain Technology Summit",
    hostedBy: "Crypto Innovators",
    date: new Date("2024-11-28"),
    startTime: "10:00 AM",
    endTime: "3:00 PM",
    attendees: 150,
    admission: "$150",
    eventId: "112",
    imageSrc: `https://picsum.photos/id/112`,
    imageAlt: "Blockchain Summit",
    description:
      "Dive into the world of blockchain technology and learn from industry leaders about the future of decentralized finance.",
    tags: ["Technology", "Blockchain", "Innovation"],
    location: "789 Crypto Lane, New York, NY",
  },
  {
    title: "Vegan Cooking Class",
    hostedBy: "Plant-Based Chefs",
    date: new Date("2024-12-05"),
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    attendees: 25,
    admission: "$50",
    eventId: "113",
    imageSrc: `https://picsum.photos/id/113`,
    imageAlt: "Vegan Cooking",
    description:
      "Learn how to cook delicious vegan dishes from scratch in this hands-on cooking class.",
    tags: ["Food & Drinks", "Cooking", "Health"],
    location: "456 Health Street, Los Angeles, CA",
  },
  {
    title: "Startup Founder AMA",
    hostedBy: "Entrepreneur Insights",
    date: new Date("2024-11-18"),
    startTime: "5:00 PM",
    endTime: "7:00 PM",
    attendees: 200,
    admission: "Free",
    eventId: "114",
    imageSrc: `https://picsum.photos/id/114`,
    imageAlt: "Founder AMA",
    description:
      "Ask anything to a panel of startup founders who have successfully built and scaled their companies.",
    tags: ["Business", "Entrepreneurship", "Networking"],
    location: "100 Innovation Blvd, Austin, TX",
  },
  {
    title: "Graphic Design 101",
    hostedBy: "Creative Designers",
    date: new Date("2024-12-01"),
    startTime: "1:00 PM",
    endTime: "4:00 PM",
    attendees: 50,
    admission: "$20",
    eventId: "115",
    imageSrc: `https://picsum.photos/id/115`,
    imageAlt: "Graphic Design Workshop",
    description:
      "Learn the basics of graphic design, including typography, color theory, and digital tools.",
    tags: ["Design", "Creativity", "Workshop"],
    location: "789 Design Lane, Seattle, WA",
  },
  {
    title: "JavaScript Frameworks Showdown",
    hostedBy: "JS Devs",
    date: new Date("2024-11-29"),
    startTime: "10:00 AM",
    endTime: "1:00 PM",
    attendees: 120,
    admission: "$60",
    eventId: "116",
    imageSrc: `https://picsum.photos/id/116`,
    imageAlt: "JavaScript Frameworks",
    description:
      "Compare and contrast the most popular JavaScript frameworks: React, Vue, and Angular.",
    tags: ["Technology", "JavaScript", "Development"],
    location: "123 JS Avenue, San Francisco, CA",
  },
  {
    title: "Street Photography Walk",
    hostedBy: "Urban Photographers",
    date: new Date("2024-11-22"),
    startTime: "10:00 AM",
    endTime: "1:00 PM",
    attendees: 30,
    admission: "$25",
    eventId: "117",
    imageSrc: `https://picsum.photos/id/117`,
    imageAlt: "Street Photography",
    description:
      "Explore the city and capture candid moments on this guided street photography walk.",
    tags: ["Photography", "Outdoors", "Art"],
    location: "789 City Street, Chicago, IL",
  },
  {
    title: "Podcasting for Beginners",
    hostedBy: "Podcaster Academy",
    date: new Date("2024-11-30"),
    startTime: "2:00 PM",
    endTime: "5:00 PM",
    attendees: 40,
    admission: "$30",
    eventId: "118",
    imageSrc: `https://picsum.photos/id/118`,
    imageAlt: "Podcasting Workshop",
    description:
      "Learn how to create, record, and promote your podcast from start to finish.",
    tags: ["Media", "Podcasting", "Workshop"],
    location: "456 Sound Lane, San Diego, CA",
  },
  {
    title: "Holiday Cookie Decorating",
    hostedBy: "Bake Masters",
    date: new Date("2024-12-15"),
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    attendees: 20,
    admission: "$30",
    eventId: "119",
    imageSrc: `https://picsum.photos/id/119`,
    imageAlt: "Holiday Cookie",
    description:
      "Get into the holiday spirit with this fun and creative cookie decorating class for all ages.",
    tags: ["Food", "Baking", "Holiday"],
    location: "123 Sweet Street, Dallas, TX",
  },
];

export default mockEventData;