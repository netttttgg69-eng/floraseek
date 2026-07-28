import { ArrowLeft, ArrowRight, ListChecks, MapPin, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
import { setPageMeta } from "../utils/meta.js";

export default function FindMyPlantPage() {
  const [answers, setAnswers] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const isResultsStep = stepIndex >= quizQuestions.length;
  const currentQuestion = quizQuestions[stepIndex];
  const progress = isResultsStep
    ? 100
    : Math.round(((stepIndex + 1) / quizQuestions.length) * 100);
  const recommendations = useMemo(() => getQuizRecommendations(answers), [answers]);
  const resolvedAnswers = useMemo(() => getResolvedQuizAnswers(answers), [answers]);

  useEffect(() => {
    setPageMeta(
      "Find My Plant Quiz",
      "Answer a few Floraseek questions to get plant recommendations from the existing catalogue."
    );
  }, []);

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
            Find My Plant
          </p>
          <h1>Find a plant that fits you.</h1>
          <p>
            Answer a few quick questions and Floraseek will rank the best matches from the existing
            plant catalogue.
          </p>
        </div>

        <div className="quiz-shell">
          <div className="quiz-progress" aria-label={`Quiz progress: ${progress}% complete`}>
            <span>{isResultsStep ? "Results" : `Question ${stepIndex + 1} of ${quizQuestions.length}`}</span>
            <div className="quiz-progress-track">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          {!isResultsStep ? (
            <div className="quiz-question">
              <h2>{currentQuestion.title}</h2>
              <div className="quiz-options">
                {currentQuestion.options.map((option) => {
                  const selected = answers[currentQuestion.id] === option.value;

                  return (
                    <button
                      className={`quiz-option ${selected ? "selected" : ""}`.trim()}
                      key={option.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => chooseAnswer(currentQuestion.id, option.value)}
                    >
                      {option.label}
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
                  Back
                </button>
                <button className="button secondary" type="button" onClick={restartQuiz}>
                  <RotateCcw size={17} aria-hidden="true" />
                  Restart
                </button>
                <button
                  className="button primary"
                  type="button"
                  onClick={() => setStepIndex((currentStep) => currentStep + 1)}
                >
                  {stepIndex === quizQuestions.length - 1 ? "See results" : "Next"}
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : (
            <div className="quiz-results">
              <SectionHeader eyebrow="Recommendations" title="Your top matches">
                Floraseek scores every plant by your answers, then keeps catalogue order stable when
                results tie.
              </SectionHeader>

              {resolvedAnswers.climate === "not-sure" && (
                <div className="climate-prompt">
                  <MapPin size={18} aria-hidden="true" />
                  <p>
                    Not sure about climate? Use the existing Find Your Climate feature before
                    narrowing the finder.
                  </p>
                  <Link className="text-link" to="/finder#climate-finder">
                    Find your climate
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
                          Match
                        </p>
                        <h3>{plant.name}</h3>
                        <div className="profile-badges plant-week-badges">
                          <Badge category="category" value={plant.category} />
                          <Badge category="difficulty" value={plant.difficulty} />
                          <span>{labelFor("type", plant.type)}</span>
                        </div>
                      </div>

                      <ul className="match-reasons">
                        {reasons.map((reason) => (
                          <li key={reason}>{reason}</li>
                        ))}
                      </ul>

                      <div className="plant-card-actions">
                        <Link className="text-link" to={`/plants/${plant.slug}`}>
                          View plant
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
                  Retake the quiz
                </button>
                <Link className="button primary" to="/finder">
                  Browse all plants
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
