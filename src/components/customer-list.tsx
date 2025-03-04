"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCustomers from "@/services/customers";
import { ExternalLink, Loader2, Search, Users } from "lucide-react";
import { useState } from "react";

export default function CustomerList() {
  const [view, setView] = useState<"grid" | "list">("grid");

  const { data, isLoading, isError } = useCustomers();

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("fa-IR");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card className="w-full border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              کاربران فعال سایت
            </CardTitle>
            <CardDescription className="mt-2">
              آشنایی با کاربران فعال در سامانه
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Tabs
              defaultValue="grid"
              className="w-[200px]"
              onValueChange={(value) => setView(value as "grid" | "list")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">شبکه‌ای</TabsTrigger>
                <TabsTrigger value="list">لیستی</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="جستجوی کاربر..."
            className="pl-8 w-full bg-white/70"
          />
        </div>
      </CardHeader>
      <CardContent>
        {isError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.
            </AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : data?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>هیچ کاربری با این مشخصات یافت نشد</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.map((user) => (
              <Card
                key={user.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-12 w-12`}>
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-medium leading-none">{user.name}</h3>
                      <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-xs text-muted-foreground">
                    <p>عضو از: {formatDate(user.created_at)}</p>
                  </div>
                </CardContent>
                <div className="bg-muted/30 px-4 py-2 text-xs flex justify-between items-center">
                  <Badge variant="outline" className="bg-white">
                    #{user.id}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span className="sr-only">مشاهده پروفایل</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-md border bg-white">
            <div className="divide-y">
              {data?.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-10 w-10 ${user.name}`}>
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground hidden md:block">
                      عضو از: {formatDate(user.created_at)}
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">مشاهده پروفایل</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
