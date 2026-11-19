import { useLanguage } from "../i18n/context.js";
import { Mail } from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <h1>{t("Contact Floraseek")}</h1>
          <p>{t("Send Lincoln your questions, feedback, bug reports or suggestions.")}</p>
          <p className="contact-email">
            <Mail size={19} aria-hidden="true" />
            <a className="text-link" href="mailto:lincoln.zhang11@gmail.com">
              {t("lincoln.zhang11@gmail.com")}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
