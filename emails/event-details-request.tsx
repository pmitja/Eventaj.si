import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";

type Props = { name: string; date: string; url: string };

export const EventDetailsRequestEmail = ({ name, date, url }: Props) => (
  <Html lang="sl">
    <Head />
    <Preview>Podatki za vaš dogodek – izpolnite jih v nekaj minutah</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>Eventaj.si · photo booth</Text>
        <Heading style={heading}>Podatki za vaš dogodek</Heading>
        <Text style={text}>Pozdravljeni{name ? ` ${name}` : ""},</Text>
        <Text style={text}>
          kmalu se vidimo{date ? ` (${date})` : ""}! Ker se vaš dogodek hitro približuje, vas prosimo za nekaj podatkov,
          da lahko pripravimo photo booth in okvir za vaše fotografije.
        </Text>
        <Text style={text}>
          Kar že vemo iz vašega povpraševanja, smo izpolnili namesto vas. Podatke le preverite in dopolnite manjkajoče.
        </Text>
        <Section style={{ margin: "32px 0" }}>
          <Button href={url} style={button}>
            Izpolni podatke →
          </Button>
        </Section>
        <Text style={small}>
          Če gumb ne deluje, odprite to povezavo:
          <br />
          <a href={url} style={link}>
            {url}
          </a>
        </Text>
        <Text style={small}>
          Če želite, nam posredujte tudi vabilo, da si lažje predstavljamo stil dogodka. Priložite ga v odgovor na to
          e-pošto.
        </Text>
        <Text style={signature}>
          Lep dan,
          <br />
          ekipa Eventaj.si
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#FBF8F2",
  color: "#14110F",
  fontFamily: '"Instrument Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
};

const container = { margin: "0 auto", padding: "40px 24px 48px", maxWidth: "560px" };

const brand = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#B8553A",
  margin: "0 0 12px",
};

const heading = {
  fontFamily: 'Fraunces,Georgia,"Times New Roman",serif',
  fontSize: "34px",
  fontWeight: 400,
  lineHeight: "1.1",
  color: "#14110F",
  margin: "0 0 28px",
};

const text = { fontSize: "16px", lineHeight: "1.6", color: "#2A2520", margin: "0 0 14px" };

const button = {
  backgroundColor: "#14110F",
  color: "#FBF8F2",
  borderRadius: "999px",
  padding: "16px 28px",
  fontSize: "15px",
  fontWeight: 500,
  textDecoration: "none",
};

const small = { fontSize: "13px", lineHeight: "1.6", color: "#6B6157", margin: "0 0 14px" };

const link = { color: "#B8553A", wordBreak: "break-all" as const };

const signature = {
  fontFamily: 'Fraunces,Georgia,"Times New Roman",serif',
  fontSize: "17px",
  lineHeight: "1.5",
  color: "#14110F",
  margin: "32px 0 0",
  paddingTop: "20px",
  borderTop: "1px solid rgba(20,17,15,0.12)",
};

export default EventDetailsRequestEmail;
