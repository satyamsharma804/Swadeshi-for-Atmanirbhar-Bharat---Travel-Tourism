import express from 'express';

const router = express.Router();

// Curated comprehensive destination itineraries database
const destinationGuides = {
  goa: {
    name: "Goa",
    tagline: "Sun, Sand, Heritage & Spice Plantations",
    bestTime: "October to April",
    transportOptions: {
      flight: "Fly into Dabolim Airport (GOI) or Manohar International Airport Mopa (GOX). Local rentals or prepaid taxis for transfers.",
      train: "Trains to Madgaon (South) or Thivim (North) from major Indian cities.",
      road: "Overnight luxury sleeper buses from Mumbai, Pune, or Bengaluru."
    },
    budgetProfiles: {
      budget: { perDayPerPerson: 1800, stay: "Hostels / Beach Homestays in Anjuna or Arambol", food: "Local beach shacks, Goan fish curry thali" },
      moderate: { perDayPerPerson: 4200, stay: "3-4 Star Boutique Resorts in Calangute / Candolim", food: "Popular seaside cafes, multi-cuisine restaurants" },
      luxury: { perDayPerPerson: 9500, stay: "5-Star Beachfront Luxury Resorts in South Goa (Varca/Cavelossim)", food: "Fine dining seaside cabanas, private yacht catering" }
    },
    dayPlans: [
      {
        day: 1,
        title: "North Goa Beaches & Sunset Vibe",
        morning: "Arrive, check into your accommodation, and head to Baga or Calangute beach for water sports (Parasailing / Jet ski).",
        afternoon: "Savor a traditional Goan fish or prawn thali at a beachside shack like Brittos or St. Anthony's.",
        evening: "Hike up to Chapora Fort (Dil Chahta Hai point) for an epic sunset, followed by dinner and music in Anjuna."
      },
      {
        day: 2,
        title: "Portuguese Heritage & Panaji Cultural Walk",
        morning: "Visit Aguada Fort and the ancient 19th-century lighthouse with Arabian sea panoramic views.",
        afternoon: "Explore the colorful Latin Quarter of Fontainhas in Panaji. Admire Portuguese colonial architecture and taste fresh Bebinca at a heritage bakery.",
        evening: "Evening 1-hour sunset cruise along Mandovi River with traditional Goan folk performances."
      },
      {
        day: 3,
        title: "South Goa Serenity & Spice Farms",
        morning: "Drive to Sahakari Spice Farm in Ponda for a guided tour, traditional buffet lunch on banana leaves, and spice shopping.",
        afternoon: "Visit the UNESCO World Heritage Basilica of Bom Jesus and Se Cathedral in Old Goa.",
        evening: "Relax at the peaceful, white-sand Palolem Beach or Colva Beach in South Goa with candlelight beach dinner."
      },
      {
        day: 4,
        title: "Dudhsagar Waterfalls & Jungle Adventure",
        morning: "Early morning jeep safari through Bhagwan Mahavir Wildlife Sanctuary to Dudhsagar Waterfalls.",
        afternoon: "Swim in the natural freshwater pools beneath the cascading falls and take scenic photographs.",
        evening: "Return to your resort, relax at the pool or beach, and enjoy live acoustic music at a coastal lounge."
      },
      {
        day: 5,
        title: "Island Trip & Local Flea Markets",
        morning: "Take a morning boat ride to Grand Island for dolphin spotting and beginner-friendly snorkeling.",
        afternoon: "Visit the vibrant Anjuna Flea Market or Arpora Saturday Night Market for local handicrafts and bohemian apparel.",
        evening: "Farewell seafood dinner at a cliffside restaurant in Vagator overlooking the waves."
      }
    ]
  },

  manali: {
    name: "Manali",
    tagline: "Snow-Capped Peaks, Pine Valleys & Rohtang Pass",
    bestTime: "April to June (pleasant) & December to February (snow lovers)",
    transportOptions: {
      flight: "Fly to Bhuntar Airport (KUU), 50 km from Manali, or Chandigarh Airport (IXC) and take a 7-8 hr cab/bus.",
      train: "Train to Chandigarh or Ambala Cantt, followed by taxi or Volvo bus.",
      road: "Overnight semi-sleeper Volvo buses directly from Delhi (ISBT Kashmere Gate) or Chandigarh."
    },
    budgetProfiles: {
      budget: { perDayPerPerson: 1600, stay: "Backpacker hostels & wooden homestays in Old Manali", food: "Local cafes, Siddu, Maggi and thukpa" },
      moderate: { perDayPerPerson: 3800, stay: "Mountain view riverside resorts along Beas river", food: "Trout fish delicacies, multi-cuisine hill restaurants" },
      luxury: { perDayPerPerson: 8500, stay: "Luxury Himalayan cottages with private cedar balconies & jacuzzis", food: "Fine alpine dining, private candlelit lawn dinners" }
    },
    dayPlans: [
      {
        day: 1,
        title: "Arrival, Local Sights & Mall Road",
        morning: "Arrive in Manali, check in to your riverside cottage, and enjoy morning Himalayan tea.",
        afternoon: "Visit the ancient Hadimba Temple surrounded by towering Cedar (Deodar) forests and the serene Vashisht Hot Springs.",
        evening: "Stroll along Mall Road for shopping woolens, shawls, and trying hot mountain snacks."
      },
      {
        day: 2,
        title: "Solang Valley Adventures",
        morning: "Head to Solang Valley for paragliding, zorbing, and taking the cable car ropeway to mountaintop viewpoints.",
        afternoon: "Visit the engineering marvel Atal Tunnel leading into the mystical Chandra valley of Lahaul.",
        evening: "Return to Old Manali, explore bohemian cafes with live acoustic guitar performances."
      },
      {
        day: 3,
        title: "Rohtang Pass Snow Excursion",
        morning: "Early start for Rohtang Pass (subject to permits). Enjoy snow scooter rides and sweeping Himalayan glacier views.",
        afternoon: "Warm up with steaming hot Maggi and ginger tea at alpine stalls.",
        evening: "Visit the peaceful Tibetan Monasteries and purchase authentic Tibetan handicrafts and herbal teas."
      },
      {
        day: 4,
        title: "Naggar Castle & Art Gallery Heritage Day",
        morning: "Drive to Naggar Castle, a magnificent medieval wood-and-stone palace overlooking the Beas valley.",
        afternoon: "Visit the Nicholas Roerich Art Gallery and Tripura Sundari Temple; stop by local trout fish farms.",
        evening: "Riverside bonfire and barbecue dinner at your resort under starry Himalayan skies."
      },
      {
        day: 5,
        title: "Jogini Waterfall Trek & Departure",
        morning: "Scenic 2-hour nature trek through pine forests from Vashisht village to the gushing Jogini Waterfalls.",
        afternoon: "Pack up, pick up local apple jams, Kullu honey, and dry fruits for home.",
        evening: "Board your evening departure bus/cab back to Chandigarh or Delhi."
      }
    ]
  },

  kerala: {
    name: "Kerala (God's Own Country)",
    tagline: "Misty Munnar Hills, Alleppey Houseboats & Ayurvedic Rejuvenation",
    bestTime: "September to March",
    transportOptions: {
      flight: "Fly into Cochin International Airport (COK) or Trivandrum (TRV).",
      train: "Ernakulam Junction (ERS) or Alappuzha (ALLP) connect directly across India.",
      road: "Well-maintained highways connecting via KSRTC Swift luxury buses."
    },
    budgetProfiles: {
      budget: { perDayPerPerson: 1900, stay: "Plantation homestays & government licensed guesthouses", food: "Kerala Sadya, Appam with stew, Malabar parotta" },
      moderate: { perDayPerPerson: 4500, stay: "Deluxe tea estate resorts & private AC houseboats", food: "Karimeen Pollichathu, traditional banana leaf feasts" },
      luxury: { perDayPerPerson: 10500, stay: "Heritage backwater private pool villas & 5-star Ayurvedic wellness retreats", food: "Gourmet coastal seafood, curated private dining" }
    },
    dayPlans: [
      {
        day: 1,
        title: "Kochi Heritage & Chinese Fishing Nets",
        morning: "Arrive at Cochin, explore historic Fort Kochi, the Dutch Palace, and iconic Chinese Fishing Nets.",
        afternoon: "Walk through Jew Town and browse antique shops for aromatic Malabar spices.",
        evening: "Witness a traditional live Kathakali dance and Kalaripayattu martial arts show."
      },
      {
        day: 2,
        title: "Munnar Tea Country & Cheeyappara Waterfalls",
        morning: "Drive through scenic Western Ghats towards Munnar, stopping at Cheeyappara and Valara Waterfalls.",
        afternoon: "Visit the Tata Tea Museum to learn tea processing techniques and enjoy fresh garden tea tasting.",
        evening: "Sunset walk through endless emerald tea carpet gardens and local marketplace."
      },
      {
        day: 3,
        title: "Eravikulam National Park & Top Station",
        morning: "Safari into Eravikulam National Park to spot the endangered Nilgiri Tahr mountain goats.",
        afternoon: "Visit Mattupetty Dam, Echo Point, and take a peaceful pedal boat ride.",
        evening: "Relax with an authentic Ayurvedic herbal oil massage session."
      },
      {
        day: 4,
        title: "Alleppey Houseboat Cruise on Backwaters",
        morning: "Drive from Munnar to Alleppey (Alappuzha) and board your traditional kettuvallam luxury houseboat.",
        afternoon: "Cruise gently along palm-fringed canals, paddy fields, and backwater villages while savoring freshly cooked Kerala meals.",
        evening: "Anchor amidst calm waters, enjoy the twilight breeze, and spend the night on the tranquil houseboat."
      },
      {
        day: 5,
        title: "Marari Beach Serenity & Departure",
        morning: "Disembark from the houseboat and spend a relaxing morning at the pristine Marari Beach.",
        afternoon: "Shop for banana chips, pure coconut oil, and hill spices.",
        evening: "Transfer to Cochin Airport / Ernakulam Railway station for onward journey."
      }
    ]
  },

  jaipur: {
    name: "Jaipur & Rajasthan Heritage",
    tagline: "The Pink City: Royal Palaces, Mighty Forts & Rajasthani Flavors",
    bestTime: "October to March",
    transportOptions: {
      flight: "Jaipur International Airport (JAI) with direct flights from all major cities.",
      train: "Jaipur Junction with Vande Bharat / Shatabdi Express connectivity.",
      road: "Delhi-Mumbai Expressway connects Delhi to Jaipur in just 3.5 hours."
    },
    budgetProfiles: {
      budget: { perDayPerPerson: 1500, stay: "Heritage havelis & boutique guest stays near Old City", food: "Dal Baati Churma, Pyaaz Kachori at Rawat Mishtan" },
      moderate: { perDayPerPerson: 3900, stay: "Palace-converted 4-star heritage properties with central courtyards", food: "Authentic Rajasthani thalis, Chokhi Dhani cultural village" },
      luxury: { perDayPerPerson: 9000, stay: "5-Star Royal Palaces with regal suites and peacocks on lawns", food: "Royal Rajputana dining with traditional live folk dance" }
    },
    dayPlans: [
      {
        day: 1,
        title: "The Royal Palaces & City Highlights",
        morning: "Arrive in Jaipur and begin with the majestic City Palace, residence of the Jaipur royal family.",
        afternoon: "Visit Jantar Mantar (UNESCO World Heritage astronomical observatory) and the iconic facade of Hawa Mahal (Palace of Winds).",
        evening: "Shop for blue pottery, block-printed quilts, and Kundan jewelry in Johari and Bapu Bazaars."
      },
      {
        day: 2,
        title: "Mighty Amber Fort & Nahargarh Sunset",
        morning: "Visit the grand Amber Fort; marvel at the exquisite Sheesh Mahal (Mirror Palace) and Maota Lake.",
        afternoon: "Explore Jaigarh Fort to view the world's largest cannon on wheels (Jaivana).",
        evening: "Drive up to Nahargarh Fort for a breathtaking sunset overlooking the entire pink city illuminated below."
      },
      {
        day: 3,
        title: "Cultural Extravaganza at Chokhi Dhani",
        morning: "Visit the Jal Mahal (Water Palace) in Man Sagar Lake and the Albert Hall Museum.",
        afternoon: "Explore Patrika Gate for vibrant architectural photos and try street food delights.",
        evening: "Spend an unforgettable evening at Chokhi Dhani village with camel rides, puppet shows, folk dancers, and royal thali dinner."
      },
      {
        day: 4,
        title: "Pushkar Day Trip or Stepwells",
        morning: "Drive to the sacred town of Pushkar to visit the rare Brahma Temple and the holy Pushkar Lake.",
        afternoon: "Climb up to Savitri Devi temple via cable car for panoramic views of Thar desert edges.",
        evening: "Return to Jaipur and enjoy a rooftop dinner with views of illuminated palace monuments."
      }
    ]
  },

  varanasi: {
    name: "Varanasi (Kashi)",
    tagline: "The World's Oldest Living City: Spiritual Ghats & Sacred Ganga",
    bestTime: "October to March",
    transportOptions: {
      flight: "Lal Bahadur Shastri Airport (VNS) has daily flights from all metros.",
      train: "Varanasi Junction / Banaras Station connected via Vande Bharat.",
      road: "National highways with good interstate bus connectivity."
    },
    budgetProfiles: {
      budget: { perDayPerPerson: 1200, stay: "Ghat-side heritage homestays with river views", food: "Banarasi Kachori Sabzi, Malaiyo, Tamatar Chaat, Banarasi Paan" },
      moderate: { perDayPerPerson: 3200, stay: "Heritage riverfront Havelis near Assi or Dashashwamedh Ghat", food: "Traditional satvik thalis and rooftop terrace dining" },
      luxury: { perDayPerPerson: 7500, stay: "Luxury heritage riverfront palaces like BrijRama Palace", food: "Private classical music dinner cruises on the Ganges" }
    },
    dayPlans: [
      {
        day: 1,
        title: "Sacred Ghats & The Grand Ganga Aarti",
        morning: "Arrive in Kashi, check in to your ghat-facing stay, and visit the sacred Kashi Vishwanath Golden Temple Corridor.",
        afternoon: "Walk through the ancient labyrinthine lanes of the Old City; try authentic blue lassi and kachori jalebi.",
        evening: "Witness the magnificent, divine evening Ganga Aarti ceremony from a private rowboat at Dashashwamedh Ghat."
      },
      {
        day: 2,
        title: "Sunrise Boat Ride & Sarnath Excursion",
        morning: "Subah-e-Banaras: Early morning boat ride from Assi Ghat to Manikarnika Ghat witnessing dawn prayers and yoga.",
        afternoon: "Short 30-minute drive to Sarnath, where Lord Buddha gave his first sermon. Explore Dhamek Stupa and the Ashoka Pillar museum.",
        evening: "Relax at Assi Ghat with evening classical flute and sitar music performances."
      },
      {
        day: 3,
        title: "Silk Weaving & Heritage Craft Tours",
        morning: "Visit a traditional Banarasi Silk weaving center to witness handloom craft behind world-famous sarees.",
        afternoon: "Visit Ramnagar Fort across the river and the historical Sankat Mochan Hanuman Temple.",
        evening: "Savor street food: Tamatar Chaat at Kashi Chaat Bhandar and a legendary Banarasi Meetha Paan."
      }
    ]
  }
};

