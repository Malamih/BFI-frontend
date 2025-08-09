export const checkUpdates = (
  value: string,
  valueToCheck: string | undefined,
  setCanSave: (val: boolean) => void
) => {
  if (value != valueToCheck) {
    setCanSave(true);
  } else {
    setCanSave(false);
  }
};

export const extractPublicId = (secureUrl: string): string | null => {
  try {
    const url = new URL(secureUrl);
    const pathParts = url.pathname.split("/");

    const uploadIndex = pathParts.findIndex((part) => part === "upload");

    if (uploadIndex === -1) return null;

    const afterUpload = pathParts.slice(uploadIndex + 1);

    // إذا كان أول جزء هو version مثل v123456، نحذفه
    const isVersion = /^v\d+$/.test(afterUpload[0]);
    const publicIdParts = isVersion ? afterUpload.slice(1) : afterUpload;

    // اجمع المسار، وازل الامتداد من آخر جزء
    const lastPart = publicIdParts[publicIdParts.length - 1];
    const lastDotIndex = lastPart.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      publicIdParts[publicIdParts.length - 1] = lastPart.substring(
        0,
        lastDotIndex
      );
    }

    return publicIdParts.join("/");
  } catch {
    return null;
  }
};
