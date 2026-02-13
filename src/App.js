import React, { useState, useMemo, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Button,
  Image,
  Text,
  HStack,
  createSystem,
  defaultConfig,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogBackdrop,
  Container,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Assets (Ensure paths are correct for your project)
import flower from "./assets/flower.png";
import pic1 from "./assets/pic1.jpg";
import pic2 from "./assets/pic2.jpg";
import pic3 from "./assets/pic3.jpg";
import pic4 from "./assets/pic9.jpg";
import pic5 from "./assets/pic8.jpg";
import pic6 from "./assets/pic7.jpg";
import pic7 from "./assets/pic6.jpg";
import pic8 from "./assets/pic10.jpg";
import pic9 from "./assets/pic11.jpg";
import pic10 from "./assets/pic12.jpg";
import pic11 from "./assets/pic5.jpg";
import daylightMusic from "./assets/tadhana.mp3";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#fff5f7" },
          100: { value: "#fed7e2" },
          200: { value: "#fbb6ce" },
          500: { value: "#ed64a6" },
          600: { value: "#d53f8c" },
        },
      },
    },
  },
});

const MotionBox = motion(Box);

// --- HELPER COMPONENTS ---

const LinedPaper = ({ children }) => (
  <Box
    w="full"
    bg="white"
    p={{ base: "8", md: "12" }}
    borderRadius="sm"
    boxShadow="xl"
    position="relative"
    _before={{
      content: '""',
      position: "absolute",
      top: 0,
      left: { base: "30px", md: "50px" },
      width: "2px",
      height: "100%",
      borderLeft: "2px solid",
      borderColor: "red.100",
    }}
    backgroundImage="linear-gradient(#f0f7ff 1.1px, transparent 1.1px)"
    backgroundSize="100% 32px"
    lineHeight="32px"
  >
    <Box
      pl={{ base: "10", md: "14" }}
      fontFamily="serif"
      fontSize="xl"
      color="gray.700"
      fontStyle="italic"
    >
      {children}
    </Box>
  </Box>
);

const FlipCard = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Box
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
      cursor="pointer"
    >
      <MotionBox
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        style={{ transformStyle: "preserve-3d" }}
        w={{ base: "150px", md: "200px" }}
        h={{ base: "200px", md: "250px" }}
        position="relative"
      >
        <Box
          position="absolute"
          inset="0"
          bg={item.color}
          borderRadius="xl"
          boxShadow="lg"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          border="2px solid white"
          overflow="hidden"
          style={{ backfaceVisibility: "hidden" }}
          _before={{
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${item.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(4px)",
            opacity: 0.45,
            zIndex: 0,
          }}
        >
          <VStack zIndex={1} gap="0">
            <Text
              fontSize="5xl"
              style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))" }}
            >
              {item.emoji}
            </Text>
            <Text
              fontWeight="black"
              color="brand.600"
              fontSize="lg"
              mt="2"
              textShadow="0px 1px 2px white"
            >
              {item.title}
            </Text>
          </VStack>
        </Box>

        <Box
          position="absolute"
          inset="0"
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          p="4"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          border="2px solid"
          borderColor={item.color}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Text fontSize="sm" color="gray.700" fontWeight="bold">
            {item.desc}
          </Text>
        </Box>
      </MotionBox>
    </Box>
  );
};

const HeartBackground = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 5 + 4,
        delay: Math.random() * 5,
        size: Math.random() * 20 + 10,
      })),
    [],
  );

  return (
    <Box
      position="fixed"
      inset="0"
      pointerEvents="none"
      zIndex={1}
      overflow="hidden"
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          style={{
            position: "absolute",
            left: heart.left,
            fontSize: heart.size,
            userSelect: "none",
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            opacity: [0, 1, 1, 0],
            x: ["-20px", "20px", "-20px"],
          }}
          transition={{
            y: {
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear",
            },
            opacity: {
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear",
            },
            x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          ❤️
        </motion.div>
      ))}
    </Box>
  );
};

