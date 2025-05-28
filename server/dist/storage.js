"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.MemStorage = void 0;
class MemStorage {
    constructor() {
        this.monstersData = new Map();
        this.strategiesData = new Map();
        this.questionsData = new Map();
        this.userAnswersData = new Map();
        this.monsterInsightsData = new Map();
        this.monstersCurrentId = 1;
        this.strategiesCurrentId = 1;
        this.questionsCurrentId = 1;
        this.userAnswersCurrentId = 1;
        this.insightsCurrentId = 1;
    }
    // Monster methods
    async getMonsters() {
        return Array.from(this.monstersData.values());
    }
    async getMonster(id) {
        return this.monstersData.get(id);
    }
    async createMonster(insertMonster) {
        const id = this.monstersCurrentId++;
        const monster = { ...insertMonster, id };
        this.monstersData.set(id, monster);
        return monster;
    }
    // Strategy methods
    async getMonsterStrategies(monsterId) {
        return Array.from(this.strategiesData.values())
            .filter((strategy) => strategy.monsterId === monsterId)
            .sort((a, b) => a.order - b.order);
    }
    async createStrategy(insertStrategy) {
        const id = this.strategiesCurrentId++;
        const strategy = { ...insertStrategy, id };
        this.strategiesData.set(id, strategy);
        return strategy;
    }
    // Question methods
    async getQuestions() {
        return Array.from(this.questionsData.values())
            .sort((a, b) => a.order - b.order);
    }
    async getQuestion(id) {
        return this.questionsData.get(id);
    }
    async createQuestion(insertQuestion) {
        const id = this.questionsCurrentId++;
        const question = { ...insertQuestion, id };
        this.questionsData.set(id, question);
        return question;
    }
    // User answer methods
    async createUserAnswer(insertUserAnswer) {
        const id = this.userAnswersCurrentId++;
        const userAnswer = { ...insertUserAnswer, id };
        this.userAnswersData.set(id, userAnswer);
        return userAnswer;
    }
    async getUserAnswers(sessionId) {
        return Array.from(this.userAnswersData.values())
            .filter((answer) => answer.sessionId === sessionId);
    }
    // Monster insight methods
    async getMonsterInsights(monsterId) {
        return Array.from(this.monsterInsightsData.values())
            .filter((insight) => insight.monsterId === monsterId)
            .sort((a, b) => a.order - b.order);
    }
    async createMonsterInsight(insertInsight) {
        const id = this.insightsCurrentId++;
        const insight = { ...insertInsight, id };
        this.monsterInsightsData.set(id, insight);
        return insight;
    }
    // Initialize demo data
    async initDemoData() {
        // Add 내로남불형 상사 monster
        await this.createMonster({
            name: "내로남불형 상사",
            emoji: "🧠",
            description: "자기중심적이고 이중잣대를 가진 상사. 실수는 남 탓, 성과는 자기 것.",
            traits: "비난, 억지 논리, 책임 회피",
            phrase: "그건 네가 잘 몰라서 그래.",
            empathyLevel: 1,
            fatigueLevel: 4,
            types: ["A"],
        });
        await this.createMonster({
            name: "감정폭발형 동료",
            emoji: "🌋",
            description: "기분에 따라 말과 행동이 달라지는 감정기복형 동료.",
            traits: "분노 표현, 욱하는 성향",
            phrase: "진짜 열받게 하네.",
            empathyLevel: 2,
            fatigueLevel: 3,
            types: ["B"],
        });
        await this.createMonster({
            name: "책임전가형 괴수",
            emoji: "🎯",
            description: "문제가 생기면 늘 원인을 남에게 돌리는 전가형 괴수.",
            traits: "핑계, 회피, 남 탓",
            phrase: "난 분명히 말했다니까?",
            empathyLevel: 2,
            fatigueLevel: 4,
            types: ["C"],
        });
        await this.createMonster({
            name: "과대포장형 중간관리자",
            emoji: "📣",
            description: "실제보다 자기 공을 부풀리며, 과시적 언행이 많은 관리자.",
            traits: "허세, 왜곡, 자기 PR",
            phrase: "내가 없었으면 어떻게 했을래?",
            empathyLevel: 3,
            fatigueLevel: 3,
            types: ["D"],
        });
        await this.createMonster({
            name: "무반응형 유령",
            emoji: "👻",
            description: "존재감 없이 피드백도 없고, 책임도 회피하는 무기력형.",
            traits: "무대응, 침묵, 회피",
            phrase: "...",
            empathyLevel: 1,
            fatigueLevel: 5,
            types: ["E"],
        });
        await this.createMonster({
            name: "비판중독형 선배",
            emoji: "🔪",
            description: "사사건건 후배를 평가하고 지적하는 비판 중심형.",
            traits: "지적질, 마이크로매니징",
            phrase: "그걸 왜 그렇게 해?",
            empathyLevel: 1,
            fatigueLevel: 4,
            types: ["F"],
        });
        // Add strategies for the monster
        await this.createQuestion({
            question: "말을 끊거나, 내 말을 무시하고 자기 말만 하려고 든다.",
            order: 1,
            types: ["D", "F"],
        });
        await this.createQuestion({
            question: "사과는 하지만, 책임은 지지 않는다.",
            order: 2,
            types: ["C"],
        });
        await this.createQuestion({
            question: "팀 실적은 자기 공, 실패는 남 탓으로 포장한다.",
            order: 3,
            types: ["C", "D"],
        });
        await this.createQuestion({
            question: "내가 의견을 내면 듣지 않다가, 누가 같은 말을 하면 바로 수용한다.",
            order: 4,
            types: ["D", "E"],
        });
        await this.createQuestion({
            question: "사적인 감정을 업무에 끌어와서 분위기를 망친 적이 있다.",
            order: 5,
            types: ["B"],
        });
        await this.createQuestion({
            question: "회의 중 타인을 공개적으로 비난하거나 조롱한 적이 있다.",
            order: 6,
            types: ["B", "F"],
        });
        await this.createQuestion({
            question: "내 감정을 이야기하면, '프로답지 않다'는 말을 듣는다.",
            order: 7,
            types: ["F", "E"],
        });
        await this.createQuestion({
            question: "무례하거나 부당한 말을 해놓고 '농담이었잖아'로 넘긴다.",
            order: 8,
            types: ["A", "D"],
        });
        await this.createQuestion({
            question: "본인의 감정은 자유롭게 표현하지만, 타인의 감정에는 둔감하다.",
            order: 9,
            types: ["B", "C"],
        });
        await this.createQuestion({
            question: "내가 실수하면 크게 지적하면서, 본인이 실수한 건 자연스레 넘어간다.",
            order: 10,
            types: ["C", "F"],
        });
        await this.createQuestion({
            question: "지시나 피드백이 자주 모호하고, 나중에 말을 바꾸는 일이 있다.",
            order: 11,
            types: ["D", "C"],
        });
        await this.createQuestion({
            question: "일을 분담받기보다 '나 아니면 안 돼' 식으로 과시하는 경향이 있다.",
            order: 12,
            types: ["D", "A"],
        });
        await this.createQuestion({
            question: "의견을 말하기 어렵고, 항상 눈치를 보게 만든다.",
            order: 13,
            types: ["E", "B"],
        });
        await this.createQuestion({
            question: "문제 상황에서 구체적인 해결보다 남 탓이나 핑계를 먼저 찾는다.",
            order: 14,
            types: ["C", "E"],
        });
        await this.createQuestion({
            question: "다른 사람과의 관계에서 경쟁심이나 질투심을 자주 드러낸다.",
            order: 15,
            types: ["D", "B"],
        });
        await this.createQuestion({
            question: "나를 대놓고 무시하거나, 공공연히 무능하다는 말을 한 적이 있다.",
            order: 16,
            types: ["F", "C"],
        });
        await this.createQuestion({
            question: "대화 중 내 말은 듣지 않고, 자기가 하고 싶은 말만 이어간다.",
            order: 17,
            types: ["D", "B"],
        });
        await this.createQuestion({
            question: "내가 피드백을 하면 방어적이고 공격적인 반응을 보인다.",
            order: 18,
            types: ["B", "E"],
        });
        await this.createQuestion({
            question: "평소엔 방관하다가 일이 터지면 '왜 보고 안 했냐'는 식으로 몰아간다.",
            order: 19,
            types: ["C", "E"],
        });
        await this.createQuestion({
            question: "자신은 상처를 잘 받는다며, 늘 조심히 대해달라고 요구한다.",
            order: 20,
            types: ["B", "A"],
        });
        //
        // 🧠 내로남불형 상사 (monsterId: 1)
        await this.createStrategy({
            monsterId: 1,
            order: 1,
            strategy: "대화 시 감정보다는 사실 중심으로 대응하세요.",
        });
        await this.createStrategy({
            monsterId: 1,
            order: 2,
            strategy: "본인의 성과는 문서로 정리해 두고 주기적으로 공유하세요.",
        });
        await this.createStrategy({
            monsterId: 1,
            order: 3,
            strategy: "대화 내용은 가능한 한 공식 채널을 통해 남겨두세요.",
        });
        await this.createMonsterInsight({
            monsterId: 1,
            order: 1,
            type: "warning",
            insight: "자신이 중심이 되어야 직성이 풀리는 성향입니다.",
        });
        await this.createMonsterInsight({
            monsterId: 1,
            order: 2,
            type: "danger",
            insight: "책임은 회피하고 성과는 독차지하려는 태도를 보입니다.",
        });
        await this.createMonsterInsight({
            monsterId: 1,
            order: 3,
            type: "success",
            insight: "문서화된 근거와 공식 기록이 이중잣대에 대한 방패가 될 수 있습니다.",
        });
        // 🌋 감정폭발형 동료 (monsterId: 2)
        await this.createStrategy({
            monsterId: 2,
            order: 1,
            strategy: "격한 감정에는 즉각 반응하지 말고, 시간을 두고 접근하세요.",
        });
        await this.createStrategy({
            monsterId: 2,
            order: 2,
            strategy: "논쟁을 피하고 논리적 근거로 중심을 잡으세요.",
        });
        await this.createStrategy({
            monsterId: 2,
            order: 3,
            strategy: "대화는 메시지 등 비대면 방식으로 조율하는 것이 효과적입니다.",
        });
        await this.createMonsterInsight({
            monsterId: 2,
            order: 1,
            type: "warning",
            insight: "감정 상태에 따라 반응이 예측 불가능합니다.",
        });
        await this.createMonsterInsight({
            monsterId: 2,
            order: 2,
            type: "danger",
            insight: "감정이 고조되면 타인을 공격하거나 상황을 악화시킬 수 있습니다.",
        });
        await this.createMonsterInsight({
            monsterId: 2,
            order: 3,
            type: "success",
            insight: "안정적인 상태에서는 비교적 수용적인 태도를 보입니다.",
        });
        // 🎯 책임전가형 괴수 (monsterId: 3)
        await this.createStrategy({
            monsterId: 3,
            order: 1,
            strategy: "업무 지시와 결과를 상세히 메모하거나 기록하세요.",
        });
        await this.createStrategy({
            monsterId: 3,
            order: 2,
            strategy: "책임 소재가 분명하지 않은 작업은 사전에 범위를 명확히 하세요.",
        });
        await this.createStrategy({
            monsterId: 3,
            order: 3,
            strategy: "문제 발생 시 빠르게 사실 관계를 정리해 공유하세요.",
        });
        await this.createMonsterInsight({
            monsterId: 3,
            order: 1,
            type: "warning",
            insight: "불리한 상황에선 타인에게 책임을 떠넘깁니다.",
        });
        await this.createMonsterInsight({
            monsterId: 3,
            order: 2,
            type: "danger",
            insight: "잘못은 인정하지 않고 빠져나갈 구실만 찾습니다.",
        });
        await this.createMonsterInsight({
            monsterId: 3,
            order: 3,
            type: "success",
            insight: "정확한 기록은 책임 회피를 방지하는 유효한 도구가 됩니다.",
        });
        // 📣 과대포장형 중간관리자 (monsterId: 4)
        await this.createStrategy({
            monsterId: 4,
            order: 1,
            strategy: "성과는 구체적인 수치와 사례로 제시하세요.",
        });
        await this.createStrategy({
            monsterId: 4,
            order: 2,
            strategy: "상대의 말을 그대로 믿기보다 팩트를 직접 확인하세요.",
        });
        await this.createStrategy({
            monsterId: 4,
            order: 3,
            strategy: "자기 과시에 휘말리지 말고 팀 성과 중심으로 대화를 이끌어가세요.",
        });
        await this.createMonsterInsight({
            monsterId: 4,
            order: 1,
            type: "warning",
            insight: "자기 과시에 집착하며 실체 이상의 성과를 주장합니다.",
        });
        await this.createMonsterInsight({
            monsterId: 4,
            order: 2,
            type: "danger",
            insight: "팀의 노력을 자신의 공으로 돌리는 경향이 있습니다.",
        });
        await this.createMonsterInsight({
            monsterId: 4,
            order: 3,
            type: "success",
            insight: "정확한 데이터로 과장된 주장에 균형을 잡을 수 있습니다.",
        });
        // 👻 무반응형 유령 (monsterId: 5)
        await this.createStrategy({
            monsterId: 5,
            order: 1,
            strategy: "모든 요청은 명시적으로 작성해 회신을 유도하세요.",
        });
        await this.createStrategy({
            monsterId: 5,
            order: 2,
            strategy: "무응답에 대비해 작업 이력을 남겨두는 습관을 들이세요.",
        });
        await this.createStrategy({
            monsterId: 5,
            order: 3,
            strategy: "중요한 일정이나 의사결정은 팀과 공유해 책임을 분산시키세요.",
        });
        await this.createMonsterInsight({
            monsterId: 5,
            order: 1,
            type: "warning",
            insight: "연락이 닿지 않거나 반응이 없는 경우가 많습니다.",
        });
        await this.createMonsterInsight({
            monsterId: 5,
            order: 2,
            type: "danger",
            insight: "문제 상황에서도 책임을 회피하고 사라지려는 경향이 있습니다.",
        });
        await this.createMonsterInsight({
            monsterId: 5,
            order: 3,
            type: "success",
            insight: "명확한 요청과 공유는 유령 같은 대응을 줄이는 데 효과적입니다.",
        });
        // 🔪 비판중독형 선배 (monsterId: 6)
        await this.createStrategy({
            monsterId: 6,
            order: 1,
            strategy: "업무 기준을 명확히 하고 본인의 논리를 준비하세요.",
        });
        await this.createStrategy({
            monsterId: 6,
            order: 2,
            strategy: "비판의 본질을 파악하고, 감정적 반응은 삼가세요.",
        });
        await this.createStrategy({
            monsterId: 6,
            order: 3,
            strategy: "결과물은 문서화해 평가에 대비하세요.",
        });
        await this.createMonsterInsight({
            monsterId: 6,
            order: 1,
            type: "warning",
            insight: "타인의 일처리에 끊임없이 간섭하고 평가하려 듭니다.",
        });
        await this.createMonsterInsight({
            monsterId: 6,
            order: 2,
            type: "danger",
            insight: "세세한 지적과 간섭으로 업무 효율을 떨어뜨립니다.",
        });
        await this.createMonsterInsight({
            monsterId: 6,
            order: 3,
            type: "success",
            insight: "논리와 기록 중심으로 대응하면 불필요한 마찰을 줄일 수 있습니다.",
        });
    }
}
exports.MemStorage = MemStorage;
exports.storage = new MemStorage();
