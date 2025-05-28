declare module "drizzle-orm/pg-core";
declare module "drizzle-zod";
declare module "zod" {
  namespace z {
    // z.infer 타입 추론 우회
    type infer<T extends z.ZodType<any, any, any>> = T extends z.ZodType<infer Output, any, any> ? Output : never;
  }
} 