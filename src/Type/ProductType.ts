//////////////////////////////-----PRODUCT TYPE-----//////////////////////////////

import z from "zod";
import { Color } from "@/Type/ColorType";
import { Size } from "@/Type/SizeTypes";
import { Category } from "@/Type/CategoryTypes";

const ProductVariantSchema = z.object({
  product_id: z.string(),
  _id: z.string(),
  sku: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().default(0),
  sold: z.number().default(0),
  variant_values: z.record(z.string(), z.string()),
});
const CategorySchema = z.object({
  name: z.string().min(1),
  store_id: z.string(),
  attributes: z
    .array(
      z.object({
        name: z.string().min(1),
        values: z.array(z.string()).default([]),
      })
    )
    .default([]),
});

export const Product = z.object({
  _id: z.string(),
  name: z.string().min(1),
  search_keywords: z.array(z.string()).default([]),
  description: z.string(),
  store_id: z.string(),
  category_id: z.string(),
  category: Category,
  is_featured: z.boolean().default(false),
  is_archived: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  sales: z.number().default(0),
  variants: z
    .array(
      z.object({
        name: z.string().min(1),
        values: z.array(z.string().min(1)),
      })
    )
    .default([]),
  product_variants: z.array(ProductVariantSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

//  PRODUCT BODY TYPE -- chỗ này khác với client
export const ProductBody = z.object({
  productId: z.string(),
  categoryId: z.string(),
});
export type ProductBodyType = z.TypeOf<typeof ProductBody>;

//  PRODUCT RES TYPE
export const ProductRes = z.object({
  data: z.object({
    product: Product,
    listCategory: z.array(Category),
    productsRelative: z.array(Product),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ProductResType = z.TypeOf<typeof ProductRes>;

// PRODUCT TYPE

export type ProductType = z.TypeOf<typeof Product>;

// LIST PRODUCT BODY TYPE -- khác với client
export const ListProductBody = z.object({
  category_id: z.string().optional(),
  page: z.number(),
  variants: z.array(z.any()),
  limit: z.number(),
  sortBy: z.string().optional(),
  value: z.string().optional(),
});
export type ListProductBodyType = z.TypeOf<typeof ListProductBody>;
// LIST PRODUCT BY ID BODY TYPE
export const ListProductByIdBody = z.object({
  listIdProduct: z.array(z.string()),
});
export type ListProductByIdBodyType = z.TypeOf<typeof ListProductByIdBody>;

// LIST PRODUCT RES TYPE
export const ListProductRes = z.object({
  data: z.object({
    listProduct: z.array(Product),
    totalProduct: z.number(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ListProductResType = z.TypeOf<typeof ListProductRes>;

//  CREATE PRODUCT BODY TYPE
export const CreateProductBody = z.object({
  images: z.array(z.string()),
  name: z.string(),
  store_id: z.string(),
  sales: z.number(),
  arrayPrice: z.array(
    z.object({
      size: z.string(),
      price: z.number(),
      amount: z.number(),
      amount_sold: z.number(),
      colors: z.array(z.string()),
    })
  ),
  categoryId: z.string(),
  isFeature: z.boolean(),
  isArchive: z.boolean(),
});
export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>;

//  CREATE PRODUCT RES TYPE
export const CreateProductRes = z.object({
  data: Product,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type CreateProductResType = z.TypeOf<typeof CreateProductRes>;

/// UPDATE PRODUCT BODY TYPE
export const UpdateProductBody = z.object({
  _id: z.string(),
  images: z.array(z.string()),
  name: z.string(),
  store_id: z.string(),
  arrayPrice: z.array(
    z.object({
      size: z.string(),
      price: z.number(),
      colors: z.array(z.string()),
      amount: z.number(),
    })
  ),
  categoryId: z.string(),
  isFeature: z.boolean(),
  isArchive: z.boolean(),
});
export type UpdateProductBodyType = z.TypeOf<typeof UpdateProductBody>;

/// UPDATE PRODUCT RES TYPE
export const UpdateProductRes = z.object({
  data: Product,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type UpdateProductResType = z.TypeOf<typeof UpdateProductRes>;

/// DELETE PRODUCT BODY TYPE
export const DeleteProductBody = z.object({
  _id: z.string(),
  store_id: z.string(),
});
export type DeleteProductBodyType = z.TypeOf<typeof DeleteProductBody>;

/// DELETE PRODUCT RES TYPE
export const DeleteProductRes = z.object({
  data: Product,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type DeleteProductResType = z.TypeOf<typeof DeleteProductRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
