export const initialData = {
  meta: {
    names: {
      him: "Your Name",
      her: "Her Name"
    },
    startDate: "2023-01-15",
    welcomeMessage: "Welcome to our little world 💕",
    secretMessage: "You are my everything. Forever and always. 💖"
  },
  
  gallery: [],
  
  dailyQuotes: [
    {
      id: "1",
      date: "2025-01-07",
      quote: "Every moment with you is a blessing."
    },
    {
      id: "2",
      date: "2025-01-08",
      quote: "You make my heart smile."
    },
    {
      id: "3",
      date: "2025-01-09",
      quote: "I fall in love with you more every day."
    }
  ],
  
  calendarNotes: [
    {
      id: "1",
      date: "2023-01-15",
      title: "The day we met",
      description: "The best day of my life",
      type: "anniversary"
    }
  ],
  
  // NEW: Calendar categories
  calendarCategories: [
    { id: "anniversary", name: "Anniversary", emoji: "🎉" },
    { id: "memory", name: "Memory", emoji: "💭" },
    { id: "surprise", name: "Surprise", emoji: "🎁" },
    { id: "date", name: "Date Night", emoji: "🌹" }
  ],
  
  timeline: [
    {
      id: "1",
      date: "2023-01-15",
      title: "We Met",
      description: "The beginning of forever"
    }
  ],
  
  settings: {
    easterEggTrigger: "iloveyou",
    accentColor: "#e8a4b8"
  }
};