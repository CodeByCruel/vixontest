import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useDiscordInvite } from "@/lib/vixon";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const PrivacyPolicy = () => {
  const invite = useDiscordInvite();
  const lastUpdated = "June 28, 2026";

  const sections = [
    {
      title: "1. Information We Collect",
      content: "When you use VixonCloud services, we collect the following categories of information:",
      list: [
        "**Account Information:** Name, email address, Discord username, and any other information you provide when creating an account or placing an order.",
        "**Payment Information:** Transaction details processed through our payment providers (FamPay/UPI). We do not store full payment card details on our servers.",
        "**Server Data:** Files, configurations, databases, and any content you upload to or create on our hosted servers.",
        "**Usage Data:** IP address, browser type, device information, pages visited, time spent on our website, and interaction patterns with our services.",
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect for the following purposes:",
      list: [
        "**Provide Services:** To deliver, maintain, and improve our hosting services, game servers, VPS, bot hosting, and website services.",
        "**Communication:** To send you service-related announcements, support responses, billing notifications, and updates about your account.",
        "**Improve Services:** To analyze usage patterns, troubleshoot issues, develop new features, and enhance the overall user experience.",
        "**Security:** To detect, prevent, and respond to fraud, abuse, unauthorized access, and other harmful activities that threaten our infrastructure and users.",
      ],
    },
    {
      title: "3. Data Sharing & Disclosure",
      content: "We do not sell your personal information. We may share your data in the following circumstances:",
      list: [
        "**Third-Party Services:** We may share data with trusted service providers (payment processors, infrastructure providers) who assist in operating our services. These providers are contractually obligated to protect your data.",
        "**Legal Requirements:** We may disclose information if required by law, court order, or governmental request, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
        "**Business Transfers:** In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any change in ownership or use of your data.",
      ],
    },
    {
      title: "4. Data Security",
      content: "We take the security of your data seriously and implement multiple layers of protection:",
      list: [
        "**Encryption:** All data transmitted between your browser and our servers is encrypted using TLS/SSL. Sensitive data at rest is encrypted using industry-standard AES-256 encryption.",
        "**Access Controls:** Access to user data is strictly limited to authorized personnel on a need-to-know basis. All access is logged and audited regularly.",
        "**Incident Response:** In the unlikely event of a data breach, we will notify affected users within 72 hours via Discord and email, providing details of the incident and steps taken to mitigate any impact.",
      ],
    },
    {
      title: "5. Data Retention",
      content: "We retain your data only for as long as necessary to provide our services and fulfill the purposes described in this policy:",
      list: [
        "**Active Accounts:** Your data is retained for the duration of your active subscription or account.",
        "**Post-Termination:** All server data is permanently deleted 30 days after service termination or suspension. No recovery is possible after this period.",
        "**Backups:** Backup copies may be retained for up to 7 days. After this period, backups are automatically purged.",
        "**Legal Obligations:** We may retain certain data for longer periods when required by applicable laws, regulations, or legal proceedings.",
      ],
    },
    {
      title: "6. Your Rights",
      content: "You have the following rights regarding your personal data:",
      list: [
        "**Access:** You may request a copy of all personal data we hold about you. We will provide this within 30 days of your request.",
        "**Correction:** You may request correction of any inaccurate or incomplete personal data. You can also update most information directly through your account settings.",
        "**Deletion:** You may request deletion of your personal data, subject to certain legal exceptions. We will comply within 30 days unless retention is required by law.",
        "**Portability:** You may request your data in a structured, commonly used, machine-readable format (JSON or CSV) for transfer to another service provider.",
      ],
    },
    {
      title: "7. Cookies & Tracking",
      content: "We use cookies and similar technologies minimally to provide and improve our services:",
      list: [
        "**Minimal Cookies:** We use only essential cookies required for authentication, session management, and basic website functionality. No tracking cookies are used by default.",
        "**Analytics:** We may use privacy-focused analytics tools to understand how our website is used. This data is aggregated and does not identify individual users.",
        "**No Third-Party Ads:** We do not use cookies or tracking technologies for advertising purposes. We do not display third-party advertisements on our website or services.",
      ],
    },
    {
      title: "8. Children's Privacy",
      content: "Our services are not directed to children under 13 years of age:",
      list: [
        "**Parental Consent:** Users under 13 must have verifiable parental or guardian consent before creating an account or using our services.",
        "**Age Verification:** By creating an account, you confirm that you are at least 13 years old or have obtained the required parental consent.",
        "**Data from Minors:** If we become aware that we have collected personal data from a child under 13 without proper consent, we will take steps to delete that information promptly.",
      ],
    },
    {
      title: "9. International Data Transfers",
      content: "Your data may be processed in countries other than your own:",
      list: [
        "**Infrastructure Locations:** Our servers are hosted in multiple data center locations to ensure reliability and performance. Your data may be stored and processed in these locations.",
        "**Cross-Border Protections:** When transferring data internationally, we ensure appropriate safeguards are in place, including standard contractual clauses and data processing agreements with our providers.",
        "**Compliance:** We comply with applicable data protection laws, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (India).",
      ],
    },
    {
      title: "10. Changes to This Policy",
      list: [
        "**Updates:** We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors.",
        "**Notification:** Significant changes will be announced via Discord and posted on our website with an updated \"Last updated\" date at the top of this page.",
        "**Review:** We encourage you to review this policy periodically to stay informed about how we protect your data.",
        "**Continued Use:** Your continued use of our services after any changes to this policy constitutes acceptance of the updated terms.",
      ],
    },
    {
      title: "11. Contact Us",
      content: `For questions, concerns, or requests regarding this Privacy Policy or your personal data, contact us via Discord: ${invite}.`,
      list: [
        "**Response Time:** We aim to respond to all privacy-related inquiries within 48 hours.",
        "**Data Protection Officer:** For formal data requests, please include \"Privacy Request\" in your message subject for priority handling.",
      ],
    },
  ];

  return (
    <div className="min-h-screen relative">
      <SEOHead
        title="Privacy Policy — VixonCloud"
        description="VixonCloud privacy policy — how we collect, use, protect, and share your data."
        path="/privacy"
      />
      <Navbar />
      <main className="pt-28 pb-20 relative z-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs text-primary mb-6">
              Legal
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 font-display">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: {lastUpdated}
            </p>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card className="p-4 border-amber-500/30 bg-amber-500/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-300 mb-1">Your Privacy Matters</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    VixonCloud is committed to protecting your data. This policy explains what we collect, how we use it, and your rights. By using our services, you consent to the practices described here. If anything is unclear, ask on Discord before proceeding.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <Card className="p-5 glass gradient-border">
              <p className="text-xs font-semibold text-foreground/70 mb-3">Table of Contents</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {sections.map((section, i) => (
                  <span key={i} className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-default">
                    {section.title}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.03 }}
                className="rounded-xl glass gradient-border p-6"
              >
                <h2 className="text-base font-semibold text-primary mb-3">{section.title}</h2>
                {section.content && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{section.content}</p>
                )}
                {section.list && (
                  <ul className="space-y-2">
                    {section.list.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<span class="text-foreground font-semibold">$1</span>') }} />
                      </li>
                    ))}
                  </ul>
                )}
                {section.list2 && (
                  <ul className="space-y-2 mt-3">
                    {section.list2.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<span class="text-foreground font-semibold">$1</span>') }} />
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
