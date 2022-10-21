const FileValidation = (files, setMessage, e) => {
  if (
    files[0].type !== "image/jpeg" &&
    files[0].type !== "image/png" &&
    files[0].type !== "image/jpg"
  ) {
    setMessage("Please choose a valid image file (jpg, jpeg or png)");
    e.target.value = "";
    return;
  }
  if (files[0].size > 2000000) {
    setMessage("Maximum image size is 2MB");
    e.target.value = "";
    return;
  }
};

export default FileValidation;
