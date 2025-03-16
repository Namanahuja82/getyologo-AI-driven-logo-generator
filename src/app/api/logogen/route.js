import { auth } from "@clerk/nextjs/server";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cloudinary from "cloudinary";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Gemini AI
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Function to generate a logo prompt
async function generatePrompt(businessName, keywords) {
  const chatSession = model.startChat({ generationConfig, history: [] });
  const result = await chatSession.sendMessage(
    `You are a prompt engineer. Your task is to generate a high-quality prompt for an AI logo generator.
    The logo should perfectly represent the essence of the business.
    Business Name: ${businessName}
    Keywords: ${keywords}
    
    The logo should be visually appealing, modern, and memorable, aligning with the business niche.
    Use a harmonious color scheme, balanced typography, and unique iconography.
    Your prompt should start with "Generate 1 logo" followed by the detailed description.`
  );
  return result.response.text();
}

// Function to fetch the logo from Hugging Face
async function fetchLogo(prompt) {
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/Keltezaa/midjourney-v6-1-meets-flux-sdxl",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to generate logo: ${response.statusText}`);
  }

  const result = await response.arrayBuffer();
  return Buffer.from(result).toString("base64");
}

// Function to upload logo to Cloudinary
async function uploadToCloudinary(base64String) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      `data:image/png;base64,${base64String}`,
      { folder: "logos" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
  });
}

// **POST API Route**
export async function POST(req) {
  try {
    const authResult = await auth();

    const { userId } = authResult;

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Parse request body
    const body = await req.json();
    const { businessName, keywords } = body;

    if (!businessName || !keywords) {
      return new Response(
        JSON.stringify({ error: "businessName and keywords are required" }),
        { status: 400 }
      );
    }

    // Generate the AI prompt
    const prompt = await generatePrompt(businessName, keywords);

    // Fetch logo from AI model
    const base64String = await fetchLogo(prompt);

    // Upload the logo to Cloudinary
    const imageUrl = await uploadToCloudinary(base64String);

    return new Response(JSON.stringify({ logoUrl: imageUrl }), { status: 200 });
  } catch (error) {
    console.error("Error generating logo:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
