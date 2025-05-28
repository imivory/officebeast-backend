"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateResult = calculateResult;
function calculateResult(userAnswers, questions, monsters) {
    const scoreMap = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
    for (const answer of userAnswers) {
        const question = questions.find((q) => q.id === answer.questionId);
        if (!question)
            continue;
        for (const type of question.types) {
            scoreMap[type] += 1;
        }
    }
    const priority = ["A", "B", "C", "D", "E", "F"];
    const maxScore = Math.max(...Object.values(scoreMap));
    const maxTypes = Object.entries(scoreMap)
        .filter(([_, score]) => score === maxScore)
        .map(([type]) => type);
    const finalType = priority.find((type) => maxTypes.includes(type));
    if (!finalType)
        throw new Error("점수 계산 실패");
    const matchedMonster = monsters.find((m) => m.types.includes(finalType));
    if (!matchedMonster)
        throw new Error(`해당 유형 몬스터 없음: ${finalType}`);
    return matchedMonster;
}
