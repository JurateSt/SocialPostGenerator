import { Request, Response } from "express";
import { Product } from "../types";
import { generateSocialMediaPosts } from "../services/generate.service";

export const generatePosts = async (req: Request, res: Response) => {
  // check for existing OPENAI_API_KEY
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: { code: "OPENAI_NOT_CONFIGURED" },
    });
  }

  // TODO: remember to validate the request body
  const product: Product = req.body.product;

  // check for existing product
  if (!product) {
    return res.status(400).json({
      error: { code: "INVALID_REQUEST" },
    });
  }

  try {
    const posts = await generateSocialMediaPosts(product);
    res.json({ posts });
  } catch (error) {
    return res.status(500).json({
      error: { code: "INTERNAL_SERVER_ERROR" },
    });
  }
};
