import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
     
      <CardContent>
      
      <CardMedia 
      component="img"
      alt={product.name}
      size="100"
      image={product.image} 
      sx={{objectFit:"fill"}}     
      />
     
        <Typography component="p" variant="p" sx={{m:1}}>
          {product.name}
        </Typography>
        <Typography variant="p" sx={{
            fontWeight:'bold',
            m:1
          }}>
          ${product.cost}
          
        </Typography>
        <br/>
        <Rating size="small" defaultValue={product.rating} readOnly sx={{m:2}}/>
        <CardActions>
        <Button variant="contained" fullWidth='true' onClick={handleAddToCart}><AddShoppingCartIcon/> ADD TO CART</Button>
      </CardActions>
      </CardContent>
      
    </Card>
  );
};

export default ProductCard;
