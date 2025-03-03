import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">ورود</CardTitle>
          <CardDescription>
            جهت ورود به حساب شماره تلفن و رمز عبور خود را وارد کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="phone">شماره تلفن</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="09xxxxxxxxx"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">رمز عبور</Label>
                  <a
                    href="#"
                    className="ms-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    رمز عبور خود را فراموش کرده اید؟
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                ورود
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
