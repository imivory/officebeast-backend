import { UserAnswer, Question, Monster } from "./schema";

export function calculateResult(
  answers: UserAnswer[],
  questions: Question[],
  monsters: Monster[]
): { monster: Monster; scoreMap: Record<number, number> } {
  const scoreMap: Record<number, number> = {};

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
      const monsterTypes: string[] =
        typeof monster.types === "string"
          ? (monster.types as string).replace(/[{}]/g, "").split(",")
          : (monster.types as string[]);
      const overlap = monsterTypes.some((type: string) =>
        question.types.map((t: string) => t.toLowerCase()).includes(type.toLowerCase())
      );
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
  const monster = monsters.find((m) => m.id === selectedId)!;

  return { monster, scoreMap };
} 