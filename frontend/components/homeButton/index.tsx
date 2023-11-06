import { Box, Button, Grid } from "@mui/material";
import { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import styles from "./homeButton.module.css";

interface HomeButtonProps {
  icon: ReactNode;
  text: string;
  handleClick: () => void;
}

const HomeButton = ({ icon, text, handleClick }: HomeButtonProps) => {
  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Box className={styles.buttonBox}>
          <Button
            variant="contained"
            onClick={handleClick}
            className={styles.customButton}
          >
            <div className={styles.container}>
              <div className={styles.topSection}>
                <div className={styles.iconContainer}>{icon}</div>
              </div>
              <div className={styles.bottomSection}>
                <Typography
                  variant="body1"
                  color="white"
                  className={styles.text}
                >
                  {text}
                </Typography>
              </div>
            </div>
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default HomeButton;
