import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import type { Offer } from "@/lib/db/offers";
import { formatNumericSlovenianDate } from "@/lib/slovenian-date";
import { cancellationPolicy, company } from "../company";
import { formatEur } from "../pricing";
import { isBoothService, services, tableRental } from "../services";
import { Bullets, MetaCell, Party, PriceTable, Section } from "./offer-parts";
import { RichText } from "./rich-text";
import { logoPath, styles } from "./styles";

export function OfferDocument({ offer }: { offer: Offer }) {
  const { content, items, options } = offer;
  const service = isBoothService(options.service) ? services[options.service] : null;
  const pkg = service?.packages[options.hours] ?? { name: tableRental.name, included: tableRental.included };
  const event = content.dogodek;
  const validUntil = formatNumericSlovenianDate(options.validUntil);
  const theme = content.tema.trim();
  const descriptions = ("parts" in pkg && pkg.parts ? pkg.parts : [pkg]).map((part, index) => {
    // Offers created before combo support have no opis_storitve_360.
    const written = index === 0 ? content.opis_storitve : content.opis_storitve_360 ?? [];
    return { name: part.name, items: written.length > 0 ? written : part.included };
  });

  let section = 0;
  const numbered = (title: string) => `${++section}. ${title}`;

  return (
    <Document title={`Ponudba ${offer.number} – Eventaj.si`} author="Eventaj.si" language="sl">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt */}
          <Image src={logoPath} style={styles.logo} />
          <View style={styles.headerRight}>
            <Text style={styles.title}>PONUDBA</Text>
            <Text style={styles.subtitle}>{service?.subtitle ?? tableRental.subtitle}</Text>
          </View>
        </View>

        <View style={styles.metaBand}>
          <MetaCell label="Številka ponudbe" value={offer.number} />
          <MetaCell label="Datum ponudbe" value={formatNumericSlovenianDate(options.date)} />
          <MetaCell label="Veljavnost" value={`do ${validUntil}`} />
          <MetaCell label="Dogodek" value={[event.datum, event.cas].filter(Boolean).join(", ")} wide />
        </View>

        <View style={styles.parties}>
          <Party label="Ponudnik" lines={[company.name, company.address, company.postal]} />
          <Party label="Naročnik" lines={[content.narocnik.naziv, content.narocnik.naslov, content.narocnik.posta]} />
        </View>

        <Text style={styles.paragraph}>{content.nagovor}</Text>
        <RichText style={styles.paragraph}>{content.uvod}</RichText>

        <Section title="Razpoložljivost">
          <RichText>{content.razpolozljivost}</RichText>
        </Section>

        {descriptions.map((description) => (
          <Section key={description.name} title={numbered(`Opis storitve – ${description.name}`)}>
            <Bullets items={description.items} />
          </Section>
        ))}

        {content.tematska_prilagoditev.length > 0 && (
          <Section title={numbered(theme ? `Tematska prilagoditev – ${theme}` : "Tematska prilagoditev")}>
            <Bullets items={content.tematska_prilagoditev} />
          </Section>
        )}

        <PriceTable
          title={numbered("Cena")}
          items={items}
          total={offer.total}
          note={service
            ? `Morebitno podaljšanje najema: ${formatEur(service.extraHourPrice)} za vsako dodatno uro.`
            : `Cena najema znaša ${formatEur(tableRental.unitPrice)} na mizo za en dan.`}
        />

        <Section title={numbered(!service ? "Prevzem in dostava" : "Prostorski in tehnični pogoji")}>
          <Bullets items={content.tehnicni_pogoji} />
        </Section>

        <Section title={numbered("Veljavnost ponudbe in plačilni pogoji")}>
          <Bullets
            items={[
              `Ponudba velja **${options.validityDays} dni** od datuma izdaje, tj. **do ${validUntil}**.`,
              ...content.placilni_pogoji,
            ]}
          />
        </Section>

        <Section title={numbered("Sprememba termina")}>
          <Bullets items={cancellationPolicy} />
        </Section>

        <View style={styles.callout} wrap={false}>
          <Text style={styles.calloutTitle}>{content.poziv_naslov}</Text>
          <RichText>{content.poziv}</RichText>
        </View>

        <View style={styles.closing} wrap={false}>
          <Text style={styles.text}>{content.zakljucek}</Text>
          <Text style={[styles.text, { marginTop: 8 }]}>Lep pozdrav,</Text>
          <Text style={styles.signature}>Mitja Pak</Text>
          <Text style={styles.signatureSub}>{company.name} · Eventaj.si</Text>
        </View>

        <View style={styles.footer} fixed>
          <Text>{company.name}  ·  {company.address}, {company.postal}  ·  {company.web}</Text>
          <Text render={({ pageNumber }) => `Stran ${pageNumber}`} />
        </View>
      </Page>
    </Document>
  );
}
