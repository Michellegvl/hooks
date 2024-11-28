"use client";

import React, { useState } from "react";
import {
  useDisclosure,
  useBreakpointValue,
  useClipboard,
  useMediaQuery,
  useTheme,
  useToken,
  useColorMode,
  useColorModeValue,
  Button,
  Text,
  Box,
  useToast,
  Input,
} from "@chakra-ui/react";

const HooksExample = () => {
  // Control de apertura/cierre (useDisclosure)
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Tamaño responsivo (useBreakpointValue)
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  // Copiar texto al portapapeles (useClipboard)
  const { onCopy, hasCopied } = useClipboard("HOLI");
  
  // Mostrar un toast cuando se copie el texto
  const toast = useToast();
  
  // Valor para mostrar en el cuadro de texto (Input)
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = () => {
    onCopy();
    toast({
      title: "HOLI",
      description: "El texto se ha copiado al portapapeles.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCopiedText(text);
      toast({
        title: "Texto pegado",
        description: "El texto se ha pegado desde el portapapeles.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo leer el portapapeles.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Media query personalizada (useMediaQuery)
  const [isLargeScreen] = useMediaQuery("(min-width: 768px)");

  // Tema actual (useTheme)
  const theme = useTheme();
  const currentColor = theme.colors.green[500]; // Ejemplo de uso de color desde el tema

  // Uso de tokens de color (useToken)
  const [primaryColor] = useToken("colors", ["green.500"]);

  // Cambio entre modo claro/oscuro (useColorMode)
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("black", "white");
  const bgColor = useColorModeValue("gray.100", "gray.800");

  return (
    <Box p={4}>
      {/* Muestra un botón que cambia según el tamaño de la pantalla */}
      <Button size={buttonSize} onClick={onOpen}>
        {isLargeScreen ? "Pantalla Grande" : "Pantalla Pequeña"}
      </Button>

      {/* Modal de ejemplo usando useDisclosure */}
      {isOpen && (
        <Box
          p={5}
          bg="teal.500"
          color="white"
          mt={4}
          borderRadius="md"
          boxShadow="md"
        >
          <Text>Este es un modal que puedes abrir o cerrar.</Text>
          <Button onClick={onClose}>Cerrar</Button>
        </Box>
      )}

      {/* Copiar al portapapeles useClipboard*/}
      <Button
        mt={4}
        colorScheme="teal"
        onClick={handleCopy}
        isDisabled={hasCopied}
      >
        {hasCopied ? "Texto Copiado!" : "Copiar Texto"}
      </Button>

      {/* Cuadro de texto para pegar el contenido copiado */}
      <Box mt={4}>
        <Text mb={2}>Texto copiado al portapapeles:</Text>
        <Input
          value={copiedText}
          readOnly
          placeholder="Introduzca el texto copiado"
        />
      </Box>

      {/* Botón para pegar el texto desde el portapapeles */}
      <Button mt={4} colorScheme="teal" onClick={handlePaste}>
        Pegar Texto
      </Button>

      {/* Muestra el tema actual (useTheme)*/}
      <Box mt={4}>
        <Text fontSize="xl" color={textColor}>
          El color de tema actual es {currentColor}
        </Text>
      </Box>

      {/* Uso de token de color (useTheme) */}
      <Box mt={4} p={4} bg={primaryColor} color="white">
        <Text>Este fondo usa un color del tema: {primaryColor}</Text>
      </Box>

      {/* Cambio entre modo claro/oscuro */}
      <Box mt={4} p={4} bg={bgColor} color={textColor}>
        <Text>
          El modo actual es: {colorMode === "light" ? "Modo Claro" : "Modo Oscuro"}
        </Text>
        <Button mt={2} onClick={toggleColorMode}>
          Cambiar a {colorMode === "light" ? "Oscuro" : "Claro"}
        </Button>
      </Box>
    </Box>
  );
};

export default HooksExample;
