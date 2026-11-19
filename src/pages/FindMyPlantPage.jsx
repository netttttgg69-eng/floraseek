import { useLanguage } from "../i18n/context.js";
import { ArrowLeft, ArrowRight, Check, ListChecks, MapPin, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge.jsx";
import ComparePlantButton from "../components/ComparePlantButton.jsx";
import PlantImage from "../components/PlantImage.jsx";
import SavePlantButton from "../components/SavePlantButton.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { labelFor } from "../data/plants.js";
import {
  getQuizRecommendations,
  getResolvedQuizAnswers,
  quizQuestions,
} from "../utils/plantQuiz.js";

export default function FindMyPlantPage() {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const isResultsStep = stepIndex >= quizQuestions.length;
  const currentQuestion = quizQuestions[stepIndex];
  const progress = isResultsStep
    ? 100
    : Math.round(((stepIndex + 1) / quizQuestions.length) * 100);
  const recommendations = useMemo(() => getQuizRecommendations(answers), [answers]);
  const resolvedAnswers = useMemo(() => getResolvedQuizAnswers(answers), [answers]);

  function chooseAnswer(questionId, value) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: value,
    }));
  }

  function restartQuiz() {
    setAnswers({});
    setStepIndex(0);
  }

  return (
    <section className="page-section quiz-page">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            {t("Find My Plant")}
          </p>
          <h1>{t("Find a plant that fits you.")}</h1>
          <p>
            {t("Answer a few questions about your space and preferences to find your closest matches.")}
          </p>
        </div>

        <div className="quiz-shell">
          <div className="quiz-progress" aria-label={t("Quiz progress: {progress}% complete", { progress })}>
            <span>{isResultsStep ? t("Results") : t("Question {current} of {total}", { current: stepIndex + 1, total: quizQuestions.length })}</span>
            <div className="quiz-progress-track">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          {!isResultsStep ? (
            <div className="quiz-question" key={currentQuestion.id}>
              <h2 id={`quiz-question-${currentQuestion.id}`}>{t(currentQuestion.title)}</h2>
              <div
                className="quiz-options"
                role="radiogroup"
                aria-labelledby={`quiz-question-${currentQuestion.id}`}
              >
                {currentQuestion.options.map((option) => {
                  const selected = answers[currentQuestion.id] === option.value;

                  return (
                    <button
                      className={`quiz-option ${selected ? "selected" : ""}`.trim()}
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => chooseAnswer(currentQuestion.id, option.value)}
                    >
                      <span className="quiz-option-label">{t(option.label)}</span>
                      <span className="quiz-option-check" aria-hidden="true">
                        {selected && <Check size={17} />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="quiz-actions">
                <button
                  className="button secondary"
                  type="button"
                  disabled={stepIndex === 0}
                  onClick={() => setStepIndex((currentStep) => Math.max(currentStep - 1, 0))}
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                  {t("Back")}
                </button>
                <button className="button secondary" type="button" onClick={restartQuiz}>
                  <RotateCcw size={17} aria-hidden="true" />
                  {t("Restart")}
                </button>
                <button
                  className="button primary"
                  type="button"
                  onClick={() => setStepIndex((currentStep) => currentStep + 1)}
                >
                  {stepIndex === quizQuestions.length - 1 ? t("See results") : t("Next")}
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : (
            <div className="quiz-results">
              <SectionHeader eyebrow={t("Recommendations")} title={t("Your top matches")}>
                {t("These plants are the closest matches for your answers.")}
              </SectionHeader>

              {resolvedAnswers.climate === "not-sure" && (
                <div className="climate-prompt">
                  <MapPin size={18} aria-hidden="true" />
                  <p>
                    {t("Not sure about climate? Use the existing Find Your Climate feature before narrowing the finder.")}
                  </p>
                  <Link className="text-link" to="/finder#climate-finder">
                    {t("Find your climate")}
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              )}

              <div className="card-grid three">
                {recommendations.map(({ plant, reasons }) => (
                  <article className="quiz-result-card plant-card" key={plant.id}>
                    <PlantImage plant={plant} />
                    <div className="plant-card-body">
                      <div>
                        <p className="eyebrow">
                          <ListChecks size={16} aria-hidden="true" />
                          {t("Match")}
                        </p>
                        <h3>{t(plant.name)}</h3>
                        <div className="profile-badges plant-week-badges">
                          <Badge category="category" value={plant.category} />
                          <Badge category="difficulty" value={plant.difficulty} />
                          <span>{t(labelFor("type", plant.type))}</span>
                        </div>
                      </div>

                      <ul className="match-reasons">
                        {reasons.map((reason) => (
                          <li key={reason}>{t(reason)}</li>
                        ))}
                      </ul>

                      <div className="plant-card-actions">
                        <Link className="text-link" to={`/plants/${plant.slug}`}>
                          {t("View plant")}
                          <ArrowRight size={17} aria-hidden="true" />
                        </Link>
                        <SavePlantButton plant={plant} />
                        <ComparePlantButton plant={plant} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="quiz-actions results-actions">
                <button className="button secondary" type="button" onClick={restartQuiz}>
                  <RotateCcw size={17} aria-hidden="true" />
                  {t("Retake the quiz")}
                </button>
                <Link className="button primary" to="/finder">
                  {t("Browse all plants")}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
