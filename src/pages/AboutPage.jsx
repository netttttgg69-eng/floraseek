import { Sprout } from "lucide-react";
import { useEffect } from "react";
import { setPageMeta } from "../utils/meta.js";

export default function AboutPage() {
  useEffect(() => {
    setPageMeta(
      "About the Creator",
      "Learn about Lincoln Zhang, the creator of Floraseek."
    );
  }, []);

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">
            <Sprout size={16} aria-hidden="true" />
            About Floraseek
          </p>
          <h1>About the Creator</h1>
          <p>
            Floraseek was created by Lincoln Zhang as a personal project to make choosing plants
            simpler and more accessible.
          </p>
          <p>
            Lincoln designed the website to help people discover plants based on their climate,
            difficulty, and preferences. While building Floraseek, he developed skills in
            website design, coding, research, organisation, and using feedback to improve a digital
            product.
          </p>
          <p>
            The project also helped Lincoln learn more about different plants and the conditions
            they need to grow. Floraseek reflects his interest in creating useful online tools that
            solve everyday problems in a clear and practical way.
          </p>
        </div>
      </div>
    </section>
  );
}
