import { useLanguage } from "../i18n/context.js";
import { Sprout } from "lucide-react";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">
            <Sprout size={16} aria-hidden="true" />
            {t("About Floraseek")}
          </p>
          <h1>{t("About the Creator")}</h1>
          <p>
            {t("Floraseek was created by Lincoln Zhang as a personal project to make choosing plants simpler and more accessible.")}
          </p>
          <p>
            {t("Lincoln designed the website to help people discover plants based on their climate, difficulty, and preferences. While building Floraseek, he developed skills in website design, coding, research, organisation, and using feedback to improve a digital product.")}
          </p>
          <p>
            {t("The project also helped Lincoln learn more about different plants and the conditions they need to grow. Floraseek reflects his interest in creating useful online tools that solve everyday problems in a clear and practical way.")}
          </p>
        </div>
      </div>
    </section>
  );
}
