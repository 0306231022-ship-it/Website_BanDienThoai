import { body } from "express-validator";
export const validateImages = [
  body("images")
    .custom((value, { req }) => {
      if (!req.files || req.files.length === 0) {
        throw new Error("Vui lòng tải lên ít nhất 1 ảnh");
      }
      if (req.files.length > 5) {
        throw new Error("Không được upload quá 5 ảnh");
      }

      const allowedTypes = ["image/jpeg", "image/png"];
      for (let file of req.files) {
        if (!allowedTypes.includes(file.mimetype)) {
          throw new Error("Chỉ chấp nhận ảnh JPG hoặc PNG");
        }
        if (file.size > 2 * 1024 * 1024) {
          throw new Error("Dung lượng ảnh không vượt quá 2MB");
        }
      }
      return true;
    }),
];