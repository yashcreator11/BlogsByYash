import {
  Body,
  Button,
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

interface NewPostEmailProps {
  siteName: string;
  postTitle: string;
  postUrl: string;
  excerpt: string;
  coverImage?: string;
  unsubscribeUrl: string;
}

export default function NewPostEmail({
  siteName = "Your Blog Name",
  postTitle = "A new post title",
  postUrl = "https://yourblog.com/blog/post-id",
  excerpt = "A short excerpt of the new post goes here.",
  coverImage,
  unsubscribeUrl = "https://yourblog.com/api/unsubscribe?token=token",
}: NewPostEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{postTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>{siteName}</Text>

          {coverImage && <Img src={coverImage} alt={postTitle} style={coverStyle} />}

          <Heading style={heading}>{postTitle}</Heading>
          <Text style={paragraph}>{excerpt}</Text>

          <Section style={buttonSection}>
            <Button style={button} href={postUrl}>
              Read full post
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            You&apos;re receiving this because you subscribed to {siteName}.{" "}
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
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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

const coverStyle = {
  width: "100%",
  borderRadius: "12px",
  marginBottom: "24px",
};

const heading = {
  fontSize: "22px",
  fontWeight: 700,
  color: "#18181b",
  lineHeight: "1.3",
};

const paragraph = {
  fontSize: "15px",
  color: "#52525b",
  lineHeight: "1.6",
};

const buttonSection = {
  marginTop: "24px",
  marginBottom: "24px",
};

const button = {
  backgroundColor: "#6366f1",
  borderRadius: "999px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  textDecoration: "none",
  padding: "12px 24px",
  display: "inline-block",
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
