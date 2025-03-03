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
import InputFloatingLabel from "./input-floating-label"

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
                <InputFloatingLabel id="phone" label="شماره تلفن" type="tel"/>
                <InputFloatingLabel id="password" label="رمز عبور" type="password"/>
              
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
