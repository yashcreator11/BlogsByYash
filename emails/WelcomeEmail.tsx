import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  siteName: string;
  siteUrl: string;
  unsubscribeUrl: string;
}

export default function WelcomeEmail({
  siteName = "Your Blog Name",
  siteUrl = "https://yourblog.com",
  unsubscribeUrl = "https://yourblog.com/api/unsubscribe?token=token",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {siteName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>{siteName}</Text>
          <Heading style={heading}>You&apos;re subscribed 🎉</Heading>
          <Text style={paragraph}>
            Thanks for subscribing to {siteName}. You&apos;ll get an email
            whenever a new post goes live — no spam, no noise.
          </Text>
          <Text style={paragraph}>
            In the meantime, feel free to <Link href={siteUrl} style={link}>browse the blog</Link>.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Didn&apos;t mean to subscribe?{" "}
            <Link href={unsubscribeUrl} style={unsubscribeLink}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fafafa",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "32px 24px",
  maxWidth: "560px",
};

const logo = {
  fontSize: "16px",
  fontWeight: 700,
  color: "#6366f1",
  marginBottom: "24px",
};

const heading = {
  fontSize: "22px",
  fontWeight: 700,
  color: "#18181b",
};

const paragraph = {
  fontSize: "15px",
  color: "#52525b",
  lineHeight: "1.6",
};

const link = {
  color: "#6366f1",
};

const hr = {
  borderColor: "#e4e4e7",
  margin: "24px 0",
};

const footer = {
  fontSize: "12px",
  color: "#a1a1aa",
};

const unsubscribeLink = {
  color: "#a1a1aa",
  textDecoration: "underline",
};
