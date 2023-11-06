import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import HomeButton from "../../components/homeButton";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  const handleClick = async () => {
    router.push("/tickets"); // Replace '/your-desired-path' with the path you want to redirect to
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          mt: 15,
          mb: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} sx={{ width: "1000px" }}>
          <HomeButton
            icon={
              <LibraryBooksOutlinedIcon
                sx={{ color: "white", width: "38px", height: "38px" }}
              />
            }
            text="Knowledge Base"
            handleClick={undefined}
          />
          <HomeButton
            icon={
              <SupportAgentIcon
                sx={{ color: "white", width: "38px", height: "38px" }}
              />
            }
            text="Tickets"
            handleClick={handleClick}
          />
          <HomeButton
            icon={
              <LightbulbOutlinedIcon
                sx={{ color: "white", width: "38px", height: "38px" }}
              />
            }
            text="FAQ Insights"
            handleClick={undefined}
          />
        </Grid>
      </Box>
    </>
  );
};

export default Home;
