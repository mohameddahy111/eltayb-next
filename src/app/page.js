import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import GridHome from "./components/home/GridHome";
import ProductHomeSwiper from "./components/home/ProductHomeSwiper";
import { moreSeller, recently } from "./utils/data";
import { StoreFun } from "./context/FunStore";
import CategorySwipers from "./components/home/CategorySwipers";

export const metadata = {
  title: "El@tayb- Home",
  description: "This is a simple example",
};

export default function Home() {

  return (
    <Box>
      <GridHome />
      
      <Box>
        <Container sx={{ py: "20px" }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component={"img"}
                  src="https://i.pinimg.com/564x/c0/41/c8/c041c83942a47665405d9989163ee0c3.jpg"
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                py={3}
                component={"h2"}
                variant="h4"
                align="center"
                fontWeight={700}
              >
                kiwii
              </Typography>
              <Typography>
                lorem ipsum dolor sit amet, consectetur adip occ103, sed diam
                nonumy lorem ipsum dolor sit amet, consectetur adip occ103, sed
                diam nonumy lorem ipsum dolor sit amet, consectetur adip occ103,
                sed diam nonumy lorem ipsum dolor sit amet, consectetur adip
                occ103, sed diam nonumy
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component={"img"}
                  src="https://i.pinimg.com/474x/7b/81/36/7b8136e2b93900beba6a5677f4818da5.jpg"
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                py={3}
                component={"h2"}
                variant="h4"
                align="center"
                fontWeight={700}
              >
                orange
              </Typography>
              <Typography>
                lorem ipsum dolor sit amet, consectetur adip occ103, sed diam
                nonumy lorem ipsum dolor sit amet, consectetur adip occ103, sed
                diam nonumy lorem ipsum dolor sit amet, consectetur adip occ103,
                sed diam nonumy lorem ipsum dolor sit amet, consectetur adip
                occ103, sed diam nonumy
              </Typography>
            </Grid>
          </Grid>
            {/* <ProductHomeSwiper list={moreSeller} text={'More seller'} />
            <ProductHomeSwiper list={recently} text={"recently"} /> */}
            <Box>
              <CategorySwipers/>
            </Box>
        </Container>
      </Box>
    </Box>
  );
}
