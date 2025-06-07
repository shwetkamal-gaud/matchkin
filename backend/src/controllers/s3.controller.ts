import { Request, Response } from "express";
import { deleteFileFromS3, generateUploadUrl } from "../utils/s3";

export const getSignedUrl = async (req: Request, res: Response) => {
    try {
        const { fileName, fileType } = req.body;
        const key = `profile-pictures/${Date.now()}_${fileName}`;
        const url = await generateUploadUrl(key, fileType);
        const finalUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        res.json({ signedUrl: url, fileUrl: finalUrl, key });
    } catch (error) {
        console.error("Message error:", error);
        res.status(500).json({ error: 'Interval server error' })
    }
}

export const deleteFile = async (req:Request, res:Response) => {
    const { key } = req.body;
    try {
        await deleteFileFromS3(key);
        res.json({ success: true });
    } catch (err) {
        console.error("Message error:", err);
        res.status(500).json({ error: "Failed to delete file." });
    }
}