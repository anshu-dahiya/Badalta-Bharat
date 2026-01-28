// // src/lib/multer.ts

// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Create upload folder if not exist
// const uploadDir = path.join(process.cwd(), "public/uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Multer storage config
// const storage = multer.diskStorage({
//   destination: function (req: any, file: any, cb: any) {
//     cb(null, uploadDir);
//   },
//   filename: function (req: any, file: any, cb: any) {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   },
// });

// // File filter (only images)
// const fileFilter = (req: any, file: any, cb: any) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images allowed"), false);
//   }
// };

// export const upload = multer({ storage, fileFilter });


import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

export const uploadFiles = async (file: File[], fileType: string = 'other'): Promise<string[]> => {
    let filePaths: string[] = [];
    for (const fileItem of file) {
        let folderPath = `public/uploads/${fileType}`;
        const destinationDirPath = path.join(process.cwd(), folderPath);

        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);

        const fileName = path.parse(fileItem.name).name;
        const fileExt = path.parse(fileItem.name).ext;

        const newName = `${fileType}_${fileName}_${uniqueSuffix}${fileExt}`;
        const fileArrayBuffer = await fileItem.arrayBuffer();
        if (!existsSync(destinationDirPath)) {
            fs.mkdir(destinationDirPath, { recursive: true });
        }
        await fs.writeFile(
            path.join(destinationDirPath, newName),
            Buffer.from(fileArrayBuffer),
        );
        folderPath = `uploads/${fileType}`;
        filePaths.push(`/${folderPath}/${newName}`);
    }

    return filePaths;
}