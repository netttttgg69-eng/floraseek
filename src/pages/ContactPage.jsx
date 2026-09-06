import { Mail } from "lucide-react";
import { useEffect } from "react";
import { setPageMeta } from "../utils/meta.js";

export default function ContactPage() {
  useEffect(() => {
    setPageMeta(
      "Contact Floraseek",
      "Contact Floraseek for questions, feedback, bug reports, or suggestions."
    );
  }, []);

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">
            <Mail size={16} aria-hidden="true" />
            Contact
          </p>
          <h1>Contact Floraseek</h1>
          <p>
            For questions, feedback, bug reports, or suggestions, contact:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a className="text-link" href="mailto:lincoln.zhang11@gmail.com">
              lincoln.zhang11@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