// Generic fallback for any other destination requested
function generateGenericItinerary(destName, days, budgetTier, transportType, travelGroup) {
  const cleanDest = destName ? destName.trim() : "India Tour";
  const numDays = Math.min(Math.max(parseInt(days) || 3, 1), 10);
  
  const dailyCosts = {
    budget: 1500,
    moderate: 3800,
    luxury: 8000
  };
  
  const rate = dailyCosts[budgetTier] || 3800;
  const totalEstimatedCost = rate * numDays;

  const dayPlans = [];
  for (let i = 1; i <= numDays; i++) {
    dayPlans.push({
      day: i,
      title: i === 1 ? `Arrival & Exploring Highlights of ${cleanDest}` : 
             (i === numDays ? `Local Culture, Souvenir Shopping & Departure` : 
             `Sightseeing, Nature & Cultural Discovery - Day ${i}`),
      morning: i === 1 ? `Arrive via ${transportType || 'your chosen transport'}, check in to your stay, and take a gentle stroll around the central town square.` :
               `Early morning visit to scenic local viewpoints, heritage spots, and photography locations before the crowd gathers.`,
      afternoon: `Experience authentic local delicacies at renowned traditional eateries. Visit landmark monuments and cultural museums.`,
      evening: i === numDays ? `Pick up local spices, handicrafts, and pack for safe departure.` :
               `Enjoy sunset viewpoints, local street food markets, and relaxation at your accommodation.`
    });
  }

  return {
    name: cleanDest,
    tagline: `Customized ${numDays}-Day Swadeshi Travel Experience in ${cleanDest}`,
    bestTime: "September to April for ideal weather",
    transportRecommendation: `Recommended mode: ${transportType || 'Train / Flight'} for convenience. Local cab rentals or auto-rickshaws for city travel.`,
    budgetBreakdown: {
      tier: budgetTier || 'moderate',
      perPersonTotal: totalEstimatedCost,
      breakdown: {
        stay: Math.round(totalEstimatedCost * 0.45),
        food: Math.round(totalEstimatedCost * 0.25),
        transport: Math.round(totalEstimatedCost * 0.20),
        activities: Math.round(totalEstimatedCost * 0.10)
      }
    },
    travelGroup: travelGroup || 'Friends/Family',
    dayPlans
  };
}

