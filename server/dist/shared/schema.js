"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUserAnswerSchema = exports.userAnswers = exports.insertQuestionSchema = exports.questions = exports.insertMonsterInsightSchema = exports.monsterInsights = exports.insertStrategySchema = exports.strategies = exports.insertMonsterSchema = exports.monsters = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
//
// 몬스터 (괴수) 테이블
//
exports.monsters = (0, pg_core_1.pgTable)("monsters", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    emoji: (0, pg_core_1.text)("emoji").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    traits: (0, pg_core_1.text)("traits").notNull(),
    phrase: (0, pg_core_1.text)("phrase").notNull(),
    empathyLevel: (0, pg_core_1.integer)("empathy_level").notNull(),
    fatigueLevel: (0, pg_core_1.integer)("fatigue_level").notNull(),
    types: (0, pg_core_1.text)("types").array().notNull(), // 💡 유형 코드 (A~F)
});
exports.insertMonsterSchema = (0, drizzle_zod_1.createInsertSchema)(exports.monsters).omit({ id: true });
//
// 전략 카드
//
exports.strategies = (0, pg_core_1.pgTable)("strategies", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    monsterId: (0, pg_core_1.integer)("monster_id").notNull(),
    strategy: (0, pg_core_1.text)("strategy").notNull(),
    order: (0, pg_core_1.integer)("order").notNull(),
});
exports.insertStrategySchema = (0, drizzle_zod_1.createInsertSchema)(exports.strategies).omit({ id: true });
//
// 통찰 카드
//
exports.monsterInsights = (0, pg_core_1.pgTable)("monster_insights", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    monsterId: (0, pg_core_1.integer)("monster_id").notNull(),
    insight: (0, pg_core_1.text)("insight").notNull(),
    type: (0, pg_core_1.text)("type").notNull(), // "warning" | "danger" | "success"
    order: (0, pg_core_1.integer)("order").notNull(),
});
exports.insertMonsterInsightSchema = (0, drizzle_zod_1.createInsertSchema)(exports.monsterInsights).omit({ id: true });
//
// 질문 테이블
//
exports.questions = (0, pg_core_1.pgTable)("questions", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    question: (0, pg_core_1.text)("question").notNull(),
    order: (0, pg_core_1.integer)("order").notNull(),
    types: (0, pg_core_1.text)("types").array().notNull(), // 💡 관련 괴수 유형 (A~F)
});
exports.insertQuestionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.questions).omit({ id: true });
//
// 사용자 답변 테이블
//
exports.userAnswers = (0, pg_core_1.pgTable)("user_answers", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    sessionId: (0, pg_core_1.text)("session_id").notNull(),
    questionId: (0, pg_core_1.integer)("question_id").notNull(),
    answer: (0, pg_core_1.integer)("answer").notNull(), // 1: 그렇다, 2: 보통이다, 3: 아니다
});
exports.insertUserAnswerSchema = (0, drizzle_zod_1.createInsertSchema)(exports.userAnswers).omit({ id: true });
console.log("🔥 몬스터 데이터 확인:", exports.monsters);
