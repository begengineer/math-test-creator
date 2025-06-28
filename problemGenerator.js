// 数学問題生成エンジン
const mathCurriculum = require('./curriculum');

class ProblemGenerator {
    constructor() {
        this.curriculum = mathCurriculum;
    }

    // テスト生成
    generateTest(grade, selectedFields, difficulty, targetTime = 50) {
        const gradeData = this.curriculum[`grade${grade}`];
        if (!gradeData) {
            throw new Error(`Invalid grade: ${grade}`);
        }

        const problems = [];
        const targetTimeMinutes = targetTime;
        let currentTime = 0;

        // 各分野から問題を生成
        for (const fieldName of selectedFields) {
            const field = gradeData.fields[fieldName];
            if (!field) continue;

            const fieldProblems = this.generateFieldProblems(
                grade, fieldName, field, difficulty, targetTimeMinutes
            );
            problems.push(...fieldProblems);
            
            // 時間計算
            fieldProblems.forEach(problem => {
                currentTime += problem.estimatedTime;
            });
        }

        // 時間調整
        const adjustedProblems = this.adjustTestTime(problems, targetTimeMinutes);

        return {
            grade: grade,
            gradeName: gradeData.name,
            selectedFields,
            difficulty,
            targetTime: targetTimeMinutes,
            actualTime: adjustedProblems.reduce((sum, p) => sum + p.estimatedTime, 0),
            problems: adjustedProblems,
            totalProblems: adjustedProblems.length
        };
    }

    // 分野別問題生成
    generateFieldProblems(grade, fieldName, fieldData, difficulty, targetTime) {
        const problems = [];
        const timePerProblem = fieldData.difficulty[difficulty].timePerProblem;
        const maxProblems = Math.floor(targetTime / timePerProblem);
        const problemsToGenerate = Math.min(maxProblems, 3); // 分野あたり最大3問

        for (let i = 0; i < problemsToGenerate; i++) {
            const problem = this.generateProblem(grade, fieldName, fieldData, difficulty);
            if (problem) {
                problems.push(problem);
            }
        }

        return problems;
    }

    // 個別問題生成
    generateProblem(grade, fieldName, fieldData, difficulty) {
        const generators = {
            // 中学1年生
            "正負の数": () => this.generatePositiveNegativeProblems(difficulty),
            "文字と式": () => this.generateAlgebraicExpressionProblems(difficulty),
            "方程式": () => this.generateLinearEquationProblems(difficulty),
            "比例と反比例": () => this.generateProportionProblems(difficulty),
            "平面図形": () => this.generatePlaneGeometryProblems(difficulty),
            "空間図形": () => this.generateSolidGeometryProblems(difficulty),
            "データの活用": () => this.generateDataAnalysisProblems(difficulty),
            
            // 中学2年生
            "式の計算": () => this.generatePolynomialProblems(difficulty),
            "連立方程式": () => this.generateSimultaneousEquationProblems(difficulty),
            "一次関数": () => this.generateLinearFunctionProblems(difficulty),
            "図形の調べ方": () => this.generateCongruenceProblems(difficulty),
            "平行四辺形": () => this.generateParallelogramProblems(difficulty),
            "確率": () => this.generateProbabilityProblems(difficulty),
            
            // 中学3年生
            "式の展開と因数分解": () => this.generateExpansionFactorizationProblems(difficulty),
            "平方根": () => this.generateSquareRootProblems(difficulty),
            "二次方程式": () => this.generateQuadraticEquationProblems(difficulty),
            "関数 y=ax²": () => this.generateQuadraticFunctionProblems(difficulty),
            "相似な図形": () => this.generateSimilarityProblems(difficulty),
            "円": () => this.generateCircleProblems(difficulty),
            "三平方の定理": () => this.generatePythagoreanProblems(difficulty),
            "標本調査": () => this.generateSamplingProblems(difficulty)
        };

        const generator = generators[fieldName];
        if (!generator) {
            return null;
        }

        const problem = generator();
        problem.field = fieldName;
        problem.difficulty = difficulty;
        problem.estimatedTime = fieldData.difficulty[difficulty].timePerProblem;

        return problem;
    }

