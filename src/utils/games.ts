import {BadRequestException} from "@nestjs/common";

type RatingType = {
  id: string;
  userId: string;
  gameId: string;
  value: number
}

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

export const calculateRating = (ratings: RatingType[]) => {
  if(ratings.length === 0) return 0;

  const ratingSum = ratings.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );
  const resValue = ratingSum / ratings.length;
  const isInt = resValue.toString().length === 1;
  return isInt ? resValue : resValue.toFixed(1);
}