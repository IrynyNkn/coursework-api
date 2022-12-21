import {BadRequestException} from "@nestjs/common";

export const editFileName = (req, file, callback) => {
  const fileNameArray = file.originalname.split('.');
  const name = fileNameArray[0];
  const fileExtName = `.${fileNameArray[fileNameArray.length - 1]}`;
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};