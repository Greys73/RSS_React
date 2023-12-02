export default function imageToBase64(imageFile: File) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(imageFile);
  });
}
