type TFileSizeCheck = {
  files: FileList;
  size: number;
};
export const fileSizeCheck = ({ files, size }: TFileSizeCheck) => {
  if (!files.length) return false;
  if (files[0].size > size) return false;
  return true;
};

type TFileExtCheck = {
  files: FileList;
  extentions: string[];
};
export const fileExtCheck = ({ files, extentions }: TFileExtCheck) => {
  if (!files.length) return false;
  return extentions.includes(files[0].type);
};
