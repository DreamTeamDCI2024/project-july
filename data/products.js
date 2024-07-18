
export const products = [
    {
        name: "Elegant Table",
        description: "A beautifully crafted set table-chair perfect for any dining room.",
        price: 299.99,
        categories: ["furniture", "living room"],
        materials: ["wood", "metal"],
        images: [
          { path: "./data/productImages/unic_tableChair.jpg", description: "Side view" }
        ],
        stock: 15,
        featured: false
    },
    {
        name: "Luxury Sofa",
        description: "A plush sofa that combines comfort with elegance.",
        price: 499.99,
        categories: ["furniture", "living room"],
        materials: ["leather", "foam"],
        images: [
          { path: "./data/productImages/set_SofaTable.jpg", description: "Front view" },
          { path: "./data/productImages/set_SofaTable1.jpg", description: "Angle view" }
        ],
        stock: 8,
        featured: true
    },
    {
        name: "Ergonomic Chair",
        description: "An ergonomic office chair",
        price: 199.99,
        categories: ["Adjustable", "Lumbar support", "Wheels"],
        materials: ["Metal", "Plastic", "Fabric"],
        images: [
          { path: "./data/productImages/unic_ErgoChair.jpg", description: "Side view" },
        ],
        stock: 5,
        featured: true
    },
    {
      name: "handcrafted chair",
      description: "handcrafted wicker armchair",
      price: 119.99,
      categories: ["furniture"],
      materials: ["Wicker"],
      images: [
        { path: "./data/productImages/unic_HandcraftedChair.jpg", description: "Side view" },
      ],
      stock: 5,
      featured: true
    },
    {
      name: "cozy brown corduroy sofa",
      description: "The setting is complemented by a vintage-style side table, a unique tall wicker floor lamp",
      price: 219.00,
      categories: ["furniture"],
      materials: ["Wood", "Corduroy"],
      images: [
        { path: "./data/productImages/unic_RetroSofa.jpg", description: "Front view" },
      ],
      stock: 2,
      featured: true
    }
  
];
