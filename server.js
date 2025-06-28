const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const AuthManager = require('./auth');
const ProblemGenerator = require('./problemGenerator');
const mathCurriculum = require('./curriculum');

// 環境変数の読み込み
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const authManager = new AuthManager();
const problemGenerator = new ProblemGenerator();

// セキュリティミドルウェア
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            fontSrc: ["'self'"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"]
        }
    }
}));

// 圧縮
app.use(compression());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// CORS設定
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-domain.com'] // 本番環境のドメインに変更
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

// レート制限（ログインページのみ）
const loginRateLimit = authManager.createLoginRateLimit();
app.use('/api/auth/login', loginRateLimit);

// 静的ファイルの提供（認証が不要なもの）
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.css'));
});

app.get('/login.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.js'));
});

// 認証APIエンドポイント
app.post('/api/auth/login', authManager.getLoginValidation(), (req, res) => {
    authManager.handleLogin(req, res);
});

app.post('/api/auth/logout', (req, res) => {
    authManager.handleLogout(req, res);
});

app.get('/api/auth/status', (req, res) => {
    authManager.checkAuthStatus(req, res);
});

// 保護されたルート - メインアプリページ
app.get('/app', authManager.requireAuth(), (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', authManager.requireAuth(), (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 保護されたリソース
app.get('/style.css', authManager.requireAuth(), (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/app.js', authManager.requireAuth(), (req, res) => {
    res.sendFile(path.join(__dirname, 'app.js'));
});

// カリキュラムAPIエンドポイント
app.get('/api/curriculum/:grade', authManager.requireAuth(), (req, res) => {
    try {
        const grade = req.params.grade;
        const gradeData = mathCurriculum[grade];
        
        if (!gradeData) {
            return res.status(404).json({
                error: 'Grade not found',
                message: '指定された学年が見つかりません'
            });
        }
        
        res.json(gradeData);
    } catch (error) {
        console.error('Curriculum API error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'カリキュラムデータの取得に失敗しました'
        });
    }
});

// テスト生成APIエンドポイント
app.post('/api/generate-test', authManager.requireAuth(), async (req, res) => {
    try {
        const { grade, fields, difficulty, timeLimit } = req.body;
        
        // バリデーション
        if (!grade || !fields || !difficulty || !timeLimit) {
            return res.status(400).json({
                error: 'Missing required parameters',
                message: '必要なパラメータが不足しています'
            });
        }
        
        if (grade < 1 || grade > 3) {
            return res.status(400).json({
                error: 'Invalid grade',
                message: '学年は1から3の間で指定してください'
            });
        }
        
        if (difficulty < 1 || difficulty > 5) {
            return res.status(400).json({
                error: 'Invalid difficulty',
                message: '難易度は1から5の間で指定してください'
            });
        }
        
        if (!Array.isArray(fields) || fields.length === 0) {
            return res.status(400).json({
                error: 'Invalid fields',
                message: '分野を1つ以上選択してください'
            });
        }
        
        // テスト生成（AI使用）
        console.log('Generating AI test:', { grade, fields, difficulty, timeLimit });
        const testData = await problemGenerator.generateTest(grade, fields, difficulty, timeLimit);
        
        res.json(testData);
        
    } catch (error) {
        console.error('Test generation error:', error);
        res.status(500).json({
            error: 'Test generation failed',
            message: 'テストの生成に失敗しました。もう一度お試しください。'
        });
    }
});

// PDF生成APIエンドポイント（オプション）
app.post('/api/generate-pdf', authManager.requireAuth(), async (req, res) => {
    try {
        const { testData, type } = req.body; // type: 'test' or 'answer'
        
        // サーバーサイドPDF生成（簡単な実装）
        if (type === 'test') {
            const textContent = generateTestText(testData);
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Content-Disposition', `attachment; filename="math_test_${Date.now()}.txt"`);
            res.send(textContent);
        } else if (type === 'answer') {
            const answerContent = generateAnswerText(testData);
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Content-Disposition', `attachment; filename="math_answer_${Date.now()}.txt"`);
            res.send(answerContent);
        } else {
            res.status(400).json({
                error: 'Invalid type',
                message: 'typeは"test"または"answer"を指定してください'
            });
        }
        
    } catch (error) {
        console.error('PDF generation error:', error);
        res.status(500).json({
            error: 'PDF generation failed',
            message: 'PDFの生成に失敗しました'
        });
    }
});

// PDF生成ヘルパー関数
function generateTestText(testData) {
    let content = '';
    content += '==========================================\n';
    content += '           数学テスト\n';
    content += '==========================================\n\n';
    content += `対象: ${testData.gradeName}\n`;
    content += `分野: ${testData.selectedFields.join(', ')}\n`;
    content += `難易度: レベル ${testData.difficulty}\n`;
    content += `制限時間: ${testData.targetTime}分\n`;
    content += `問題数: ${testData.totalProblems}問\n\n`;
    
    testData.problems.forEach((problem, index) => {
        content += `問${index + 1} [${problem.field}]\n`;
        content += `${problem.question}\n\n`;
        content += '【解答】\n';
        content += '________________________________\n';
        content += '________________________________\n';
        content += '________________________________\n\n';
    });
    
    return content;
}

function generateAnswerText(testData) {
    let content = '';
    content += '==========================================\n';
    content += '        数学テスト - 解答と解説\n';
    content += '==========================================\n\n';
    
    testData.problems.forEach((problem, index) => {
        content += `問${index + 1} [${problem.field}]\n`;
        content += `${problem.question}\n\n`;
        content += `【解答】 ${problem.answer}\n`;
        if (problem.solution) {
            content += `【解説】\n${problem.solution}\n`;
        }
        content += '\n';
    });
    
    return content;
}

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'Math Test Creator',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// APIエンドポイント
app.get('/api/status', (req, res) => {
    res.json({
        service: 'Math Test Creator',
        version: '1.0.0',
        status: 'running'
    });
});

// 404ハンドラー
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'login.html'));
});

// エラーハンドラー
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'production' 
            ? 'Something went wrong!' 
            : err.message
    });
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`
🎓 Math Test Creator Server is running!
📚 Port: ${PORT}
🌐 URL: http://localhost:${PORT}
🔐 Default Password: mathtest2025
🏃 Environment: ${process.env.NODE_ENV || 'development'}
    `);
});

// グレースフルシャットダウン
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

module.exports = app;