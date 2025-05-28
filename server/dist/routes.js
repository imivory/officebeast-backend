"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const http_1 = require("http");
const storage_1 = require("./storage");
const crypto_1 = require("crypto");
async function registerRoutes(app) {
    console.log("서버 라우트 등록 시작..."); // 확인용 로깅
    // Initialize demo data
    await storage_1.storage.initDemoData();
    // Get all questions API
    app.get("/api/questions", async (req, res) => {
        try {
            const questions = await storage_1.storage.getQuestions();
            res.json(questions);
        }
        catch (error) {
            console.error("Error fetching questions:", error);
            res.status(500).json({ message: "Failed to fetch questions" });
        }
    });
    // Get a specific monster API
    app.get("/api/monsters/:id", async (req, res) => {
        try {
            const monsterId = parseInt(req.params.id);
            const monster = await storage_1.storage.getMonster(monsterId);
            if (!monster) {
                return res.status(404).json({ message: "Monster not found" });
            }
            res.json(monster);
        }
        catch (error) {
            console.error("Error fetching monster:", error);
            res.status(500).json({ message: "Failed to fetch monster" });
        }
    });
    // Get all monsters API
    app.get("/api/monsters", async (req, res) => {
        try {
            const monsters = await storage_1.storage.getMonsters();
            res.json(monsters);
        }
        catch (error) {
            console.error("Error fetching monsters:", error);
            res.status(500).json({ message: "Failed to fetch monsters" });
        }
    });
    // Get monster strategies API
    app.get("/api/monsters/:id/strategies", async (req, res) => {
        try {
            const monsterId = parseInt(req.params.id);
            const strategies = await storage_1.storage.getMonsterStrategies(monsterId);
            res.json(strategies);
        }
        catch (error) {
            console.error("Error fetching strategies:", error);
            res.status(500).json({ message: "Failed to fetch strategies" });
        }
    });
    // Get monster insights API
    app.get("/api/monsters/:id/insights", async (req, res) => {
        try {
            const monsterId = parseInt(req.params.id);
            const insights = await storage_1.storage.getMonsterInsights(monsterId);
            res.json(insights);
        }
        catch (error) {
            console.error("Error fetching insights:", error);
            res.status(500).json({ message: "Failed to fetch insights" });
        }
    });
    // Submit user answer API
    app.post("/api/answers", async (req, res) => {
        try {
            const { sessionId, questionId, answer } = req.body;
            console.log("답변 제출 요청 수신:", { sessionId, questionId, answer });
            // Create new session ID if not provided
            const userSessionId = sessionId || (0, crypto_1.randomUUID)();
            const userAnswer = await storage_1.storage.createUserAnswer({
                sessionId: userSessionId,
                questionId,
                answer,
            });
            console.log("사용자 답변 저장됨:", userAnswer);
            console.log("세션 ID 반환:", userSessionId);
            res.json({ sessionId: userSessionId, answer: userAnswer });
        }
        catch (error) {
            console.error("Error submitting answer:", error);
            res.status(500).json({ message: "Failed to submit answer" });
        }
    });
    // Get result API (simulating result calculation)
    app.get("/api/results/:sessionId", async (req, res) => {
        try {
            const sessionId = req.params.sessionId;
            console.log("결과 조회 요청 수신. 세션 ID:", sessionId);
            const answers = await storage_1.storage.getUserAnswers(sessionId);
            console.log(`세션 ${sessionId}의 사용자 답변:`, answers);
            if (answers.length === 0) {
                return res.status(404).json({ message: "No answers found for this session" });
            }
            // For demo purposes, always return the first monster (내로남불형 상사)
            const monsters = await storage_1.storage.getMonsters();
            if (monsters.length === 0) {
                return res.status(404).json({ message: "No monsters found" });
            }
            // Note: This endpoint is still returning a fixed monster ID.
            // The result calculation logic is now primarily on the client-side.
            // This endpoint might be removed or repurposed later.
            res.json({ monsterId: monsters[0].id });
        }
        catch (error) {
            console.error("Error calculating result:", error);
            res.status(500).json({ message: "Failed to calculate result" });
        }
    });
    // Get user answers API
    app.get("/api/answers/:sessionId", async (req, res) => {
        try {
            const sessionId = req.params.sessionId;
            console.log("사용자 답변 조회 요청 수신. 세션 ID:", sessionId);
            const answers = await storage_1.storage.getUserAnswers(sessionId);
            console.log("조회된 답변:", answers);
            res.json(answers);
        }
        catch (error) {
            console.error("Error fetching user answers:", error);
            res.status(500).json({ message: "Failed to fetch user answers" });
        }
    });
    const httpServer = (0, http_1.createServer)(app);
    return httpServer;
}
