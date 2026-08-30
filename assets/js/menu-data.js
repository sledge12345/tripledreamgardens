/* ==========================================================
   TD GARDENS RESORT — menu data
   ==========================================================
   This is the ONLY place menu items and prices live. The menu
   page (menu.html) just renders whatever is in here — so to
   add, remove, rename, or re-price anything, edit this file
   and nothing else. Prices are plain numbers (KES); the page
   adds the "/-" and comma formatting automatically.

   Structure:
     MENU_DATA.food  -> array of { group, note?, items[] }
     MENU_DATA.drinks -> array of { group, note?, items[] }
     each item: { name, price }  OR  { name, price: null, note: "as priced" }
     a group can carry more than one price tier by repeating
     the group title with a different subheading via "sub".

   PHOTOS FOR SIGNATURE DISHES
   Eight items currently carry two extra, optional fields so they
   render as a bigger "featured" card with a real photo — Kienyeji
   Full, Kuku Bahati Full, Beef / Chapati, Grilled Chicken, Tilapia
   / Greens, and 1 kg Pork (food); Dawa and the Soda listing
   (drinks). The rest of the menu keeps the plain price-list look
   until a real photo exists for it — no placeholder frames are
   shown.
     desc  -> a short one-line description, shown under the name
     img   -> "path.jpg"  -> shows that photo and turns the item
                             into a featured card
              (leave both fields off entirely for a plain row)
   To feature a new dish once you have a photo for it: put the
   file in assets/img/menu/, then add both fields to that item,
   e.g. desc: "...", img: "assets/img/menu/your-file.jpg".
   ========================================================== */

