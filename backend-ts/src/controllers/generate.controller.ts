import { Request, Response } from "express";
import { Product } from "../types";
import { generateSocialMediaPosts } from "../services/generate.service";

export const generatePosts = async (req: Request, res: Response) => {
  const product: Product = req.body.product;

  const posts = await generateSocialMediaPosts(product);

  res.json({ posts });
};
