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
          <h1>Contact Floraseek</h1>
          <p>Send Lincoln your questions, feedback, bug reports or suggestions.</p>
          <p className="contact-email">
            <Mail size={19} aria-hidden="true" />
            <a className="text-link" href="mailto:lincoln.zhang11@gmail.com">
              lincoln.zhang11@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
