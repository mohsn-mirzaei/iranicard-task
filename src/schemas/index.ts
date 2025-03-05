import {
  phoneNumberNormalizer,
  phoneNumberValidator,
} from "@persian-tools/persian-tools";
import * as z from "zod";

const loginFormSchema = z.object({
  mobile: z
    .string()
    .transform((value) => {
      try {
        return phoneNumberNormalizer(value, "0");
      } catch (error) {
        return value;
      }
    })
    .refine((value) => phoneNumberValidator(value), {
      message: "شماره موبایل نامعتبر است",
    }),
  password: z.string().min(6, {
    message: "رمز عبور باید حداقل 6 کاراکتر باشد.",
  }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export { loginFormSchema };
export type { LoginFormSchema };
