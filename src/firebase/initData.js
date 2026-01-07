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
  
  bucketList: [
    {
      id: "1",
      title: "Watch the sunset on a beach together",
      description: "Find a beautiful beach and watch the sunset",
      category: "travel",
      completed: false,
      createdBy: "him",
      createdAt: "2025-01-01",
      completedAt: null
    }
  ],
  
  bucketListCategories: [
    { id: "travel", name: "Travel", emoji: "✈️" },
    { id: "adventure", name: "Adventure", emoji: "🎯" },
    { id: "food", name: "Food & Dining", emoji: "🍽️" },
    { id: "experiences", name: "Experiences", emoji: "✨" },
    { id: "goals", name: "Life Goals", emoji: "🏠" },
    { id: "romance", name: "Romance", emoji: "💕" }
  ],
  
  relationshipStats: {
    dates: { value: 0, icon: "🍽️", label: "Dates" },
    kisses: { value: 0, icon: "💋", label: "Kisses" },
    hugs: { value: 0, icon: "🤗", label: "Hugs" },
    movies: { value: 0, icon: "🎬", label: "Movies Watched" },
    trips: { value: 0, icon: "✈️", label: "Trips Together" },
    photos: { value: 0, icon: "📸", label: "Photos Taken" },
    gifts: { value: 0, icon: "🎁", label: "Gifts Given" },
    songs: { value: 0, icon: "🎵", label: "Songs Shared" },
    fights: { value: 0, icon: "😤", label: "Fights (Resolved!)" },
    makeups: { value: 0, icon: "🥰", label: "Make Ups" },
    iloveyous: { value: 0, icon: "❤️", label: "I Love You's" },
    laughs: { value: 0, icon: "😂", label: "Laughs Together" }
  },
  
  settings: {
    easterEggTrigger: "iloveyou",
    accentColor: "#e8a4b8"
  }
};