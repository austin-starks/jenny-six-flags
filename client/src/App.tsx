import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const typographyStyle = {
  mt: 3,
  fontWeight: 600,
  color: "white",
};

const yesButtonStyle = {
  backgroundColor: "#c86fc9",
  color: "white",
  fontWeight: "bolder",
  "&:hover": {
    backgroundColor: "#f79ad3",
  },
};

const App: React.FC = () => {
  const [pageState, setPageState] = useState<"initial" | "dateOptions">(
    "initial"
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [buttonPosition, setButtonPosition] = useState<null | {
    top: number;
    left: number;
  }>(null);

  const handleYes = async () => {
    await submitOption("Six Flags!");
    setSelectedOption("Yes");
    setPageState("dateOptions");
  };

  const handleAlternative = async () => {
    await submitOption("Alternative");
    setSelectedOption("Alternative");
    setPageState("dateOptions");
  };

  const handleNoHover = () => {
    let nextPosition;
    do {
      nextPosition = {
        top: Math.random() * (window.innerHeight - 50), // 50 is an approximate height of the button
        left: Math.random() * (window.innerWidth - 100), // 100 is an approximate width of the button
      };
    } while (
      buttonPosition &&
      nextPosition.top === buttonPosition.top &&
      nextPosition.left === buttonPosition.left
    );
    setButtonPosition(nextPosition);
  };

  // Add a resize listener to update button position on screen resize
  React.useEffect(() => {
    const handleResize = () => {
      if (buttonPosition) {
        setButtonPosition({
          top: Math.min(buttonPosition.top, window.innerHeight - 50),
          left: Math.min(buttonPosition.left, window.innerWidth - 100),
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [buttonPosition]);

  const submitOption = async (option: string) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ choice: option }),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage(
          "Done! I was sent an email with your response. See you soon!"
        );
        setSnackbarSeverity("success");
      } else {
        throw new Error(
          data.message || "An error occurred while sending the email"
        );
      }
    } catch (error) {
      setSnackbarMessage(
        "Oops! An error occurred while notifying me of your choice. Please DM me!"
      );
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#c86fc9",
        backgroundImage: "linear-gradient(316deg, #c86fc9 0%, #f79ad3 74%)",
        minHeight: "100vh",
        width: "100%",
        color: "white",
        textAlign: "center",
        paddingTop: "40px",
        fontWeight: "bolder",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {pageState === "initial" ? (
        <Box mt={3} display={"flex"} justifyContent={"center"}>
          <Box>
            <Typography sx={typographyStyle} variant="h4">
              Would you like to go to Six Flags with me?
            </Typography>
            <video
              autoPlay
              muted
              playsInline
              loop
              style={{
                display: "block",
                maxWidth: "350px",
                height: "auto",
                margin: "auto",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <source
                src={
                  "https://personal-stuff.nyc3.cdn.digitaloceanspaces.com/doggy-rollercoaster.mp4"
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <Box>
              <Box my={2}>
                <Button
                  variant="contained"
                  sx={yesButtonStyle}
                  onClick={handleYes}
                >
                  <FontAwesomeIcon icon={faHeart} />{" "}
                  <span style={{ marginLeft: "5px" }}>
                    Yes, I will go to Six Flags!
                  </span>
                </Button>
              </Box>
              <Box my={2}>
                <Button
                  variant="contained"
                  sx={yesButtonStyle}
                  onClick={handleAlternative}
                >
                  <FontAwesomeIcon icon={faHeart} />{" "}
                  <span style={{ marginLeft: "5px" }}>
                    I will go out with you again, but I don't like
                    rollercoasters.
                  </span>
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#f79ad3",
                    color: "white",
                    fontWeight: "bolder",
                    "&:hover": {
                      backgroundColor: "#f79ad3",
                    },
                  }}
                  onClick={handleNoHover}
                  onMouseMove={handleNoHover}
                  onMouseEnter={handleNoHover}
                  style={
                    buttonPosition
                      ? {
                          position: "absolute",
                          top: buttonPosition.top,
                          left: buttonPosition.left,
                        }
                      : {}
                  }
                >
                  No {" :("}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography mt={4} sx={typographyStyle} variant="h4">
            {selectedOption === "Yes"
              ? "Yay! I can't wait! I'll text you and figure out the dates."
              : "No problem! Here are some alternative date ideas:"}
          </Typography>
          <video
            autoPlay
            muted
            playsInline
            loop
            style={{
              display: "block",
              maxWidth: "350px",
              height: "auto",
              margin: "auto",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <source
              src={
                "https://personal-stuff.nyc3.cdn.digitaloceanspaces.com/doggy.mp4"
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {selectedOption === "Alternative" && (
            <>
              <Typography
                sx={{ color: "white", marginBottom: "10px" }}
                variant="h5"
              >
                Here are some date options:
              </Typography>
              <Button
                sx={{
                  width: "360px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                  mx: 1,
                  py: 1,
                  backgroundColor: "#c86fc9",
                  color: "white",
                  fontWeight: "bolder",
                  "&:hover": {
                    backgroundColor: "#f79ad3",
                  },
                }}
                onClick={() => submitOption("Piedmont Park")}
              >
                Walk in Piedmont Park 🌳
              </Button>
              <Button
                sx={{
                  width: "360px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                  mx: 1,
                  py: 1,
                  backgroundColor: "#c86fc9",
                  color: "white",
                  fontWeight: "bolder",
                  "&:hover": {
                    backgroundColor: "#f79ad3",
                  },
                }}
                onClick={() => submitOption("Movie Theater")}
              >
                Go to the Movies 📽
              </Button>
              <Button
                sx={{
                  width: "360px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                  mx: 1,
                  py: 1,
                  backgroundColor: "#c86fc9",
                  color: "white",
                  fontWeight: "bolder",
                  "&:hover": {
                    backgroundColor: "#f79ad3",
                  },
                }}
                onClick={() => submitOption("Food")}
              >
                Food! 🍔
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default App;
