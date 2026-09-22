/* NURE ASMIR - catalogue. Prices are sample values (PKR).
   Products with `ph: true` have no photography yet and render an on-brand placeholder. */
(function () {
  var W = "public/assets/web/";
  var SIZES = ["S", "M", "L", "XL", "XXL"];
  var PANTS = ["28", "30", "32", "34", "36"];
  var KAMEEZ = ["S", "M", "L", "XL", "XXL"];
  var ONE = ["One size"];

  var care = ["Machine wash cold with like colours", "Wash inside out to protect embroidery and print", "Do not tumble dry; dry in shade", "Warm iron on reverse"];

  var products = [
    {
      id: "paisley-border-tee", name: "Paisley Border Tee", cat: "shirts", price: 4900, tag: "New", colour: "Oxblood",
      swatches: [{ n: "Oxblood", c: "#4a1e1b" }], sizes: SIZES,
      images: [W + "oxblood-paisley-tee.jpg", W + "oxblood-paisley-tee-back.jpg", W + "detail-paisley.jpg"],
      blurb: "Heavyweight garment-dyed cotton in deep oxblood, finished with a printed paisley border inspired by heirloom shawls.",
      details: ["Oversized, dropped-shoulder fit", "240 gsm garment-dyed cotton jersey", "Paisley border printed across the hem and back", "Ribbed crew neck, discreet woven tag"],
      fabric: ["100% combed cotton", "Model is 6'0\" and wears size M"], care: care
    },
    {
      id: "crane-sashiko-tee", name: "Crane & Sashiko Tee", cat: "shirts", price: 4500, tag: "New", colour: "Ivory",
      swatches: [{ n: "Ivory", c: "#f0e6dc" }], sizes: SIZES,
      images: [W + "ivory-sashiko-tee.jpg", W + "ivory-crane-tee-back.jpg", W + "detail-crane.jpg"],
      blurb: "An ivory tee stitched by hand: sashiko-style patchwork at the front and an embroidered crane in flight across the back.",
      details: ["Relaxed fit with contrast-stitched collar and cuffs", "Patchwork panel with indigo geometric print", "Crane embroidery with a quilted diamond spine", "Garment washed for a soft hand-feel"],
      fabric: ["100% combed cotton", "Embroidery in cotton and rayon thread"], care: care
    },
    {
      id: "camp-collar-shirt", name: "Camp Collar Shirt", cat: "shirts", price: 6200, tag: "Bestseller", colour: "Linen & Black",
      swatches: [{ n: "Linen & Black", c: "#f0e6dc" }], sizes: SIZES,
      images: [W + "camp-collar-shirt.jpg", W + "camp-collar-shirt-back.jpg", W + "detail-patch.jpg"],
      blurb: "A textured linen-blend camp collar shirt with scalloped block-print patches in black. Worn open, tucked or untucked.",
      details: ["Boxy fit, short sleeve, revere collar", "Scalloped block-print patches at yoke and hem", "Corozo-look buttons in cream", "Side vents for easy movement"],
      fabric: ["Cotton-linen blend", "Patch print in pigment ink"], care: care
    },
    {
      id: "sage-wave-tee", name: "Sage Wave Tee", cat: "shirts", price: 4200, tag: "", colour: "Sage",
      swatches: [{ n: "Sage", c: "#969073" }], sizes: SIZES,
      images: [W + "sage-wave-tee.jpg", W + "detail-wave.jpg"],
      blurb: "Three tones of sage cut in flowing panels. Calm colour, generous shape.",
      details: ["Oversized fit, dropped shoulder", "Panelled colour-block in three sage tones", "Heavyweight cotton with a soft brushed inside", "Ribbed crew neck"],
      fabric: ["100% cotton, 260 gsm"], care: care
    },
    {
      id: "tree-deer-tee", name: "Tree & Deer Tee", cat: "shirts", price: 4800, tag: "", colour: "Sage",
      swatches: [{ n: "Sage", c: "#969073" }], sizes: SIZES,
      images: [W + "sage-tree-tee.jpg", W + "detail-tree.jpg"],
      blurb: "A towering tree and a lone deer embroidered across the back, with three woven patches in matching tone.",
      details: ["Boxy fit with a mock-textured jersey", "Dense tonal embroidery on the back", "Three appliqué patches", "Woven Nure Asmir label at the neck"],
      fabric: ["100% cotton", "Tonal cotton thread embroidery"], care: care
    },
    {
      id: "band-collar-linen", name: "Band Collar Linen Shirt", cat: "shirts", price: 5600, tag: "Soon", colour: "Bone", ph: true, tone: "bone",
      swatches: [{ n: "Bone", c: "#dbc6b3" }], sizes: SIZES, blurb: "A clean band-collar shirt in washed linen, made to sit under a waistcoat or on its own.",
      details: ["Regular fit", "Mandarin band collar, concealed placket", "Washed for a lived-in softness"], fabric: ["100% linen"], care: care
    },
    {
      id: "heritage-oxford", name: "Heritage Oxford Shirt", cat: "shirts", price: 5900, tag: "Soon", colour: "Sage", ph: true, tone: "sage",
      swatches: [{ n: "Sage", c: "#b3ab8e" }], sizes: SIZES, blurb: "A brushed oxford with a hand-finished collar, in a muted sage.",
      details: ["Regular fit", "Button-down collar", "Mother-of-pearl style buttons"], fabric: ["100% cotton oxford"], care: care
    },

    {
      id: "wide-cargo", name: "Wide Cargo Trouser", cat: "pants", price: 5800, tag: "New", colour: "Olive Bark",
      swatches: [{ n: "Olive Bark", c: "#6a5a40" }], sizes: PANTS,
      images: [W + "pants-cargo.jpg", W + "detail-cargo.jpg"],
      blurb: "A wide-leg cargo in washed olive-brown twill, with a single forward pleat and flap pockets that sit flat and clean.",
      details: ["Relaxed, wide-leg fit", "Single forward pleat, mid-rise waist", "Flap cargo pockets, button and zip fly", "Garment-washed twill with a soft, broken-in feel"],
      fabric: ["100% cotton twill"], care: care
    },
    {
      id: "pleated-trouser", name: "Pleated Trouser", cat: "pants", price: 6400, tag: "Soon", colour: "Black", ph: true, tone: "noir",
      swatches: [{ n: "Black", c: "#1e1a16" }], sizes: PANTS,
      blurb: "Single-pleat tailoring in a soft black wool blend. Falls straight, moves easily.",
      details: ["Straight, slightly tapered leg", "Single forward pleat", "Side adjusters, no belt needed"],
      fabric: ["Wool-polyester blend"], care: ["Dry clean recommended", "Steam to refresh"]
    },
    {
      id: "straight-chino", name: "Straight Chino", cat: "pants", price: 5200, tag: "Soon", colour: "Stone", ph: true, tone: "stone",
      swatches: [{ n: "Stone", c: "#ceb399" }], sizes: PANTS, blurb: "A straight chino in stone cotton, cut clean from hip to hem.",
      details: ["Straight fit", "Flat front", "Slant pockets"], fabric: ["Cotton stretch twill"], care: care
    },

    {
      id: "noir-kurta-waistcoat", name: "Noir Kurta & Waistcoat", cat: "shalwar-kameez", price: 14500, tag: "New", colour: "Noir",
      swatches: [{ n: "Noir", c: "#1e1a16" }], sizes: KAMEEZ,
      images: [W + "kameez-noir-waistcoat.jpg", W + "detail-waistcoat.jpg", W + "detail-noir-shalwar.jpg"],
      blurb: "A black kurta with shalwar and a structured four-pocket waistcoat. Tradition, tailored for a modern room.",
      details: ["Three-piece: kurta, shalwar, waistcoat", "Structured waistcoat with four flap pockets", "Fine cotton-blend in a deep noir", "Made-to-measure available in store"],
      fabric: ["Cotton-viscose blend"], care: ["Dry clean recommended"]
    },
    {
      id: "ivory-kameez", name: "Ivory Shalwar Kameez", cat: "shalwar-kameez", price: 11800, tag: "Soon", colour: "Ivory", ph: true, tone: "bone",
      swatches: [{ n: "Ivory", c: "#f0e6dc" }], sizes: KAMEEZ, blurb: "A classic two-piece in ivory wash-and-wear cotton with tonal collar embroidery.",
      details: ["Two-piece", "Band collar with tonal embroidery", "Side pockets"], fabric: ["Cotton blend"], care: care
    },
    {
      id: "espresso-kameez", name: "Espresso Shalwar Kameez", cat: "shalwar-kameez", price: 12400, tag: "New", colour: "Espresso",
      swatches: [{ n: "Espresso", c: "#3f2314" }], sizes: KAMEEZ,
      images: [W + "kameez-espresso.jpg", W + "detail-kameez-collar.jpg", W + "detail-kameez-shalwar.jpg"],
      blurb: "A deep espresso kameez with a band collar, worn over a softly draped shalwar. Understated, and easy to move in.",
      details: ["Straight-cut kameez with a mandarin band collar", "Concealed button placket", "Side slits for movement", "Traditional draped shalwar with a matching drawstring waist"],
      fabric: ["Cotton blend"], care: ["Dry clean recommended", "Steam to refresh"]
    },

    {
      id: "leather-set", name: "The Leather Set", cat: "accessories", price: 9800, tag: "New", colour: "Tan & Black", sizes: ONE,
      swatches: [{ n: "Tan & Black", c: "#b0743a" }],
      images: [W + "accessories-leather.jpg", W + "acc-belt.jpg", W + "acc-bifold.jpg"],
      blurb: "A tan leather belt with a brushed-brass buckle, a bifold wallet and a slim black cardholder, presented together.",
      details: ["Tan belt, brushed-brass buckle", "Tan bifold wallet", "Black cardholder", "Sold together as a set"], fabric: ["Full-grain leather", "Brushed-brass hardware"], care: ["Wipe with a soft dry cloth", "Condition occasionally"]
    },
    {
      id: "brass-belt", name: "Brass Buckle Belt", cat: "accessories", price: 3900, tag: "New", colour: "Tan", sizes: ["30", "32", "34", "36", "38"],
      swatches: [{ n: "Tan", c: "#b0743a" }],
      images: [W + "acc-belt.jpg", W + "accessories-leather.jpg"],
      blurb: "A full-grain tan leather belt with a brushed-brass buckle that softens and darkens with wear.",
      details: ["35 mm width", "Brushed-brass buckle", "Stitched edge, five holes"], fabric: ["Full-grain leather"], care: ["Wipe with a soft dry cloth"]
    },
    {
      id: "bifold-wallet", name: "Tan Bifold Wallet", cat: "accessories", price: 3800, tag: "", colour: "Tan", sizes: ONE,
      swatches: [{ n: "Tan", c: "#b0743a" }],
      images: [W + "acc-bifold.jpg", W + "accessories-leather.jpg"],
      blurb: "A compact bifold in supple tan leather with a stitched edge and a discreet debossed mark.",
      details: ["Card slots and a full-length note pocket", "Contrast-stitched edge"], fabric: ["Full-grain leather"], care: ["Wipe with a soft dry cloth"]
    },
    {
      id: "black-cardholder", name: "Black Cardholder", cat: "accessories", price: 3400, tag: "", colour: "Black", sizes: ONE,
      swatches: [{ n: "Black", c: "#1e1a16" }],
      images: [W + "acc-cardholder.jpg", W + "accessories-leather.jpg"],
      blurb: "A slim black leather cardholder that slips into any pocket.",
      details: ["Multiple card slots and a central pocket", "Stitched edge"], fabric: ["Full-grain leather"], care: ["Wipe with a soft dry cloth"]
    },
    {
      id: "silk-tie", name: "Silk Jacquard Tie", cat: "accessories", price: 2800, tag: "Soon", colour: "Walnut", ph: true, tone: "oxblood", sizes: ONE,
      swatches: [{ n: "Walnut", c: "#4f3724" }], blurb: "A woven silk tie in a geometric jacquard, in walnut and brass tones.",
      details: ["Hand-rolled tip", "8 cm blade"], fabric: ["100% silk"], care: ["Dry clean only"]
    }
  ];

  var categories = [
    { id: "shirts", name: "Shirts", img: W + "oxblood-paisley-tee.jpg", pos: "50% 35%", note: "Tees & camp collars" },
    { id: "pants", name: "Pants", img: W + "pants-cargo.jpg", pos: "50% 45%", note: "Cargo & tailored" },
    { id: "shalwar-kameez", name: "Shalwar Kameez", img: W + "kameez-espresso.jpg", pos: "50% 30%", note: "Tradition, tailored" },
    { id: "accessories", name: "Accessories", img: W + "accessories-leather.jpg", pos: "50% 55%", note: "Leather & brass" }
  ];

  var lookbook = [
    { src: W + "oxblood-paisley-tee.jpg", cap: "Rooted in culture, worn for today", cat: "shirts", size: "tall" },
    { src: W + "ivory-sashiko-tee.jpg", cap: "Good clothes, better days", cat: "shirts" },
    { src: W + "camp-collar-shirt.jpg", cap: "Timeless style for modern men", cat: "shirts" },
    { src: W + "sage-wave-tee.jpg", cap: "A calmer you", cat: "shirts", size: "tall" },
    { src: W + "ivory-crane-tee-back.jpg", cap: "Same sky, different perspective", cat: "shirts" },
    { src: W + "oxblood-paisley-tee-back.jpg", cap: "Same roads, new horizons", cat: "shirts" },
    { src: W + "sage-tree-tee.jpg", cap: "Discipline creates freedom", cat: "shirts", size: "tall" },
    { src: W + "camp-collar-shirt-back.jpg", cap: "Style, heritage, confidence", cat: "shirts" },
    { src: W + "banner-storefront.jpg", cap: "The atelier", cat: "atelier", size: "wide" },
    { src: W + "banner-coming-soon.jpg", cap: "The house, opening soon", cat: "atelier", size: "wide" },
    { src: W + "kameez-noir-waistcoat.jpg", cap: "Tradition in a modern form", cat: "shirts" },
    { src: W + "kameez-espresso.jpg", cap: "Rooted in culture, worn for today", cat: "objects" },
    { src: W + "accessories-leather.jpg", cap: "Leather and brass", cat: "objects" },
    { src: W + "pants-cargo.jpg", cap: "Worn in, not worn out", cat: "objects" }
  ];

  window.NA = { products: products, categories: categories, lookbook: lookbook, W: W };
})();
