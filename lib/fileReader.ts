import { toast } from "sonner";

export const readImageAsBase64 = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      reject();
      return resolve(null);
    }

    // Check size (10MB = 10 * 1024 * 1024)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image must be smaller than 10MB.");
      reject();
      return resolve(null);
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => {
      toast.error("Failed to read image.");
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
};
