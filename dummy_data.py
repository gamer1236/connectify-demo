# dummy_data.py

CURRENT_USER = {}

INTERESTS_LIST = ["AI", "Machine Learning", "Web Development", "Blockchain", "Cybersecurity", "Data Science", "Design", "UI/UX", "Finance", "Entrepreneurship", "Investing", "Marketing", "Psychology", "Philosophy", "Fitness", "Nutrition", "Yoga", "Meditation", "Photography", "Videography", "Music", "Art", "Animation", "Writing", "Blogging", "Podcasting", "Gaming", "Esports", "Robotics", "IoT", "AR/VR", "Space Exploration", "Astrophysics", "History", "Literature", "Languages", "Traveling", "Cooking", "Baking", "Fashion", "Automotive", "DIY", "Crafts", "Politics", "Law", "Social Activism", "Environment", "Sustainability", "Animals", "Volunteering"]

TALENTS_LIST = ["Python", "JavaScript", "Java", "C++", "C#", "React", "Node.js", "Figma", "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Blender", "Maya", "Public Speaking", "Negotiation", "Leadership", "Team Building", "Project Management", "Agile/Scrum", "Data Analysis", "SQL", "Excel", "Financial Modeling", "Copywriting", "Creative Writing", "SEO", "Social Media Management", "Sales", "Customer Service", "Singing", "Playing Guitar", "Playing Piano", "Playing Drums", "Dance", "Acting", "Stand-up Comedy", "Magic/Illusion", "Drawing", "Painting", "Sculpting", "Photography", "Video Editing", "Sound Design", "Music Production", "Chess", "Math/Logic", "Problem Solving", "Ethical Hacking", "Video Synthesis"]

HOBBIES_LIST = ["Reading", "Hiking", "Camping", "Backpacking", "Running", "Cycling", "Swimming", "Weightlifting", "Rock Climbing", "Martial Arts", "Yoga", "Pilates", "Dance", "Cooking", "Baking", "Coffee Brewing", "Mixology", "Wine Tasting", "Gardening", "Houseplants", "DIY Projects", "Woodworking", "Knitting", "Sewing", "Pottery", "Painting", "Drawing", "Photography", "Film Making", "Gaming (PC)", "Gaming (Console)", "Board Games", "Tabletop RPGs", "Card Games", "Puzzles", "Model Building", "Collecting", "Thrifting", "Fashion/Styling", "Makeup Artistry", "Nail Art", "Traveling", "Urban Exploration", "Museums/Galleries", "Concerts/Live Music", "Theater", "Volunteering", "Blogging/Vlogging", "Podcasting", "Language Learning"]

GOALS_LIST = ["Found a Startup", "Become CEO", "Become a CTO", "Become a Senior Developer", "Lead a Design Team", "Write a Book", "Publish Research", "Get a PhD", "Travel the World", "Live Abroad", "Financial Independence (FIRE)", "Buy a House", "Start a Family", "Run a Marathon", "Compete in Ironman", "Climb a Mountain", "Learn 3+ Languages", "Build a Successful App", "Create a Viral Game", "Become a Digital Nomad", "Start a Non-Profit", "Impact Climate Change", "Improve Mental Health Awareness", "Master an Instrument", "Perform Live Music", "Exhibit Art at a Gallery", "Direct a Short Film", "Become a Chef", "Open a Cafe/Restaurant", "Grow a YouTube Channel to 100k", "Start a Successful Podcast", "Become a Thought Leader", "Mentor Others", "Teach a Course", "Invest in Real Estate", "Build a Custom Home", "Own a Farm", "Live Off-Grid", "Read 100 Books a Year", "Achieve Work-Life Balance", "Prioritize Health & Fitness", "Build Meaningful Connections", "Find a Co-founder", "Find a Mentor", "Become an Angel Investor", "Retire Early", "Leave a Legacy", "Make a Positive Impact", "Continuous Learning", "Always Stay Curious"]


