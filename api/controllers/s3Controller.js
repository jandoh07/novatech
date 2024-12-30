import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const generatePresignedUrl = async (req, res) => {
  // const { fileName, fileType } = req.body;

  // if (!fileName || !fileType) {
  //   return res.status(400).json({ error: "Missing required parameters" });
  // }

  const { files } = req.body;

  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  let url = [];

  for (let i = 0; i < files.length; i++) {
    const { fileName, fileType } = files[i];
    const key = `${fileName + Date.now()}.${
      fileType.includes("/") ? fileType.split("/")[1] : fileType
    }`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });
    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

    url.push({ signedUrl });
  }

  res.status(200).json({ url });
};
