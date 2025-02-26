import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

// Color palette for the owl
const owlColors = {
  body: "#795548", // Brown
  belly: "#A1887F", // Lighter brown
  wings: "#5D4037", // Darker brown
  eyes: "#FFFFFF", // White
  beak: "#FF9800", // Orange
  happyAccent: "#FF4081", // Pink for happy mode
  crazyAccent: "#8E24AA", // Purple for crazy mode
};

const DancingOwl: React.FC = () => {
  // Three states: "idle", "dancing", "happy", "crazy"
  const [animationState, setAnimationState] = useState<
    "idle" | "dancing" | "happy" | "crazy"
  >("idle");
  const [blinkTimer, setBlinkTimer] = useState<NodeJS.Timeout | null>(null);

  // Handle eye blinking
  useEffect(() => {
    const randomBlink = () => {
      const timer = setTimeout(() => {
        setBlinkTimer(null);
        randomBlink();
      }, Math.random() * 5000 + 1000);
      setBlinkTimer(timer);
    };

    randomBlink();
    return () => {
      if (blinkTimer) clearTimeout(blinkTimer);
    };
  }, []);

  // Cycle through animation states
  const toggleAnimation = () => {
    setAnimationState((prev) => {
      if (prev === "idle") return "dancing";
      if (prev === "dancing") return "happy";
      if (prev === "happy") return "crazy";
      return "idle";
    });
  };

  // Body animation variants
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
      y: [0, -15, 0],
      rotate: [-2, 2, -2],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    happy: {
      y: [0, -20, 0],
      rotate: [-5, 5, -5],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    crazy: {
      y: [0, -30, 10, -20, 0],
      rotate: [-10, 10, -15, 15, -10],
      scale: [1, 1.1, 0.95, 1.05, 1],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Wing animation variants
  const wingVariants = {
    idle: {
      rotate: 0,
    },
    dancing: {
      rotate: [-5, 20, -5],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    happy: {
      rotate: [-10, 30, -10],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    crazy: {
      rotate: [-30, 60, -20, 70, -30],
      scale: [1, 1.2, 0.9, 1.3, 1],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Head animation variants
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
      rotate: [-5, 5, -5],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    happy: {
      rotate: [-10, 10, -10],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    crazy: {
      rotate: [-15, 15, -20, 20, -15],
      y: [0, -10, 5, -5, 0],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Eye animation variants
  const eyeVariants = {
    idle: {
      scaleY: blinkTimer ? [1, 0.1, 1] : 1,
      transition: {
        duration: 0.2,
      },
    },
    dancing: {
      scaleY: blinkTimer ? [1, 0.1, 1] : 1,
      transition: {
        duration: 0.2,
      },
    },
    happy: {
      scaleY: 0.5, // Happy eyes
      y: 2,
    },
    crazy: {
      scaleY: [0.2, 0.8, 0.3, 0.7, 0.2], // Wild eyes
      scale: [1, 1.2, 0.9, 1.3, 1],
      rotate: [0, 10, -10, 5, 0],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Music/heart/star note variants
  const floatingItemVariants = {
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

  // Confetti variants
  const confettiVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: [0, 1, 0.5, 0],
      y: [0, -100, -150, -200],
      x: (i: number) => [0, i * 20 - 40, i * 30 - 60, i * 40 - 80],
      rotate: [0, 180, 360, 720],
      transition: {
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  // Lightning bolt variants for crazy mode
  const lightningVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      rotate: [0, 20, -20, 0],
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Generate random positions for floating items
  const generatePosition = () => {
    const x = Math.random() * 100 - 50; // -50 to 50
    const y = Math.random() * -50 - 10; // -10 to -60
    return { x, y };
  };

  // Get random confetti color
  const getRandomConfettiColor = () => {
    const colors = [
      "#FF4081",
      "#8E24AA",
      "#4CAF50",
      "#FFC107",
      "#2196F3",
      "#F44336",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Get button icon based on current state
  const getButtonIcon = () => {
    switch (animationState) {
      case "idle":
        return <MusicNoteIcon />;
      case "dancing":
        return <SentimentVerySatisfiedIcon />;
      case "happy":
        return <EmojiEmotionsIcon />;
      case "crazy":
        return <EmojiEmotionsIcon sx={{ color: owlColors.crazyAccent }} />;
    }
  };

  // Get button tooltip text
  const getButtonTooltip = () => {
    switch (animationState) {
      case "idle":
        return "Eule tanzen lassen";
      case "dancing":
        return "Eule glücklich machen";
      case "happy":
        return "Eule verrückt machen";
      case "crazy":
        return "Eule beruhigen";
    }
  };

  // Get message text
  const getMessage = () => {
    switch (animationState) {
      case "idle":
        return "Klicken Sie auf die Musiknote, um die Eule tanzen zu lassen";
      case "dancing":
        return "Die Eule tanzt fröhlich!";
      case "happy":
        return "Die Eule ist super glücklich! 😊";
      case "crazy":
        return "DIE EULE DREHT VÖLLIG DURCH!!! 🤪🔥";
    }
  };

  // Get background color based on state
  const getBackgroundColor = () => {
    switch (animationState) {
      case "idle":
        return "transparent";
      case "dancing":
        return "rgba(125, 209, 222, 0.1)";
      case "happy":
        return "rgba(255, 64, 129, 0.1)";
      case "crazy":
        return "rgba(142, 36, 170, 0.2)";
    }
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
        height: "100%",
        width: "100%",
        borderRadius: 2,
        backgroundColor: getBackgroundColor(),
        transition: "background-color 0.5s ease",
      }}
    >
      <Tooltip title={getButtonTooltip()}>
        <IconButton
          onClick={toggleAnimation}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor:
              animationState !== "idle"
                ? "rgba(125, 209, 222, 0.2)"
                : "transparent",
            "&:hover": {
              bgcolor: "rgba(125, 209, 222, 0.3)",
            },
          }}
        >
          {getButtonIcon()}
        </IconButton>
      </Tooltip>

      {/* Dancing owl container */}
      <motion.div
        variants={bodyVariants}
        animate={animationState}
        style={{
          position: "relative",
          width: 120,
          height: 120,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Owl body */}
        <motion.div
          style={{
            width: 80,
            height: 100,
            borderRadius: "50%",
            backgroundColor:
              animationState === "crazy"
                ? owlColors.crazyAccent
                : animationState === "happy"
                ? owlColors.happyAccent
                : owlColors.body,
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "background-color 0.3s ease",
          }}
        >
          {/* Owl belly */}
          <div
            style={{
              width: 50,
              height: 70,
              borderRadius: "50%",
              backgroundColor:
                animationState === "crazy"
                  ? "#B39DDB"
                  : animationState === "happy"
                  ? "#F8BBD0"
                  : owlColors.belly,
              position: "absolute",
              zIndex: 2,
              transition: "background-color 0.3s ease",
            }}
          />
        </motion.div>

        {/* Owl head */}
        <motion.div
          variants={headVariants}
          animate={animationState}
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            backgroundColor:
              animationState === "crazy"
                ? owlColors.crazyAccent
                : animationState === "happy"
                ? owlColors.happyAccent
                : owlColors.body,
            position: "absolute",
            top: -30,
            zIndex: 3,
            transition: "background-color 0.3s ease",
          }}
        >
          {/* Facial disc (the heart-shaped face) */}
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor:
                animationState === "crazy"
                  ? "#B39DDB"
                  : animationState === "happy"
                  ? "#F8BBD0"
                  : owlColors.belly,
              position: "absolute",
              top: 5,
              left: 5,
              zIndex: 4,
              transition: "background-color 0.3s ease",
            }}
          />

          {/* Left ear tuft */}
          <div
            style={{
              width: 15,
              height: 25,
              backgroundColor:
                animationState === "crazy"
                  ? owlColors.crazyAccent
                  : animationState === "happy"
                  ? owlColors.happyAccent
                  : owlColors.body,
              position: "absolute",
              top: -10,
              left: 10,
              borderRadius: "50% 50% 0 0",
              transform: "rotate(-30deg)",
              zIndex: 3,
              transition: "background-color 0.3s ease",
            }}
          />

          {/* Right ear tuft */}
          <div
            style={{
              width: 15,
              height: 25,
              backgroundColor:
                animationState === "crazy"
                  ? owlColors.crazyAccent
                  : animationState === "happy"
                  ? owlColors.happyAccent
                  : owlColors.body,
              position: "absolute",
              top: -10,
              right: 10,
              borderRadius: "50% 50% 0 0",
              transform: "rotate(30deg)",
              zIndex: 3,
              transition: "background-color 0.3s ease",
            }}
          />

          {/* Left eye */}
          <motion.div
            variants={eyeVariants}
            animate={animationState}
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              backgroundColor: owlColors.eyes,
              position: "absolute",
              top: 20,
              left: 12,
              zIndex: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Pupil */}
            <motion.div
              animate={
                animationState === "crazy"
                  ? { scale: [1, 1.5, 0.8, 1.2, 1] }
                  : {}
              }
              transition={{
                repeat: animationState === "crazy" ? Infinity : 0,
                duration: 0.4,
              }}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "black",
              }}
            />
          </motion.div>

          {/* Right eye */}
          <motion.div
            variants={eyeVariants}
            animate={animationState}
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              backgroundColor: owlColors.eyes,
              position: "absolute",
              top: 20,
              right: 12,
              zIndex: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Pupil */}
            <motion.div
              animate={
                animationState === "crazy"
                  ? { scale: [1, 1.5, 0.8, 1.2, 1] }
                  : {}
              }
              transition={{
                repeat: animationState === "crazy" ? Infinity : 0,
                duration: 0.4,
              }}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "black",
              }}
            />
          </motion.div>

          {/* Beak */}
          <div
            style={{
              width: 15,
              height: animationState === "crazy" ? 18 : 12,
              backgroundColor: owlColors.beak,
              position: "absolute",
              bottom: 15,
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "50% 50% 50% 50%",
              zIndex: 5,
              transition: "height 0.3s ease",
            }}
          />

          {/* Smile (only in happy and crazy modes) */}
          {(animationState === "happy" || animationState === "crazy") && (
            <motion.div
              animate={
                animationState === "crazy"
                  ? {
                      scaleX: [1, 1.3, 0.9, 1.2, 1],
                      y: [0, 2, -2, 1, 0],
                    }
                  : {}
              }
              transition={{
                repeat: animationState === "crazy" ? Infinity : 0,
                duration: 0.4,
              }}
              style={{
                width: 30,
                height: 15,
                border: "2px solid",
                borderColor: animationState === "crazy" ? "#E91E63" : "#FF4081",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                position: "absolute",
                bottom: 5,
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "0 0 10px 10px",
                zIndex: 6,
              }}
            />
          )}
        </motion.div>

        {/* Left wing */}
        <motion.div
          variants={wingVariants}
          animate={animationState}
          style={{
            width: 25,
            height: 70,
            borderRadius: "50px 20px 20px 30px",
            backgroundColor:
              animationState === "crazy"
                ? owlColors.crazyAccent
                : animationState === "happy"
                ? owlColors.happyAccent
                : owlColors.wings,
            position: "absolute",
            left: -5,
            top: 10,
            transformOrigin: "top center",
            zIndex: 0,
            transition: "background-color 0.3s ease",
          }}
        />

        {/* Right wing */}
        <motion.div
          variants={wingVariants}
          animate={animationState}
          style={{
            width: 25,
            height: 70,
            borderRadius: "20px 50px 30px 20px",
            backgroundColor:
              animationState === "crazy"
                ? owlColors.crazyAccent
                : animationState === "happy"
                ? owlColors.happyAccent
                : owlColors.wings,
            position: "absolute",
            right: -5,
            top: 10,
            transformOrigin: "top center",
            zIndex: 0,
            transition: "background-color 0.3s ease",
          }}
        />

        {/* Feet */}
        <div
          style={{
            width: 15,
            height: 10,
            backgroundColor: owlColors.beak,
            position: "absolute",
            bottom: -5,
            left: 25,
            borderRadius: "0 0 5px 5px",
            zIndex: 0,
          }}
        />
        <div
          style={{
            width: 15,
            height: 10,
            backgroundColor: owlColors.beak,
            position: "absolute",
            bottom: -5,
            right: 25,
            borderRadius: "0 0 5px 5px",
            zIndex: 0,
          }}
        />

        {/* Music notes for dancing mode */}
        {animationState === "dancing" && (
          <>
            {[...Array(3)].map((_, i) => {
              const position = generatePosition();
              return (
                <motion.div
                  key={`music-${i}`}
                  variants={floatingItemVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    position: "absolute",
                    left: 40 + position.x,
                    top: 20 + position.y,
                    color: "#7DD1DE",
                    zIndex: 10,
                    fontSize: 20,
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2,
                    delay: i * 0.5,
                  }}
                >
                  ♪
                </motion.div>
              );
            })}
          </>
        )}

        {/* Hearts for happy mode */}
        {animationState === "happy" && (
          <>
            {[...Array(5)].map((_, i) => {
              const position = generatePosition();
              return (
                <motion.div
                  key={`heart-${i}`}
                  variants={floatingItemVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    position: "absolute",
                    left: 40 + position.x,
                    top: 20 + position.y,
                    color: owlColors.happyAccent,
                    zIndex: 10,
                    fontSize: 16,
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: Math.random() * 1.5,
                    delay: i * 0.3,
                  }}
                >
                  ❤
                </motion.div>
              );
            })}
          </>
        )}

        {/* Crazy mode effects: stars, lightning, confetti */}
        {animationState === "crazy" && (
          <>
            {/* Stars */}
            {[...Array(7)].map((_, i) => {
              const position = generatePosition();
              return (
                <motion.div
                  key={`star-${i}`}
                  variants={floatingItemVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    position: "absolute",
                    left: 40 + position.x,
                    top: 20 + position.y,
                    color: i % 2 === 0 ? "#FFC107" : owlColors.crazyAccent,
                    zIndex: 10,
                    fontSize: 16 + Math.random() * 10,
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: Math.random() * 0.8,
                    delay: i * 0.2,
                    duration: 0.8,
                  }}
                >
                  {i % 3 === 0 ? "⭐" : i % 3 === 1 ? "✨" : "🌟"}
                </motion.div>
              );
            })}

            {/* Lightning bolts */}
            {[...Array(3)].map((_, i) => {
              const position = generatePosition();
              return (
                <motion.div
                  key={`lightning-${i}`}
                  variants={lightningVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    position: "absolute",
                    left: 40 + position.x,
                    top: 20 + position.y,
                    color: "#FFC107",
                    zIndex: 10,
                    fontSize: 24,
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: Math.random() * 1.5 + 0.5,
                    delay: i * 0.5,
                  }}
                >
                  ⚡
                </motion.div>
              );
            })}

            {/* Confetti */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                variants={confettiVariants}
                custom={i}
                initial="hidden"
                animate="visible"
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 0,
                  width: 8,
                  height: 8,
                  backgroundColor: getRandomConfettiColor(),
                  borderRadius: i % 2 === 0 ? "50%" : "0",
                  zIndex: 10,
                }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: Math.random() * 0.5,
                  delay: i * 0.1,
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      <Typography
        variant="body2"
        sx={{
          mt: 2,
          fontStyle: "italic",
          opacity: 0.8,
          color:
            animationState === "crazy"
              ? owlColors.crazyAccent
              : animationState === "happy"
              ? owlColors.happyAccent
              : animationState === "dancing"
              ? "primary.main"
              : "text.secondary",
          fontWeight: animationState === "crazy" ? 700 : 400,
        }}
      >
        {getMessage()}
      </Typography>
    </Box>
  );
};

export default DancingOwl;
