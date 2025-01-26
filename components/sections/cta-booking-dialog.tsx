"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Ime je obvezno"),
  email: z.string().email("Vnesite veljaven email naslov"),
  phone: z.string().min(1, "Telefon je obvezen"),
  date: z.date({ required_error: "Datum je obvezen" }),
  message: z.string().min(1, "Sporočilo je obvezno"),
});

type FormValues = z.infer<typeof formSchema>;

export interface CTABookingDialogProps {
  children: React.ReactNode;
}

export function CTABookingDialog({ children }: CTABookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: new Date(),
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: {
            ...values,
            type: "basic",
            hours: "",
            location: "",
            date: new Date(),
          },
          totalPrice: 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      toast({
        title: "Povpraševanje poslano",
        description: "Kontaktirali vas bomo v najkrajšem možnem času.",
        variant: "default",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Napaka pri pošiljanju",
        description: "Prišlo je do napake. Prosimo, poskusite ponovno.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pošljite povpraševanje</DialogTitle>
          <DialogDescription>
            Izpolnite obrazec in poslali vam bomo ponudbo po vaši meri.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Ime in priimek
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-9 md:h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="h-9 md:h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Telefon
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="h-9 md:h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Datum dogodka</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      value={
                        field.value
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                      className="h-9 md:h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Sporočilo
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[120px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      placeholder="Opišite vaše želje in potrebe (število ur, datum dogodka, lokacija, ...)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              Opomba: Kontaktirali vas bomo v najkrajšem možnem času s ponudbo
              po vaši meri.
            </div>

            <div className="pt-2 flex justify-end">
              <Button type="submit" variant="glow" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Pošiljanje...
                  </>
                ) : (
                  "Pošlji povpraševanje"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
