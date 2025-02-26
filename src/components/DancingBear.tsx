import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const bearColors = [
  "#7DD1DE", // Primary color
  "#5CB7C4", // Dark primary
  "#9CDBE5", // Light primary
  "#FFD700", // Gold
  "#FFA500", // Orange
];

const DancingBear: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [bearColor, setBearColor] = useState(bearColors[0]);

  // Change bear color periodically when dancing
  useEffect(() => {
    if (!isActive) return;

    const colorInterval = setInterval(() => {
      setBearColor(bearColors[Math.floor(Math.random() * bearColors.length)]);
    }, 2000);

    return () => clearInterval(colorInterval);
  }, [isActive]);

  // Bear body parts variants for animation
  const bodyVariants = {
    idle: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    dancing: {
      y: [0, -20, 0],
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const armVariants = {
    idle: {
      rotate: 0,
    },
    dancing: {
      rotate: [-10, 30, -10],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const legVariants = {
    idle: {
      rotate: 0,
    },
    dancing: {
      rotate: [-5, 15, -5],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  };

  const headVariants = {
    idle: {
      rotate: [0, -2, 2, -2, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    dancing: {
      rotate: [-10, 10, -10],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const musicNoteVariants = {
    hidden: { opacity: 0, y: 0, x: 0 },
    visible: {
      opacity: [0, 1, 0],
      y: [-10, -40],
      x: [0, 10, 20],
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  // Generate random positions for music notes
  const generateNotePosition = () => {
    const x = Math.random() * 60 - 30; // -30 to 30
    const y = Math.random() * -50 - 10; // -10 to -60
    return { x, y };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        position: "relative",
        overflow: "hidden",
        height: 200,
      }}
    >
      <Tooltip title={isActive ? "Stop dancing" : "Make the bear dance!"}>
        <IconButton
          onClick={() => setIsActive(!isActive)}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: isActive ? "rgba(125, 209, 222, 0.2)" : "transparent",
            "&:hover": {
              bgcolor: "rgba(125, 209, 222, 0.3)",
            },
          }}
        >
          <MusicNoteIcon color={isActive ? "primary" : "action"} />
        </IconButton>
      </Tooltip>

      {/* Dancing bear container */}
      <motion.div
        variants={bodyVariants}
        animate={isActive ? "dancing" : "idle"}
        style={{
          position: "relative",
          width: 120,
          height: 120,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Bear body */}
        <motion.div
          style={{
            width: 80,
            height: 100,
            borderRadius: "50%",
            backgroundColor: bearColor,
            position: "relative",
            zIndex: 1,
          }}
        />

        {/* Bear head */}
        <motion.div
          variants={headVariants}
          animate={isActive ? "dancing" : "idle"}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: bearColor,
            position: "absolute",
            top: -30,
            zIndex: 2,
          }}
        >
          {/* Eyes */}
          <Box
            sx={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "black",
              top: 20,
              left: 15,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "black",
              top: 20,
              right: 15,
            }}
          />

          {/* Nose */}
          <Box
            sx={{
              position: "absolute",
              width: 12,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "black",
              top: 30,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </motion.div>

        {/* Left arm */}
        <motion.div
          variants={armVariants}
          animate={isActive ? "dancing" : "idle"}
          style={{
            width: 20,
            height: 60,
            borderRadius: 10,
            backgroundColor: bearColor,
            position: "absolute",
            left: -5,
            top: 20,
            transformOrigin: "top center",
            zIndex: 0,
          }}
        />

        {/* Right arm */}
        <motion.div
          variants={armVariants}
          animate={isActive ? "dancing" : "idle"}
          style={{
            width: 20,
            height: 60,
            borderRadius: 10,
            backgroundColor: bearColor,
            position: "absolute",
            right: -5,
            top: 20,
            transformOrigin: "top center",
            zIndex: 0,
          }}
        />

        {/* Left leg */}
        <motion.div
          variants={legVariants}
          animate={isActive ? "dancing" : "idle"}
          style={{
            width: 20,
            height: 40,
            borderRadius: 10,
            backgroundColor: bearColor,
            position: "absolute",
            left: 15,
            bottom: -30,
            transformOrigin: "top center",
            zIndex: 0,
          }}
        />

        {/* Right leg */}
        <motion.div
          variants={legVariants}
          animate={isActive ? "dancing" : "idle"}
          style={{
            width: 20,
            height: 40,
            borderRadius: 10,
            backgroundColor: bearColor,
            position: "absolute",
            right: 15,
            bottom: -30,
            transformOrigin: "top center",
            zIndex: 0,
          }}
        />

        {/* Music notes that appear when dancing */}
        {isActive && (
          <>
            {[...Array(3)].map((_, i) => {
              const position = generateNotePosition();
              return (
                <motion.div
                  key={i}
                  variants={musicNoteVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    position: "absolute",
                    left: 40 + position.x,
                    top: 20 + position.y,
                    color:
                      bearColors[Math.floor(Math.random() * bearColors.length)],
                    zIndex: 3,
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2,
                    delay: i * 0.5,
                  }}
                >
                  <MusicNoteIcon fontSize="small" />
                </motion.div>
              );
            })}
          </>
        )}
      </motion.div>

      <Typography
        variant="body2"
        sx={{
          mt: 2,
          fontStyle: "italic",
          opacity: 0.7,
          color: isActive ? "primary.main" : "text.secondary",
        }}
      >
        {isActive
          ? "Tanzender Bär ist glücklich!"
          : "Klicken Sie auf die Musiknote, um den Bären tanzen zu lassen"}
      </Typography>
    </Box>
  );
};

export default DancingBear;
