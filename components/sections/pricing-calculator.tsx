"use client";

import { useState } from "react";
import { PricingForm } from "../forms/pricing-form";
import GlassesWithMustache from "../icons/GlassesWithMustache";
import PaintWithLamp from "../icons/PaintWithLamp";
import PersonWithHeart from "../icons/PersonWithHeart";
import ShareIcon from "../icons/pricing/ShareIcon";
import UnlimitedIcon from "../icons/pricing/UnlimitedIcon";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

const PricingCalculator = ({ type }: { type: "360" | "basic" }) => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedHours, setSelectedHours] = useState(
    type === "360" ? threeSixtyHours[0] : basicBoothHours[0]
  );

  const transportCost = selectedLocation.kilometri * 0.4;
  const totalPrice = selectedHours.price + transportCost;

  return (
    <div className="max-w-3xl mx-auto px-4 mt-4 md:mt-12">
      <div className="bg-[#C99566] text-white rounded-t-2xl p-3 md:p-4 text-center text-base md:text-xl font-semibold">
        {type === "360" ? "360° PHOTO BOOTH" : "PHOTO BOOTH"} CENIK
      </div>

      <div className="bg-gray-100 text-gray-800 rounded-b-2xl shadow-lg p-4 md:p-8">
        <div className="space-y-4 md:space-y-6">
          {/* Features List */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-6 text-center">
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <UnlimitedIcon className="w-8 h-8 md:w-12 md:h-12 text-[#C99566]" />
              <p className="font-medium text-[11px] md:text-base">
                Neomejeno posnetkov
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 md:gap-3">
              <ShareIcon className="w-8 h-8 md:w-12 md:h-12 text-[#C99566]" />
              <p className="font-medium text-[11px] md:text-base">
                Takojšnja delitev
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 md:gap-3">
              <PersonWithHeart className="w-8 h-8 md:w-14 md:h-14 text-[#C99566]" />
              <p className="font-medium text-[11px] md:text-base">
                Ekipa za pomoč
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 md:gap-3">
              <PaintWithLamp className="w-8 h-8 md:w-12 md:h-12 text-[#C99566]" />
              <p className="font-medium text-[11px] md:text-base">
                Prilagoditev
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 md:gap-3">
              <GlassesWithMustache className="w-8 h-8 md:w-12 md:h-12 text-[#C99566]" />
              <p className="font-medium text-[11px] md:text-base">Rekviziti</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 md:pt-6">
            <h3 className="text-center font-semibold text-lg md:text-2xl mb-4 md:mb-6">
              Izvedite informativno ceno
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                Vaša lokacija
              </label>
              <Select
                value={selectedLocation.text}
                onValueChange={(value) => {
                  const location = locations.find((l) => l.text === value);
                  if (location) setSelectedLocation(location);
                }}
              >
                <SelectTrigger className="text-black bg-white h-9 md:h-10">
                  <SelectValue placeholder="Izberite lokacijo" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.text} value={location.text}>
                      {location.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                Število ur najema
              </label>
              <Select
                value={selectedHours.value.toString()}
                onValueChange={(value) => {
                  const hour =
                    type === "360"
                      ? threeSixtyHours.find(
                          (h) => h.value.toString() === value
                        )
                      : basicBoothHours.find(
                          (h) => h.value.toString() === value
                        );
                  if (hour) setSelectedHours(hour);
                }}
              >
                <SelectTrigger className="text-black bg-white h-9 md:h-10">
                  <SelectValue placeholder="Izberite dolžino" />
                </SelectTrigger>
                <SelectContent>
                  {type === "360"
                    ? threeSixtyHours.map((hour) => (
                        <SelectItem
                          key={hour.value}
                          value={hour.value.toString()}
                        >
                          {hour.value} {hour.value === 1 ? "ura" : "ure"}
                        </SelectItem>
                      ))
                    : basicBoothHours.map((hour) => (
                        <SelectItem
                          key={hour.value}
                          value={hour.value.toString()}
                        >
                          {hour.value} {hour.value === 1 ? "ura" : "ure"}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="my-6 md:my-12 text-center">
            <div className="text-4xl md:text-6xl font-bold text-[#6695C9]">
              {totalPrice.toFixed(0)} €
            </div>
            <p className="mt-2 md:mt-4 text-gray-500 text-xs md:text-base">
              Pošljite povpraševanje in prejeli boste ponudbo s točno ceno.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-[#C99566] text-white hover:bg-[#b88455] py-3 md:py-6 text-sm md:text-lg">
                Pošlji povpraševanje
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Pošljite povpraševanje</DialogTitle>
                <DialogDescription>
                  Izpolnite obrazec in poslali vam bomo ponudbo.
                </DialogDescription>
              </DialogHeader>
              <PricingForm
                type={type}
                locations={locations}
                hours={type === "360" ? threeSixtyHours : basicBoothHours}
                selectedLocation={selectedLocation}
                selectedHours={selectedHours}
                totalPrice={totalPrice}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
