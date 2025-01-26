"use client";

import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const locations = [
  { text: "Maribor in okolica", kilometri: 0 },
  { text: "Celje in okolica", kilometri: 30 },
  { text: "Ljubljana in okolica", kilometri: 110 },
  { text: "Kranj in okolica", kilometri: 135 },
  { text: "Novo mesto in okolica", kilometri: 170 },
  { text: "Koper in okolica", kilometri: 210 },
  { text: "Murska Sobota in okolica", kilometri: 40 },
  { text: "Ptuj in okolica", kilometri: 10 },
  { text: "Bled in okolica", kilometri: 110 },
  { text: "Postojna in okolica", kilometri: 30 },
  { text: "Nova Gorica in okolica", kilometri: 230 },
];

const threeSixtyHours = [
  { value: 2, price: 299 },
  { value: 3, price: 399 },
  { value: 4, price: 499 },
];

const basicBoothHours = [
  { value: 2, price: 249 },
  { value: 3, price: 299 },
  { value: 4, price: 349 },
];

const formSchema = z.object({
  type: z.enum(["360", "basic"]),
  hours: z.string().min(1, "Izberite število ur"),
  name: z.string().min(2, "Ime in priimek sta obvezna"),
  email: z.string().email("Vnesite veljaven email naslov"),
  phone: z.string().min(8, "Vnesite veljavno telefonsko številko"),
  location: z.string().min(1, "Izberite lokacijo"),
  date: z.date({ required_error: "Izberite datum dogodka" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BookingDialogProps {
  children: React.ReactNode;
}

export function BookingDialog({ children }: BookingDialogProps) {
  const [step, setStep] = useState(1);
  const [selectedHours, setSelectedHours] = useState(threeSixtyHours[0]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "360",
      hours: "",
      name: "",
      email: "",
      phone: "",
      location: "",
      date: new Date(),
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const transportCost = selectedLocation.kilometri * 0.4;
      const totalPrice = selectedHours.price + transportCost;

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: values,
          totalPrice,
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

  const handleTypeSelect = (type: "360" | "basic") => {
    form.setValue("type", type);
    setSelectedHours(type === "360" ? threeSixtyHours[0] : basicBoothHours[0]);
    setStep(2);
  };

  const handleHoursSelect = (hours: string) => {
    form.setValue("hours", hours);
    const hoursOption = (
      form.getValues("type") === "360" ? threeSixtyHours : basicBoothHours
    ).find((h) => h.value.toString() === hours);
    if (hoursOption) {
      setSelectedHours(hoursOption);
    }
  };

  const handleLocationSelect = (location: string) => {
    form.setValue("location", location);
    const locationOption = locations.find((l) => l.text === location);
    if (locationOption) {
      setSelectedLocation(locationOption);
    }
  };

  const transportCost = selectedLocation.kilometri * 0.4;
  const totalPrice = selectedHours.price + transportCost;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Izberite vrsto Photo Booth-a</DialogTitle>
              <DialogDescription>
                Izberite med 360° Photo Booth in klasičnim Photo Booth.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <button
                onClick={() => handleTypeSelect("360")}
                className={cn(
                  "relative flex flex-col items-center p-6 rounded-lg border-2 transition-all",
                  "hover:border-[#C99566] hover:shadow-lg",
                  form.getValues("type") === "360"
                    ? "border-[#C99566] bg-[#C99566]/5"
                    : "border-gray-200"
                )}
              >
                <div className="h-24 w-24 mb-4 rounded-full bg-[#C99566]/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#C99566]">
                    360°
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">360° Photo Booth</h3>
                <p className="text-sm text-gray-500 text-center">
                  Edinstveno 360° snemanje za posebne trenutke
                </p>
                {form.getValues("type") === "360" && (
                  <div className="absolute top-2 right-2 h-6 w-6 bg-[#C99566] rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>
              <button
                onClick={() => handleTypeSelect("basic")}
                className={cn(
                  "relative flex flex-col items-center p-6 rounded-lg border-2 transition-all",
                  "hover:border-[#C99566] hover:shadow-lg",
                  form.getValues("type") === "basic"
                    ? "border-[#C99566] bg-[#C99566]/5"
                    : "border-gray-200"
                )}
              >
                <div className="h-24 w-24 mb-4 rounded-full bg-[#C99566]/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#C99566]">PB</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Photo Booth</h3>
                <p className="text-sm text-gray-500 text-center">
                  Klasičen Photo Booth za zabavne fotografije
                </p>
                {form.getValues("type") === "basic" && (
                  <div className="absolute top-2 right-2 h-6 w-6 bg-[#C99566] rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Izberite paket</DialogTitle>
              <DialogDescription>
                Izberite število ur in izpolnite podatke za rezervacijo.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 pt-4"
              >
                <div className="grid grid-cols-1 gap-4">
                  {/* Hours Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(form.getValues("type") === "360"
                      ? threeSixtyHours
                      : basicBoothHours
                    ).map((hour) => (
                      <button
                        key={hour.value}
                        type="button"
                        onClick={() => handleHoursSelect(hour.value.toString())}
                        className={cn(
                          "relative p-4 rounded-lg border-2 transition-all text-left",
                          "hover:border-[#C99566] hover:shadow-lg",
                          form.getValues("hours") === hour.value.toString()
                            ? "border-[#C99566] bg-[#C99566]/5"
                            : "border-gray-200"
                        )}
                      >
                        <div className="font-semibold text-lg mb-1">
                          {hour.value} {hour.value === 1 ? "ura" : "ure"}
                        </div>
                        <div className="text-2xl font-bold text-[#C99566]">
                          {hour.price}€
                        </div>
                        {form.getValues("hours") === hour.value.toString() && (
                          <div className="absolute top-2 right-2 h-6 w-6 bg-[#C99566] rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <Input
                              {...field}
                              type="email"
                              className="h-9 md:h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              className="h-9 md:h-10"
                            />
                          </FormControl>
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
                          <Select
                            onValueChange={handleLocationSelect}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-9 md:h-10">
                                <SelectValue placeholder="Izberite lokacijo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem
                                  key={location.text}
                                  value={location.text}
                                >
                                  {location.text}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            }
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
                        <FormLabel>Sporočilo (opcijsko)</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-[80px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Price Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Osnovna cena:</span>
                      <span className="font-semibold">
                        {selectedHours.price}€
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Prevoz:</span>
                      <span className="font-semibold">
                        {transportCost.toFixed(0)}€
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-semibold">Skupaj:</span>
                      <span className="text-xl font-bold text-[#C99566]">
                        {totalPrice.toFixed(0)}€
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
                    Opomba: Rezervacija bo potrjena šele po našem pregledu in
                    potrditvi razpoložljivosti izbranega termina. Kontaktirali
                    vas bomo v najkrajšem možnem času.
                  </div>

                  <div className="pt-2 flex justify-between gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Nazaj
                    </Button>
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
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
