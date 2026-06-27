import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SEOHead from "@/components/SEOHead";
import { useDiscordInvite } from "@/lib/vixon";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const TermsOfService = () => {
  const invite = useDiscordInvite();
  const lastUpdated = "June 28, 2026";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing or purchasing any hosting plan, game server, VPS, bot hosting, website, or any other service ("Services") from VixonCloud ("we", "us", "our"), whether through our website (vixoncloud.com), Discord server, or any other channel, you ("User", "Customer", "you") agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, you must not use our Services.`,
      list: [
        "These Terms constitute a legally binding agreement between you and VixonCloud.",
        "We reserve the right to update these Terms at any time without prior notice.",
        "It is your responsibility to review these Terms periodically.",
        "Continued use of our Services after any changes constitutes full acceptance.",
      ],
    },
    {
      title: "2. Eligibility & Age Requirements",
      content: "Our Services are available to users of all ages. However:",
      list: [
        "**Users under 13:** Must have parental or guardian consent before using our Services. By placing an order, you confirm that such consent has been obtained.",
        "**Users 13–17:** May use our Services independently but are fully responsible for their accounts and actions.",
        "**Users 18+:** Full responsibility for all account activity and billing.",
        "**Account Holder:** The person whose name appears on the account is solely responsible for all activity, billing, and compliance with these Terms.",
      ],
    },
    {
      title: "3. Account Responsibilities",
      content: "You are responsible for maintaining the security and confidentiality of your account:",
      list: [
        "**Account Security:** You must keep your login credentials secure. VixonCloud is not responsible for unauthorized access to your account.",
        "**Accurate Information:** You must provide accurate and current information when creating an account or placing an order.",
        "**Account Sharing:** Sharing your account credentials with third parties is prohibited unless explicitly approved by us.",
        "**One Account Per Person:** Each user may maintain only one active account unless otherwise agreed upon.",
        "**Discord Linking:** Your Discord account may be linked to your hosting account for support and notifications. You are responsible for keeping this linked account secure.",
      ],
    },
    {
      title: "4. Services & SLA",
      content: "VixonCloud provides game server hosting, VPS hosting, bot hosting, and website services. Our Service Level Agreement (SLA) includes:",
      list: [
        "**99.99% Uptime Guarantee:** We guarantee 99.99% network and server uptime measured monthly. Scheduled maintenance windows are excluded from this calculation.",
        "**Uptime Compensation:** If we fail to meet the 99.99% uptime SLA, affected users will receive service credits: 5% credit for 99.0–99.9% uptime, 10% credit for 95.0–99.0% uptime, 25% credit for uptime below 95.0%.",
        "**Scheduled Maintenance:** We will notify users at least 24 hours in advance via Discord for planned maintenance that may cause downtime.",
        "**Instant Setup:** New servers are typically provisioned within minutes of payment confirmation. In rare cases, setup may take up to 24 hours.",
        "**Support Response Time:** We aim to respond to all support tickets within 1–2 hours during peak hours, and within 6 hours during off-peak hours.",
      ],
    },
    {
      title: "5. Refund & Cancellation Policy",
      content: "We aim to be fair, but hosting resources are allocated immediately upon purchase.",
      list: [
        "**7-Day Money-Back Guarantee:** All new hosting plans are eligible for a full refund within 7 days of the initial purchase, no questions asked.",
        "**Refund Eligibility:** Only first-time customers qualify for the 7-day guarantee. Returning customers who have previously received a refund are not eligible.",
        "**Refund Method:** Refunds are processed via the same payment method used for the original purchase within 5–7 business days.",
        "**After 7 Days:** All payments are 100% non-refundable. No exceptions.",
        "**Cancellation:** You may cancel your service at any time. Your server will remain active until the end of your current billing period.",
        "**Chargeback Policy:** Raising a dispute or chargeback through your payment provider is strictly prohibited. Any such action will result in immediate termination of all active services and a permanent ban from our website and Discord.",
        "**How to Request:** Contact support on our Discord: " + invite + ".",
      ],
    },
    {
      title: "6. Billing & Payments",
      content: "All billing is handled through our authorized payment channels:",
      list: [
        "**Payment Methods:** We currently accept UPI payments through FamPay. Additional payment methods may be added in the future.",
        "**Auto-Renewal:** Subscriptions do not auto-renew. You will need to manually renew before your billing cycle ends.",
        "**Late Payment:** If payment is not received within 3 days of the due date, your server will be suspended. Data is retained for 30 days after suspension.",
        "**Price Changes:** We reserve the right to change pricing at any time. Existing active plans will not be affected until their next renewal date.",
        "**Taxes:** All prices are inclusive of applicable taxes unless otherwise stated.",
        "**Failed Payments:** If a payment fails or is reversed, your service may be immediately suspended until the issue is resolved.",
      ],
    },
    {
      title: "7. Acceptable Use Policy",
      content: "You agree to use our Services only for lawful purposes. The following activities are strictly prohibited:",
      list: [
        "**Illegal Content:** Hosting, distributing, or transmitting any content that violates applicable local, state, national, or international laws.",
        "**Malware & Viruses:** Distributing malware, viruses, worms, trojans, or any other malicious software.",
        "**DDoS Attacks:** Using our services to launch or participate in Distributed Denial of Service attacks against any target.",
        "**Cryptocurrency Mining:** Mining cryptocurrency on our servers without explicit written permission.",
        "**Spam:** Sending unsolicited bulk emails, messages, or advertisements.",
        "**Phishing:** Creating websites or services designed to steal user credentials or personal information.",
        "**Proxy/VPN Abuse:** Running open proxy, VPN tunnels, or any service that masks the identity of end-users for illegal activities.",
        "**Resource Abuse:** Running processes that consume excessive CPU, RAM, disk I/O, or network bandwidth beyond your plan's allocated limits.",
        "**Child Exploitation:** Any content or activity involving the exploitation of minors will result in immediate termination and reporting to authorities.",
      ],
    },
    {
      title: "8. Server Resource Limits",
      content: "Each hosting plan comes with defined resource limits. Usage beyond these limits may result in action:",
      list: [
        "**CPU Limits:** Sustained usage above your plan's CPU allocation for more than 10 minutes may trigger automatic throttling.",
        "**RAM Limits:** If your server exceeds its allocated RAM, it may be automatically killed and restarted.",
        "**Storage Limits:** Exceeding your storage quota will prevent file uploads and may affect server operation.",
        "**Network Limits:** Unusual network traffic patterns (DDoS, large-scale file hosting) may trigger automated protection measures.",
        "**Fair Usage:** We reserve the right to suspend or throttle any server that consistently consumes resources beyond its plan limits without prior notice.",
      ],
    },
    {
      title: "9. Premium Service Rules",
      content: "Premium plans come with exclusive perks but require strict adherence to the following:",
      list: [
        "**Discord Membership:** If you leave our Discord server during an active plan, your Premium Role and dedicated support access will be revoked until you rejoin or renew.",
        "**Panel Restrictions:** You are prohibited from changing the server name or description directly from the hosting panel. If you need a change, please contact support.",
        "**Priority Support:** Premium users receive priority in the support queue. This does not guarantee instant responses but ensures faster handling.",
        "**Rule Violations:** Any breach of these rules will result in immediate server suspension without prior warning.",
      ],
    },
    {
      title: "10. Fair Usage & Reselling",
      list: [
        "**Reselling:** You are allowed to resell our services ONLY if you inform our administration beforehand and receive written approval via Discord.",
        "**Resource Abuse:** If your bot or server uses excessive CPU/RAM beyond your plan's limits, we reserve the right to throttle or suspend your instance.",
        "**Sub-Accounts:** You may create sub-accounts for your team members, but you remain responsible for all activity under your account.",
      ],
    },
    {
      title: '11. "Permanent" Server Guarantee',
      content: 'Servers sold as "Permanent" come with a 1-year (12 months) uptime guarantee.',
      list: [
        "**Guarantee Period:** The \\\"Permanent\\\" status is guaranteed for 12 months from the date of purchase.",
        "**After Guarantee:** After the first year, VixonCloud is not liable for data loss or hardware decommissioning.",
        "**Renewal:** The \\\"Permanent\\\" status may be reviewed and renewed based on hardware costs and availability.",
        "**Hardware Changes:** We reserve the right to migrate permanent servers to equivalent or better hardware at any time.",
      ],
    },
    {
      title: "12. Backups & Data Responsibility",
      content: "While we take measures to protect your data, you are ultimately responsible for your own backups:",
      list: [
        "**No Guaranteed Backups:** VixonCloud does not guarantee regular backups of your server data unless explicitly included in your plan.",
        "**Manual Backups:** You are strongly encouraged to create and download regular backups of your server data through the game panel.",
        "**Backup Retention:** If backups are provided, they may be retained for up to 7 days. Older backups are automatically deleted.",
        "**Data Loss:** VixonCloud is not responsible for any data loss resulting from server crashes, hardware failures, or user error.",
        "**Post-Termination:** All server data is deleted 30 days after service termination or suspension. No recovery is possible after this period.",
      ],
    },
    {
      title: "13. Intellectual Property",
      content: "All content, branding, logos, and materials on vixoncloud.com and our Discord server are the intellectual property of VixonCloud. You may not:",
      list: [
        "Copy, reproduce, or redistribute any content from our website without explicit permission.",
        "Use our brand name, logo, or trademarks in any way that implies endorsement or affiliation without approval.",
        "Scrape, mine, or systematically extract data from our website.",
      ],
    },
    {
      title: "14. Termination of Service",
      content: "We reserve the right to suspend or terminate any service immediately, with or without notice, for:",
      list: [
        "Violation of any terms in this Agreement.",
        "Hosting illegal content, malware, or phishing sites.",
        "Using the hosting for DDoS attacks, crypto-mining, or spam.",
        "Abusing our staff on Discord or through support tickets.",
        "Exceeding resource limits repeatedly after warnings.",
        "Non-payment after the 3-day grace period.",
        "Any activity that poses a security risk to our infrastructure or other users.",
      ],
      list2: [
        "**Termination Without Notice:** In cases of severe abuse or illegal activity, we may terminate your service immediately without prior warning.",
        "**No Refund on Termination:** If your service is terminated due to policy violations, no refund will be issued.",
        "**Appeals:** If you believe your service was terminated in error, you may appeal via Discord within 7 days of termination.",
      ],
    },
    {
      title: "15. Limitation of Liability",
      content: "VixonCloud shall not be held liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services.",
      list: [
        "**Total Liability:** Our total liability is limited to the amount paid by you for the specific service in question during the 3 months preceding the claim.",
        "**Data Loss:** We are not liable for any data loss, corruption, or damage to your files, databases, or configurations.",
        "**Service Interruptions:** We are not liable for service interruptions caused by factors beyond our control (see Force Majeure).",
        "**Third-Party Services:** We are not responsible for any issues arising from third-party software, mods, plugins, or services running on our infrastructure.",
        "**No Warranty:** Our services are provided \"as is\" without warranties of any kind, either express or implied.",
      ],
    },
    {
      title: "16. Indemnification",
      content: "You agree to indemnify, defend, and hold harmless VixonCloud, its founders (Deepak and Akshit), employees, and affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:",
      list: [
        "Your use of our Services.",
        "Your violation of these Terms.",
        "Your violation of any applicable law or regulation.",
        "Any content you host, distribute, or transmit through our Services.",
        "Any dispute between you and a third party related to your use of our Services.",
      ],
    },
    {
      title: "17. Force Majeure",
      content: "VixonCloud shall not be liable for any failure or delay in performing its obligations under these Terms if such failure or delay results from circumstances beyond our reasonable control, including but not limited to:",
      list: [
        "Natural disasters (earthquakes, floods, hurricanes).",
        "War, terrorism, civil unrest, or government actions.",
        "Power outages, internet infrastructure failures, or telecommunications disruptions.",
        "Pandemics, epidemics, or quarantine restrictions.",
        "Cyberattacks targeting our infrastructure or upstream providers.",
        "Hardware failures beyond our control (manufacturer defects, supply chain issues).",
      ],
    },
    {
      title: "18. Bulk Data Loss Compensation",
      content: "In the event of a catastrophic failure — including but not limited to complete node failure, data center outage, storage array loss, or any circumstance resulting in bulk data loss affecting multiple servers or users — VixonCloud will compensate all affected users by extending their active plan by a minimum of 5 days at no additional cost.",
      list: [
        "**Automatic Compensation:** The extension applies automatically to all impacted accounts.",
        "**Severity-Based:** The exact extension may be increased based on the severity and duration of the incident.",
        "**Communication:** We will communicate details of such events and compensations via Discord within 48 hours of the incident.",
        "**Definition:** \"Bulk data loss\" refers to any incident affecting 3 or more users simultaneously.",
      ],
    },
    {
      title: "19. Modifications to Terms",
      content: "The founders (Deepak and Akshit) reserve the absolute right to modify, update, amend, or replace any part of these Terms of Service at any time, with or without prior notice, at their sole discretion.",
      list: [
        "**Immediate Effect:** Changes take effect immediately upon posting on the website.",
        "**No Notification:** We are not obligated to notify users of changes, though significant changes may be announced via Discord.",
        "**Your Responsibility:** It is your responsibility to review these terms periodically.",
        "**Acceptance:** Continued use of our Services after any changes constitutes full acceptance of the modified terms.",
        "**Previous Versions:** Previous versions of these Terms may be available upon request.",
      ],
    },
    {
      title: "20. Dispute Resolution",
      content: "In the event of any dispute arising from these Terms or your use of our Services:",
      list: [
        "**Informal Resolution:** You agree to first attempt to resolve any dispute informally by contacting us via Discord. Most issues can be resolved without formal proceedings.",
        "**Governing Law:** These Terms shall be governed by and construed in accordance with the laws of India.",
        "**Jurisdiction:** Any disputes that cannot be resolved informally shall be subject to the exclusive jurisdiction of the courts in India.",
        "**Arbitration:** Both parties agree to attempt to resolve disputes through binding arbitration before resorting to litigation, unless otherwise required by applicable law.",
      ],
    },
    {
      title: "21. Severability",
      content: "If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving its original intent.",
    },
    {
      title: "22. Entire Agreement",
      content: "These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and VixonCloud regarding the use of our Services. This agreement supersedes all prior agreements, understandings, and representations, whether written or oral.",
    },
    {
      title: "23. Contact",
      content: `For questions, concerns, or requests regarding these Terms of Service, contact us via Discord: ${invite}.`,
    },
    {
      title: "24. Ownership",
      content: "VixonCloud is owned and operated by Akshit and Deepak. All rights reserved.",
    },
  ];

  return (
    <div className="min-h-screen relative">
      <SEOHead
        title="Terms of Service — VixonCloud"
        description="VixonCloud terms of service, refund policy, acceptable use policy, and service level agreement."
        path="/tos"
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
              Terms of <span className="gradient-text">Service</span>
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
                  <p className="text-sm font-semibold text-amber-300 mb-1">Important — Read Before Using</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    By purchasing or using any VixonCloud service, you agree to these Terms. These terms protect both you and us. If anything is unclear, ask on Discord before purchasing.
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

export default TermsOfService;
