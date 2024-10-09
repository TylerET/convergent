import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  Input,
  Box,
  Text,
  VStack,
  Avatar,
} from "@chakra-ui/react";

interface UploadAvatarDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UploadAvatarDrawer: React.FC<UploadAvatarDrawerProps> = ({
  open,
  setOpen,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      resizeImage(file);
    }
  };

  const resizeImage = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxWidth = 120;
        const maxHeight = 120;

        canvas.width = maxWidth;
        canvas.height = maxHeight;

        ctx?.drawImage(img, 0, 0, maxWidth, maxHeight);

        const dataUrl = canvas.toDataURL("image/png");
        setResizedImage(dataUrl);
        localStorage.setItem("avatar", dataUrl);
      };
    };
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      resizeImage(file);
    }
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
      setCurrentImage(savedAvatar);
    }
  }, []);

  const getAvatar = () => {
    if (resizedImage) return <Avatar size="2xl" src={resizedImage} />;
    else if (currentImage) return <Avatar size="2xl" src={currentImage} />;
    else return <Avatar size="2xl" />;
  };

  return (
    <Drawer isOpen={open} placement="right" onClose={handleClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader textAlign="center">Upload An Avatar</DrawerHeader>
        <DrawerBody>
          <VStack spacing={4} align="center">
            {getAvatar()}
            <Button
              colorScheme="teal"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Choose from File
            </Button>
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />

            <Box
              border="2px dashed teal"
              borderRadius="md"
              padding="20px"
              textAlign="center"
              cursor="pointer"
              width="100%"
              minHeight={"250px"}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isDragActive ? (
                <Text>Drop the file here...</Text>
              ) : (
                <Text>Drag & Drop your avatar here, or click to select</Text>
              )}
            </Box>

            {selectedFile && (
              <Text noOfLines={2}>Selected file: {selectedFile.name}</Text>
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default UploadAvatarDrawer;
