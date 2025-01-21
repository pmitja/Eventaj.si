"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export type FormField = {
  name: string;
  email: string;
  phone: string;
  date: Date;
  location: string;
  hours: string;
  message?: string;
};

const formSchema = z.object({
  name: z.string().min(2, "Ime in priimek sta obvezna"),
  email: z.string().email("Vnesite veljaven email naslov"),
  phone: z.string().min(8, "Vnesite veljavno telefonsko številko"),
  date: z.date({ required_error: "Izberite datum dogodka" }),
  location: z.string().min(1, "Izberite lokacijo"),
  hours: z.string().min(1, "Izberite število ur"),
  message: z.string().optional(),
});

interface PricingFormProps {
  type: "360" | "basic";
  locations: Array<{ text: string; kilometri: number }>;
  hours: Array<{ value: number; price: number }>;
  selectedLocation: { text: string; kilometri: number };
  selectedHours: { value: number; price: number };
  totalPrice: number;
}

export function PricingForm({
  type,
  locations,
  hours,
  selectedLocation,
  selectedHours,
  totalPrice,
}: PricingFormProps) {
  const form = useForm<FormField>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      location: selectedLocation.text,
      hours: selectedHours.value.toString(),
    },
  });

  const onSubmit = async (values: FormField) => {
    const emailData = {
      to: "eventaj.si@gmail.com",
      subject: `Nova rezervacija - ${
        type === "360" ? "360° Photo Booth" : "Photo Booth"
      }`,
      text: `
        Ime: ${values.name}
        Email: ${values.email}
        Telefon: ${values.phone}
        Datum: ${format(values.date, "dd.MM.yyyy")}
        Lokacija: ${values.location}
        Število ur: ${values.hours}
        Skupna cena: ${totalPrice.toFixed(0)}€
        Sporočilo: ${values.message || ""}
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
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Prišlo je do napake. Prosimo, poskusite ponovno.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ime in priimek</FormLabel>
              <FormControl>
                <Input {...field} className="h-9 md:h-10" />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" className="h-9 md:h-10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <FormControl>
                <Input {...field} type="tel" className="h-9 md:h-10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Datum dogodka</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "h-9 md:h-10 w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd.MM.yyyy")
                      ) : (
                        <span>Izberite datum</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lokacija</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-9 md:h-10">
                    <SelectValue placeholder="Izberite lokacijo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.text} value={location.text}>
                      {location.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Število ur</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-9 md:h-10">
                    <SelectValue placeholder="Izberite število ur" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {hours.map((hour) => (
                    <SelectItem key={hour.value} value={hour.value.toString()}>
                      {hour.value} {hour.value === 1 ? "ura" : "ure"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sporočilo (opcijsko)</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[80px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-2 md:pt-4 text-right">
          <Button type="submit" variant="glow">
            Pošlji povpraševanje
          </Button>
        </div>
      </form>
    </Form>
  );
}
