import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

//
// 몬스터 (괴수) 테이블
//
export const monsters = pgTable("monsters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  emoji: text("emoji").notNull(),
  description: text("description").notNull(),
  traits: text("traits").notNull(),
  phrase: text("phrase").notNull(),
  empathyLevel: integer("empathy_level").notNull(),
  fatigueLevel: integer("fatigue_level").notNull(),
  types: text("types").array().notNull(), // 💡 유형 코드 (A~F)
});

export const insertMonsterSchema = createInsertSchema(monsters).omit({ id: true });

//
// 전략 카드
//
export const strategies = pgTable("strategies", {
  id: serial("id").primaryKey(),
  monsterId: integer("monster_id").notNull(),
  strategy: text("strategy").notNull(),
  order: integer("order").notNull(),
});

export const insertStrategySchema = createInsertSchema(strategies).omit({ id: true });

//
// 통찰 카드
//
export const monsterInsights = pgTable("monster_insights", {
  id: serial("id").primaryKey(),
  monsterId: integer("monster_id").notNull(),
  insight: text("insight").notNull(),
  type: text("type").notNull(), // "warning" | "danger" | "success"
  order: integer("order").notNull(),
});

export const insertMonsterInsightSchema = createInsertSchema(monsterInsights).omit({ id: true });

//
// 질문 테이블
//
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
  types: text("types").array().notNull(), // 💡 관련 괴수 유형 (A~F)
});

export const insertQuestionSchema = createInsertSchema(questions).omit({ id: true });

//
// 사용자 답변 테이블
//
export const userAnswers = pgTable("user_answers", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  questionId: integer("question_id").notNull(),
  answer: integer("answer").notNull(), // 1: 그렇다, 2: 보통이다, 3: 아니다
});

export const insertUserAnswerSchema = createInsertSchema(userAnswers).omit({ id: true });

//
// 타입 추론 (drizzle 기준)
//
export type Monster = typeof monsters.$inferSelect;
export type InsertMonster = z.infer<typeof insertMonsterSchema>;

export type Strategy = typeof strategies.$inferSelect;
export type InsertStrategy = z.infer<typeof insertStrategySchema>;

export type MonsterInsight = typeof monsterInsights.$inferSelect;
export type InsertMonsterInsight = z.infer<typeof insertMonsterInsightSchema>;

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export type UserAnswer = typeof userAnswers.$inferSelect;
export type InsertUserAnswer = z.infer<typeof insertUserAnswerSchema>;
console.log("🔥 몬스터 데이터 확인:", monsters);