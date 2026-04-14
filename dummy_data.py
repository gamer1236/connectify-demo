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
        "hobbies": ["Sketching", "Animation", "Knitting", "Makeup Artistry"],
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
