export type Complaint = {
    id: number;
    name: string;
    message: string;
    category: 'water' | 'electricity' | 'sanitation' | 'fire' | 'landslide' | 'earthquake' | 'flood';
    location: string;
    urgency: 'low' | 'medium' | 'high' | 'critical';
    timestamp: string;
  };
  
  export const complaints: Complaint[] = [
    {
      id: 1,
      name: "User A",
      message: "Water leakage near main road",
      category: "water",
      location: "Downtown",
      urgency: "high",
      timestamp: "2025-06-02 10:23",
    },
    {
      id: 2,
      name: "User B",
      message: "Electricity outage in block 3",
      category: "electricity",
      location: "Uptown",
      urgency: "critical",
      timestamp: "2025-06-02 09:45",
    },
    {
      id: 3,
      name: "User C",
      message: "Garbage not collected for 3 days",
      category: "sanitation",
      location: "East Side",
      urgency: "medium",
      timestamp: "2025-06-01 16:10",
    },
    {
      id: 4,
      name: "User D",
      message: "Fire reported near the market",
      category: "fire",
      location: "Central Market",
      urgency: "critical",
      timestamp: "2025-06-02 11:05",
    },
    {
      id: 5,
      name: "User E",
      message: "Flooding after heavy rains",
      category: "flood",
      location: "Riverbank",
      urgency: "high",
      timestamp: "2025-06-01 13:20",
    },
    {
      id: 6,
      name: "User F",
      message: "Landslide blocking main road",
      category: "landslide",
      location: "Hilltop",
      urgency: "high",
      timestamp: "2025-06-02 08:30",
    },
    {
      id: 7,
      name: "User G",
      message: "Earthquake tremors felt strongly",
      category: "earthquake",
      location: "Downtown",
      urgency: "critical",
      timestamp: "2025-06-02 07:55",
    },
    {
      id: 8,
      name: "User H",
      message: "Water contamination suspected",
      category: "water",
      location: "West End",
      urgency: "medium",
      timestamp: "2025-06-01 19:40",
    },
    {
      id: 9,
      name: "User I",
      message: "Power lines sparking dangerously",
      category: "electricity",
      location: "Northside",
      urgency: "critical",
      timestamp: "2025-06-02 12:15",
    },
    {
      id: 10,
      name: "User J",
      message: "Overflowing garbage bins",
      category: "sanitation",
      location: "South Park",
      urgency: "low",
      timestamp: "2025-06-01 14:55",
    },
  ];
  