import { ArrowLeft, Flower2, Leaf, Sparkles, Sprout } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useFlowerBucks from "../hooks/useFlowerBucks.js";
import { formatFlowerBucks } from "../utils/flowerBucks.js";
import { setPageMeta } from "../utils/meta.js";

const FIELD_FLOWER_COUNT = 25;
const SAFE_FLOWER_COUNT = 24;
const REWARD_BASE_PRESETS = [10, 100, 500, 1000];

function getPoisonFlowerIndex() {
  return Math.floor(Math.random() * FIELD_FLOWER_COUNT);
}

function getBloomMultiplier(safeFlowers) {
  if (safeFlowers >= SAFE_FLOWER_COUNT) {
    return 100;
  }

  if (safeFlowers < 10) {
    return 0;
  }

  return 1.5 + ((safeFlowers - 10) * 0.2);
}

function getPotentialReward(rewardBase, safeFlowers) {
  const multiplier = getBloomMultiplier(safeFlowers);
  return Math.round(rewardBase * multiplier);
}

function clampRewardBase(value, balance) {
  const amount = Math.floor(Number(value) || 0);
  return Math.min(Math.max(amount, 0), balance);
}

export default function FlowerFieldPage() {
  const { balance, awardFlowerBucks } = useFlowerBucks();
  const [selectedBase, setSelectedBase] = useState(0);
  const [roundBase, setRoundBase] = useState(0);
  const [poisonFlowerIndex, setPoisonFlowerIndex] = useState(null);
  const [revealedFlowers, setRevealedFlowers] = useState([]);
  const [roundStatus, setRoundStatus] = useState("setup");
  const [collectedReward, setCollectedReward] = useState(0);

  const safeFlowerCount = revealedFlowers.length;
  const bloomMultiplier = getBloomMultiplier(safeFlowerCount);
  const bloomMultiplierLabel = bloomMultiplier >= 100
    ? "100x"
    : bloomMultiplier > 0
      ? `${bloomMultiplier.toFixed(1)}x`
      : "Building";
  const currentRewardBase = roundStatus === "setup" ? selectedBase : roundBase;
  const potentialReward = getPotentialReward(currentRewardBase, safeFlowerCount);
  const canCollect = (roundStatus === "active" || roundStatus === "flowerbloom")
    && safeFlowerCount >= 10
    && potentialReward > 0;

  useEffect(() => {
    setPageMeta(
      "Flower Field",
      "A hidden Floraseek FlowerBuck mini-game tucked behind the Hydrangea profile."
    );
  }, []);

  useEffect(() => {
    setSelectedBase((currentBase) => {
      if (currentBase > 0 && currentBase <= balance) {
        return currentBase;
      }

      return balance > 0 ? Math.min(10, balance) : 0;
    });
  }, [balance]);

  function updateSelectedBase(value) {
    setSelectedBase(clampRewardBase(value, balance));
  }

  function startRound() {
    const nextBase = clampRewardBase(selectedBase, balance);

    if (nextBase <= 0) {
      return;
    }

    setRoundBase(nextBase);
    setPoisonFlowerIndex(getPoisonFlowerIndex());
    setRevealedFlowers([]);
    setRoundStatus("active");
    setCollectedReward(0);
  }

  function startNewRound() {
    setPoisonFlowerIndex(null);
    setRevealedFlowers([]);
    setRoundBase(0);
    setRoundStatus("setup");
    setCollectedReward(0);
  }

  function revealFlower(index) {
    if (roundStatus !== "active" || revealedFlowers.includes(index)) {
      return;
    }

    if (index === poisonFlowerIndex) {
      setRoundStatus("poison");
      return;
    }

    const nextRevealedFlowers = [...revealedFlowers, index];
    setRevealedFlowers(nextRevealedFlowers);

    if (nextRevealedFlowers.length === SAFE_FLOWER_COUNT) {
      setRoundStatus("flowerbloom");
    }
  }

  function collectFlowers() {
    if (!canCollect) {
      return;
    }

    awardFlowerBucks(potentialReward);
    setCollectedReward(potentialReward);
    setRoundStatus(safeFlowerCount === SAFE_FLOWER_COUNT ? "collected-flowerbloom" : "collected");
  }

  const roundMessage = useMemo(() => {
    if (roundStatus === "setup") {
      return "Choose a Reward Base, then open the field one flower at a time.";
    }

    if (roundStatus === "poison") {
      return "Poison Flower Found. Your existing FlowerBucks stay exactly where they are.";
    }

    if (roundStatus === "flowerbloom") {
      return "100x FlowerBloom. Every safe flower opened into a rare full-field bloom.";
    }

    if (roundStatus === "collected-flowerbloom") {
      return `FlowerBloom collected. ${formatFlowerBucks(collectedReward)} FlowerBucks were added.`;
    }

    if (roundStatus === "collected") {
      return `Flowers collected. ${formatFlowerBucks(collectedReward)} FlowerBucks were added.`;
    }

    return safeFlowerCount < 10
      ? "The first 9 safe flowers build suspense. Bloom rewards begin at 10."
      : "You can Collect Flowers now, or keep exploring the field.";
  }, [collectedReward, roundStatus, safeFlowerCount]);

  return (
    <section className="flower-field-page">
      <div className="container">
        <Link className="back-link flower-field-back" to="/plants/hydrangea">
          <ArrowLeft size={17} aria-hidden="true" />
          Return to Hydrangea
        </Link>

        <div className="flower-field-hero">
          <div>
            <p className="eyebrow">
              <Leaf size={16} aria-hidden="true" />
              Hidden Flower Field
            </p>
            <h1>Flower Field</h1>
            <p>
              Explore a secret 5 by 5 field. Safe flowers bloom into FlowerBuck rewards, while one
              hidden Poison Flower ends the round without taking any FlowerBucks away.
            </p>
          </div>
          <div className="flower-field-balance">
            <Flower2 size={20} aria-hidden="true" />
            <span>{formatFlowerBucks(balance)}</span>
            <small>FlowerBucks available</small>
          </div>
        </div>

        <div className="flower-field-layout">
          <aside className="flower-field-panel">
            <div>
              <p className="eyebrow">
                <Sparkles size={15} aria-hidden="true" />
                Reward Base
              </p>
              <h2>Choose your base.</h2>
              <p>
                The Reward Base only calculates possible rewards. It is never removed or held from
                your current FlowerBuck balance.
              </p>
            </div>

            <div className="reward-base-grid">
              {REWARD_BASE_PRESETS.map((amount) => (
                <button
                  className={selectedBase === amount ? "selected" : ""}
                  type="button"
                  key={amount}
                  disabled={roundStatus !== "setup" || amount > balance}
                  onClick={() => updateSelectedBase(amount)}
                >
                  {formatFlowerBucks(amount)}
                </button>
              ))}
            </div>

            <label className="reward-base-custom">
              <span>Custom amount</span>
              <input
                type="number"
                min="0"
                max={balance}
                step="1"
                value={selectedBase}
                disabled={roundStatus !== "setup"}
                onChange={(event) => updateSelectedBase(event.target.value)}
              />
            </label>

            <div className="flower-field-actions">
              <button
                className="button secondary"
                type="button"
                disabled={roundStatus !== "setup" || balance <= 0}
                onClick={() => updateSelectedBase(balance)}
              >
                Max
              </button>
              {roundStatus === "setup" ? (
                <button
                  className="button primary"
                  type="button"
                  disabled={selectedBase <= 0 || selectedBase > balance}
                  onClick={startRound}
                >
                  Start Round
                </button>
              ) : (
                <button className="button secondary" type="button" onClick={startNewRound}>
                  Explore Again
                </button>
              )}
            </div>
          </aside>

          <div className="flower-field-game">
            <div className="flower-field-stats" aria-live="polite">
              <div>
                <span>Safe Flowers</span>
                <strong>{safeFlowerCount} / {SAFE_FLOWER_COUNT}</strong>
              </div>
              <div>
                <span>Bloom Multiplier</span>
                <strong>{bloomMultiplierLabel}</strong>
              </div>
              <div>
                <span>Potential Reward</span>
                <strong>{formatFlowerBucks(potentialReward)}</strong>
              </div>
              <div>
                <span>Reward Base</span>
                <strong>{formatFlowerBucks(currentRewardBase)}</strong>
              </div>
            </div>

            <div className={`flower-field-status flower-field-status-${roundStatus}`}>
              <Sprout size={18} aria-hidden="true" />
              <p>{roundMessage}</p>
            </div>

            <div className={`flower-field-grid ${roundStatus}`} aria-label="Flower Field grid">
              {Array.from({ length: FIELD_FLOWER_COUNT }, (_, index) => {
                const isSafe = revealedFlowers.includes(index);
                const isPoison = roundStatus === "poison" && index === poisonFlowerIndex;
                const isUnopenedPoison = roundStatus === "flowerbloom" && index === poisonFlowerIndex;

                return (
                  <button
                    className={[
                      "field-flower",
                      isSafe ? "safe" : "",
                      isPoison ? "poison" : "",
                      isUnopenedPoison ? "quiet-poison" : "",
                    ].filter(Boolean).join(" ")}
                    type="button"
                    key={index}
                    disabled={roundStatus !== "active" || isSafe}
                    aria-label={isSafe ? "Safe flower opened" : "Open flower"}
                    onClick={() => revealFlower(index)}
                  >
                    <Flower2 size={26} aria-hidden="true" />
                    <span className="field-flower-glow" />
                  </button>
                );
              })}
            </div>

            <div className="flower-field-round-actions">
              {canCollect && (
                <button className="button primary flower-collect-button" type="button" onClick={collectFlowers}>
                  Collect Flowers
                </button>
              )}
              {(roundStatus === "poison" || roundStatus === "collected" || roundStatus === "collected-flowerbloom") && (
                <button className="button secondary" type="button" onClick={startNewRound}>
                  Start New Round
                </button>
              )}
            </div>

            {(roundStatus === "flowerbloom" || roundStatus === "collected-flowerbloom") && (
              <div className="flowerbloom-particles" aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => (
                  <span key={index} style={{ "--particle-index": index }} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
