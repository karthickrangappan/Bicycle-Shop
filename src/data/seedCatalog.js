export const generateRealCatalog = () => {
    const categories = ["Mens", "Womens", "Kids", "Electric Cycles"];
    
    // Pool of highly realistic specific models per category
    const baseModels = {
        "Mens": [
            { name: "Trek Fuel EX 8", brand: "Trek", price: 350000, desc: "A versatile men's trail bike that balances climbing efficiency with downhill prowess." },
            { name: "Specialized Stumpjumper EVO", brand: "Specialized", price: 420000, desc: "The ultimate progressive trail machine for men." },
            { name: "Giant Trance X", brand: "Giant", price: 280000, desc: "Built for tackling aggressive trails with confidence." },
            { name: "Cannondale Habit Carbon 3", brand: "Cannondale", price: 310000, desc: "Playful, agile and built for fun on the trails." },
            { name: "Santa Cruz Hightower", brand: "Santa Cruz", price: 550000, desc: "The gold standard in all-mountain riding." },
            { name: "Scott Spark RC", brand: "Scott", price: 480000, desc: "Integrated suspension technology and ultra-lightweight carbon frame." },
            { name: "Orbea Occam M10", brand: "Orbea", price: 620000, desc: "A mid-travel masterpiece with flawless Spanish carbon engineering." },
            { name: "Yeti SB130 TLR", brand: "Yeti", price: 690000, desc: "Legendary Switch Infinity suspension platform." },
            { name: "Trek Madone SLR 9", brand: "Trek", price: 950000, desc: "The pinnacle of men's aero road racing." },
            { name: "Specialized Tarmac SL8", brand: "Specialized", price: 1100000, desc: "The most uncompromising race bike ever made." }
        ],
        "Womens": [
            { name: "Liv Intrigue Advanced Pro", brand: "Liv", price: 380000, desc: "Carbon women's trail bike built to conquer technical singletrack." },
            { name: "Trek Marlin 7 Women's", brand: "Trek", price: 65000, desc: "Race-worthy mountain bike built specifically for women." },
            { name: "Specialized Ariel Elite", brand: "Specialized", price: 75000, desc: "Fitness and utility in one sleek package tailored for female riders." },
            { name: "Cannondale Foray 2", brand: "Cannondale", price: 48000, desc: "An affordable, capable dirt-ready bike crafted for women." },
            { name: "Liv Langma Advanced", brand: "Liv", price: 210000, desc: "Lightweight climbing road bike designed for female racers." },
            { name: "Trek Domane AL 3 Women's", brand: "Trek", price: 85000, desc: "Smooth, stable, and super fun women's endurance road bike." },
            { name: "Specialized Ruby Sport", brand: "Specialized", price: 195000, desc: "High-performance women's road bike with vibration damping." },
            { name: "Scott Contessa Speedster", brand: "Scott", price: 92000, desc: "Alloy women's road bike optimized for speed and comfort." },
            { name: "Giant Rove 2 DD", brand: "Giant", price: 55000, desc: "Versatile women's hybrid bike for city streets or dirt paths." },
            { name: "Liv Avail AR 1", brand: "Liv", price: 130000, desc: "All-road champion built specifically for female endurance." }
        ],
        "Kids": [
            { name: "Woom 4 (20\")", brand: "Woom", price: 45000, desc: "Ultra-lightweight premium kids bike with 7 microSHIFT gears." },
            { name: "Trek Precaliber 16", brand: "Trek", price: 24000, desc: "The perfect starter bike, featuring training wheels and coaster brake." },
            { name: "Specialized Riprock 24", brand: "Specialized", price: 65000, desc: "A true mini-mountain bike with modern geometry and wide tires." },
            { name: "Strider 12 Sport", brand: "Strider", price: 12000, desc: "The industry-standard balance bike for toddlers." },
            { name: "Frog 52", brand: "Frog", price: 38000, desc: "British-designed lightweight aluminum kids bike." },
            { name: "Cleary Hedgehog 16\"", brand: "Cleary", price: 32000, desc: "A fun, lightweight 16-inch kids bike for cruising the neighborhood." },
            { name: "Cannondale Trail 20", brand: "Cannondale", price: 35000, desc: "Rugged kids mountain bike built for off-road fun." },
            { name: "Giant Animator 16", brand: "Giant", price: 18000, desc: "Easy to ride, durable first pedal bike for youngsters." },
            { name: "Trek Wahoo 24", brand: "Trek", price: 42000, desc: "Lightweight all-purpose kids bike for pavements and light trails." },
            { name: "Early Rider Belter 16", brand: "Early Rider", price: 48000, desc: "Premium belt-drive kids bike requiring zero maintenance." }
        ],
        "Electric Cycles": [
            { name: "Aventon Pace 500.3", brand: "Aventon", price: 145000, desc: "Upright cruiser E-bike with perfectly tuned torque sensor." },
            { name: "Rad Power RadRunner 3", brand: "Rad Power Bikes", price: 155000, desc: "The ultimate electric utility bike. Haul cargo with ease." },
            { name: "Trek Rail 9.7", brand: "Trek", price: 750000, desc: "Long-travel carbon electric mountain bike." },
            { name: "Specialized Turbo Creo SL", brand: "Specialized", price: 850000, desc: "It's you, only faster. The ultimate lightweight electric road bike." },
            { name: "Giant Roam E+", brand: "Giant", price: 210000, desc: "All-rounder E-bike for city commutes and mixed terrain." },
            { name: "Cannondale Moterra Neo", brand: "Cannondale", price: 620000, desc: "High-performance e-MTB designed for rugged trails." },
            { name: "Riese & Müller Load 75", brand: "Riese & Müller", price: 950000, desc: "Premium electric cargo bike capable of replacing a car." },
            { name: "VanMoof S3", brand: "VanMoof", price: 190000, desc: "Iconic, high-tech urban electric bike with integrated security." },
            { name: "Cowboy 4", brand: "Cowboy", price: 215000, desc: "Sleek, minimalist urban e-bike with automatic assistance." },
            { name: "Brompton Electric C Line", brand: "Brompton", price: 295000, desc: "The classic folding bike, supercharged for effortless commuting." }
        ]
    };

    const imageLib = [
        "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1555620023-ad8eb9effd05?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1484144709282-53b925b42663?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&q=80&w=800"
    ];

    const allSizes = [
        ["Age 18-20 (Adult S)", "Age 20-25 (Adult M)", "Age 25+ (Adult L)"],
        ["Age 14-18 (26\")", "Age 18-20 (Adult S)", "Age 20-25 (Adult M)"],
        ["Universal"]
    ];

    const allColors = [
        ["Gloss Black", "Matte Carbon"],
        ["Neon Green", "Slate Grey"],
        ["Racing Red", "Ocean Blue"],
        ["Desert Sand", "Olive Drab"],
        ["Pearl White", "Silver Metallic"]
    ];

    let finalCatalog = [];
    
    // We aim for exactly 80 products (20 per category).
    categories.forEach((catName, catIndex) => {
        const categoryModels = baseModels[catName];
        
        for (let i = 0; i < 20; i++) {
            let template = categoryModels[i % categoryModels.length];
            
            const imgUrl = imageLib[(i + catIndex) % imageLib.length];

            let sizes = allSizes[i % 2]; // Default to adult sizes mostly
            if (catName === "Kids") {
                sizes = ["Age 2-5 (12\")", "Age 6-10 (20\")", "Age 11-14 (24\")"];
                if (template.brand === 'Woom' || template.brand === 'Strider') sizes = ["Age 2-4 (12\")", "Age 5-8 (16\")"];
            } else if (catName === "Electric Cycles" && template.brand === 'Brompton') {
                sizes = ["Universal"];
            }

            const colors = allColors[i % allColors.length];
            
            const variants = [];
            sizes.forEach(s => {
                colors.forEach(c => {
                    variants.push({
                        size: s,
                        color: c,
                        gear: "21-speed",
                        stock: Math.floor(Math.random() * 5) + 1
                    });
                });
            });

            const isElite = i >= categoryModels.length; // Duplicate variations get 'Elite' appended
            const finalPrice = isElite ? template.price + 25000 : template.price;

            finalCatalog.push({
                name: isElite ? `${template.name} - Pro Edition` : template.name,
                brand: template.brand,
                price: finalPrice,
                oldPrice: Math.floor(finalPrice * 1.2),
                rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1),
                reviews: Math.floor(Math.random() * 850) + 12,
                category: catName,
                status: "active",
                stock: Math.floor(Math.random() * 45) + 2,
                description: template.desc,
                image: imgUrl,
                images: [imgUrl, imageLib[(i+1) % imageLib.length]],
                sizes: sizes,
                colors: colors,
                variants: variants,
                displayPrice: `₹${finalPrice.toLocaleString('en-IN')}`,
                displayOldPrice: `₹${Math.floor(finalPrice * 1.2).toLocaleString('en-IN')}`
            });
        }
    });

    return finalCatalog;
};
