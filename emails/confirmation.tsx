import { FormField } from "@/components/forms/booking-form";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  formData: FormField;
}

export const ConfirmationEmail = ({ formData }: EmailTemplateProps) => {
  const { name, email, phone, date, location, hours, message, type } = formData;

  const formatDate = (date: Date | undefined | null) => {
    if (!date) return "Ni določen";
    try {
      return new Date(date).toLocaleDateString("sl");
    } catch {
      return "Ni določen";
    }
  };

  return (
    <Html>
      <Head />
      <Preview>Hvala za vaše povpraševanje - Eventaj.si</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/application/logo.svg`}
            width="150"
            height="50"
            alt="Eventaj.si"
            style={logo}
          />
          <Heading style={heading}>Hvala za vaše povpraševanje</Heading>
          <Text style={text}>
            Hvala da ste izbrali Eventaj.si. V naslednjih 24 urah vam pošljemo
            povratno infomacijo o vašem povpraševanju.
          </Text>
          <Section style={details}>
            <Heading as="h2" style={subheading}>
              Podatki o povpraševanju:
            </Heading>
            <Text style={detailItem}>
              <strong>Ime in priimek:</strong> {name}
            </Text>
            <Text style={detailItem}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={detailItem}>
              <strong>Telefon:</strong> {phone}
            </Text>
            <Text style={detailItem}>
              <strong>Datum dogodka:</strong> {formatDate(date)}
            </Text>
            <Text style={detailItem}>
              <strong>Lokacija:</strong> {location}
            </Text>
            <Text style={detailItem}>
              <strong>Število ur:</strong> {hours}
            </Text>
            <Text style={detailItem}>
              <strong>Tip storitve:</strong>{" "}
              {type === "360" ? "360° Photo Booth" : "Photo Booth"}
            </Text>
            {message && (
              <Text style={detailItem}>
                <strong>Sporočilo:</strong> {message}
              </Text>
            )}
          </Section>
          <Hr style={hr} />
          <Section style={details}>
            <Heading as="h2" style={subheading}>
              Kontaktni podatki:
            </Heading>
            <Text style={detailItem}>
              <strong>MIPA, Mitja Pak s.p.</strong>
            </Text>
            <Text style={detailItem}>Slomškova ulica 1</Text>
            <Text style={detailItem}>2230 Lenart v Slovenskih goricah</Text>
            <Text style={detailItem}>
              Tel:{" "}
              <Link href="tel:+38631285143" style={link}>
                +386 31 285 143
              </Link>{" "}
              /{" "}
              <Link href="tel:+38631544751" style={link}>
                +386 31 544 751
              </Link>
            </Text>
            <Text style={detailItem}>
              Email:{" "}
              <Link href="mailto:eventaj.si@gmail.com" style={link}>
                eventaj.si@gmail.com
              </Link>
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            © {new Date().getFullYear()} Eventaj.si. Vse pravice pridržane.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const logo = {
  margin: "0 auto",
  marginBottom: "24px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const subheading = {
  fontSize: "20px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "0",
  marginBottom: "8px",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.4",
  color: "#484848",
  marginBottom: "24px",
};

const details = {
  backgroundColor: "#f9f9f9",
  borderRadius: "4px",
  padding: "24px",
  marginBottom: "24px",
};

const detailItem = {
  fontSize: "14px",
  lineHeight: "1.4",
  color: "#484848",
  marginBottom: "8px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  fontSize: "12px",
  lineHeight: "1.4",
  color: "#9ca299",
  textAlign: "center" as const,
  marginBottom: "4px",
};

const link = {
  color: "#C99566",
  textDecoration: "none",
};

export default ConfirmationEmail;