NEARBY_USERS = [
    {
        "id": 1,
        "name": "Sarah Miller",
        "gender": "Female",
        "interests": ["Machine Learning", "Photography", "Finance", "AI"],
        "talents": ["Python", "Data Analysis", "SQL", "Public Speaking"],
        "hobbies": ["Hiking", "Reading", "Traveling", "Coffee Brewing"],
        "life_aim": ["Become a Senior Developer", "Travel the World", "Continuous Learning"],
        "bio": "Tech enthusiast and amateur photographer. Love exploring new places.",
        "profile_pic": "https://i.pravatar.cc/150?img=1"
    },
    {
        "id": 2,
        "name": "James Wilson",
        "gender": "Male",
        "interests": ["Web Development", "UI/UX", "Music", "Design"],
        "talents": ["Playing Guitar", "Figma", "React", "Node.js"],
        "hobbies": ["Gaming (PC)", "Concerts/Live Music", "Film Making", "Woodworking"],
        "life_aim": ["Lead a Design Team", "Create a Viral Game", "Retire Early"],
        "bio": "Designing interfaces by day, making music by night.",
        "profile_pic": "https://i.pravatar.cc/150?img=11"
    },
    {
        "id": 3,
        "name": "Priya Sharma",
        "gender": "Female",
        "interests": ["Entrepreneurship", "Finance", "Investing", "Marketing"],
        "talents": ["Public Speaking", "Negotiation", "Financial Modeling", "Leadership"],
        "hobbies": ["Chess", "Blogging/Vlogging", "Volunteering", "Podcasting"],
        "life_aim": ["Found a Startup", "Become CEO", "Make a Positive Impact"],
        "bio": "Business student looking to connect with future co-founders.",
        "profile_pic": "https://i.pravatar.cc/150?img=5"
    },
    {
        "id": 4,
        "name": "David Chen",
        "gender": "Male",
        "interests": ["Robotics", "Cybersecurity", "Blockchain", "IoT"],
        "talents": ["C++", "Ethical Hacking", "Python", "Problem Solving"],
        "hobbies": ["Model Building", "Gaming (Console)", "Card Games", "Thrifting"],
        "life_aim": ["Publish Research", "Become a CTO", "Always Stay Curious"],
        "bio": "Always breaking things to see how they work.",
        "profile_pic": "https://i.pravatar.cc/150?img=68"
    },
    {
        "id": 5,
        "name": "Emma Thompson",
        "gender": "Female",
        "interests": ["Art", "Animation", "Environment", "Fashion"],
        "talents": ["Drawing", "Illustrator", "Blender", "Creative Writing"],
        "hobbies": ["Drawing", "Film Making", "Knitting", "Makeup Artistry"],
        "life_aim": ["Direct a Short Film", "Exhibit Art at a Gallery", "Leave a Legacy"],
        "bio": "Creating worlds one pixel at a time.",
        "profile_pic": "https://i.pravatar.cc/150?img=9"
    }
]

FRIENDS = [
    {
        "id": 6,
        "name": "Michael Reed",
        "bio": "Building the future of the web, one component at a time.",
        "interests": ["Web Development", "AI", "Startup", "Finance"],
        "talents": ["React", "Node.js", "Python", "Leadership"],
        "hobbies": ["Running", "Cycling", "Coffee Brewing"],
        "life_aim": ["Become a CTO", "Retire Early"],
        "contact": {
            "phone": "+1 234 567 8900",
            "instagram": "michael_codes",
            "snapchat": "mreed_js"
        },
        "profile_pic": "https://i.pravatar.cc/150?img=12"
    },
    {
        "id": 7,
        "name": "Sophia Martinez",
        "bio": "Marketing specialist with a passion for creative storytelling.",
        "interests": ["Marketing", "Writing", "Design", "Psychology"],
        "talents": ["Video Editing", "Copywriting", "SEO"],
        "hobbies": ["Traveling", "Photography", "Yoga"],
        "life_aim": ["Found a Startup", "Live Abroad"],
        "contact": {
            "phone": "+1 987 654 3210",
            "instagram": "sophia.creates",
            "snapchat": "sophiamartinez"
        },
        "profile_pic": "https://i.pravatar.cc/150?img=10"
    },
    {
        "id": 8,
        "name": "Liam Johnson",
        "bio": "Fitness coach by day, amateur chef by night. Believes in a balanced lifestyle.",
        "interests": ["Fitness", "Nutrition", "Cooking", "Entrepreneurship"],
        "talents": ["Leadership", "Public Speaking", "Photography"],
        "hobbies": ["Weightlifting", "Rock Climbing", "Baking"],
        "life_aim": ["Start a Startup", "Build Meaningful Connections"],
        "contact": {
            "phone": "+1 555 123 4567",
            "instagram": "liam.lifts",
            "snapchat": "liam_j"
        },
        "profile_pic": "https://i.pravatar.cc/150?img=13"
    },
    {
        "id": 9,
        "name": "Emily Davis",
        "bio": "Data Scientist exploring the intersection of AI and healthcare.",
        "interests": ["Data Science", "AI", "Machine Learning", "Biology"],
        "talents": ["Python", "SQL", "Data Analysis", "Math/Logic"],
        "hobbies": ["Running", "Reading", "Yoga", "Painting"],
        "life_aim": ["Publish Research", "Improve Mental Health Awareness", "Make a Positive Impact"],
        "contact": {
            "phone": "+1 321 654 0987",
            "instagram": "emily_data",
            "snapchat": "em.davis"
        },
        "profile_pic": "https://i.pravatar.cc/150?img=9"
    },
    {
        "id": 10,
        "name": "Chris Taylor",
        "bio": "Hardware enthusiast and cybersecurity advocate. I break things to fix them.",
        "interests": ["Cybersecurity", "IoT", "Robotics", "Engineering"],
        "talents": ["C++", "Ethical Hacking", "Problem Solving"],
        "hobbies": ["Gaming (PC)", "Model Building", "Woodworking"],
        "life_aim": ["Become a CTO", "Always Stay Curious"],
        "contact": {
            "phone": "+1 444 555 6666",
            "instagram": "taylor_tech",
            "snapchat": "ctaylor"
        },
        "profile_pic": "https://i.pravatar.cc/150?img=8"
    },
    {
        "id": 11,
        "name": "Olivia Moore",
        "bio": "Architectural designer passionate about sustainable living and green spaces.",
        "interests": ["Design", "Sustainability", "Environment", "Architecture"],
        "talents": ["Figma", "Blender", "Drawing", "Project Management"],
        "hobbies": ["Gardening", "Urban Exploration", "Photography", "Thrifting"],
        "life_aim": ["Build a Custom Home", "Impact Climate Change", "Travel the World"],
        "contact": {
            "phone": "+1 777 888 9999",
            "instagram": "olivia_designs",
            "snapchat": "liv.moore"
        },
        "profile_pic": "https://i.pravatar.cc/150?img=5"
    }
]

