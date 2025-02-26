import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

// Photo-realistic owl color palette
const owlColors = {
  // Main body colors
  bodyDark: "#4E342E", // Dark brown
  bodyMedium: "#5D4037", // Medium brown
  bodyLight: "#8D6E63", // Light brown

  // Feather details
  featherDark: "#3E2723", // Very dark brown
  featherLight: "#A1887F", // Lighter brown
  featherAccent: "#D7CCC8", // Almost white/cream

  // Face colors
  facialDisc: "#BCAAA4", // Light beige
  facialDiscDark: "#8D6E63", // Darker facial disc edge

  // Eyes
  eyesOuter: "#212121", // Almost black
  eyesIris: "#FFA000", // Amber
  eyesPupil: "#000000", // Black
  eyesGlow: "#FFECB3", // Light amber glow

  // Beak
  beak: "#795548", // Medium brown

  // Feet
  feet: "#5D4037", // Medium brown

  // Happy mode accents
  happyAccent: "#FF4081", // Pink

  // Crazy mode accents
  crazyAccent: "#8E24AA", // Purple
};

// Feather texture patterns
const featherPatterns = [
  "radial-gradient(ellipse at center, #8D6E63 0%, #5D4037 70%, #4E342E 100%)",
  "radial-gradient(ellipse at center, #A1887F 0%, #8D6E63 50%, #5D4037 100%)",
  "linear-gradient(45deg, #5D4037 25%, #8D6E63 25%, #8D6E63 50%, #5D4037 50%, #5D4037 75%, #8D6E63 75%, #8D6E63 100%)",
];