// Generate structured itinerary endpoint
router.post('/itinerary', (req, res) => {
  try {
    const { destination, days = 3, budget = 'moderate', transport = 'train', group = 'family' } = req.body;

    if (!destination) {
      return res.status(400).json({ success: false, message: 'Destination is required' });
    }

    const destKey = destination.toLowerCase().trim();
    let guide = null;

    // Check if matched in our curated database
    for (const key of Object.keys(destinationGuides)) {
      if (destKey.includes(key) || key.includes(destKey)) {
        guide = destinationGuides[key];
        break;
      }
    }

    const numDays = Math.min(Math.max(parseInt(days) || 3, 1), 7);
    const selectedBudget = ['budget', 'moderate', 'luxury'].includes(budget.toLowerCase()) ? budget.toLowerCase() : 'moderate';

    if (guide) {
      const budgetInfo = guide.budgetProfiles[selectedBudget];
      const totalCost = budgetInfo.perDayPerPerson * numDays;
      const filteredDays = guide.dayPlans.slice(0, numDays);

      // If user requested more days than available in predefined list, append customized days
      if (numDays > filteredDays.length) {
        for (let d = filteredDays.length + 1; d <= numDays; d++) {
          filteredDays.push({
            day: d,
            title: `Exploration & Leisure Day ${d}`,
            morning: `Explore nearby scenic outskirts, hidden valleys or local craft villages.`,
            afternoon: `Relax at a local cafe and taste regional seasonal specialties.`,
            evening: `Evening sunset relaxation and traditional dinner.`
          });
        }
      }

      const transportAdvice = guide.transportOptions[transport.toLowerCase()] || guide.transportOptions.train || "Well connected via air, rail, and highways.";

      return res.json({
        success: true,
        data: {
          name: guide.name,
          tagline: guide.tagline,
          bestTime: guide.bestTime,
          transportRecommendation: transportAdvice,
          budgetBreakdown: {
            tier: selectedBudget,
            stayType: budgetInfo.stay,
            foodType: budgetInfo.food,
            perPersonTotal: totalCost,
            breakdown: {
              stay: Math.round(totalCost * 0.45),
              food: Math.round(totalCost * 0.25),
              transport: Math.round(totalCost * 0.20),
              activities: Math.round(totalCost * 0.10)
            }
          },
          travelGroup: group,
          dayPlans: filteredDays
        }
      });
    }

    // Generic fallback for any other destination in India/World
    const genericGuide = generateGenericItinerary(destination, numDays, selectedBudget, transport, group);
    return res.json({
      success: true,
      data: genericGuide
    });

  } catch (error) {
    console.error('Itinerary error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate itinerary', error: error.message });
  }
});

