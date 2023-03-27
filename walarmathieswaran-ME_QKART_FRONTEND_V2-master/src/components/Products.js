import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import "./Products.css";
import Cart from "./Cart";
import { generateCartItemsFrom } from "./Cart";


const Products = () => {
  const { enqueueSnackbar } = useSnackbar();

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const [loading,setloading]=useState(false);
  const [product,setProduct]=useState([]);
  const [debounceTimeouts, setDebounceTimeouts] = useState(0);
  const [notfound,setnotfound]=useState(false);
  const [cartprod,setcartprod]=useState([]);
  const [productDeatil,setproductDetail]=useState([]);
  
  useEffect(()=>{
    performAPICall(); 
    
     
  }, []);
  useEffect(()=>{
    fetchCart(localStorage.getItem('token'));
  },[productDeatil]);

  const performAPICall = async () => {
    setloading(true);
    await axios.get(`${config.endpoint}/products`)
    .then((response)=>{
      setProduct(
        response.data
      );
      setproductDetail(response.data);
      setloading(false);
            
    })
    .catch ((e)=> {
      
     
      if (e.response.status >= 400) {
      enqueueSnackbar(e.response.data.message, { variant: "error" });
      setloading(false);
      } else {
      enqueueSnackbar(
      "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
      { variant: "error" }
      )};
      
      }
    )
    
  };
  

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    console.log(text);
    setnotfound(false);
    setloading(true);
    await axios.get(`${config.endpoint}/products/search?value=${text}`)
    .then((response)=>{
      console.log(response.data);
      setProduct(response.data);
      setloading(false);
      setnotfound(false);
    }
    )
    .catch((e)=>{
      setloading(false);
      setnotfound(true);
      enqueueSnackbar("No products found",{variant:"error"});
     
      })
      
     

    
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    clearTimeout(debounceTimeouts);
    const time = setTimeout(()=>{performSearch(event.target.value)}, debounceTimeout);
    setDebounceTimeouts(time);
  };
  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
   const fetchCart = async (token) => {
    if (!token) return;
    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      //get elements from cart
      const res=await axios.get(`${config.endpoint}/cart`,{
        headers:{Authorization: `Bearer ${token}`,
      },
      });
      console.log(res.status);
      
      setcartprod(generateCartItemsFrom(res.data,productDeatil));
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };
  console.log(cartprod);


  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    for(let i=0;i<items.length;i++)
    {
      if(items[i].productId===productId)
      {
        return true;
      }
      
    }
    return false;
  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
   const handleQuantity = async (productId,qty,) => {
    try{
      let response=await axios.post(`${config.endpoint}/cart`,{'productId':productId, 'qty':qty},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },});
        setcartprod(generateCartItemsFrom(response.data, productDeatil));
        enqueueSnackbar("Item added to cart", { variant: "success" })
      }
      catch(e){
        if(e.response && e.response.status === 400) {
          enqueueSnackbar(e.response.data.message, { variant: "warning" });
        } else {
          enqueueSnackbar("Could not added product to Cart", { variant: "warning" });
        }
      }
  }
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    if(!token){
      enqueueSnackbar("Login to add an item to the Cart", {variant: 'warning'});
    }
    else{
      if(isItemInCart(items,productId)){
      enqueueSnackbar("Item already in cart. Use the cart sidebar to update quantity or remove item.", {variant: 'warning'});
      }
      else{
        try{
        let response=await axios.post(`${config.endpoint}/cart`,{'productId':productId, 'qty':qty},{
          headers: {
            Authorization: `Bearer ${token}`,
          },});
          setcartprod(generateCartItemsFrom(response.data, productDeatil));
          enqueueSnackbar("Item added to cart", { variant: "success" })
        }
        catch(e){
          if(e.response && e.response.status === 400) {

            enqueueSnackbar(e.response.data.message, { variant: "warning" });

          } else {

            enqueueSnackbar("Could not added product to Cart", { variant: "warning" });

          }
        }
      }
      
  }   

  };









  return (
    <div>
      <Header>
      <TextField
        className="search-desktop"
        size="small"
        onChange={(event)=>{debounceSearch(event, 500)}}        
        InputProps={{
          sx:{width:300},
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}

      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        onChange={(event)=>debounceSearch(event,500)}
        name="search"
      />
       <Grid container spacing={2} column={{xs:4,sm:8,md:12}}>
       <Grid item xs md>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India's <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
           
         </Grid>
         
         <>
         <Grid item md={12} mx={2} my={2}>
        <Grid container spacing={2}>

         
         {
         !(loading)?((notfound)?
         <Grid  direction="column" className='loading' item xs={12} md={12} >
           <SentimentDissatisfied />
            <br/>
            <p align='center'>No products found</p>
          </Grid>
        //  </Grid>
         :
         product.map((prod)=>
          <Grid item className="product-grid" xs={6} sm={3} md={3} key={prod._id}>
            <ProductCard
            product={prod} handleAddToCart={()=>{
              addToCart(localStorage.getItem('token'),cartprod,productDeatil,prod._id,1)
            }}
            />
          </Grid>
         ))
         :
         
          <Grid className='loading' direction="column" sx={{display:'flex'}} >
            <CircularProgress />
            <p align="center">Loading Products</p>
          </Grid>
          // </Grid>
         
         }
         </Grid>
         </Grid>
         </>
         </Grid>
      
         
         
             
      
       {/* <ProductCard product={
            {
              "name":"Tan Leatherette Weekender Duffle",
              "category":"Fashion",
              "cost":150,
              "rating":4,
              "image":"https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
              "_id":"PmInA797xJhMIPti"
              }}/> */}
              {(localStorage.getItem("username")!=null)&&
              <Grid item md={3} sm={12} bgcolor="#E9F5E1" my={2}>
                <Cart items={cartprod} handleQuantity={handleQuantity}/>
              </Grid>
}
             
              </Grid>
              
              <br/>
      <Footer />
    </div>
  );
};

export default Products;
