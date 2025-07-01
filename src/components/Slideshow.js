import React from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=800&auto=format&fit=crop",
    title: "Nike Air Max 270",
    price: "$149.99",
    description:
      "The Nike Air Max 270 features the first-ever Max Air unit created specifically for Nike Sportswear. Durable, lightweight and stylish for all-day wear.",
    category: "Nike",
  },
  {
    image: "https://images.unsplash.com/photo-1711719745936-ff93f602246e?q=80&w=813&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Adidas Ultraboost 22",
    price: "$179.95",
    description:
      "Ultraboost 22 provides incredible energy return and cushioning, built for runners who need support and comfort.",
    category: "Adidas",
  },
];

const Slideshow = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box
      sx={{
        mb: 5,
        px: 2,
        ".slick-list": {
          borderRadius: 4,
          overflow: "hidden", // 🔧 This fixes the pink border cut issue
        },
      }}
    >
      <Slider {...sliderSettings}>
        {slides.map((product, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 1,
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                width: "100%",
                maxWidth: 1000,
                height: isSmallScreen ? "auto" : 420,
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{
                  width: isSmallScreen ? "100%" : "50%",
                  height: isSmallScreen ? 250 : "100%",
                  objectFit: "cover",
                }}
              />
              <CardContent
                sx={{
                  width: isSmallScreen ? "100%" : "50%",
                  p: 4,
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  {product.title}
                </Typography>
                <Typography variant="h6" color="primary">
                  {product.price}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="subtitle2" mt={1}>
                  Category: {product.category}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Slideshow;
