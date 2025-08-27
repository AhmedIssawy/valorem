import { S3Client, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

class R2Service {
  constructor() {
    this.client = null;
    this.bucketName = null;
    this.initialized = false;
  }

  // Initialize the service with environment variables
  init() {
    if (this.initialized) return;

    // Ensure environment variables are available
    if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !process.env.R2_BUCKET_NAME) {
      console.error("❌ Missing R2 environment variables:", {
        R2_ACCOUNT_ID: !!process.env.R2_ACCOUNT_ID,
        R2_ACCESS_KEY_ID: !!process.env.R2_ACCESS_KEY_ID,
        R2_SECRET_ACCESS_KEY: !!process.env.R2_SECRET_ACCESS_KEY,
        R2_BUCKET_NAME: !!process.env.R2_BUCKET_NAME
      });
      throw new Error("Missing required R2 environment variables");
    }
    
    this.client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });
    this.bucketName = process.env.R2_BUCKET_NAME;
    this.initialized = true;
    
    console.log("🔧 R2Service initialized with bucket:", this.bucketName);
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
    if (input.startsWith('http')) {
      // For URLs like: https://0304a825db1f41fe8299eb33eaf219fc.r2.cloudflarestorage.com/valorem/D2672606-A7C2-48ab-8C25-6C38AAD84932_video.mp4
      // We need to extract: D2672606-A7C2-48ab-8C25-6C38AAD84932_video.mp4 (without the bucket name)
      const url = new URL(input);
      const pathParts = url.pathname.substring(1).split('/'); // Remove leading slash and split
      if (pathParts.length > 1 && pathParts[0] === this.bucketName) {
        // Remove bucket name from path: valorem/filename.mp4 -> filename.mp4
        return pathParts.slice(1).join('/');
      }
      return url.pathname.substring(1); // Return full path without leading slash
    }
    return input; // Already a key
  }

 async generateSignedVideoUrl(keyOrUrl, expiresIn = 300) {
  try {
    this.init(); // Ensure service is initialized
    
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
    this.init(); // Ensure service is initialized
    
    console.log("🔎 [videoExists] Input:", keyOrUrl);
    console.log("🔧 [videoExists] R2 Config:", {
      accountId: process.env.R2_ACCOUNT_ID,
      bucketName: this.bucketName,
      hasAccessKey: !!process.env.R2_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.R2_SECRET_ACCESS_KEY
    });

    const key = this.extractKey(keyOrUrl);
    console.log("🎯 [videoExists] Extracted key:", key);

    const command = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    console.log("📦 [videoExists] Command params:", {
      Bucket: this.bucketName,
      Key: key,
    });

    const result = await this.client.send(command);
    console.log("✅ [videoExists] Video exists in R2:", key);
    console.log("📊 [videoExists] Object metadata:", {
      contentLength: result.ContentLength,
      contentType: result.ContentType,
      lastModified: result.LastModified
    });

    return true;
  } catch (error) {
    console.error("❌ [videoExists] Full error details:", {
      name: error.name,
      message: error.message,
      code: error.Code,
      statusCode: error.$metadata?.httpStatusCode,
      requestId: error.$metadata?.requestId
    });
    
    if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
      console.warn("⚠️ [videoExists] Video not found in bucket:", {
        bucket: this.bucketName,
        key: key,
        originalInput: keyOrUrl
      });
      return false;
    }
    
    if (error.name === "AccessDenied" || error.$metadata?.httpStatusCode === 403) {
      console.error("🚫 [videoExists] Access denied - check R2 credentials and permissions");
      throw new Error("Access denied to R2 storage. Check credentials and permissions.");
    }
    
    console.error("❌ [videoExists] Unexpected error:", error);
    throw error;
  }
}

}

export default new R2Service();
