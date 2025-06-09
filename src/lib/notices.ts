export type Notice = {
    id: number;
    title: string;
    description: string;
    category: 'water' | 'electricity' | 'sanitation' | 'fire' | 'landslide' | 'earthquake' | 'flood';
    location: string;
    contact: string;
    timestamp: string; // e.g., "2025-06-02 10:00"
  };
  
  export const notices: Notice[] = [
    {
      id: 1,
      title: "🚱 Water Supply Disruption in Ward 3",
      description: "Water will be unavailable due to maintenance work. Please store water in advance.",
      category: "water",
      location: "Ward 3, Sundarbasti",
      contact: "01-567890",
      timestamp: "2025-06-05 06:00",
    },
    {
      id: 2,
      title: "⚡ Planned Power Outage in Block 5",
      description: "Electricity will be shut down for infrastructure upgrade.",
      category: "electricity",
      location: "Block 5, Uptown",
      contact: "01-223344",
      timestamp: "2025-06-06 09:00",
    },
    {
      id: 3,
      title: "🧹 City-Wide Sanitation Drive",
      description: "Join the community clean-up. Sanitation workers will collect waste door-to-door.",
      category: "sanitation",
      location: "All Wards",
      contact: "01-998877",
      timestamp: "2025-06-04 08:00",
    },
    {
      id: 4,
      title: "🔥 Fire Safety Drill",
      description: "Fire drill organized by the ward office. Public is requested to participate.",
      category: "fire",
      location: "Community Center, Ward 6",
      contact: "01-445566",
      timestamp: "2025-06-07 15:00",
    },
    {
      id: 5,
      title: "🌊 Flood Alert Issued",
      description: "Due to heavy rainfall, risk of flooding in low-lying areas. Stay alert.",
      category: "flood",
      location: "Riverbank, Ward 9",
      contact: "01-666777",
      timestamp: "2025-06-02 18:30",
    },
    {
      id: 6,
      title: "🪨 Landslide Risk Warning",
      description: "Avoid traveling through hill areas due to recent landslide incidents.",
      category: "landslide",
      location: "Hilltop Road, Ward 8",
      contact: "01-333222",
      timestamp: "2025-06-01 07:00",
    },
    {
      id: 7,
      title: "🌐 Earthquake Awareness Program",
      description: "Free community training on earthquake preparedness and safety.",
      category: "earthquake",
      location: "Town Hall, Central Ward",
      contact: "01-777888",
      timestamp: "2025-06-03 10:00",
    },
    {
      id: 8,
      title: "💧 Water Tank Cleaning Notice",
      description: "Scheduled cleaning of main water tanks. Supply may be affected temporarily.",
      category: "water",
      location: "Ward 4, Reservoir Area",
      contact: "01-111222",
      timestamp: "2025-06-06 13:00",
    },
    {
      id: 9,
      title: "💡 Emergency Power Line Work",
      description: "Engineers will inspect sparking lines. Temporary outages may occur.",
      category: "electricity",
      location: "North Block",
      contact: "01-454545",
      timestamp: "2025-06-02 14:00",
    },
    {
      id: 10,
      title: "🚮 Garbage Pickup Delay",
      description: "Sanitation truck maintenance delay. Pickup will resume by evening.",
      category: "sanitation",
      location: "Ward 2",
      contact: "01-909090",
      timestamp: "2025-06-01 11:30",
    },
  ];
  