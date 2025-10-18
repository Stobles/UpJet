import z from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Имя обязательно")
    .max(100, "Имя слишком длинное (макс 100 символа)"),

  email: z.email("Неверный формат email"),
  phone: z
    .string()
    .trim()
    .regex(/^\+7\d{10}$/, {
      message: "Телефон должен быть в формате +7XXXXXXXXXX (11 цифр)",
    }),

  role: z.enum(["Admin", "User", "Manager"], {
    error: "Значение должно быть одним из списка: Admin, User, Manager",
  }),
});

export type TUserSchema = z.infer<typeof userSchema>;
