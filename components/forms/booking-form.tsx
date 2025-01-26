import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
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
  { value: 2, price: 499 },
  { value: 3, price: 599 },
  { value: 4, price: 699 },
];

const basicBoothHours = [
  { value: 2, price: 299 },
  { value: 3, price: 399 },
  { value: 4, price: 499 },
];

const formSchema = z.object({
  type: z.enum(["360", "basic"]),
  hours: z.string(),
  name: z.string().min(1, "Ime je obvezno"),
  email: z.string().email("Vnesite veljaven email naslov"),
  phone: z.string().min(1, "Telefon je obvezen"),
  location: z.string().min(1, "Lokacija je obvezna"),
  date: z.date({ required_error: "Datum je obvezen" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BookingFormProps {
  onSuccess: () => void;
  defaultBoothType?: "photo-booth" | "360-photo-booth";
  defaultPackage?: number;
}

export function BookingForm({
  onSuccess,
  defaultBoothType,
  defaultPackage,
}: BookingFormProps) {
  const [step, setStep] = useState(defaultBoothType ? 2 : 1);
  const [selectedHours, setSelectedHours] = useState(
    defaultBoothType === "360-photo-booth"
      ? threeSixtyHours[defaultPackage || 0]
      : basicBoothHours[defaultPackage || 0]
  );
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: defaultBoothType === "360-photo-booth" ? "360" : "basic",
      hours: selectedHours.value.toString(),
      name: "",
      email: "",
      phone: "",
      location: locations[0].text,
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
      onSuccess();
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
    <>
      {step === 1 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => handleTypeSelect("360")}
              className={cn(
                "relative flex flex-col items-center p-6 rounded-lg border-2 transition-all",
                "hover:border-[#C99566] hover:shadow-lg",
                form.getValues("type") === "360"
                  ? "border-[#C99566] bg-[#C99566]/5 dark:bg-[#C99566]/10"
                  : "border-gray-200 dark:border-gray-700 dark:hover:border-[#C99566]"
              )}
            >
              <div className="h-24 w-24 mb-4 rounded-full bg-[#C99566]/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#C99566]">360°</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                360° Photo Booth
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
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
                  ? "border-[#C99566] bg-[#C99566]/5 dark:bg-[#C99566]/10"
                  : "border-gray-200 dark:border-gray-700 dark:hover:border-[#C99566]"
              )}
            >
              <div className="h-24 w-24 mb-4 rounded-full bg-[#C99566]/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#C99566]">PB</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Photo Booth
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
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
                          ? "border-[#C99566] bg-[#C99566]/5 dark:bg-[#C99566]/10"
                          : "border-gray-200 dark:border-gray-700 dark:hover:border-[#C99566]"
                      )}
                    >
                      <div className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">
                          Lokacija
                        </FormLabel>
                        <Select
                          onValueChange={handleLocationSelect}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-9 md:h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                              <SelectValue placeholder="Izberite lokacijo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white dark:bg-gray-800">
                            {locations.map((location) => (
                              <SelectItem
                                key={location.text}
                                value={location.text}
                                className="text-gray-900 dark:text-white"
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
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Datum
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          value={
                            field.value
                              ? field.value.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
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
                        Sporočilo (opcijsko)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[80px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price Summary */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Osnovna cena:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {selectedHours.price}€
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Prevoz (informativno):
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        *Končna cena prevoza bo določena po potrditvi lokacije
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ~ {transportCost.toFixed(0)}€
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Skupaj (informativno):
                      </span>
                    </div>
                    <span className="text-xl font-bold text-[#C99566]">
                      ~ {totalPrice.toFixed(0)}€
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  Opomba: Rezervacija bo potrjena šele po našem pregledu in
                  potrditvi razpoložljivosti izbranega termina. Kontaktirali vas
                  bomo v najkrajšem možnem času.
                </div>

                <div className="pt-2 flex justify-between gap-4">
                  {!defaultBoothType && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      Nazaj
                    </Button>
                  )}
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
    </>
  );
}

export type FormField = {
  name: string;
  email: string;
  phone: string;
  date: Date;
  location: string;
  hours: string;
  message?: string;
  type: "360" | "basic";
};