var MENU_DATA = {

  food: [
    {
      group: "TD Chef's Special",
      items: [
        { name: "Kienyeji Full", price: 2200, desc: "Whole free-range chicken, slow-cooked the traditional way.", img: "assets/img/menu/kienyeji-full.jpg" },
        { name: "Kienyeji Half", price: 1100 },
        { name: "Kuku Bahati 1/2", price: 1400 },
        { name: "Kuku Bahati Full", price: 2800, desc: "The house chicken special, served with rice, chips, egg, sausage and greens.", img: "assets/img/bundle-platter.jpg" },
        { name: "Beef Chips", price: 600 },
        { name: "Beef Mukimo", price: 500 },
        { name: "Beef Nduma", price: 350 },
        { name: "Beef Rice", price: 450 },
        { name: "Beef Ugali", price: 400 },
        { name: "Beef / Chapati", price: 400, desc: "Beef stew with soft chapati and a side of sukuma wiki.", img: "assets/img/menu/beef-chapati.jpg" },
        { name: "Bone Meat", price: 400 },
        { name: "Chicken Nuggets & Chips", price: 650 },
        { name: "Chicken (2pcs), Soup & Ugali / Chapati", price: 300 },
        { name: "Chicken Soup", price: 300 },
        { name: "Fish Fillet & Mukimo / Chips / Potatoes", price: 550 },
        { name: "Plain Soup", price: 100 },
        { name: "T.D Chicken Special + Chips", price: 650 },
        { name: "1/4 Coupon, Chips / Ugali", price: 650 },
        { name: "1/4 Coupon, Chicken & Chips", price: 500 },
        { name: "1/4 Coupon / Ugali", price: 500 },
        { name: "1/4 Coupon / Rice", price: 500 },
        { name: "1/4 Coupon / Mukimo", price: 550 }
      ]
    },
    {
      group: "Bites",
      items: [
        { name: "Chapati (2pcs)", price: 150 },
        { name: "Chicken Pie", price: 150 },
        { name: "Chips (a few)", price: 150 },
        { name: "Fried Eggs (2 eggs)", price: 150 },
        { name: "Poached Eggs", price: 150 },
        { name: "Fluffy Scones (served with honey)", price: 200 },
        { name: "Kebab", price: 150 },
        { name: "Mandazi (2)", price: 150 },
        { name: "Meat Pie", price: 150 },
        { name: "Nduma", price: 150 },
        { name: "Ngwaci", price: 150 },
        { name: "Omelette", price: 200 },
        { name: "Pancakes (2)", price: 150 },
        { name: "Plantains", price: 100 },
        { name: "Sausages (2)", price: 150 },
        { name: "Samosa (1 pair)", price: 150 },
        { name: "Smokie (2)", price: 150 },
        { name: "Special Chicken Pie", price: 300 },
        { name: "Special Kebab", price: 200 },
        { name: "Special Meat Pie", price: 200 },
        { name: "Special Smokie / Eggs", price: 200 },
        { name: "Special Sausage", price: 200 },
        { name: "Special Samosa", price: 200 },
        { name: "Toast", price: 100 },
        { name: "Toast Bread", price: 150 },
        { name: "Toast Mayai", price: 250 }
      ]
    },
    {
      group: "Main Dish",
      items: [
        { name: "1/2 kg Beef", price: 800 },
        { name: "1 kg Beef", price: 1600 },
        { name: "Fish Fillet / Ugali", price: 400 },
        { name: "Fish Fillet / Rice", price: 400 },
        { name: "Full Chicken (coupon)", price: 1500 },
        { name: "Half Chicken (coupon)", price: 750 },
        { name: "Grilled Chicken", price: 1500, desc: "Off the grill, served with chips and coleslaw.", img: "assets/img/grilled-chicken-plate.jpg" },
        { name: "Kienyeji Full", price: 2200 },
        { name: "Kienyeji Half", price: 1100 },
        { name: "Kuku Bahati 1/2", price: 1400 },
        { name: "Kuku Bahati Full", price: 2800 },
        { name: "Matoke, Plain", price: 200 },
        { name: "Matoke, Special", price: 400 },
        { name: "Tilapia / Greens", price: 750, desc: "Whole tilapia, pan-fried, served with sukuma wiki.", img: "assets/img/menu/tilapia-greens.jpg" },
        { name: "1/2 Coupon", price: 650 },
        { name: "1/2 kg Mutton", price: 850 },
        { name: "1 kg Mutton", price: 1700 },
        { name: "1/2 kg Pork", price: 750 },
        { name: "1 kg Pork", price: 1500, desc: "Fried pork pieces with onion and coriander, served with a side of kachumbari.", img: "assets/img/menu/pork-fry.jpg" }, /* NOTE: portion size (1kg vs 1/2kg) — confirm against the actual kitchen portion. Photo replaced 2026-07-28 with a real pork shot. */
        { name: "Spaghetti Bolognese", price: 400 }
      ]
    },
    {
      group: "Accompaniment",
      items: [
        { name: "Cabbage", price: 50 },
        { name: "Chips / Fries", price: 250 },
        { name: "Greens", price: 50 },
        { name: "Mashed Potatoes", price: 150 },
        { name: "Mukimo", price: 150 },
        { name: "Rice (portion)", price: 100, desc: "Steamed rice, molded and finished with a carrot garnish.", img: "assets/img/menu/rice-portion.jpg" },
        { name: "Roast Bananas", price: 200 },
        { name: "Roasted Potatoes", price: 250 },
        { name: "Ugali (portion)", price: 100 },
        { name: "Sautéed Potatoes", price: 300 },
        { name: "Wedges", price: 250 }
      ]
    },
    {
      group: "Food Bundles",
      note: "Sharing platters — built to order at the kitchen, priced per bundle.",
      items: [
        { name: "Feeds 2 — chips/ugali/rice, greens, kachumbari, mutton, pork, sausages, skewers, side sauce, 2 milkshakes", price: 2200 },
        { name: "Feeds 3 — chips/ugali/rice, deep-fried chicken, greens, kachumbari, mutton, pork, sausages, skewers, side sauce, 3 milkshakes", price: 3400 },
        { name: "Feeds 4 — chips/ugali/rice, beef, chicken, greens, kachumbari, mutton, sausages, pork, skewers, side sauce, 5 milkshakes", price: 4000 },
        { name: "Feeds 5 — chips/ugali/rice, deep-fried chicken, greens, kachumbari, mutton, sausages, pork, skewers, side sauce, 5 milkshakes", price: 5000 }
      ]
    },
    {
      group: "Goat Preparation",
      note: "Bring your own goat (mbuzi) and the kitchen will prepare it your way — choma, fry, or boil. Good for birthdays, send-offs, and other group occasions. Order ahead on 0705 126 101.",
      items: [
        { name: "Full Goat Preparation (service fee)", price: 4000 }
      ]
    }
  ],

  drinks: [
    {
      group: "Hot Beverages",
      items: [
        { name: "Black Coffee", price: 100 },
        { name: "Chocolate Milo", price: 100 },
        { name: "Ginger Tea", price: 150 },
        { name: "Milk Pot", price: 200 },
        { name: "Lemon Coffee", price: 150 },
        { name: "Lemon Tea", price: 150 },
        { name: "Lemon Water", price: 150 },
        { name: "Porridge", price: 100 },
        { name: "Special Chocolate", price: 200 },
        { name: "Special Tea / Coffee", price: 200 },
        { name: "Special Milo", price: 200 },
        { name: "Triple Coffee", price: 150 },
        { name: "Tea Pot", price: 100 },
        { name: "Tea Masala", price: 150 },
        { name: "Dawa (concoction)", price: 250, desc: "Hot water, honey, lime, and a warming dash of spice — a Kenyan classic.", img: "assets/img/hot-toddy.jpg" },
        { name: "White Coffee", price: 150 }
      ]
    },
    {
      group: "Soft Drinks",
      items: [
        { name: "Bottled Water 1/2 L", price: 60 },
        { name: "Bottled Water 1 L", price: 120 },
        { name: "Delmonte Juice", price: 400 },
        { name: "Milkshake", price: 300 },
        { name: "Lemonade", price: 100 },
        { name: "Lime Cordial 700 ml", price: 250 },
        { name: "Lime Cordial 1.5 L", price: 400 },
        { name: "Red Bull", price: 300 },
        { name: "Soda (glass bottle)", price: 100, desc: "Coca-Cola, Fanta, Sprite, Schweppes and more, always cold.", img: "assets/img/soft-drinks.jpg" }
      ]
    },
    {
      group: "Beers",
      sub: "350/-",
      items: [
        { name: "Desperado", price: 350 },
        { name: "Guinness", price: 350 },
        { name: "Guarana", price: 350 },
        { name: "Heineken", price: 350 },
        { name: "Savannah", price: 350 }
      ]
    },
    {
      group: "Can Beers",
      sub: "300/-",
      items: [
        { name: "Balozi", price: 300 },
        { name: "Black Ice", price: 300 },
        { name: "Faxe", price: 300 },
        { name: "Guarana", price: 300 },
        { name: "Gordon's Pink", price: 300 },
        { name: "Gordon's Purple", price: 300 },
        { name: "Heineken", price: 300 },
        { name: "Pilsner", price: 300 },
        { name: "Smirnoff Pineapple Punch", price: 300 },
        { name: "Snapp", price: 300 },
        { name: "Tusker", price: 300 },
        { name: "White Cap Crisp", price: 300 },
        { name: "Ukoo Muratina", price: 300 }
      ]
    },
    {
      group: "Can Beers",
      sub: "350/-",
      items: [
        { name: "Guinness", price: 350 },
        { name: "Long Island", price: 350 },
        { name: "Manyatta", price: 350 },
        { name: "Mojito Can", price: 350 },
        { name: "Passion Martini", price: 350 },
        { name: "Piña Colada", price: 350 },
        { name: "Tusker Cider", price: 350 },
        { name: "Tusker Lite", price: 350 },
        { name: "White Cap", price: 350 }
      ]
    },
    {
      group: "Beers (highway bar list)",
      sub: "250/-",
      items: [
        { name: "Balozi", price: 250 },
        { name: "Black Ice", price: 250 },
        { name: "Pilsner", price: 250 },
        { name: "Snapp", price: 250 },
        { name: "Tusker", price: 250 }
      ]
    },
    {
      group: "Beers (highway bar list)",
      sub: "300/-",
      items: [
        { name: "Guinness", price: 300 },
        { name: "Hunter's Gold Cider", price: 300 },
        { name: "Hunter's Dry Cider", price: 300 },
        { name: "King Fisher", price: 300 },
        { name: "KO Cider", price: 300 },
        { name: "Manyatta", price: 300 },
        { name: "Tusker Cider", price: 300 },
        { name: "Tusker Malt", price: 300 },
        { name: "Tusker Lite", price: 300 }
      ]
    },
    {
      group: "Wine",
      items: [
        { name: "Caprice 1 L", price: 1300 },
        { name: "Cellar Cask 250 ml (Red / White)", price: 1600 },
        { name: "Cellar Cask Glass (White)", price: 250 },
        { name: "Drostdy Hof Dry (Red / White)", price: 1700 },
        { name: "4th Street 750 ml (Red / White)", price: 1700 },
        { name: "4th Street Glass (Red / White)", price: 250 },
        { name: "Four Cousins 750 ml (Red / White)", price: 1700 },
        { name: "Nederburg Sauvignon (Red)", price: 2300 },
        { name: "Nederburg Cabernet (Red)", price: 2600 }
      ]
    },
    {
      group: "Tot",
      sub: "300/-",
      items: [
        { name: "Black Label", price: 300 },
        { name: "Camino", price: 300 },
        { name: "Viceroy", price: 300 }
      ]
    },
    {
      group: "Tot",
      sub: "250/-",
      items: [
        { name: "Grants", price: 250 },
        { name: "Red Label", price: 250 },
        { name: "Jägermeister", price: 250 },
        { name: "Southern Comfort", price: 250 }
      ]
    },
    {
      group: "Tot",
      sub: "300/-",
      items: [
        { name: "Jack Daniel's", price: 300 }
      ]
    },
    {
      group: "Hard Liquor",
      items: [
        { name: "KC Lemon & Ginger 1/4", price: 400 },
        { name: "KC Lemon & Ginger 750 ml", price: 1300 },
        { name: "KC Smooth 350 ml", price: 750 },
        { name: "KC Smooth 750 ml", price: 1300 },
        { name: "Martini", price: 1000 },
        { name: "Mojito 750 ml", price: 1000 },
        { name: "Myers Rum 750 ml", price: 2500 },
        { name: "Piña Colada 750 ml", price: 1000 },
        { name: "Red Label 250 ml", price: 1000 },
        { name: "Red Label 375 ml", price: 1500 },
        { name: "Red Label 750 ml", price: 2500 },
        { name: "Richot 250 ml", price: 800 },
        { name: "Richot 350 ml", price: 1000 },
        { name: "Richot 750 ml", price: 1900 },
        { name: "Sheridan's Liqueur", price: 5400 },
        { name: "Singleton 700 ml", price: 5500 },
        { name: "Southern Comfort 750 ml", price: 3100 },
        { name: "Smirnoff Vodka 250 ml", price: 800 },
        { name: "Smirnoff Vodka 350 ml", price: 1100 },
        { name: "Smirnoff Vodka 750 ml", price: 1900 },
        { name: "Vat 69 250 ml", price: 850 },
        { name: "Vat 69 350 ml", price: 1300 },
        { name: "Vat 69 750 ml", price: 2100 },
        { name: "Viceroy 250 ml", price: 850 },
        { name: "Viceroy 350 ml", price: 1300 },
        { name: "Viceroy 750 ml", price: 2000 }
      ]
    }
  ]
};