const Section = ({ children, bg = "transparent", maxW = "4xl" }) => (
  <Box
    minH="100vh"
    w="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
    bg={bg}
    position="relative"
    p="6"
  >
    <Container maxW={maxW} zIndex={2}>
      {children}
    </Container>
  </Box>
);

// --- MAIN APP ---

function App() {
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noTextIndex, setNoTextIndex] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Unified Pagination State
  const [currentPage, setCurrentPage] = useState(0);
  // Track direction: 1 for forward, -1 for backward
  const [direction, setDirection] = useState(1);

  const letterPages = [
    {
      title: "To My Dearest Lyndee,",
      content: (
        <>
          <Text mb="4">
            It’s wild to think we spent four years in the same orbit without
            ever colliding. I like to think we were just becoming the people we
            needed to be before the universe finally decided we were ready for
            each other.
          </Text>
        </>
      ),
    },
    {
      title: "The Little Things,",
      content: (
        <>
          <Text mb="4">
            Beyond everything else, I’m just grateful for the way you make life
            feel "real." Whether we’re laughing through the chaos or just
            sitting in a comfortable silence, you’ve become the best part of my
            daily rhythm.
          </Text>
        </>
      ),
    },
    {
      title: "A Shared Future,",
      content: (
        <>
          <Text mb="4">
            I don’t just want to be there for the highlight reel. My wish is to
            be the person you turn to when the day is heavy, the one who knows
            exactly how you take your coffee, and the one who never gets tired
            of hearing your stories.
          </Text>
        </>
      ),
    },
    {
      title: "Always You,",
      content: (
        <>
          <Text mb="4">
            I promise to keep choosing you—not just when it’s easy, but
            especially when it’s not. Thank you for being my constant, my peace,
            and my favorite adventure.
          </Text>
          <Text>
            You aren't just a part of my life; you are my{" "}
            <strong>tadhana :)</strong>
          </Text>
        </>
      ),
    },
  ];

  // Map out our view states
  const QUESTION_PAGE = letterPages.length;
  const YAY_PAGE = letterPages.length + 1;

  const handleNextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => prev - 1);
  };

  const handleRestart = () => {
    setDirection(1); // Reset direction to forward for the "new start" feel
    setCurrentPage(0);
    // Reset confetti buttons states if you want to
    setNoButtonSize(1);
    setYesButtonSize(1);
  };

  // --- ANIMATION VARIANTS ---
  const pageVariants = {
    enter: (direction) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
    }),
  };

  const handleYesClick = () => {
    setDirection(1);
    setCurrentPage(YAY_PAGE);

    // Pink and red color palette
    const colors = ["#d53f8c", "#ed64a6", "#fbb6ce", "#ffffff", "#ff0000"];

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { x: 0, y: 0.8 },
      colors: colors,
      angle: 60,
      zIndex: 2000,
    });

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { x: 1, y: 0.8 },
      colors: colors,
      angle: 120,
      zIndex: 2000,
    });
  };

  // Carousel State
  const [currentImg, setCurrentImg] = useState(0);
  const images = [
    { src: pic1, caption: "Remember this day? You looked so happy." },
    { src: pic2, caption: "I love the way you look at the camera." },
    { src: pic3, caption: "Every second with you is a gift." },
    { src: pic4, caption: "Prolly your favorite picture." },
    { src: pic5, caption: "Every small things" },
    { src: pic6, caption: "Lowkey yarn?" },
    { src: pic7, caption: "FIRST DATEEEE!." },
  ];

  useEffect(() => {
    if (isCurtainOpen) {
      const timer = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % images.length);
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [isCurtainOpen, images.length]);

  const audio = useMemo(() => {
    const a = new Audio(daylightMusic);
    a.loop = true;
    return a;
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audio.play().catch((error) => {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
    return () => audio.pause();
  }, [isPlaying, audio]);

  const handleNoClick = () => {
    setNoButtonSize((prev) => Math.max(prev * 0.7, 0.4));
    setYesButtonSize((prev) => Math.min(prev + 0.4, 3.5));
    setNoTextIndex((prev) => (prev + 1) % 7);
    if (noTextIndex > 2) {
      setNoButtonPos({
        x: Math.random() * 80 - 40,
        y: Math.random() * 40 - 20,
      });
    }
  };

  return (
    <ChakraProvider value={system}>
      <Box bg="brand.50" minH="100vh" overflowX="hidden" position="relative">
        <HeartBackground />

        <Box position="fixed" bottom="6" right="6" zIndex="3000">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            colorPalette="pink"
            variant="solid"
            borderRadius="full"
            boxShadow="lg"
            size="md"
          >
            {isPlaying ? "Pause 🎵" : "Play 🎵"}
          </Button>
        </Box>

        <AnimatePresence>
          {!isCurtainOpen && (
            <Box
              position="fixed"
              inset="0"
              zIndex="2000"
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
            >
              <MotionBox
                position="absolute"
                left="0"
                top="0"
                bottom="0"
                w="50.5%"
                bg="brand.600"
                boxShadow="10px 0 30px rgba(0,0,0,0.3)"
                initial={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1] }}
                zIndex={2001}
              >
                <Box
                  w="full"
                  h="full"
                  opacity="0.1"
                  backgroundImage="linear-gradient(90deg, transparent 0%, #000 50%, transparent 100%)"
                  backgroundSize="40px 100%"
                />
              </MotionBox>
              <MotionBox
                position="absolute"
                right="0"
                top="0"
                bottom="0"
                w="50.5%"
                bg="brand.600"
                boxShadow="-10px 0 30px rgba(0,0,0,0.3)"
                initial={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1] }}
                zIndex={2001}
              >
                <Box
                  w="full"
                  h="full"
                  opacity="0.1"
                  backgroundImage="linear-gradient(90deg, transparent 0%, #000 50%, transparent 100%)"
                  backgroundSize="40px 100%"
                />
              </MotionBox>
              <MotionBox
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.5 }}
                zIndex={2002}
              >
                <VStack gap="6">
                  <Box
                    cursor="pointer"
                    onClick={() => {
                      setIsCurtainOpen(true);
                      setIsPlaying(true);
                    }}
                    _hover={{ transform: "scale(1.1)" }}
                    transition="transform 0.2s"
                  >
                    <Text fontSize="9xl">🎁</Text>
                  </Box>
                  <Text
                    color="white"
                    fontWeight="bold"
                    fontSize="2xl"
                    letterSpacing="widest"
                  >
                    CLICK TO UNWRAP
                  </Text>
                </VStack>
              </MotionBox>
            </Box>
          )}
        </AnimatePresence>

        <Box opacity={isCurtainOpen ? 1 : 0} transition="opacity 1s ease-in">
          <Section>
            <VStack gap="8" textAlign="center">
              <MotionBox
                animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Text fontSize="9xl">❤️</Text>
              </MotionBox>
              <Heading
                fontSize={{ base: "4xl", md: "7xl" }}
                color="brand.600"
                lineHeight="1.2"
              >
                Lyndee, some things are just written in the stars...
              </Heading>
              <Text fontSize="xl" color="gray.600">
                But I wanted to write this one down for you myself. Take a look.
              </Text>
            </VStack>
          </Section>

          <Section bg="whiteAlpha.400">
            <VStack gap={{ base: "8", md: "12" }} w="100%">
              <VStack gap="2">
                <Heading
                  fontSize={{ base: "3xl", md: "4xl" }}
                  color="brand.500"
                  textAlign="center"
                >
                  The Little Things...
                </Heading>
                <Text color="gray.500" fontSize="sm">
                  (Click each card to reveal)
                </Text>
              </VStack>
              <HStack gap="6" wrap="wrap" justify="center" w="full">
                {[
                  {
                    title: "The Vibes",
                    desc: "How you make every mundane moment feel like a scene from a movie.",
                    emoji: "🎬",
                    color: "#FFE5EC",
                    img: pic11,
                  },
                  {
                    title: "The Tadhana",
                    desc: "The way the universe finally brought us together after many close encounters",
                    emoji: "✨",
                    color: "#FFF0F3",
                    img: pic9,
                  },
                  {
                    title: "The Support",
                    desc: "You're my biggest cheerleader, and I hope I'm yours too.",
                    emoji: "📣",
                    color: "#FFD1DC",
                    img: pic10,
                  },
                  {
                    title: "Your Chaos",
                    desc: "The funny, random things you say that only I get to hear.",
                    emoji: "🌪️",
                    color: "#F0E6FF",
                    img: pic8,
                  },
                ].map((item, i) => (
                  <FlipCard key={i} item={item} />
                ))}
              </HStack>
            </VStack>
          </Section>

          <Section maxW="2xl" bg="brand.100">
            <VStack gap="12" w="full">
              <Heading
                fontSize={{ base: "3xl", md: "4xl" }}
                color="brand.500"
                textAlign="center"
              >
                Our Memories
              </Heading>
              <Box
                position="relative"
                w="full"
                h={{ base: "550px", md: "750px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <AnimatePresence mode="wait">
                  <MotionBox
                    key={currentImg}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.6 }}
                    w="full"
                    h="full"
                    bg="white"
                    p="4"
                    borderRadius="2xl"
                    boxShadow="2xl"
                  >
                    <Image
                      src={images[currentImg].src}
                      alt="Memory"
                      borderRadius="xl"
                      objectFit="cover"
                      w="full"
                      h="85%"
                    />
                    <VStack mt="4">
                      <Text
                        color="gray.700"
                        fontWeight="medium"
                        fontSize="lg"
                        textAlign="center"
                      >
                        {images[currentImg].caption}
                      </Text>
                    </VStack>
                  </MotionBox>
                </AnimatePresence>
              </Box>
              <HStack gap="3">
                {images.map((_, i) => (
                  <Box
                    key={i}
                    w="3"
                    h="3"
                    borderRadius="full"
                    bg={currentImg === i ? "brand.500" : "brand.200"}
                    cursor="pointer"
                    onClick={() => setCurrentImg(i)}
                    transition="background 0.3s"
                  />
                ))}
              </HStack>
            </VStack>
          </Section>

          <Section bg="whiteAlpha.400">
            <VStack gap="10" w="full">
              <Heading
                fontSize={{ base: "3xl", md: "4xl" }}
                color="brand.600"
                textAlign="center"
              >
                A Page From My Heart
              </Heading>
              <MotionBox
                initial={{ rotate: -2, y: 30, opacity: 0 }}
                whileInView={{ rotate: 1, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                w="full"
                maxW="2xl"
              >
                <LinedPaper>
                  <VStack align="start" gap="0">
                    <Text>Same streets, same halls, a dozen years,</Text>
                    <Text>I held my breath and hid my fears.</Text>
                    <Text>A silent ghost within your view,</Text>
                    <Text>Just inches from the heart of you.</Text>
                    <Text>&nbsp;</Text>
                    <Text>I waited for the stars to align,</Text>
                    <Text>But you were the one to draw the line.</Text>
                    <Text>The string was pulled, the silence broke,</Text>
                    <Text>You said the words I never spoke.</Text>
                  </VStack>
                </LinedPaper>
              </MotionBox>
            </VStack>
          </Section>

          <Section bg="brand.100">
            <VStack gap="8" textAlign="center">
              <MotionBox
                animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Text fontSize="9xl">💌</Text>
              </MotionBox>
              <Heading color="brand.600" fontSize={{ base: "3xl", md: "5xl" }}>
                One Last Thing...
              </Heading>
              <DialogRoot placement="center" motionPreset="none">
                <DialogTrigger asChild>
                  <Button
                    colorPalette="pink"
                    size="xl"
                    borderRadius="full"
                    px="16"
                    boxShadow="xl"
                  >
                    Open My Letter
                  </Button>
                </DialogTrigger>
                <DialogBackdrop
                  bg="rgba(0,0,0,0.6)"
                  backdropFilter="blur(4px)"
                  zIndex="1400"
                />
                <DialogContent
                  position="fixed"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  zIndex="1500"
                  bg="transparent"
                  boxShadow="none"
                  border="none"
                  w={{ base: "90vw", md: "500px" }}
                  px={{ base: "4", md: "0" }}
                >
                  <Box
                    position="relative"
                    w="full"
                    maxW="500px"
                    mx="auto"
                    h="600px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{ perspective: "1000px" }}
                  >
                    {/* Envelope Background & Flap sequence */}
                    {currentPage === 0 && direction === 1 && (
                      <>
                        <MotionBox
                          initial={{ opacity: 1 }}
                          animate={{ opacity: [1, 1, 0] }}
                          transition={{
                            times: [0, 0.8, 1],
                            duration: 2,
                            delay: 0.5,
                          }}
                          position="absolute"
                          bottom="10%"
                          left="50%"
                          transform="translateX(-50%)"
                          w="400px"
                          h="250px"
                          bg="#fdfcf0"
                          borderRadius="md"
                          boxShadow="lg"
                          zIndex={1}
                          style={{ pointerEvents: "none" }}
                          _before={{
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "70%",
                            bg: "#f7f3e3",
                            clipPath:
                              "polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)",
                            zIndex: 3,
                            borderRadius: "0 0 8px 8px",
                          }}
                        />
                        <MotionBox
                          initial={{ rotateX: 0, opacity: 1, zIndex: 4 }}
                          animate={{
                            rotateX: 160,
                            opacity: [1, 1, 0],
                            zIndex: 1,
                          }}
                          transition={{
                            rotateX: { duration: 0.8, delay: 0.2 },
                            opacity: {
                              times: [0, 0.8, 1],
                              duration: 2,
                              delay: 0.5,
                            },
                            zIndex: { delay: 1, duration: 0 },
                          }}
                          position="absolute"
                          bottom="calc(10% + 75px)"
                          left="50%"
                          ml="-200px"
                          w="400px"
                          h="175px"
                          bg="#f7f3e3"
                          style={{ originY: 0, pointerEvents: "none" }}
                          clipPath="polygon(0 0, 50% 100%, 100% 0)"
                          borderRadius="8px 8px 0 0"
                        />
                      </>
                    )}

                    {/* Unified Letter Content */}
                    <AnimatePresence mode="wait" custom={direction}>
                      <MotionBox
                        key={currentPage}
                        custom={direction}
                        // Use variants for cleaner logic
                        variants={pageVariants}
                        // Special override for initial envelope opening (page 0, direction 1)
                        initial={
                          currentPage === 0 && direction === 1
                            ? { y: 250, opacity: 0, scale: 0.85, rotateY: 0 }
                            : "enter"
                        }
                        animate={
                          currentPage === 0 && direction === 1
                            ? { y: 0, opacity: 1, scale: 1, rotateY: 0 }
                            : "center"
                        }
                        exit="exit"
                        transition={{
                          delay: currentPage === 0 && direction === 1 ? 1.0 : 0,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        style={{ transformOrigin: "left center" }}
                        w="full"
                        position="absolute"
                      >
                        <LinedPaper>
                          {/* VIEW 1: Standard Letter Pages */}
                          {currentPage < QUESTION_PAGE && (
                            <VStack align="start" gap="4" minH="350px">
                              <Heading
                                fontSize="2xl"
                                color="brand.600"
                                fontFamily="serif"
                              >
                                {letterPages[currentPage].title}
                              </Heading>
                              <Box
                                fontSize="md"
                                color="gray.700"
                                fontFamily="serif"
                                lineHeight="1.8"
                                flex="1"
                              >
                                {letterPages[currentPage].content}
                              </Box>
                              <HStack
                                w="full"
                                justify="space-between"
                                align="center"
                                mt="4"
                              >
                                {/* LEFT: Back Button */}
                                <Box
                                  flex="1"
                                  display="flex"
                                  justifyContent="flex-start"
                                >
                                  {currentPage > 0 && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      colorPalette="pink"
                                      onClick={handlePrevPage}
                                    >
                                      ← Back
                                    </Button>
                                  )}
                                </Box>

                                {/* CENTER: Page Number */}
                                <Text
                                  fontSize="xs"
                                  color="gray.400"
                                  textAlign="center"
                                  flex="1"
                                >
                                  Page {currentPage + 1} of {letterPages.length}
                                </Text>

                                {/* RIGHT: Next Button */}
                                <Box
                                  flex="1"
                                  display="flex"
                                  justifyContent="flex-end"
                                >
                                  <Button
                                    size="sm"
                                    colorPalette="pink"
                                    variant="surface"
                                    onClick={handleNextPage}
                                  >
                                    {currentPage === letterPages.length - 1
                                      ? "One last thing..."
                                      : "Next Page ➔"}
                                  </Button>
                                </Box>
                              </HStack>
                            </VStack>
                          )}

                          {/* VIEW 2: The Big Question */}
                          {currentPage === QUESTION_PAGE && (
                            <VStack
                              gap="2"
                              textAlign="center"
                              minH="350px"
                              justify="center"
                            >
                              <Heading
                                fontSize="2xl"
                                color="brand.600"
                                fontFamily="serif"
                              >
                                So, Lyndee. Will you be my valentine?
                              </Heading>
                              <Image
                                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1bmxueGZidWpxZnZ3ZWpueGZidWpxZnZ3ZWpueGZidWpxZnZ3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif"
                                w="80px"
                              />
                              <HStack gap="4" mt="4">
                                <Button
                                  colorPalette="pink"
                                  css={{
                                    transform: `scale(${yesButtonSize})`,
                                  }}
                                  onClick={handleYesClick}
                                >
                                  Yes!
                                </Button>
                                <MotionBox
                                  animate={{
                                    x: noButtonPos.x,
                                    y: noButtonPos.y,
                                  }}
                                >
                                  <Button
                                    variant="ghost"
                                    size="xs"
                                    css={{
                                      transform: `scale(${noButtonSize})`,
                                    }}
                                    onClick={handleNoClick}
                                  >
                                    No
                                  </Button>
                                </MotionBox>
                              </HStack>
                            </VStack>
                          )}

                          {/* VIEW 3: The Acceptance (Yay) */}
                          {currentPage === YAY_PAGE && (
                            <VStack
                              gap="6"
                              minH="350px"
                              justify="center"
                              align="center"
                              textAlign="center"
                              position="relative" // needed for absolute positioning of restart button
                            >
                              <Image
                                src={flower}
                                width="180px"
                                borderRadius="lg"
                              />
                              <Heading
                                color="brand.600"
                                fontSize="4xl"
                                fontFamily="serif"
                              >
                                I LOVE YOU!
                              </Heading>
                              <Text
                                fontSize="lg"
                                color="gray.700"
                                fontFamily="serif"
                                fontStyle="italic"
                              >
                                I'll see you on the 14th, Baby! <br /> <br />
                                (Sorry if i couldn't buy you flowers today. I'll
                                use my perks as an IT student nalang :3)
                              </Text>

                              {/* RESTART BUTTON */}
                              <Box position="absolute" bottom="0" right="0">
                                <Text
                                  as="span"
                                  fontSize="xs"
                                  textDecoration="underline"
                                  cursor="pointer"
                                  color="gray.400"
                                  onClick={handleRestart}
                                  _hover={{ color: "brand.500" }}
                                >
                                  Read Again
                                </Text>
                              </Box>
                            </VStack>
                          )}
                        </LinedPaper>
                      </MotionBox>
                    </AnimatePresence>
                  </Box>
                </DialogContent>
              </DialogRoot>
            </VStack>
          </Section>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
