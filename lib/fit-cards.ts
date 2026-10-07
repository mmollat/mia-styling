export type FitCard = {
  id: string;
  title: string;
  occasion: "WFH" | "Casual" | "Smart casual";
  image: string;
  width: number;
  height: number;
  garments: string[];
  stylingNotes: string[];
  imageDescription: string;
};

export const fitCards: FitCard[] = [
  {
    id: "wfh-comfort",
    title: "Easy WFH Comfort",
    occasion: "WFH",
    image: "/fit-cards/wfh-comfort.png",
    width: 1122,
    height: 1402,
    garments: ["Black COOFANDY V-neck tee", "Gray textured Banana Republic shorts", "White On sneakers"],
    stylingNotes: ["Wear the tee untucked.", "For a cooler room, swap the shorts for gray COOFANDY joggers."],
    imageDescription: "MIA Fit Card showing a man in a black V-neck T-shirt, gray textured shorts, and white sneakers, with front, back, and garment-detail views.",
  },
  {
    id: "smart-casual-city",
    title: "City Smart Casual",
    occasion: "Smart casual",
    image: "/fit-cards/smart-casual-city.jpg",
    width: 1145,
    height: 1374,
    garments: ["Black polo with a patterned placket", "Black tailored trousers", "White leather sneakers", "Brown suede jacket", "Black sunglasses and structured bag"],
    stylingNotes: ["The tonal black base keeps the look clean and fitted.", "Add the brown suede jacket for warmth and contrast."],
    imageDescription: "Styling collage showing a man in a fitted black polo and black trousers with white sneakers, plus close-up views of the patterned collar, trousers, brown suede jacket, and accessories.",
  },
  {
    id: "polished-casual-joggers",
    title: "Polished Fall Casual",
    occasion: "Casual",
    image: "/fit-cards/polished-casual-joggers.jpg",
    width: 1214,
    height: 1295,
    garments: ["White VILIGO polo", "Gray COOFANDY stretch chino joggers", "White Cole Haan leather sneakers", "Brown FLAVOR suede jacket", "Rose-gold watch and band"],
    stylingNotes: ["Clean, fitted, modern, and versatile.", "Layer the suede jacket over the white polo for a polished fall finish."],
    imageDescription: "MIA Fit Card showing a man in a white polo, gray chino joggers, white leather sneakers, and a brown suede jacket, with garment and accessory details.",
  },
  {
    id: "everyday-denim",
    title: "Timeless Everyday Denim",
    occasion: "Casual",
    image: "/fit-cards/everyday-denim.jpg",
    width: 1312,
    height: 1199,
    garments: ["White VILIGO polo", "Dark-blue Levi's 501 jeans", "White Cole Haan leather sneakers", "Brown FLAVOR suede jacket", "Rose-gold watch and band"],
    stylingNotes: ["Clean, modern, timeless, and everyday ready.", "Dark denim grounds the warm suede layer while the white polo and sneakers keep the look crisp."],
    imageDescription: "MIA Fit Card showing a man in a white polo, dark-blue jeans, white leather sneakers, and a brown suede jacket, with individual garment and accessory panels.",
  },
];

export const featuredFitCard = fitCards[0];
