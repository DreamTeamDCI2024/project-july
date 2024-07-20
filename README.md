# project-july
2project
### PostMan

**Endpoints to use in the back-office:**

1. **Get the list of products:**
   - **URL:** `http://localhost:4000/api/products`
   - **Description:** Retrieves the list of products using the `getProducts` function.
   - **Method:** GET

2. **Get images of a specific product:**
   - **URL:** `http://localhost:4000/api/products/66985bd197cb0122cd7e42b8/images`
   - **Description:** This endpoint uses the `getProductImageUrl` function to check how many images are associated with a specific product. It returns the URL and description of each image.
   - **Method:** GET
   - **Example:** This example uses the product ID `66985bd197cb0122cd7e42b8` to retrieve images.

3. **Add an image to a specific product:**
   - **URL:** `http://localhost:4000/api/products/66985bd197cb0122cd7e42b8/images`
   - **Description:** This endpoint uses the `patchProductImage` function to add an image to a specific product. You need to provide the path and description of the image stored in the `productImages` folder.
   - **Method:** PATCH
   - **Example:** This example uses the ID `66985bd197cb0122cd7e42b8` to add an image to the product.

3. **See an image of a specific product:**
   - **URL:** `http://localhost:4000/api/products/66985bd197cb0122cd7e42b8/images/index/1`
   - **Description:** This endpoint uses the `getProductImageByIndex` function to display a transformed image of a specific product. You need to provide the product Id and the index of the image in the images array.
   - **Method:** GET
   - **Example:** This example uses the ID `66985bd197cb0122cd7e42b8` and the index 1.

   **For administrative uses to:
5. **Create a product:**
   - **URL:** `http://localhost:4000/api/products
   - **Description:** This endpoint uses the`createProduct` function. To test it you need -in POSTMAN to create a JSON raw and provide the relative path to the images.
   - **Method:** POST
   - **Example:** 
        ```json-
     {
      "name": "Mallorcan chair",
      "description": "Wicker chair inspired by Mallorcan style",
      "price": 99.99,
      "categories": ["furniture", "living room"],
      "materials": ["Wicker"],
      "images": [
        {
          "path": "data/productImages/wicker chair Mallorcan style.webp",
          "description": "Angle view"
        }
      ],
      "stock": 50,
      "featured": true
    }
    ```
   ******************************************************

1. **Get the list of sets:**
   - **URL:** `http://localhost:4000/api/sets`
   - **Description:** Retrieves the list of sets using the `getSets` function.
   - **Method:** GET   
2. **Get images of a specific set:**
   - **URL:** `http://localhost:4000/api/sets/669aa2311b2b9c3b9877bfa1/images`
   - **Description:** This endpoint uses the `getSetImageUrl` function-controller to check how many images are associated with a specific set of products. It returns the URL and description of each image.
   - **Method:** GET
   - **Example:** This example uses the set ID `669aa2311b2b9c3b9877bfa1` to retrieve images.
3. **See an image of a specific set:**
   - **URL:** `http://localhost:4000/api/sets/669aa2311b2b9c3b9877bfa1/images/index/1`
   - **Description:** This endpoint uses the `getSetImageByIndex` function to display a transformed image of a specific set of products. You need to provide the set Id and the index of the image in the images array.
   - **Method:** GET
   - **Example:** This example uses the set ID `669aa2311b2b9c3b9877bfa1` and the index 1.   