import { body } from "express-validator";

export const validateImages = [
  body().custom((_, { req }) => {
    if (!req.files || req.files.length === 0) {
      throw new Error("Vui lòng tải lên ít nhất 1 ảnh");
    }

    if (req.files.length > 5) {
      throw new Error("Không được upload quá 5 ảnh");
    }

    const allowedTypes = ["image/jpeg", "image/png"];

    for (const file of req.files) {
      if (!allowedTypes.includes(file.mimetype)) {
        throw new Error("Chỉ chấp nhận ảnh JPG hoặc PNG");
      }
    }

    return true;
  }),
];
