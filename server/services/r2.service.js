import { S3Client, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

class R2Service {
  constructor() {
    this.client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });
    this.bucketName = process.env.R2_BUCKET_NAME;
  }

  /**
   * Extract object key from full R2 URL or return the key as-is
   * @param {string} urlOrKey - Full R2 URL or object key
   * @returns {string} - Object key
   */
  extractObjectKey(urlOrKey) {
    if (urlOrKey.startsWith('http')) {
      // Extract key from full URL
      // Example: https://0304a825db1f41fe8299eb33eaf219fc.r2.cloudflarestorage.com/valorem/video.mp4 -> valorem/video.mp4
      const url = new URL(urlOrKey);
      return url.pathname.substring(1); // Remove leading slash
    }
    return urlOrKey; // Already a key
  }

  // Utility to clean key if full URL is passed
  extractKey(input) {
    return input.replace(/^https?:\/\/[^/]+\//, ""); 
  }

 async generateSignedVideoUrl(keyOrUrl, expiresIn = 300) {
  try {
    console.log("🔑 [generateSignedVideoUrl] Input:", keyOrUrl);

    const key = this.extractKey(keyOrUrl);
    console.log("🎯 [generateSignedVideoUrl] Extracted key:", key);

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    console.log("📦 [generateSignedVideoUrl] Command params:", {
      Bucket: this.bucketName,
      Key: key,
    });

    const signedUrl = await getSignedUrl(this.client, command, { expiresIn });
    console.log("✅ [generateSignedVideoUrl] Signed URL generated:", signedUrl);

    return signedUrl;
  } catch (error) {
    console.error("❌ [generateSignedVideoUrl] Error:", error);
    throw new Error("Failed to generate video access URL");
  }
}

async videoExists(keyOrUrl) {
  try {
    console.log("🔎 [videoExists] Input:", keyOrUrl);

    const key = this.extractKey(keyOrUrl);
    console.log("🎯 [videoExists] Extracted key:", key);
    console.log("🪣 [videoExists] Bucket name from env:", this.bucketName);

    const command = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    console.log("📦 [videoExists] Command params:", {
      Bucket: this.bucketName,
      Key: key,
    });

    await this.client.send(command);
    console.log("✅ [videoExists] Video exists in R2:", key);

    return true;
  } catch (error) {
    if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
      console.warn("⚠️ [videoExists] Video not found:", keyOrUrl);
      return false;
    }
    console.error("❌ [videoExists] Unexpected error:", error);
    throw error;
  }
}

}

export default new R2Service();