    // 正負の数の問題生成
    generatePositiveNegativeProblems(difficulty) {
        const problems = {
            1: () => {
                const a = this.randomInt(-10, 10);
                const b = this.randomInt(-10, 10);
                return {
                    question: `次の計算をしなさい。\n${a} + ${b}`,
                    answer: a + b,
                    solution: `${a} + ${b} = ${a + b}`
                };
            },
            2: () => {
                const a = this.randomInt(-20, 20);
                const b = this.randomInt(-20, 20);
                const c = this.randomInt(-20, 20);
                return {
                    question: `次の計算をしなさい。\n${a} + ${b} - ${c}`,
                    answer: a + b - c,
                    solution: `${a} + ${b} - ${c} = ${a + b} - ${c} = ${a + b - c}`
                };
            },
            3: () => {
                const a = this.randomInt(-10, 10, [0]);
                const b = this.randomInt(-10, 10, [0]);
                return {
                    question: `次の計算をしなさい。\n${a} × ${b}`,
                    answer: a * b,
                    solution: `${a} × ${b} = ${a * b}`
                };
            },
            4: () => {
                const a = this.randomInt(-15, 15, [0]);
                const b = this.randomInt(-15, 15, [0]);
                const c = this.randomInt(-15, 15, [0]);
                return {
                    question: `次の計算をしなさい。\n${a} × ${b} + ${c}`,
                    answer: a * b + c,
                    solution: `${a} × ${b} + ${c} = ${a * b} + ${c} = ${a * b + c}`
                };
            },
            5: () => {
                const a = this.randomInt(-12, 12, [0]);
                const b = this.randomInt(-4, 4, [0]);
                const c = this.randomInt(-10, 10);
                return {
                    question: `次の計算をしなさい。\n${a} ÷ ${b} - ${c}`,
                    answer: a / b - c,
                    solution: `${a} ÷ ${b} - ${c} = ${a / b} - ${c} = ${a / b - c}`
                };
            }
        };

        return problems[difficulty]();
    }

    // 文字と式の問題生成
    generateAlgebraicExpressionProblems(difficulty) {
        const problems = {
            1: () => {
                const a = this.randomInt(2, 9);
                const b = this.randomInt(2, 9);
                return {
                    question: `次の式を簡単にしなさい。\n${a}x + ${b}x`,
                    answer: `${a + b}x`,
                    solution: `${a}x + ${b}x = ${a + b}x`
                };
            },
            2: () => {
                const a = this.randomInt(2, 8);
                const b = this.randomInt(2, 8);
                const c = this.randomInt(1, 9);
                return {
                    question: `次の式を簡単にしなさい。\n${a}x - ${b}x + ${c}`,
                    answer: `${a - b}x + ${c}`,
                    solution: `${a}x - ${b}x + ${c} = ${a - b}x + ${c}`
                };
            },
            3: () => {
                const x = this.randomInt(2, 8);
                const a = this.randomInt(2, 6);
                return {
                    question: `x = ${x}のとき、次の式の値を求めなさい。\n${a}x + ${this.randomInt(1, 10)}`,
                    answer: a * x + this.randomInt(1, 10),
                    solution: `x = ${x}を代入すると、${a} × ${x} + ${this.randomInt(1, 10)} = ${a * x + this.randomInt(1, 10)}`
                };
            },
            4: () => {
                const a = this.randomInt(2, 6);
                const b = this.randomInt(2, 6);
                const c = this.randomInt(1, 9);
                return {
                    question: `次の式を簡単にしなさい。\n${a}(x + ${b}) - ${c}`,
                    answer: `${a}x + ${a * b - c}`,
                    solution: `${a}(x + ${b}) - ${c} = ${a}x + ${a * b} - ${c} = ${a}x + ${a * b - c}`
                };
            },
            5: () => {
                const a = this.randomInt(2, 5);
                const b = this.randomInt(2, 5);
                const c = this.randomInt(1, 8);
                return {
                    question: `次の式を簡単にしなさい。\n${a}(x - ${b}) + ${c}(x + ${this.randomInt(1, 5)})`,
                    answer: `計算結果`,
                    solution: `分配法則を使って展開し、同類項をまとめる`
                };
            }
        };

        return problems[difficulty]();
    }

