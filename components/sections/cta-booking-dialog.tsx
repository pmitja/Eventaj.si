"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
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
  message: z.string().min(1, "Sporočilo je obvezno"),
});

type FormValues = z.infer<typeof formSchema>;

export interface CTABookingDialogProps {
  children: React.ReactNode;
}

export function CTABookingDialog({ children }: CTABookingDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const emailData = {
      to: "info@360booth.si",
      subject: "Novo povpraševanje",
      text: `
        Ime: ${values.name}
        Email: ${values.email}
        Telefon: ${values.phone}
        Sporočilo: ${values.message}
      `,
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      alert("Povpraševanje uspešno poslano!");
      setOpen(false);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Prišlo je do napake. Prosimo, poskusite ponovno.");
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
              <Button type="submit" variant="glow">
                Pošlji povpraševanje
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
