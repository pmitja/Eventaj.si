import { Text, type Styles } from "@react-pdf/renderer";
import { LH } from "./styles";

// Renders the **bold** and *italic* markers the model is allowed to use.
export function RichText({ children, style }: { children: string; style?: Styles[string] }) {
  const parts = children.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <Text style={[{ lineHeight: LH }, style ?? {}]}>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <Text key={index} style={{ fontWeight: 700, color: "#231C17" }}>{part.slice(2, -2)}</Text>;
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return <Text key={index} style={{ fontStyle: "italic" }}>{part.slice(1, -1)}</Text>;
        }
        return part;
      })}
    </Text>
  );
}