# Auto-inject mock showcases for demonstration purposes
stock_video = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
stock_img = "https://images.unsplash.com/photo-1589330694653-efa6122d2f7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
stock_hobby = "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&q=80"

for f in FRIENDS:
    f['showcases'] = []
    if f['talents']:
        f['showcases'].append({
            'type': 'talent', 'topic': f['talents'][0], 
            'file_url': stock_img, 'is_video': False
        })
    if len(f['talents']) > 1:
        f['showcases'].append({
            'type': 'talent', 'topic': f['talents'][1], 
            'file_url': stock_video, 'is_video': True
        })
    if f['hobbies']:
        f['showcases'].append({
            'type': 'hobby', 'topic': f['hobbies'][0], 
            'file_url': stock_hobby, 'is_video': False
        })

import random

# Generate 15 dynamic nearby minds for Discovery
first_names = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Quinn", "Parker", "Blake", "Sidney", "Emerson", "Rowan", "Hayden", "Finley", "Charlie", "Dakota", "Reese", "Skyler", "Peyton"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"]
bios = [
    "Exploring the intersection of art and logic.",
    "Driven by curiosity and caffeine.",
    "Looking for like-minded intellects.",
    "Data driven, creatively inspired.",
    "Building things that matter.",
    "Always learning, always growing.",
    "Fascinated by complex systems.",
    "Seeker of deep conversations.",
    "Passionate about the future of tech.",
    "Turning coffee into code and ideas."
]

start_id = 100
# Generate 3 dynamic minds so total equals 8 (5 hardcoded + 3 dynamic)
for _ in range(3):
    name = f"{random.choice(first_names)} {random.choice(last_names)}"
    
    # Pick random traits from global lists to ensure similarity hits
    rand_interests = random.sample(INTERESTS_LIST, k=random.randint(2, 5))
    rand_talents = random.sample(TALENTS_LIST, k=random.randint(2, 4))
    rand_hobbies = random.sample(HOBBIES_LIST, k=random.randint(2, 4))
    rand_aims = random.sample(GOALS_LIST, k=random.randint(1, 3))
    
    NEARBY_USERS.append({
        "id": start_id,
        "name": name,
        "gender": random.choice(["Male", "Female", "Non-binary"]),
        "interests": rand_interests,
        "talents": rand_talents,
        "hobbies": rand_hobbies,
        "life_aim": rand_aims,
        "bio": random.choice(bios),
        "profile_pic": f"https://i.pravatar.cc/150?img={random.randint(1, 70)}"
    })
    start_id += 1


# ─── Activity Feed Data ───────────────────────────────────────────────────────