    // 一次方程式の問題生成
    generateLinearEquationProblems(difficulty) {
        const problems = {
            1: () => {
                const a = this.randomInt(2, 9);
                const b = this.randomInt(1, 15);
                return {
                    question: `次の方程式を解きなさい。\nx + ${a} = ${b}`,
                    answer: `x = ${b - a}`,
                    solution: `x + ${a} = ${b}\nx = ${b} - ${a}\nx = ${b - a}`
                };
            },
            2: () => {
                const a = this.randomInt(2, 8);
                const b = this.randomInt(10, 30);
                return {
                    question: `次の方程式を解きなさい。\n${a}x = ${b}`,
                    answer: `x = ${b / a}`,
                    solution: `${a}x = ${b}\nx = ${b} ÷ ${a}\nx = ${b / a}`
                };
            },
            3: () => {
                const a = this.randomInt(2, 6);
                const b = this.randomInt(1, 8);
                const c = this.randomInt(10, 25);
                return {
                    question: `次の方程式を解きなさい。\n${a}x + ${b} = ${c}`,
                    answer: `x = ${(c - b) / a}`,
                    solution: `${a}x + ${b} = ${c}\n${a}x = ${c} - ${b}\n${a}x = ${c - b}\nx = ${(c - b) / a}`
                };
            },
            4: () => {
                const speed = this.randomInt(40, 80);
                const time = this.randomInt(2, 5);
                const distance = speed * time;
                return {
                    question: `時速${speed}kmで${time}時間走った距離は${distance}kmでした。この関係を式で表しなさい。`,
                    answer: `${distance} = ${speed} × ${time}`,
                    solution: `距離 = 速さ × 時間の関係より、${distance} = ${speed} × ${time}`
                };
            },
            5: () => {
                const total = this.randomInt(100, 200);
                const ratio1 = this.randomInt(2, 4);
                const ratio2 = this.randomInt(3, 5);
                return {
                    question: `2つの数の比が${ratio1}:${ratio2}で、和が${total}のとき、それぞれの数を求めなさい。`,
                    answer: `${(total * ratio1) / (ratio1 + ratio2)}, ${(total * ratio2) / (ratio1 + ratio2)}`,
                    solution: `比の性質を使って連立方程式を立てて解く`
                };
            }
        };

        return problems[difficulty]();
    }

    // 多項式の問題生成 (中2)
    generatePolynomialProblems(difficulty) {
        const problems = {
            1: () => {
                const a = this.randomInt(2, 8);
                const b = this.randomInt(2, 8);
                return {
                    question: `次の計算をしなさい。\n(${a}x) × (${b}y)`,
                    answer: `${a * b}xy`,
                    solution: `(${a}x) × (${b}y) = ${a * b}xy`
                };
            },
            2: () => {
                const a = this.randomInt(2, 6);
                const b = this.randomInt(2, 6);
                const c = this.randomInt(1, 8);
                const d = this.randomInt(1, 8);
                return {
                    question: `次の計算をしなさい。\n(${a}x + ${b}) + (${c}x - ${d})`,
                    answer: `${a + c}x + ${b - d}`,
                    solution: `(${a}x + ${b}) + (${c}x - ${d}) = ${a + c}x + ${b - d}`
                };
            },
            3: () => {
                const a = this.randomInt(2, 8);
                const b = this.randomInt(2, 8);
                return {
                    question: `次の計算をしなさい。\n${a}x² ÷ ${b}x`,
                    answer: `${a / b}x`,
                    solution: `${a}x² ÷ ${b}x = ${a / b}x`
                };
            },
            4: () => {
                const a = this.randomInt(2, 5);
                const b = this.randomInt(2, 5);
                const c = this.randomInt(1, 6);
                return {
                    question: `次の計算をしなさい。\n${a}x(${b}x - ${c})`,
                    answer: `${a * b}x² - ${a * c}x`,
                    solution: `${a}x(${b}x - ${c}) = ${a * b}x² - ${a * c}x`
                };
            },
            5: () => {
                const a = this.randomInt(2, 4);
                const b = this.randomInt(2, 4);
                const c = this.randomInt(1, 5);
                const d = this.randomInt(1, 5);
                return {
                    question: `次の計算をしなさい。\n(${a}x + ${b})(${c}x - ${d})`,
                    answer: `${a * c}x² + ${b * c - a * d}x - ${b * d}`,
                    solution: `分配法則を使って展開する`
                };
            }
        };

        return problems[difficulty]();
    }