// Conversational AI Assistant endpoint (free-flow chat)
router.post('/message', (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const lower = message.toLowerCase();

    // Contextual responses based on user query
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('namaste')) {
      return res.json({
        success: true,
        reply: "Namaste! 🙏 I am your **Swadeshi AI Travel Planner**. Tell me where you'd like to travel, your number of days, budget, and travel style — I'll prepare a complete personalized itinerary with estimated expenses and travel tips for you!"
      });
    }

    if (lower.includes('budget') || lower.includes('cost') || lower.includes('price') || lower.includes('kharcha')) {
      return res.json({
        success: true,
        reply: "We offer 3 budget tiers:\n• **Budget (Backpacker):** ₹1,200 - ₹1,800 / day (Hostels, local thalis, public transit)\n• **Moderate (Comfort):** ₹3,500 - ₹4,500 / day (3-star boutique stays, good restaurants, private cabs)\n• **Luxury (Premium):** ₹8,000+ / day (5-star heritage resorts, fine dining, private transfers)\n\nWhich destination are you planning for?"
      });
    }

    if (lower.includes('goa')) {
      return res.json({
        success: true,
        reply: "🌴 **Goa Tip:** For vibrant nightlife, water sports, and beach shacks, choose **North Goa** (Baga, Anjuna, Vagator). For quiet white-sand beaches, heritage Portuguese villas, and luxury resorts, choose **South Goa** (Palolem, Varca).\n\nWould you like a 3-day or 5-day custom itinerary?"
      });
    }

    if (lower.includes('manali') || lower.includes('himachal')) {
      return res.json({
        success: true,
        reply: "🏔️ **Manali Tip:** Best visited in April-June for pleasant weather, or Dec-Feb for fresh snowfall! Must-visits include Solang Valley, Atal Tunnel, and Jogini Waterfalls.\n\nUse our **Quick Itinerary tab** to generate a complete day-by-day plan with budget details!"
      });
    }

    if (lower.includes('kerala')) {
      return res.json({
        success: true,
        reply: "🌴 **Kerala Highlight:** The classic route is **Kochi &rarr; Munnar Tea Gardens (2 Nights) &rarr; Thekkady Spices (1 Night) &rarr; Alleppey Backwater Houseboat (1 Night)**. Truly blissful!\n\nWould you like me to generate this plan for you?"
      });
    }

    // Default intelligent guide reply
    return res.json({
      success: true,
      reply: `That sounds like a wonderful plan! To give you the perfect day-by-day itinerary with exact cost breakdown and transport tips for **"${message.slice(0, 40)}"**, switch to the **"Quick Itinerary Planner"** tab above or tell me:\n\n1. Destination\n2. Number of Days (e.g. 3, 5, 7)\n3. Budget category (Budget, Moderate, Luxury)\n4. Transport mode (Train, Flight, Bus, Cab)`
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ success: false, message: 'Chatbot error', error: error.message });
  }
});

export default router;
