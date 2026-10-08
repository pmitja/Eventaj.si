import path from "path";
import { Font, StyleSheet } from "@react-pdf/renderer";

const fontDir = path.join(process.cwd(), "lib/offers/fonts");
export const logoPath = path.join(process.cwd(), "lib/offers/assets/logo.png");

Font.register({
  family: "Poppins",
  fonts: [
    { src: path.join(fontDir, "Poppins_400Regular.ttf") },
    { src: path.join(fontDir, "Poppins_400Regular_Italic.ttf"), fontStyle: "italic" },
    { src: path.join(fontDir, "Poppins_500Medium.ttf"), fontWeight: 500 },
    { src: path.join(fontDir, "Poppins_600SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(fontDir, "Poppins_700Bold.ttf"), fontWeight: 700 },
    { src: path.join(fontDir, "Poppins_700Bold_Italic.ttf"), fontWeight: 700, fontStyle: "italic" },
  ],
});
Font.registerHyphenationCallback((word) => [word]);

// Absolute line height: unitless values on Text render too loose with Poppins.
export const LH = "14pt";

export const colors = {
  ink: "#231C17",
  body: "#2E2622",
  muted: "#6E625A",
  brown: "#7F4F2E",
  label: "#8C5A32",
  tan: "#C08A5B",
  cream: "#F5ECE3",
  rule: "#EADBCB",
};

export const styles = StyleSheet.create({
  page: {
    fontFamily: "Poppins",
    fontSize: 9.5,
    color: colors.body,
    paddingTop: 44,
    paddingBottom: 64,
    paddingHorizontal: 48,
  },
  // lineHeight is set per Text: on Page or View it breaks react-pdf `render` text and spacing.
  text: { lineHeight: LH },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
  logo: { width: 72, height: 72 },
  headerRight: { alignItems: "flex-end" },
  title: { fontSize: 25, fontWeight: 700, color: colors.ink, lineHeight: 1.1 },
  subtitle: { fontSize: 11, color: colors.muted },
  metaBand: { flexDirection: "row", backgroundColor: colors.cream, paddingVertical: 10, paddingHorizontal: 9, marginBottom: 20 },
  metaCell: { flex: 1 },
  metaCellWide: { flex: 1.3 },
  label: { fontSize: 7.5, fontWeight: 600, color: colors.label, textTransform: "uppercase", marginBottom: 1 },
  metaValue: { fontSize: 10, fontWeight: 500, color: colors.ink },
  parties: { flexDirection: "row", marginBottom: 16 },
  party: { flex: 1 },
  partyName: { fontWeight: 700, color: colors.ink, lineHeight: LH },
  paragraph: { marginBottom: 4, lineHeight: LH },
  heading: { fontSize: 12.5, fontWeight: 700, color: colors.ink, marginTop: 12, marginBottom: 4 },
  bulletRow: { flexDirection: "row", marginBottom: 1.5 },
  bullet: { width: 11, lineHeight: LH },
  bulletText: { flex: 1, lineHeight: LH },
  tableHead: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.ink,
    paddingVertical: 6,
    paddingHorizontal: 9,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.75,
    borderBottomColor: colors.rule,
    paddingVertical: 7,
    paddingHorizontal: 9,
  },
  cellMain: { flex: 1, paddingRight: 10, lineHeight: LH },
  cellAmount: { width: 110, textAlign: "right", lineHeight: LH },
  headText: { fontWeight: 700, color: colors.ink },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.brown,
    paddingVertical: 7,
    paddingHorizontal: 9,
  },
  totalLabel: { flex: 1, fontWeight: 700, color: "#FFFFFF", textTransform: "uppercase", fontSize: 9.5 },
  totalAmount: { width: 140, textAlign: "right", fontWeight: 700, color: "#FFFFFF", fontSize: 12.5 },
  tableNote: { fontSize: 8.5, color: colors.muted, marginTop: 5, lineHeight: "12.5pt" },
  callout: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderLeftWidth: 3,
    borderLeftColor: colors.tan,
    backgroundColor: colors.cream,
  },
  calloutTitle: { fontWeight: 700, color: colors.label, marginBottom: 2, lineHeight: LH },
  closing: { marginTop: 18 },
  signature: { fontWeight: 700, color: colors.ink, marginTop: 6, lineHeight: LH },
  signatureSub: { fontSize: 8.5, color: colors.muted },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    height: 22,
    borderTopWidth: 0.75,
    borderTopColor: colors.rule,
    paddingTop: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: colors.muted,
  },
});
