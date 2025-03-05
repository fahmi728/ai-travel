export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        description:'Traveling solo',
        icon:'✈️',
        people:1
    },
    {
        id:2,
        title:'Me & My Partner',
        description:'Traveling with partner',
        icon:'👫',
        people:2
    },
    {
        id:3,
        title:'Family',
        description:'Traveling with family',
        icon:'👨‍👩‍👧‍👦',
        people:4
    },
    {
        id:4,
        title:'Group',
        description:'Traveling with friends',
        icon:'👨‍👩‍👧‍👦',
        people:5
    },
    {
        id:5,
        title:'Business',
        description:'Traveling for business',
        icon:'👨‍💼',
        people:1
    },
    {
        id:6,
        title:'Honeymoon',
        description:'Traveling for honeymoon',
        icon:'👩‍❤️‍👨',
        people:2
    },
    {
        id:7,
        title:'Family Reunion',
        description:'Traveling for family reunion',
        icon:'👨‍👩‍👧‍👦',
        people:5
    },
]

export const SelectBudgetList=[
    {
        id:1,
        title:'Budget',
        description:'Traveling on a budget',
        icon:'💰'
        },
    {
        id:2,
        title:'Luxury',
        description:'Traveling in luxury',
        icon:'💎'
    },
    {
        id:3,
        title:'Mid-Range',
        description:'Traveling in mid-range',
        icon:'💵'
    },
    {
        id:4,
        title:'Economy',
        description:'Traveling in economy',
        icon:'💸'
    },

]
export const AI_PROMPT='Generate Travel Plan for Location : {location} for {totalDays} Days for {infos} with a {budget} ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in valid JSON format that can convert it with JSON.prase whitout any error. '