import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const generateUploadUrl = async (key: string, contentType: string) => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
    return signedUrl;
};

export const deleteFileFromS3 = async (key: string) => {
    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
    });

    await s3.send(command);
};