ACTIVITY = {
    # Connection requests – from NEARBY_USERS (not yet friends → names NOT highlighted)
    "connection_requests": [
        {
            "id": "cr_1",
            "from_id": 1,
            "from_name": "Sarah Miller",
            "from_pic": "https://i.pravatar.cc/150?img=1",
            "from_bio": "Tech enthusiast and amateur photographer.",
            "mutual_tags": ["AI", "Machine Learning"],
            "sent_at": "2 hours ago",
            "is_friend": False
        },
        {
            "id": "cr_2",
            "from_id": 2,
            "from_name": "James Wilson",
            "from_pic": "https://i.pravatar.cc/150?img=11",
            "from_bio": "Designing interfaces by day, making music by night.",
            "mutual_tags": ["Design", "UI/UX"],
            "sent_at": "5 hours ago",
            "is_friend": False
        },
        {
            "id": "cr_3",
            "from_id": 3,
            "from_name": "Priya Sharma",
            "from_pic": "https://i.pravatar.cc/150?img=5",
            "from_bio": "Business student looking to connect with future co-founders.",
            "mutual_tags": ["Entrepreneurship", "Found a Startup"],
            "sent_at": "Yesterday",
            "is_friend": False
        },
        {
            "id": "cr_4",
            "from_id": 4,
            "from_name": "David Chen",
            "from_pic": "https://i.pravatar.cc/150?img=68",
            "from_bio": "Always breaking things to see how they work.",
            "mutual_tags": ["Python", "Problem Solving"],
            "sent_at": "2 days ago",
            "is_friend": False
        },
    ],

    # Meetup requests – from FRIENDS (already connected → names highlighted)
    "meetup_requests": [
        {
            "id": "mr_1",
            "from_id": 6,
            "from_name": "Michael Reed",
            "from_pic": "https://i.pravatar.cc/150?img=12",
            "date": "2026-04-22",
            "time": "10:00 AM",
            "place": "Starbucks, Silicon Campus Block A",
            "note": "Let's catch up and discuss the hackathon project!",
            "sent_at": "1 hour ago",
            "is_friend": True
        },
        {
            "id": "mr_2",
            "from_id": 9,
            "from_name": "Emily Davis",
            "from_pic": "https://i.pravatar.cc/150?img=9",
            "date": "2026-04-24",
            "time": "3:30 PM",
            "place": "Library Study Room 204",
            "note": "Want to review the ML research paper together.",
            "sent_at": "3 hours ago",
            "is_friend": True
        },
        {
            "id": "mr_3",
            "from_id": 7,
            "from_name": "Sophia Martinez",
            "from_pic": "https://i.pravatar.cc/150?img=10",
            "date": "2026-04-26",
            "time": "5:00 PM",
            "place": "Campus Rooftop Cafe",
            "note": "Brainstorming session for the content campaign.",
            "sent_at": "Yesterday",
            "is_friend": True
        },
        {
            "id": "mr_4",
            "from_id": 11,
            "from_name": "Olivia Moore",
            "from_pic": "https://i.pravatar.cc/150?img=5",
            "date": "2026-04-28",
            "time": "11:00 AM",
            "place": "Design Studio, Block C",
            "note": "Portfolio review and collaboration discussion.",
            "sent_at": "2 days ago",
            "is_friend": True
        },
    ],

    # Upcoming meetups – pre-accepted, shown in ascending date order
    "upcoming_meetups": [
        {
            "id": "um_1",
            "with_name": "Michael Reed",
            "with_pic": "https://i.pravatar.cc/150?img=12",
            "date": "2026-04-20",
            "time": "9:00 AM",
            "place": "College Canteen, Ground Floor",
            "note": "Quick check-in before the morning lecture.",
            "status": "confirmed"
        },
        {
            "id": "um_2",
            "with_name": "Emily Davis",
            "with_pic": "https://i.pravatar.cc/150?img=9",
            "date": "2026-04-21",
            "time": "2:00 PM",
            "place": "Library Study Room 204",
            "note": "Research paper review session.",
            "status": "confirmed"
        },
        {
            "id": "um_3",
            "with_name": "Liam Johnson",
            "with_pic": "https://i.pravatar.cc/150?img=13",
            "date": "2026-04-23",
            "time": "6:00 PM",
            "place": "Fitness Zone, East Wing",
            "note": "Workout session after college.",
            "status": "confirmed"
        },
        {
            "id": "um_4",
            "with_name": "Olivia Moore",
            "with_pic": "https://i.pravatar.cc/150?img=5",
            "date": "2026-04-25",
            "time": "11:30 AM",
            "place": "Design Studio, Block C",
            "note": "Portfolio walkthrough and collab planning.",
            "status": "confirmed"
        },
        {
            "id": "um_5",
            "with_name": "Chris Taylor",
            "with_pic": "https://i.pravatar.cc/150?img=8",
            "date": "2026-04-29",
            "time": "4:00 PM",
            "place": "Tech Lab 3, Innovation Block",
            "note": "Discussing the IoT security project.",
            "status": "confirmed"
        },
    ]
}
