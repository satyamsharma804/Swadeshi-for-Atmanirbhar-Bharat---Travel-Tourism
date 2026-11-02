const activitiesData = [
  {
    id: 1,
    title: "Scuba Diving in the Caribbean",
    description: "Experience the beautiful underwater world with a professional guide in the Caribbean Sea.",
    location: "Caribbean",
    price: 1999, // Price per person
    duration: "2 hours",
    imageUrl: "https://media.istockphoto.com/id/498283106/photo/underwater-scuba-diver-explore-and-enjoy-coral-reef-sea-life.jpg?s=612x612&w=0&k=20&c=xOj00xaZTpy5-AtKvMvIHHfexz9miSSct_CXb6F9KVA=", // Replace with actual image URL
  },
  {
    id: 2,
    title: "Mountain Hiking in the Swiss Alps",
    description: "Enjoy a challenging hike with breathtaking views of the Swiss Alps.",
    location: "Switzerland",
    price: 1999,
    duration: "4 hours",
    imageUrl: "https://media.istockphoto.com/id/1340942749/photo/friends-hike-up-grassy-mountain-ridge-at-sunrise.jpg?s=612x612&w=0&k=20&c=O9fn6gMfJ9t0PQogY6HIaI-VusiFMiyL7YxRMWEtY7s=", // Replace with actual image URL
  },
  {
    id: 3,
    title: "Safari Adventure in Kenya",
    description: "Explore the wildlife of Kenya on a guided safari through the national parks.",
    location: "Kenya",
    price: 2499,
    duration: "6 hours",
    imageUrl: "https://media.istockphoto.com/id/478924237/photo/african-lion-couple-and-safari-jeep.jpg?s=612x612&w=0&k=20&c=5_AFHVAd2GF2s51ZYtenE0NTKy5hiaofGjOtbjtHALI=", // Replace with actual image URL
  },
  {
    id: 4,
    title: "Bungee Jumping in New Zealand",
    description: "Feel the adrenaline rush as you bungee jump off a famous New Zealand bridge.",
    location: "New Zealand",
    price: 2999,
    duration: "1 hour",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2EOII_mS4VDCC4aYuj0OVn14cgMGjwAUnA&s", // Replace with actual image URL
  },
  {
    id: 5,
    title: "Cooking Class in Italy",
    description: "Learn to cook authentic Italian dishes in a hands-on cooking class in Rome.",
    location: "Italy",
    price: 4999,
    duration: "3 hours",
    imageUrl: "https://media.istockphoto.com/id/923810412/photo/making-bruschetta-at-a-cooking-class.jpg?s=612x612&w=0&k=20&c=d13JuvAy5mHFZesfl9bJtnkfvSZulpA19ThpYjNjPSk=", // Replace with actual image URL
  },
  {
    id: 6,
    title: "Zip Lining in Costa Rica",
    description: "Experience the thrill of zip lining through the rainforest canopy in Costa Rica.",
    location: "Costa Rica",
    price: 1899,
    duration: "2 hours",
    imageUrl: "https://media.istockphoto.com/id/155437159/photo/woman-during-a-canopy-tour-in-costa-rica.jpg?s=612x612&w=0&k=20&c=j2ymopv0a5zOYEvju5_WNbOH6qGJXoGZ-7aaTNjJqds=", // Replace with actual image URL
  },
  {
    id: 7,
    title: "Hot Air Balloon Ride in Cappadocia",
    description: "Take a ride over the surreal landscape of Cappadocia in a hot air balloon.",
    location: "Turkey",
    price: 1999,
    duration: "1 hour",
    imageUrl: "https://ptimages.s3.eu-west-2.amazonaws.com/img/media_photos/balloon4i-jpg.webp", // Replace with actual image URL
  },
  {
    "id": 8,
    "title": "Northern Lights Tour in Iceland",
    "description": "Witness the mesmerizing Northern Lights in the Icelandic sky with an expert guide.",
    "location": "Iceland",
    "price": 2999,
    "duration": "3 hours",
    "imageUrl": "https://thetourguy.com/wp-content/uploads/2023/02/How-to-see-the-northern-lights-in-iceland.jpg"
},
{
    "id": 9,
    "title": "Great Wall of China Trek",
    "description": "Hike along the legendary Great Wall of China and enjoy panoramic views of the landscape.",
    "location": "China",
    "price": 1999,
    "duration": "5 hours",
    "imageUrl": "https://cdn.britannica.com/82/94382-050-20CF23DB/Great-Wall-of-China-Beijing.jpg"
},
{
    "id": 10,
    "title": "Machu Picchu Exploration",
    "description": "Explore the ancient Incan city of Machu Picchu with a knowledgeable guide.",
    "location": "Peru",
    "price": 1899,
    "duration": "6 hours",
    "imageUrl": "https://cdn.expeditions.com/globalassets/expedition-stories/amazon-machu-pichu-sites/incan-ruins-at-machu-picchu.jpg?width=1920&height=1080&mode=crop&scale=none&quality=50"
},
{
    "id": 11,
    "title": "Desert Safari in Dubai",
    "description": "Experience an exhilarating desert safari with dune bashing, camel rides, and traditional Bedouin entertainment.",
    "location": "Dubai, UAE",
    "price": 1499,
    "duration": "4 hours",
    "imageUrl": "https://www.dubaidesertsafaris.com/wp-content/uploads/2024/09/c149f87896c9c6fa4f01bf3fc7040d57.webp"
},
{
    "id": 12,
    "title": "Snorkeling in the Great Barrier Reef",
    "description": "Discover vibrant marine life and coral reefs while snorkeling in the world's largest coral reef system.",
    "location": "Australia",
    "price": 1699,
    "duration": "3 hours",
    "imageUrl": "https://live-production.wcms.abc-cdn.net.au/e1f000610c420dc9aaeb017c150d0bb2?impolicy=wcms_crop_resize&cropH=1988&cropW=2991&xPos=0&yPos=0&width=862&height=575"
},
{
    "id": 13,
    "title": "Gondola Ride in Venice",
    "description": "Glide through the canals of Venice on a romantic gondola ride with a professional gondolier.",
    "location": "Italy",
    "price": 1999,
    "duration": "45 minutes",
    "imageUrl": "https://cdn-imgix.headout.com/media/images/c576bc44cf9760b021d46c2e3904832b-night%20gondola%20rides%20in%20Venice.jpg"
},
{
    "id": 14,
    "title": "Paragliding in Interlaken",
    "description": "Soar over the Swiss Alps with a tandem paragliding experience in Interlaken.",
    "location": "Switzerland",
    "price": 1399,
    "duration": "1 hour",
    "imageUrl": "https://skywings.ch/wp-content/uploads/2023/10/skywings-paragliding-3-to-4-113-1024x768.jpg"
},
{
    "id": 15,
    "title": "Kayaking in Halong Bay",
    "description": "Paddle through the stunning limestone islands and emerald waters of Halong Bay.",
    "location": "Vietnam",
    "price": 1599,
    "duration": "3 hours",
    "imageUrl": "https://static.vinwonders.com/production/kayaking-in-ha-long-bay-2.jpg"
},
{
    "id": 16,
    "title": "Temple Tour in Kyoto",
    "description": "Visit the stunning temples of Kyoto and experience Japan's rich cultural heritage.",
    "location": "Japan",
    "price": 1699,
    "duration": "4 hours",
    "imageUrl": "https://truewindhealingtravel.com/wp-content/uploads/2020/12/50335683536_2f8444b85b_k-1-scaled.jpg"
},
{
    "id": 17,
    "title": "Camel Trekking in the Sahara",
    "description": "Ride a camel through the vast dunes of the Sahara Desert and enjoy a magical sunset.",
    "location": "Morocco",
    "price": 1699,
    "duration": "5 hours",
    "imageUrl": "https://cdn.kimkim.com/files/a/images/2a938650565d1b5252f2a3af8016dd43529e26e1/big-ed54a0a299784becf262252fcba83b40.jpg"
},
{
    "id": 18,
    "title": "Whale Watching in Alaska",
    "description": "Spot majestic whales in their natural habitat on an exciting boat tour in Alaska.",
    "location": "USA",
    "price": 2199,
    "duration": "3 hours",
    "imageUrl": "https://cdn.prod.website-files.com/5ef2e22089dcef32dfb4cb36/64274c801197956371989f90_06-June.jpg"
},
{
    "id": 19,
    "title": "Wine Tasting in Napa Valley",
    "description": "Savor the finest wines on a guided tasting tour in the scenic Napa Valley vineyards.",
    "location": "California, USA",
    "price": 1699,
    "duration": "3 hours",
    "imageUrl": "https://imengine.prod.srp.navigacloud.com/?uuid=d80742f0-b8f4-58d9-ba95-4d6733e96ae3&type=primary&q=75&width=1024"
}
];

export default activitiesData;
