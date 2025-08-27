// Direct R2 service test
import R2Service from './server/services/r2.service.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './server/.env' });

const testR2Service = async () => {
  try {
    console.log('🧪 Testing R2 Service directly...');
    
    const videoUrl = "https://0304a825db1f41fe8299eb33eaf219fc.r2.cloudflarestorage.com/valorem/D2672606-A7C2-48ab-8C25-6C38AAD84932_video.mp4";
    
    console.log('🔍 Testing video URL:', videoUrl);
    
    // Test key extraction
    const extractedKey = R2Service.extractKey(videoUrl);
    console.log('🎯 Extracted key:', extractedKey);
    
    // Test if video exists
    console.log('🔎 Checking if video exists...');
    const exists = await R2Service.videoExists(videoUrl);
    console.log('✅ Video exists:', exists);
    
    if (exists) {
      console.log('🔑 Generating signed URL...');
      const signedUrl = await R2Service.generateSignedVideoUrl(videoUrl, 300);
      console.log('✅ Signed URL:', signedUrl);
    }
    
  } catch (error) {
    console.error('❌ R2 Test error:', error);
  }
};

testR2Service();