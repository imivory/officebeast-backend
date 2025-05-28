"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateResult = calculateResult;
function calculateResult(answers, questions, monsters) {
    const scoreMap = {};
    // 초기 점수 설정
    monsters.forEach((monster) => {
        scoreMap[monster.id] = 0;
    });
    answers.forEach((answer) => {
        const question = questions.find((q) => q.id === answer.questionId);
        if (!question) {
            return;
        }
        monsters.forEach((monster) => {
            const monsterTypes = typeof monster.types === "string"
                ? monster.types.replace(/[{}]/g, "").split(",")
                : monster.types;
            const overlap = monsterTypes.some((type) => question.types.map((t) => t.toLowerCase()).includes(type.toLowerCase()));
            if (overlap) {
                scoreMap[monster.id] += 1;
            }
        });
    });
    // 동점 처리: 최고 점수 몬스터 중 랜덤 선택
    const topScore = Math.max(...Object.values(scoreMap));
    const topMonsterIds = Object.entries(scoreMap)
        .filter(([_, score]) => score === topScore)
        .map(([id]) => Number(id));
    const selectedId = topMonsterIds[Math.floor(Math.random() * topMonsterIds.length)];
    const monster = monsters.find((m) => m.id === selectedId);
    return { monster, scoreMap };
}
