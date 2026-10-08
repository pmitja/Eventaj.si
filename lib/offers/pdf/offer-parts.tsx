import { Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { vatNote } from "../company";
import { formatEur, type OfferItem } from "../pricing";
import { RichText } from "./rich-text";
import { styles } from "./styles";

export function Bullets({ items }: { items: string[] }) {
  return (
    <View>
      {items.filter(Boolean).map((item, index) => (
        <View key={index} style={styles.bulletRow} wrap={false}>
          <Text style={styles.bullet}>•</Text>
          <RichText style={styles.bulletText}>{item}</RichText>
        </View>
      ))}
    </View>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View>
      <Text style={styles.heading} minPresenceAhead={60}>{title}</Text>
      {children}
    </View>
  );
}

export function MetaCell({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <View style={wide ? styles.metaCellWide : styles.metaCell}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

export function Party({ label, lines }: { label: string; lines: string[] }) {
  const [name, ...rest] = lines.filter(Boolean);
  return (
    <View style={styles.party}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.partyName}>{name}</Text>
      {rest.map((line) => <Text key={line} style={styles.text}>{line}</Text>)}
    </View>
  );
}

type PriceTableProps = { title: string; items: OfferItem[]; total: number; extraHourPrice: number };

export function PriceTable({ title, items, total, extraHourPrice }: PriceTableProps) {
  return (
    <View wrap={false}>
      <Text style={styles.heading}>{title}</Text>
      <View style={styles.tableHead}>
        <Text style={[styles.cellMain, styles.headText]}>Postavka</Text>
        <Text style={[styles.cellAmount, styles.headText]}>Znesek</Text>
      </View>
      {items.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.cellMain}>{item.description}</Text>
          <Text style={styles.cellAmount}>{item.amount === null ? item.note ?? "" : formatEur(item.amount)}</Text>
        </View>
      ))}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Skupna vrednost ponudbe</Text>
        <Text style={styles.totalAmount}>{formatEur(total)}</Text>
      </View>
      <Text style={styles.tableNote}>
        {vatNote}
        {"\n"}Morebitno podaljšanje najema: {formatEur(extraHourPrice)} za vsako dodatno uro.
      </Text>
    </View>
  );
}
