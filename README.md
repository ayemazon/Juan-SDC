# Item Name, Description, and Options with Price

### Installing Dependencies

From within the root directory: `npm install`

### Starting service

From the root of the service folder, run `npm start`.

If you get an error message saying `can't find module '.chunkGroup'`, try running `npm ci` to cleanly uninstall and reinstall all the npm packages.

### MongoDB Schema

```
let productInfoSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  description: String,
  product_price: Number,
  seller: String,
  colors: Array,
});
```

### Seeding Script

To seed the database with 100 items matching the datashape of the above schema run: `npm run seedDb`

### API
https://github.com/ayemazon/SDC-Juan-Service/blob/master/server/index.js

C - Post: Create new item to database: `/updateproduct`

R - Get information for one item from database: `/product/id`

R - Get list of all items from database: `/getallproducts`

U - Put: Update existing item record in database: `/updateproduct`

D - Delete: Remove existing item record from database: `/updateproduct`

### Render Specific Product (Front End)

To render a specific product on the frontend, simply hit this endpoint: `/products/id`

It will render this services' App and make a call to `/product/id` automatically to fetch the required data.