const DancingOwl: React.FC = () => {
  // Animation states: "idle", "dancing", "happy", "crazy"
  const [animationState, setAnimationState] = useState<
    "idle" | "dancing" | "happy" | "crazy"
  >("idle");
  const [isBlinking, setIsBlinking] = useState(false);
  const [featherPattern, setFeatherPattern] = useState(featherPatterns[0]);

  // Handle eye blinking
  useEffect(() => {
    const startBlinking = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        scheduleNextBlink();
      }, 200); // Blink duration: 200ms
    };

    const scheduleNextBlink = () => {
      const nextBlinkDelay = Math.random() * 5000 + 2000; // Random time between 2-7 seconds
      setTimeout(startBlinking, nextBlinkDelay);
    };

    // Start the blinking cycle
    scheduleNextBlink();

    // Cleanup on unmount
    return () => {
      setIsBlinking(false);
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

    // Change feather pattern for more visual interest
    setFeatherPattern(
      featherPatterns[Math.floor(Math.random() * featherPatterns.length)]
    );
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
      scaleY: isBlinking ? 0.1 : 1,
      transition: {
        duration: 0.1,
      },
    },
    dancing: {
      scaleY: isBlinking ? 0.1 : 1,
      transition: {
        duration: 0.1,
      },
    },
    happy: {
      scaleY: isBlinking ? 0.1 : 0.5, // Happy eyes, but still blink
      y: 2,
      transition: {
        duration: 0.1,
      },
    },
    crazy: {
      scaleY: isBlinking ? 0.1 : [0.2, 0.8, 0.3, 0.7, 0.2], // Wild eyes with blink
      scale: [1, 1.2, 0.9, 1.3, 1],
      rotate: [0, 10, -10, 5, 0],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Floating item variants
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

  // Lightning bolt variants
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
        return "linear-gradient(to bottom, #87CEEB 0%, #E0F7FA 100%)"; // Sky gradient
      case "dancing":
        return "linear-gradient(to bottom, #81D4FA 0%, #B3E5FC 100%)"; // Light blue gradient
      case "happy":
        return "linear-gradient(to bottom, #FFD54F 0%, #FFECB3 100%)"; // Warm yellow gradient
      case "crazy":
        return "linear-gradient(to bottom, #CE93D8 0%, #E1BEE7 100%)"; // Purple gradient
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
        background: getBackgroundColor(),
        transition: "background 0.5s ease",
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

      {/* Tree branch for owl to sit on */}
      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          width: "90%",
          height: "15px",
          background:
            "linear-gradient(90deg, #5D4037 0%, #8D6E63 50%, #5D4037 100%)",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          zIndex: 0,
          "&:before": {
            content: '""',
            position: "absolute",
            top: "-5px",
            left: "10%",
            width: "80%",
            height: "5px",
            background: "#8D6E63",
            borderRadius: "5px 5px 0 0",
          },
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: "-3px",
            left: "5%",
            width: "90%",
            height: "3px",
            background: "#3E2723",
            borderRadius: "0 0 5px 5px",
          },
        }}
      />

      {/* Dancing owl container */}
      <motion.div
        variants={bodyVariants}
        animate={animationState}
        style={{
          position: "relative",
          width: 150,
          height: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        {/* Left wing */}
        <motion.div
          variants={wingVariants}
          animate={animationState}
          style={{
            width: 40,
            height: 80,
            background: featherPattern,
            position: "absolute",
            left: -10,
            top: 10,
            borderRadius: "50% 30% 60% 30%",
            transformOrigin: "right center",
            zIndex: 0,
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}
        >
          {/* Wing texture overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1"/></svg>\')',
              backgroundSize: "10px 10px",
              opacity: 0.7,
              mixBlendMode: "overlay",
            }}
          />

          {/* Wing feather details */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`left-wing-feather-${i}`}
              style={{
                position: "absolute",
                width: 30,
                height: 8,
                background:
                  i % 2 === 0 ? owlColors.featherDark : owlColors.featherLight,
                borderRadius: "30% 50% 50% 30%",
                transform: `rotate(${-10 * i}deg) translateY(${10 + i * 10}px)`,
                left: 5,
                opacity: 0.8,
              }}
            />
          ))}
        </motion.div>

        {/* Right wing */}
        <motion.div
          variants={wingVariants}
          animate={animationState}
          style={{
            width: 40,
            height: 80,
            background: featherPattern,
            position: "absolute",
            right: -10,
            top: 10,
            borderRadius: "30% 50% 30% 60%",
            transformOrigin: "left center",
            zIndex: 0,
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}
        >
          {/* Wing texture overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1"/></svg>\')',
              backgroundSize: "10px 10px",
              opacity: 0.7,
              mixBlendMode: "overlay",
            }}
          />

          {/* Wing feather details */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`right-wing-feather-${i}`}
              style={{
                position: "absolute",
                width: 30,
                height: 8,
                background:
                  i % 2 === 0 ? owlColors.featherDark : owlColors.featherLight,
                borderRadius: "50% 30% 30% 50%",
                transform: `rotate(${10 * i}deg) translateY(${10 + i * 10}px)`,
                right: 5,
                opacity: 0.8,
              }}
            />
          ))}
        </motion.div>

        {/* Owl body - more realistic with texture */}
        <motion.div
          style={{
            width: 100,
            height: 120,
            borderRadius: "50% 50% 60% 60%",
            background:
              animationState === "crazy"
                ? `radial-gradient(ellipse at center, ${owlColors.crazyAccent} 0%, ${owlColors.bodyMedium} 70%, ${owlColors.bodyDark} 100%)`
                : animationState === "happy"
                ? `radial-gradient(ellipse at center, ${owlColors.happyAccent} 0%, ${owlColors.bodyMedium} 70%, ${owlColors.bodyDark} 100%)`
                : featherPattern,
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            transition: "background 0.3s ease",
            overflow: "hidden",
          }}
        >
          {/* Feather texture overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1"/></svg>\')',
              backgroundSize: "10px 10px",
              opacity: 0.7,
              mixBlendMode: "overlay",
            }}
          />

          {/* Owl belly - more realistic with gradient */}
          <div
            style={{
              width: 70,
              height: 90,
              borderRadius: "40% 40% 50% 50%",
              background:
                animationState === "crazy"
                  ? "radial-gradient(ellipse at center, #B39DDB 0%, #9575CD 70%, #7E57C2 100%)"
                  : animationState === "happy"
                  ? "radial-gradient(ellipse at center, #F8BBD0 0%, #F48FB1 70%, #EC407A 100%)"
                  : "radial-gradient(ellipse at center, #D7CCC8 0%, #BCAAA4 70%, #A1887F 100%)",
              position: "absolute",
              zIndex: 2,
              transition: "background 0.3s ease",
              boxShadow: "inset 0 -5px 10px rgba(0,0,0,0.1)",
            }}
          />

          {/* Feather details */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`feather-${i}`}
              style={{
                position: "absolute",
                width: 15 + Math.random() * 10,
                height: 5 + Math.random() * 5,
                background:
                  i % 3 === 0
                    ? owlColors.featherDark
                    : i % 3 === 1
                    ? owlColors.featherLight
                    : owlColors.bodyMedium,
                borderRadius: "50%",
                transform: `rotate(${i * 30}deg) translateX(${
                  40 + Math.random() * 10
                }px)`,
                opacity: 0.7 + Math.random() * 0.3,
                zIndex: 0,
              }}
            />
          ))}
        </motion.div>

        {/* Owl head - more realistic with texture and shape */}
        <motion.div
          variants={headVariants}
          animate={animationState}
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background:
              animationState === "crazy"
                ? `radial-gradient(ellipse at center, ${owlColors.crazyAccent} 0%, ${owlColors.bodyMedium} 70%, ${owlColors.bodyDark} 100%)`
                : animationState === "happy"
                ? `radial-gradient(ellipse at center, ${owlColors.happyAccent} 0%, ${owlColors.bodyMedium} 70%, ${owlColors.bodyDark} 100%)`
                : featherPattern,
            position: "absolute",
            top: -40,
            zIndex: 3,
            transition: "background 0.3s ease",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}
        >
          {/* Feather texture overlay for head */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1"/></svg>\')',
              backgroundSize: "10px 10px",
              opacity: 0.7,
              mixBlendMode: "overlay",
            }}
          />

          {/* Facial disc (the heart-shaped face) - more realistic with gradient */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background:
                animationState === "crazy"
                  ? "radial-gradient(ellipse at center, #B39DDB 0%, #9575CD 70%, #7E57C2 100%)"
                  : animationState === "happy"
                  ? "radial-gradient(ellipse at center, #F8BBD0 0%, #F48FB1 70%, #EC407A 100%)"
                  : "radial-gradient(ellipse at center, #D7CCC8 0%, #BCAAA4 70%, #A1887F 100%)",
              position: "absolute",
              top: 5,
              left: 5,
              zIndex: 4,
              transition: "background 0.3s ease",
              boxShadow: "inset 0 -5px 10px rgba(0,0,0,0.1)",
            }}
          />

          {/* Facial disc edge - darker rim around face */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "50%",
              border: `5px solid ${owlColors.facialDiscDark}`,
              opacity: 0.5,
              zIndex: 5,
            }}
          />

          {/* Left ear tuft - more realistic with texture */}
          <div
            style={{
              width: 20,
              height: 35,
              background:
                animationState === "crazy"
                  ? owlColors.crazyAccent
                  : animationState === "happy"
                  ? owlColors.happyAccent
                  : owlColors.bodyDark,
              position: "absolute",
              top: -15,
              left: 15,
              borderRadius: "50% 50% 0 0",
              transform: "rotate(-30deg)",
              zIndex: 3,
              transition: "background 0.3s ease",
              boxShadow: "0 -2px 5px rgba(0,0,0,0.2)",
              overflow: "hidden",
            }}
          >
            {/* Ear tuft texture */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)",
                backgroundSize: "8px 8px",
                opacity: 0.5,
              }}
            />
          </div>

          {/* Right ear tuft - more realistic with texture */}
          <div
            style={{
              width: 20,
              height: 35,
              background:
                animationState === "crazy"
                  ? owlColors.crazyAccent
                  : animationState === "happy"
                  ? owlColors.happyAccent
                  : owlColors.bodyDark,
              position: "absolute",
              top: -15,
              right: 15,
              borderRadius: "50% 50% 0 0",
              transform: "rotate(30deg)",
              zIndex: 3,
              transition: "background 0.3s ease",
              boxShadow: "0 -2px 5px rgba(0,0,0,0.2)",
              overflow: "hidden",
            }}
          >
            {/* Ear tuft texture */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)",
                backgroundSize: "8px 8px",
                opacity: 0.5,
              }}
            />
          </div>

          {/* Left eye - more realistic with gradient and glow */}
          <motion.div
            variants={eyeVariants}
            animate={animationState}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: `radial-gradient(ellipse at center, ${owlColors.eyesOuter} 0%, ${owlColors.eyesOuter} 100%)`,
              position: "absolute",
              top: 25,
              left: 15,
              zIndex: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow:
                animationState === "crazy"
                  ? "0 0 10px 2px rgba(255,255,0,0.7)"
                  : "0 0 5px 1px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            {/* Iris */}
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
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: `radial-gradient(ellipse at center, ${owlColors.eyesIris} 0%, ${owlColors.eyesIris} 70%, ${owlColors.eyesOuter} 100%)`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Pupil */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: owlColors.eyesPupil,
                  boxShadow: "inset 0 0 2px 1px rgba(255,255,255,0.1)",
                }}
              />

              {/* Eye highlight */}
              <div
                style={{
                  position: "absolute",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.8)",
                  top: 3,
                  right: 3,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Right eye - more realistic with gradient and glow */}
          <motion.div
            variants={eyeVariants}
            animate={animationState}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: `radial-gradient(ellipse at center, ${owlColors.eyesOuter} 0%, ${owlColors.eyesOuter} 100%)`,
              position: "absolute",
              top: 25,
              right: 15,
              zIndex: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow:
                animationState === "crazy"
                  ? "0 0 10px 2px rgba(255,255,0,0.7)"
                  : "0 0 5px 1px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            {/* Iris */}
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
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: `radial-gradient(ellipse at center, ${owlColors.eyesIris} 0%, ${owlColors.eyesIris} 70%, ${owlColors.eyesOuter} 100%)`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Pupil */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: owlColors.eyesPupil,
                  boxShadow: "inset 0 0 2px 1px rgba(255,255,255,0.1)",
                }}
              />

              {/* Eye highlight */}
              <div
                style={{
                  position: "absolute",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.8)",
                  top: 3,
                  right: 3,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Beak - more realistic with texture and gradient */}
          <div
            style={{
              width: 20,
              height: animationState === "crazy" ? 22 : 16,
              background: `linear-gradient(to bottom, ${owlColors.beak} 0%, #6D4C41 100%)`,
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "50% 50% 60% 60%",
              zIndex: 5,
              transition: "height 0.3s ease",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {/* Beak texture */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "inherit",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)",
                opacity: 0.5,
              }}
            />
          </div>
        </motion.div>

        {/* Left foot */}
        <motion.div
          animate={
            animationState === "crazy"
              ? { rotate: [-5, 10, -10, 5, -5], y: [0, -5, 0, -5, 0] }
              : animationState === "happy" || animationState === "dancing"
              ? { rotate: [-3, 3, -3], y: [0, -2, 0] }
              : {}
          }
          transition={{
            repeat: Infinity,
            duration: animationState === "crazy" ? 0.4 : 1,
          }}
          style={{
            position: "absolute",
            bottom: -15,
            left: 30,
            zIndex: 2,
          }}
        >
          {/* Leg */}
          <div
            style={{
              width: 8,
              height: 20,
              background: `linear-gradient(to bottom, ${owlColors.bodyDark} 0%, ${owlColors.feet} 100%)`,
              borderRadius: "5px 5px 0 0",
            }}
          />

          {/* Foot with talons */}
          <div
            style={{
              position: "relative",
              width: 22,
              height: 8,
              background: owlColors.feet,
              borderRadius: "50% 50% 50% 50%",
              transform: "translateX(-7px)",
              boxShadow: "0 2px 3px rgba(0,0,0,0.2)",
            }}
          >
            {/* Talons */}
            {[...Array(3)].map((_, i) => (
              <div
                key={`left-talon-${i}`}
                style={{
                  position: "absolute",
                  width: 3,
                  height: 8,
                  background: "#5D4037",
                  borderRadius: "0 0 50% 50%",
                  bottom: 0,
                  left: 5 + i * 6,
                  transform: "rotate(10deg)",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right foot */}
        <motion.div
          animate={
            animationState === "crazy"
              ? { rotate: [5, -10, 10, -5, 5], y: [0, -5, 0, -5, 0] }
              : animationState === "happy" || animationState === "dancing"
              ? { rotate: [3, -3, 3], y: [0, -2, 0] }
              : {}
          }
          transition={{
            repeat: Infinity,
            duration: animationState === "crazy" ? 0.4 : 1,
            delay: 0.2, // Offset timing for alternating foot movement
          }}
          style={{
            position: "absolute",
            bottom: -15,
            right: 30,
            zIndex: 2,
          }}
        >
          {/* Leg */}
          <div
            style={{
              width: 8,
              height: 20,
              background: `linear-gradient(to bottom, ${owlColors.bodyDark} 0%, ${owlColors.feet} 100%)`,
              borderRadius: "5px 5px 0 0",
            }}
          />

          {/* Foot with talons */}
          <div
            style={{
              position: "relative",
              width: 22,
              height: 8,
              background: owlColors.feet,
              borderRadius: "50% 50% 50% 50%",
              transform: "translateX(-7px)",
              boxShadow: "0 2px 3px rgba(0,0,0,0.2)",
            }}
          >
            {/* Talons */}
            {[...Array(3)].map((_, i) => (
              <div
                key={`right-talon-${i}`}
                style={{
                  position: "absolute",
                  width: 3,
                  height: 8,
                  background: "#5D4037",
                  borderRadius: "0 0 50% 50%",
                  bottom: 0,
                  left: 5 + i * 6,
                  transform: "rotate(-10deg)",
                }}
              />
            ))}
          </div>
        </motion.div>

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
