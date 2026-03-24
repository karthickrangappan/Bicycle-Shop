export const generateRealCatalog = () => {
    const categories = [
        "Mountain Bikes", "Road Bikes", "Urban & City", "Gravel & Adventure", 
        "Kids Bicycles", "Electric Bikes", "Spare Parts", "Performance Apparel", "Accessories"
    ];
    
    // Pool of highly realistic specific models per category to create realistic products rather than gibberish
    const baseModels = {
        "Mountain Bikes": [
            { name: "Trek Fuel EX 8", brand: "Trek", price: 350000, desc: "A versatile trail bike that balances climbing efficiency with downhill prowess. Features Shimano XT 12-speed and Fox Rhythm 34." },
            { name: "Specialized Stumpjumper EVO", brand: "Specialized", price: 420000, desc: "The ultimate progressive trail machine. Carbon frame, aggressive geometry, and SWAT door integration." },
            { name: "Giant Trance X", brand: "Giant", price: 280000, desc: "Built for tackling aggressive trails with confidence. ALUXX SL frame and Maestro suspension." },
            { name: "Cannondale Habit Carbon 3", brand: "Cannondale", price: 310000, desc: "Playful, agile and built for fun on the trails without sacrificing speed and climbing ability." },
            { name: "Santa Cruz Hightower", brand: "Santa Cruz", price: 550000, desc: "The gold standard in all-mountain riding. 150mm of VPP travel ready to tackle anything." },
            { name: "Scott Spark RC", brand: "Scott", price: 480000, desc: "Integrated suspension technology and ultra-lightweight carbon frame for World Cup cross-country dominance." },
            { name: "Orbea Occam M10", brand: "Orbea", price: 620000, desc: "A mid-travel masterpiece with flawless Spanish carbon engineering." },
            { name: "Yeti SB130 TLR", brand: "Yeti", price: 690000, desc: "Legendary Switch Infinity suspension platform engineered to crush the steepest descents." }
        ],
        "Road Bikes": [
            { name: "Trek Madone SLR 9", brand: "Trek", price: 950000, desc: "The pinnacle of aero road racing. Features IsoFlow technology, Dura-Ace Di2, and Bontrager Aeolus RSL 51 wheels." },
            { name: "Specialized Tarmac SL8", brand: "Specialized", price: 1100000, desc: "The most uncompromising race bike ever made. Aero, stiff, incredibly light." },
            { name: "Giant TCR Advanced Pro", brand: "Giant", price: 420000, desc: "Total race bike performance combining stiffness, light weight, and aerodynamics." },
            { name: "Canyon Aeroad CFR", brand: "Canyon", price: 850000, desc: "Pure speed. Used by world champions to dominate the fastest sprints in the peloton." },
            { name: "BMC Teammachine SLR01", brand: "BMC", price: 920000, desc: "Swiss precision engineering resulting in the ultimate climbing machine." },
            { name: "Pinarello Dogma F", brand: "Pinarello", price: 1250000, desc: "The bike of champions. Legendary Italian design, asymmetric frame, uncompromising speed." },
            { name: "Cervélo S5", brand: "Cervélo", price: 890000, desc: "Revolutionary V-stem aerodynamic design built to slice through the wind." },
            { name: "Colnago V4Rs", brand: "Colnago", price: 980000, desc: "Classic heritage meets modern aero performance. Built to win Grand Tours." }
        ],
        "Urban & City": [
            { name: "Trek FX 3 Disc", brand: "Trek", price: 85000, desc: "A versatile hybrid bike that's primed for performance, comfort, and utility." },
            { name: "Specialized Sirrus 2.0", brand: "Specialized", price: 65000, desc: "Pavement, dirt, and anything in between. The ultimate durable commuter." },
            { name: "Cannondale Quick 4", brand: "Cannondale", price: 72000, desc: "A swift, sporty bike that's perfect for getting a workout, city cruising or just getting out." },
            { name: "Giant Escape 3", brand: "Giant", price: 45000, desc: "The perfect introduction to city cycling with a comfortable, upright riding position." },
            { name: "Brompton C Line", brand: "Brompton", price: 145000, desc: "The classic steel folding bike. Folds incredibly compact for multi-modal public transport commutes." },
            { name: "Electra Cruiser 1", brand: "Electra", price: 38000, desc: "Pure joy on two wheels. Classic styling and absolute comfort." }
        ],
        "Gravel & Adventure": [
            { name: "Specialized Diverge STR", brand: "Specialized", price: 580000, desc: "Future Shock suspension front and rear turns rough gravel into silk." },
            { name: "Canyon Grizl CF SL", brand: "Canyon", price: 310000, desc: "Carbon gravel machine with massive tire clearance and mounting points for endless bikepacking." },
            { name: "Trek Checkpoint SL 5", brand: "Trek", price: 290000, desc: "A progressive geometry carbon gravel bike built for epic adventures off the beaten path." },
            { name: "Salsa Cutthroat", brand: "Salsa", price: 410000, desc: "The ultimate ultra-endurance bikepacking racing machine designed explicitly for the Tour Divide." },
            { name: "Cannondale Topstone Alloy", brand: "Cannondale", price: 155000, desc: "Capable, affordable alloy gravel bike ready to explore dirt roads and trails." },
            { name: "Cervelo Aspero", brand: "Cervelo", price: 380000, desc: "Gravel racing aerodynamics. Haul ass, not cargo." }
        ],
        "Kids Bicycles": [
            { name: "Woom 4 (20\")", brand: "Woom", price: 45000, desc: "Ultra-lightweight premium kids bike with 7 microSHIFT gears. Perfect for kids aged 6-8 years." },
            { name: "Trek Precaliber 16", brand: "Trek", price: 24000, desc: "The perfect starter bike, featuring training wheels, a built-in handle on the saddle, and a coaster brake." },
            { name: "Specialized Riprock 24", brand: "Specialized", price: 65000, desc: "A true mini-mountain bike with modern geometry, disc brakes, and wide grippy tires." },
            { name: "Strider 12 Sport", brand: "Strider", price: 12000, desc: "The industry-standard balance bike that teaches kids to balance before they pedal." },
            { name: "Frog 52", brand: "Frog", price: 38000, desc: "British-designed lightweight aluminum kids bike built specifically for small riders." }
        ],
        "Electric Bikes": [
            { name: "Aventon Pace 500.3", brand: "Aventon", price: 145000, desc: "Upright cruiser E-bike with perfectly tuned torque sensor, 28mph top speed, and pure comfort." },
            { name: "Rad Power RadRunner 3", brand: "Rad Power Bikes", price: 155000, desc: "The ultimate electric utility bike. Haul cargo, carry a passenger, and conquer hills with ease." },
            { name: "Trek Rail 9.7", brand: "Trek", price: 750000, desc: "Long-travel carbon electric mountain bike powered by the incredibly robust Bosch Performance Line CX." },
            { name: "Specialized Turbo Creo SL", brand: "Specialized", price: 850000, desc: "It's you, only faster. The ultimate lightweight electric road bike." }
        ],
        "Spare Parts": [
            { name: "Shimano Ultegra 12-Speed Cassette", brand: "Shimano", price: 8500, desc: "Silky smooth Hyperglide+ shifting engineered for electronic Di2 drivetrains." },
            { name: "SRAM Eagle X01 Chain", brand: "SRAM", price: 5200, desc: "Hard chrome technology for maximum strength and wear resistance." },
            { name: "Maxxis Minion DHF Tire 29x2.5", brand: "Maxxis", price: 6500, desc: "The standard by which all other downhill and enduro tires are measured. 3C MaxxTerra compound." },
            { name: "Continental Grand Prix 5000", brand: "Continental", price: 5800, desc: "The best all-rounder road tire in the field, brought to a whole new performance level." },
            { name: "Fox 36 Factory Grip2 Fork", brand: "Fox Racing Shox", price: 95000, desc: "The undisputed champion of all-mountain forks with incredibly tunable GRIP2 damper." }
        ],
        "Performance Apparel": [
            { name: "Rapha Pro Team Aero Jersey", brand: "Rapha", price: 16500, desc: "Race-ready aero efficiency woven into the most premium fabric on the market." },
            { name: "Castelli Free Aero RC Bibshort", brand: "Castelli", price: 18000, desc: "Pro-level bib shorts featuring the legendary Progetto X2 Air seamless seat pad." },
            { name: "Gore Wear Shakedry Jacket", brand: "Gore", price: 28000, desc: "The ultimate waterproof, breathable, endlessly packable cycling jacket." },
            { name: "Assos Mille GT Socks", brand: "Assos", price: 1800, desc: "Breathable, lightly compressive cycling socks with a classic aesthetic." }
        ],
        "Accessories": [
            { name: "Garmin Edge 840 Solar", brand: "Garmin", price: 48000, desc: "Advanced GPS cycling computer with solar charging, touchscreen, and highly targeted adaptive coaching." },
            { name: "Wahoo KICKR Core Smart Trainer", brand: "Wahoo", price: 85000, desc: "The essential indoor smart trainer. Realistic ride feel and flawless software connectivity." },
            { name: "Kryptonite New York Fahgettaboudit U-Lock", brand: "Kryptonite", price: 12500, desc: "18mm maximum performance steel shackle. Defeats almost any attack." },
            { name: "Bontrager Ion Pro RT Headlight", brand: "Bontrager", price: 11000, desc: "1300 Lumens to light up any dark trail or city street. Ant+ enabled." },
            { name: "Park Tool PCS-10.3 Repair Stand", brand: "Park Tool", price: 18500, desc: "Professional-grade home mechanic repair stand." }
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
        ["Adult Frame (S)", "Adult Frame (M)", "Adult Frame (L)"],
        ["Adult Frame (M)", "Adult Frame (L)", "Adult Frame (XL)"],
        ["Age 5-8 (16\")", "Age 10-14 (24\")"],
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
    
    // We aim for exactly 50 products. 
    // We have 44 base models. Let's add all of them, plus randomly generate 6 more variations.
    let keys = Object.keys(baseModels);
    
    for (let i = 0; i < 50; i++) {
        const catName = keys[(i % keys.length)];
        const categoryModels = baseModels[catName];
        
        let template;
        if (i < categoryModels.length * 5) {
             template = categoryModels[i % categoryModels.length];
        } else {
             template = categoryModels[Math.floor(Math.random() * categoryModels.length)]; // duplicate variation for end
        }
        
        // Randomize the image from the beautiful curated library based on index
        const imgUrl = imageLib[i % imageLib.length];

        const sizes = template.brand === 'Woom' || template.brand === 'Strider' ? ["Age 5-8 (16\")", "Age 2-4 (12\")"] 
            : template.brand === 'Garmin' || template.category === 'Accessories' || template.category === 'Spare Parts' || template.brand === 'Gore Wear' ? ["Universal"] 
            : allSizes[i % 2];

        finalCatalog.push({
            name: i >= 44 ? `${template.name} - Elite Edition` : template.name,
            brand: template.brand,
            price: i >= 44 ? template.price + 50000 : template.price, // Format properly later if string needed
            oldPrice: template.price * 1.2,
            rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1),
            reviews: Math.floor(Math.random() * 850) + 12,
            category: catName,
            status: "active",
            stock: Math.floor(Math.random() * 45) + 2,
            description: template.desc,
            image: imgUrl,
            images: [imgUrl, imageLib[(i+1) % imageLib.length]],
            sizes: sizes,
            colors: allColors[i % allColors.length],
            // Formatting price nicely into INR format string
            displayPrice: `₹${(i >= 44 ? template.price + 50000 : template.price).toLocaleString('en-IN')}`,
            displayOldPrice: `₹${Math.floor(template.price * 1.2).toLocaleString('en-IN')}`
        });
    }

    return finalCatalog;
};
