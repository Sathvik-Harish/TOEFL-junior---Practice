// Fixed error: properly enclosed JSX returned in the start screen.

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const questionSets = [
    // QUESTION SETS BEGIN
    // Existing 4 sets...
    {
        questions: [
            {
                question: "Which sentence uses an appositive correctly?",
                options: [
                    "A. My dog, he loves bones.",
                    "B. My dog who loves bones.",
                    "C. My dog, a golden retriever, loves bones.",
                    "D. My dog loves bones, he is cute."
                ],
                answer: "C"
            },
            {
                question: "Which word is the antonym of 'lucid'?",
                options: ["A. Clear", "B. Bright", "C. Obscure", "D. Transparent"],
                answer: "C"
            }
        ],
        reading: {
            textParts: ["The professor ", " the theory in such a ", " way that even ", " students could grasp its ", "."],
            options: [["explained", "confused", "rejected"], ["lucid", "ambiguous", "vague"], ["novice", "expert", "lazy"], ["complexity", "simplicity", "routine"]],
            answers: ["explained", "lucid", "novice", "complexity"]
        }
    },
    {
        questions: [
            {
                question: "Which of the following demonstrates correct use of a semicolon?",
                options: [
                    "A. I like tea; and coffee.",
                    "B. I like tea; I like coffee too.",
                    "C. I like tea: I like coffee too.",
                    "D. I like tea, and coffee;"
                ],
                answer: "B"
            },
            {
                question: "Which word best fits the context: 'The politician gave an _______ answer to avoid controversy.'",
                options: ["A. equivocal", "B. sincere", "C. candid", "D. lucid"],
                answer: "A"
            }
        ],
        reading: {
            textParts: ["The committee's decision was met with ", ", especially by those who ", ", the outcome. The spokesperson tried to ", " the tension with ", " statements."],
            options: [["skepticism", "support", "apathy"], ["disagreed with", "endorsed", "ignored"], ["escalate", "diffuse", "highlight"], ["reassuring", "provocative", "ambiguous"]],
            answers: ["skepticism", "disagreed with", "diffuse", "reassuring"]
        }
    },
    {
        questions: [
            {
                question: "Choose the correct sentence using conditional form:",
                options: [
                    "A. If he studied, he would pass.",
                    "B. If he studies, he will passed.",
                    "C. If he had study, he would have passed.",
                    "D. If he study, he would passed."
                ],
                answer: "A"
            },
            {
                question: "Which is the best synonym for 'ephemeral'?",
                options: ["A. Lasting", "B. Temporary", "C. Constant", "D. Lengthy"],
                answer: "B"
            }
        ],
        reading: {
            textParts: ["The festival was a ", " celebration, marked by ", " performances and a vibrant ", " that ", " away with the sunrise."],
            options: [["ephemeral", "perpetual", "dull"], ["exuberant", "tedious", "dissonant"], ["atmosphere", "confusion", "routine"], ["lingered", "dissolved", "intensified"]],
            answers: ["ephemeral", "exuberant", "atmosphere", "dissolved"]
        }
    },
    {
        questions: [
            {
                question: "Which sentence uses a restrictive clause correctly?",
                options: [
                    "A. Students who study hard often succeed.",
                    "B. Students, who study hard, often succeed.",
                    "C. Students which study hard, succeed.",
                    "D. Students that, study hard often succeed."
                ],
                answer: "A"
            },
            {
                question: "Choose the best word to replace 'abundant' in this sentence: 'There was abundant rainfall last month.'",
                options: ["A. Scant", "B. Excessive", "C. Sparse", "D. Meager"],
                answer: "B"
            }
        ],
        reading: {
            textParts: ["The region ", " from ", " rainfall during the monsoon, resulting in ", " harvests and ", " water levels."],
            options: [["benefited", "suffered", "collapsed"], ["abundant", "minimal", "erratic"], ["bountiful", "failed", "scarce"], ["elevated", "reduced", "absent"]],
            answers: ["benefited", "abundant", "bountiful", "elevated"]
        }
    },
    {
        questions: [
            {
                question: "Choose the correct complex sentence:",
                options: [
                    "A. I like books, they are fun.",
                    "B. Because I like books, I read daily.",
                    "C. I like books and read.",
                    "D. Books fun, I read."
                ],
                answer: "B"
            },
            {
                question: "What does the phrase 'to call the shots' mean?",
                options: ["A. To fire a gun", "B. To take blame", "C. To be in control", "D. To referee a game"],
                answer: "C"
            }
        ],
        reading: {
            textParts: ["In most organizations, it is the board that ", " the major decisions, ", " the course of action that ", " the entire workforce."],
            options: [["calls", "ignores", "delays"], ["dictating", "resisting", "following"], ["impacts", "favors", "hinders"], ["benefits", "affects", "diverts"]],
            answers: ["calls", "dictating", "impacts", "affects"]
        }
    }, $1]
