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
  DialogHeader,
  DialogBody,
  DialogBackdrop,
  DialogCloseTrigger,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import pic1 from "./assets/pic1.jpg";
import pic2 from "./assets/pic2.jpg";
import pic3 from "./assets/pic3.jpg";
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

const HeartBackground = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 5 + 4,
        delay: Math.random() * 5,
        size: Math.random() * i * 0.5 + 10,
      })),
    [],
  );

  return (
    <Box
      position="fixed"
      inset="0"
      pointerEvents="none"
      zIndex={0}
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
    <Container maxW={maxW} zIndex={1}>
      {children}
    </Container>
  </Box>
);

function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noTextIndex, setNoTextIndex] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [showQuestion, setShowQuestion] = useState(false);

  // 3. Audio Logic Starts Here ==============================
  const [isPlaying, setIsPlaying] = useState(false);

  // Create the audio object once
  const audio = useMemo(() => {
    const a = new Audio(daylightMusic);
    a.loop = true; // Keeps the music playing on loop
    return a;
  }, []);

  // Handle Play/Pause
  useEffect(() => {
    if (isPlaying) {
      audio.play().catch((error) => {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false); // Reset state if browser blocks it
      });
    } else {
      audio.pause();
    }

    // Cleanup on unmount
    return () => {
      audio.pause();
    };
  }, [isPlaying, audio]);
  // =========================================================

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
      <Box bg="brand.50" minH="100vh" overflowX="hidden">
        <HeartBackground />

        {/* 4. Music Toggle Button (Fixed to screen) */}
        <Box position="fixed" bottom="4" right="4" zIndex="1000">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            colorPalette="pink"
            variant="solid"
            size="sm"
            borderRadius="full"
            boxShadow="md"
          >
            {isPlaying ? "Pause 🎵" : "Play Music ▶️"}
          </Button>
        </Box>

        {/* Section 1: Hero */}
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
              letterSpacing="normal"
            >
              Happy Valentine's Day!
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Scroll down to see why I love you...
            </Text>
          </VStack>
        </Section>

        {/* Section 2: Why I Love You */}
        <Section bg="whiteAlpha.400">
          <VStack gap="10" w="100%">
            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              color="brand.500"
              lineHeight="1.2"
              textAlign="center"
            >
              I love you for many things...
            </Heading>
            <VStack gap="6" w="full">
              {["Your Smile", "Your Kindness", "Your Laugh"].map((title, i) => (
                <Box
                  key={i}
                  w="full"
                  p="6"
                  bg="white"
                  borderRadius="xl"
                  borderLeft="6px solid"
                  borderColor="brand.200"
                  boxShadow="sm"
                >
                  <HStack gap="6">
                    <Text fontSize="4xl">
                      {i === 0 ? "✨" : i === 1 ? "🌸" : "🎧"}
                    </Text>
                    <VStack align="start" gap="0">
                      <Heading
                        fontSize="xl"
                        color="brand.600"
                        letterSpacing="normal"
                      >
                        {title}
                      </Heading>
                      <Text color="gray.600" fontSize="lg">
                        {i === 0
                          ? "It literally brightens up my entire day."
                          : i === 1
                            ? "The way you care for everyone around you."
                            : "My favorite sound in the whole world."}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </VStack>
        </Section>

        {/* Section 3: Memories */}
        <Section maxW="7xl">
          <VStack gap="12" w="full" align="stretch">
            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              color="brand.500"
              textAlign="center"
              lineHeight="1.2"
            >
              Our Memories
            </Heading>
            <SimpleGrid w="full" gap="10" columns={{ base: 1, sm: 2, lg: 3 }}>
              {[pic1, pic2, pic3].map((p, i) => (
                <VStack
                  key={i}
                  w="full"
                  bg="white"
                  p="4"
                  borderRadius="2xl"
                  boxShadow="md"
                  gap="4"
                >
                  <Image
                    src={p}
                    alt={`Memory ${i}`}
                    borderRadius="xl"
                    objectFit="cover"
                    w="full"
                    h="500px"
                  />
                  <Text color="gray.600" fontSize="sm" textAlign="center">
                    {i === 0
                      ? "Remember this day? You looked so happy."
                      : i === 1
                        ? "I love the way you look at the camera."
                        : "Every second with you is a gift."}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Section>

        {/* Section 4: Romantic Quote */}
        <Section bg="whiteAlpha.400">
          <VStack textAlign="center" gap="8">
            <Heading fontSize="4xl" color="brand.600" letterSpacing="normal">
              The Same Air
            </Heading>
            <VStack
              fontSize={{ base: "xl", md: "3xl" }}
              color="gray.700"
              lineHeight="1.6"
              fontStyle="italic"
              gap="2"
            >
              <Text>Same streets, same halls, a dozen years,</Text>
              <Text>I held my breath and hid my fears.</Text>
              <Text>A silent ghost within your view,</Text>
              <Text>Just inches from the heart of you.</Text>
              <Box h="4" />
              <Text>I waited for the stars to align,</Text>
              <Text>But you were the one to draw the line.</Text>
              <Text>The string was pulled, the silence broke,</Text>
              <Text>You said the words I never spoke.</Text>
            </VStack>
          </VStack>
        </Section>

        {/* Section 5: The Letter */}
        <Section bg="brand.100">
          <VStack gap="8" textAlign="center">
            <MotionBox
              animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Text fontSize="9xl">💌</Text>
            </MotionBox>
            <Heading
              color="brand.600"
              fontSize={{ base: "3xl", md: "5xl" }}
              letterSpacing="normal"
            >
              One Last Thing...
            </Heading>
            <DialogRoot placement="center" motionPreset="slide-in-bottom">
              <DialogTrigger asChild>
                <Button
                  colorPalette="pink"
                  size="xl"
                  borderRadius="full"
                  px="16"
                  fontSize="xl"
                >
                  Open My Letter
                </Button>
              </DialogTrigger>
              <DialogBackdrop
                bg="rgba(0, 0, 0, 0.6)"
                backdropFilter="blur(4px)"
                position="fixed"
                zIndex="1400"
              />
              <DialogContent
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex="1500"
                bg="white"
                p={{ base: "6", md: "10" }}
                borderRadius="3xl"
                width="450px"
                maxWidth="90vw"
                minH="500px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <DialogCloseTrigger />
                <AnimatePresence mode="wait">
                  {!isAccepted ? (
                    !showQuestion ? (
                      <MotionBox
                        key="message"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <VStack gap="6">
                          <DialogHeader p="0">
                            <Heading
                              color="brand.600"
                              fontSize="3xl"
                              letterSpacing="normal"
                            >
                              To My Dearest,
                            </Heading>
                          </DialogHeader>
                          <DialogBody p="0" textAlign="center">
                            <Text
                              fontSize="lg"
                              color="gray.700"
                              lineHeight="1.6"
                            >
                              I wanted to take a moment to tell you how much you
                              mean to me. Every day with you feels like a
                              beautiful dream. You are my best friend and my
                              entire world. And just like the music, you are my
                              tadhana :)
                            </Text>
                            <Button
                              mt="8"
                              colorPalette="pink"
                              variant="surface"
                              onClick={() => setShowQuestion(true)}
                            >
                              Click to continue...
                            </Button>
                          </DialogBody>
                        </VStack>
                      </MotionBox>
                    ) : (
                      <MotionBox
                        key="q"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <VStack gap="6">
                          <DialogHeader p="0">
                            <Heading
                              color="brand.600"
                              fontSize="4xl"
                              textAlign="center"
                              letterSpacing="normal"
                            >
                              My Valentine?
                            </Heading>
                          </DialogHeader>
                          <DialogBody p="0" textAlign="center">
                            <Image
                              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1bmxueGZidWpxZnZ3ZWpueGZidWpxZnZ3ZWpueGZidWpxZnZ3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif"
                              width="150px"
                              mx="auto"
                              mb="6"
                            />
                            <Text fontSize="xl" color="gray.700">
                              Will you be my Valentine? 🌹
                            </Text>
                            <HStack
                              gap="6"
                              justifyContent="center"
                              minH="120px"
                              mt="6"
                              position="relative"
                            >
                              <Button
                                colorPalette="pink"
                                size="xl"
                                px="10"
                                css={{ transform: `scale(${yesButtonSize})` }}
                                onClick={() => setIsAccepted(true)}
                                zIndex={10}
                              >
                                Yes!
                              </Button>
                              <MotionBox
                                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  color="gray.400"
                                  css={{ transform: `scale(${noButtonSize})` }}
                                  onClick={handleNoClick}
                                >
                                  No
                                </Button>
                              </MotionBox>
                            </HStack>
                          </DialogBody>
                        </VStack>
                      </MotionBox>
                    )
                  ) : (
                    <MotionBox
                      key="accepted"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <VStack gap="6" py="8" textAlign="center">
                        <Image
                          src="https://images.wondershare.com/filmora/article-images/ai-cat-dacing.gif"
                          width="200px"
                          borderRadius="lg"
                          mx="auto"
                        />
                        <Heading
                          color="brand.600"
                          fontSize="5xl"
                          letterSpacing="normal"
                        >
                          Yay!!! ❤️
                        </Heading>
                        <Text fontSize="xl" color="gray.600">
                          I'll see you on the 14th! 😘
                        </Text>
                      </VStack>
                    </MotionBox>
                  )}
                </AnimatePresence>
              </DialogContent>
            </DialogRoot>
          </VStack>
        </Section>
      </Box>
    </ChakraProvider>
  );
}

export default App;
