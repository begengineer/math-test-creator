// AI問題生成サービス
const Anthropic = require('@anthropic-ai/sdk');

class AIProblemGenerator {
    constructor() {
        // 環境変数からAPIキーを取得（本番環境用）
        this.anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY || 'sk-ant-api03-demo-key',
        });
    }

    // メイン問題生成メソッド
    async generateProblem(grade, fieldName, difficulty) {
        try {
            const prompt = this.createPrompt(grade, fieldName, difficulty);
            
            const response = await this.anthropic.messages.create({
                model: 'claude-3-haiku-20240307',
                max_tokens: 1000,
                temperature: 0.8, // 多様性のために少し高めに設定
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            });

            const problemData = this.parseResponse(response.content[0].text);
            
            // 追加情報を付与
            problemData.field = fieldName;
            problemData.difficulty = difficulty;
            problemData.source = 'AI生成';
            problemData.estimatedTime = this.estimateTime(difficulty);
            
            return problemData;
        } catch (error) {
            console.error('AI問題生成エラー:', error);
            // フォールバック：簡単な問題を返す
            return this.getFallbackProblem(grade, fieldName, difficulty);
        }
    }

    // プロンプト作成
    createPrompt(grade, fieldName, difficulty) {
        const difficultyDescriptions = {
            1: '基礎的で解きやすい',
            2: 'やや易しい', 
            3: '標準的な',
            4: 'やや難しい',
            5: '発展的で応用力が必要な'
        };

        const fieldPrompts = {
            // 中学1年生
            '正負の数': `正負の数の四則演算、絶対値、数直線を使った問題`,
            '文字と式': `文字を使った式の表現、式の値の計算、同類項をまとめる問題`,
            '方程式': `一次方程式の解法、文章題を方程式で解く問題`,
            '比例と反比例': `比例・反比例の式とグラフ、比例定数を求める問題`,
            '平面図形': `角度の計算、三角形・四角形の性質を使った問題`,
            'データの活用': `平均値、中央値、最頻値、ヒストグラムに関する問題`,

            // 中学2年生
            '式の計算': `単項式・多項式の計算、分配法則を使った式の展開`,
            '連立方程式': `連立方程式の解法、文章題を連立方程式で解く問題`,
            '一次関数': `一次関数の式とグラフ、傾きと切片を求める問題`,
            '確率': `確率の計算、樹形図やサイコロ・カードを使った問題`,

            // 中学3年生
            '式の展開と因数分解': `展開公式、因数分解の公式を使った計算`,
            '平方根': `平方根の計算、根号を含む式の計算`,
            '二次方程式': `二次方程式の解法（因数分解・平方完成・解の公式）`,
            '関数 y=ax²': `二次関数のグラフと性質、放物線の問題`,
            '三平方の定理': `直角三角形の辺の長さ、三平方の定理の応用問題`
        };

        return `あなたは日本の中学校数学の専門教師です。以下の条件で数学問題を1問作成してください。

【条件】
- 対象：中学${grade}年生
- 分野：${fieldName}
- 難易度：レベル${difficulty}（${difficultyDescriptions[difficulty]}レベル）
- 内容：${fieldPrompts[fieldName] || fieldName + 'に関する問題'}

【出力形式】
以下のJSON形式で回答してください（他の文章は含めず、JSONのみ）：

{
  "question": "問題文（改行は\\nで表現）",
  "answer": "解答（数値や式）",
  "solution": "解法の説明（ステップごとに説明）"
}

【要件】
- 問題文は明確で理解しやすく
- 計算過程が適切な難易度になるよう数値を調整
- 解法説明は中学生が理解できるレベルで詳しく
- 実際の入試問題レベルの質
- 日本の学習指導要領に準拠`;
    }

    // レスポンス解析
    parseResponse(responseText) {
        try {
            // JSONブロックを抽出
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            
            // JSON形式でない場合の簡易パース
            throw new Error('JSON形式ではありません');
        } catch (error) {
            console.error('レスポンス解析エラー:', error);
            
            // フォールバック：テキストから手動でパース
            return {
                question: 'AI生成中にエラーが発生しました',
                answer: '解答なし',
                solution: 'エラーのため解法を表示できません'
            };
        }
    }

    // 推定時間計算
    estimateTime(difficulty) {
        const baseTimes = {
            1: 1.0,
            2: 1.2,
            3: 1.5,
            4: 2.0,
            5: 2.5
        };
        return baseTimes[difficulty] || 1.5;
    }

    // フォールバック問題
    getFallbackProblem(grade, fieldName, difficulty) {
        const fallbackProblems = {
            1: {
                '正負の数': {
                    question: '次の計算をしなさい。\n(-3) + (+7) - (-2)',
                    answer: '6',
                    solution: '(-3) + (+7) - (-2) = -3 + 7 + 2 = 6'
                },
                '文字と式': {
                    question: 'x = 3のとき、2x + 5の値を求めなさい。',
                    answer: '11',
                    solution: '2x + 5 = 2 × 3 + 5 = 6 + 5 = 11'
                }
            },
            2: {
                '連立方程式': {
                    question: '次の連立方程式を解きなさい。\nx + y = 5\n2x - y = 1',
                    answer: 'x = 2, y = 3',
                    solution: '加減法で解く：(x + y = 5) + (2x - y = 1) より 3x = 6, x = 2\nこれをx + y = 5に代入：2 + y = 5, y = 3'
                }
            },
            3: {
                '二次方程式': {
                    question: '次の二次方程式を解きなさい。\nx² - 5x + 6 = 0',
                    answer: 'x = 2, 3',
                    solution: 'x² - 5x + 6 = 0\n(x - 2)(x - 3) = 0\nよって x = 2, 3'
                }
            }
        };

        const gradeProblems = fallbackProblems[grade];
        if (gradeProblems && gradeProblems[fieldName]) {
            return {
                ...gradeProblems[fieldName],
                field: fieldName,
                difficulty: difficulty,
                source: 'システム生成',
                estimatedTime: this.estimateTime(difficulty)
            };
        }

        return {
            question: `${fieldName}の問題を生成中です...`,
            answer: '計算中',
            solution: '解法を生成中です',
            field: fieldName,
            difficulty: difficulty,
            source: 'システム',
            estimatedTime: this.estimateTime(difficulty)
        };
    }

    // バッチ生成（複数問題を一度に生成）
    async generateMultipleProblems(grade, fieldName, difficulty, count) {
        const problems = [];
        const promises = [];

        // 並列で複数問題を生成
        for (let i = 0; i < count; i++) {
            promises.push(this.generateProblem(grade, fieldName, difficulty));
        }

        try {
            const results = await Promise.allSettled(promises);
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    problems.push(result.value);
                } else {
                    console.error(`問題${index + 1}の生成に失敗:`, result.reason);
                    problems.push(this.getFallbackProblem(grade, fieldName, difficulty));
                }
            });
        } catch (error) {
            console.error('バッチ生成エラー:', error);
        }

        return problems;
    }
}

module.exports = AIProblemGenerator;