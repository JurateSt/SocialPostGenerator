import { Request, Response } from "express";
import { generateSocialMediaPosts } from "../services/generate.service";
import { productSchema, Product } from "../validation/product.schema";

export const generatePosts = async (req: Request, res: Response) => {
  // check for existing OPENAI_API_KEY
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: { code: "OPENAI_NOT_CONFIGURED" },
    });
  }

  const parsedData = productSchema.safeParse(req.body?.product);
  if (!parsedData.success) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        details: parsedData.error.issues,
      },
    });
  }

  const product: Product = parsedData.data;

  try {
    const posts = await generateSocialMediaPosts(product);
    res.json({ posts });
  } catch (error: any) {
    const code = error?.code ?? "SOMETHING_WENT_WRONG";
    return res.status(500).json({
      error: { code },
    });
  }
};