    // その他の問題生成メソッドは省略（実際の実装では全分野をカバー）
    generateSimultaneousEquationProblems(difficulty) {
        // 連立方程式の問題生成
        return { question: "連立方程式の問題", answer: "解", solution: "解法" };
    }

    generateLinearFunctionProblems(difficulty) {
        // 一次関数の問題生成
        return { question: "一次関数の問題", answer: "解", solution: "解法" };
    }

    generateCongruenceProblems(difficulty) {
        // 合同の問題生成
        return { question: "合同の問題", answer: "解", solution: "解法" };
    }

    generateParallelogramProblems(difficulty) {
        // 平行四辺形の問題生成
        return { question: "平行四辺形の問題", answer: "解", solution: "解法" };
    }

    generateProbabilityProblems(difficulty) {
        // 確率の問題生成
        return { question: "確率の問題", answer: "解", solution: "解法" };
    }

    generateExpansionFactorizationProblems(difficulty) {
        // 展開・因数分解の問題生成
        return { question: "展開・因数分解の問題", answer: "解", solution: "解法" };
    }

    generateSquareRootProblems(difficulty) {
        // 平方根の問題生成
        return { question: "平方根の問題", answer: "解", solution: "解法" };
    }

    generateQuadraticEquationProblems(difficulty) {
        // 二次方程式の問題生成
        return { question: "二次方程式の問題", answer: "解", solution: "解法" };
    }

    generateQuadraticFunctionProblems(difficulty) {
        // 二次関数の問題生成
        return { question: "二次関数の問題", answer: "解", solution: "解法" };
    }

    generateSimilarityProblems(difficulty) {
        // 相似の問題生成
        return { question: "相似の問題", answer: "解", solution: "解法" };
    }

    generateCircleProblems(difficulty) {
        // 円の問題生成
        return { question: "円の問題", answer: "解", solution: "解法" };
    }

    generatePythagoreanProblems(difficulty) {
        // 三平方の定理の問題生成
        return { question: "三平方の定理の問題", answer: "解", solution: "解法" };
    }

    generateSamplingProblems(difficulty) {
        // 標本調査の問題生成
        return { question: "標本調査の問題", answer: "解", solution: "解法" };
    }

    generateProportionProblems(difficulty) {
        // 比例・反比例の問題生成
        return { question: "比例・反比例の問題", answer: "解", solution: "解法" };
    }

    generatePlaneGeometryProblems(difficulty) {
        // 平面図形の問題生成
        return { question: "平面図形の問題", answer: "解", solution: "解法" };
    }

    generateSolidGeometryProblems(difficulty) {
        // 空間図形の問題生成
        return { question: "空間図形の問題", answer: "解", solution: "解法" };
    }

    generateDataAnalysisProblems(difficulty) {
        // データ分析の問題生成
        return { question: "データ分析の問題", answer: "解", solution: "解法" };
    }

    // ユーティリティメソッド
    randomInt(min, max, exclude = []) {
        let num;
        do {
            num = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (exclude.includes(num));
        return num;
    }

    // 時間調整
    adjustTestTime(problems, targetTime) {
        const totalTime = problems.reduce((sum, p) => sum + p.estimatedTime, 0);
        
        if (totalTime <= targetTime) {
            return problems;
        }

        // 時間オーバーの場合、難易度の高い問題から削除
        const sortedProblems = problems.sort((a, b) => b.difficulty - a.difficulty);
        const adjustedProblems = [];
        let currentTime = 0;

        for (const problem of sortedProblems) {
            if (currentTime + problem.estimatedTime <= targetTime) {
                adjustedProblems.push(problem);
                currentTime += problem.estimatedTime;
            }
        }

        return adjustedProblems;
    }
}

module.exports = ProblemGenerator;