questions: [
    {
        question: "Which sentence demonstrates correct subjunctive mood usage?",
        options: [
            "A. I wish I was taller.",
            "B. If I was you, I’d study more.",
            "C. I suggest that he go to the doctor.",
            "D. If she was here, we could start."
        ],
        answer: "C"
    },
    {
        question: "Choose the antonym of 'resilient':",
        options: ["A. Robust", "B. Fragile", "C. Tenacious", "D. Hardy"],
        answer: "B"
    }
],
    reading; {
    textParts: ["The architect's design was not only ", " but also highly ", ", allowing it to withstand ", " environmental conditions and still maintain structural ", "."],
        options;[["aesthetic", "mundane", "obsolete"], ["functional", "fragile", "redundant"], ["adverse", "mild", "banal"], ["integrity", "chaos", "erosion"]],
            answers;["aesthetic", "functional", "adverse", "integrity"]
} // Final question set
;

export default function TOEFLJrStreakApp() {
    const [started, setStarted] = useState(false);
    const [selectedSet, setSelectedSet] = useState(null);
    const [currentAnswers, setCurrentAnswers] = useState([]);
    const [readingAnswers, setReadingAnswers] = useState([]);
    const [score, setScore] = useState(null);
    const [feedback, setFeedback] = useState({});
    const [timeLeft, setTimeLeft] = useState(180);

    useEffect(() => {
        let timer;
        if (started && score === null) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [started, score]);

    const startTest = () => {
        if (questionSets.length === 0) return;
        const randomSet = questionSets[Math.floor(Math.random() * questionSets.length)];
        setSelectedSet(randomSet);
        setCurrentAnswers(Array(randomSet.questions.length).fill(null));
        setReadingAnswers(Array(randomSet.reading.answers.length).fill(""));
        setScore(null);
        setFeedback({});
        setStarted(true);
        setTimeLeft(180);
    };

    const handleOptionChange = (qIndex, selectedOption) => {
        const updated = [...currentAnswers];
        updated[qIndex] = selectedOption;
        setCurrentAnswers(updated);
    };

    const handleReadingChange = (index, value) => {
        const updated = [...readingAnswers];
        updated[index] = value;
        setReadingAnswers(updated);
    };

    const handleSubmit = () => {
        let correct = 0;
        const result = {};
        selectedSet.questions.forEach((q, idx) => {
            if (currentAnswers[idx] === q.answer) {
                correct++;
                result[`q${idx}`] = true;
            } else {
                result[`q${idx}`] = false;
            }
        });
        selectedSet.reading.answers.forEach((a, idx) => {
            if (readingAnswers[idx] === a) {
                correct++;
                result[`r${idx}`] = true;
            } else {
                result[`r${idx}`] = false;
            }
        });
        setScore(correct);
        setFeedback(result);
    };

    if (!started) {
        return (
            <div style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Practice for TOEFL<sup>®</sup> Junior<sup>®</sup></h1>
                <p style={{ fontSize: '0.95rem', color: '#4B5563', marginBottom: '2rem' }}>
                    <strong>Notes:</strong><br />
                    The questions and answers in this are not accurate to the official TOEFL<sup>®</sup> Junior<sup>®</sup> test. This is a practice activity to help you prepare and check if you're ready to take the real test. <mark><strong>Some of the features might not work.</strong></mark>
                </p>
                <Button style={{ backgroundColor: '#6D28D9', color: 'white', padding: '0.75rem 1.5rem' }} onClick={startTest}>Start Practice</Button>
            </div>
        );
    }

    return (
        <div style={{ padding: '1.5rem', maxWidth: '768px', margin: '0 auto', background: 'linear-gradient(to bottom right, #ebf4ff, #ede9fe)', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#6b21a8' }}>🌟 TOEFL Junior Practice Set</h1>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
                <div style={{ fontSize: '1rem', fontWeight: '500' }}>⏱️ Time Left: {timeLeft}s</div>
                <div style={{ flex: 1, margin: '0 1rem', background: '#ddd', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.round(((currentAnswers.filter(Boolean).length + readingAnswers.filter(Boolean).length) / (selectedSet.questions.length + selectedSet.reading.answers.length)) * 100)}%`, background: '#7c3aed', height: '0.75rem' }}></div>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '500' }}>{Math.round(((currentAnswers.filter(Boolean).length + readingAnswers.filter(Boolean).length) / (selectedSet.questions.length + selectedSet.reading.answers.length)) * 100)}% done</div>
            </div>

            {selectedSet.questions.map((q, idx) => (
                <div key={idx} style={{ marginBottom: '1.25rem', border: '1px solid #d8b4fe', borderRadius: '0.5rem', padding: '1rem', background: feedback[`q${idx}`] === false ? '#fef2f2' : feedback[`q${idx}`] === true ? '#ecfdf5' : '#fff' }}>
                    <p style={{ fontWeight: '500', color: '#4338ca', marginBottom: '0.5rem' }}>Q{idx + 1} (1 pt): {q.question}</p>
                    {q.options.map((opt, oidx) => (
                        <div key={oidx} style={{ marginBottom: '0.25rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1f2937' }}>
                                <input
                                    type="radio"
                                    name={`q${idx}`}
                                    value={opt.charAt(0)}
                                    checked={currentAnswers[idx] === opt.charAt(0)}
                                    onChange={() => handleOptionChange(idx, opt.charAt(0))}
                                    disabled={score !== null}
                                />
                                {opt} {score !== null && (q.answer === opt.charAt(0) ? '✅' : (currentAnswers[idx] === opt.charAt(0) ? '❌' : ''))}
                            </label>
                        </div>
                    ))}
                </div>
            ))}

            <div style={{ marginBottom: '2rem', border: '1px solid #d8b4fe', borderRadius: '0.5rem', padding: '1rem', background: '#fff' }}>
                <p style={{ fontWeight: '500', color: '#4338ca', marginBottom: '0.5rem' }}>Reading Fill-in-the-Blanks (1 pt each)</p>
                <p style={{ lineHeight: '1.6' }}>
                    {selectedSet.reading.textParts.map((part, idx) => (
                        <span key={idx}>
                            {part}
                            {idx < selectedSet.reading.options.length && (
                                <>
                                    <select
                                        value={readingAnswers[idx]}
                                        onChange={(e) => handleReadingChange(idx, e.target.value)}
                                        disabled={score !== null}
                                        style={{ margin: '0 0.5rem', padding: '0.25rem 0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', backgroundColor: score !== null && feedback[`r${idx}`] === false ? '#fecaca' : score !== null && feedback[`r${idx}`] === true ? '#bbf7d0' : 'white' }}
                                    >
                                        <option value="">-- choose --</option>
                                        {selectedSet.reading.options[idx].map((opt, optIdx) => (
                                            <option key={optIdx} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    {score !== null && (readingAnswers[idx] === selectedSet.reading.answers[idx] ? '✅' : '❌')}
                                </>
                            )}
                        </span>
                    ))}
                </p>
            </div>

            {score === null ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <Button style={{ backgroundColor: '#7c3aed', color: '#fff' }} onClick={handleSubmit}>Submit Answers</Button>
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4b5563' }}>🎉 Results Summary</h2>
                    <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>You scored <strong>{score}</strong> out of <strong>{selectedSet.questions.length + selectedSet.reading.answers.length}</strong> possible points.</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.25rem', color: '#6b7280' }}>Review the ✅ and ❌ markers to learn from mistakes.</p>
                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Button style={{ backgroundColor: '#3b82f6', color: '#fff' }} onClick={() => startTest()}>
                            🔁 Try Different Set
                        </Button>
                        <Button style={{ backgroundColor: '#facc15', color: '#000' }} onClick={() => setStarted(false)}>
                            💤 Take a Break
                        </Button>
                        <Button style={{ backgroundColor: '#10b981', color: '#fff' }} onClick={() => {
                            setCurrentAnswers(Array(selectedSet.questions.length).fill(null));
                            setReadingAnswers(Array(selectedSet.reading.answers.length).fill(""));
                            setScore(null);
                            setFeedback({});
                            setTimeLeft(180);
                        }}>
                            🔄 Retry This Set
                        </Button>
                    </div>
                </div>
            )}

            <p style={{ fontSize: '0.65rem', textAlign: 'center', marginTop: '2rem', color: '#6b7280' }}>
                © TOEFL<sup>®</sup> Junior<sup>®</sup>
            </p>
        </div>
    );
}
