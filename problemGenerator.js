// 数学問題生成エンジン
const mathCurriculum = require('./curriculum');
const { examProblems, originalProblems } = require('./examProblems');

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

        // 時間調整を無効化して全問題を出題
        const adjustedProblems = problems; // this.adjustTestTime(problems, targetTimeMinutes);

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
        const timePerProblem = fieldData.difficulty[difficulty].timePerProblem || 2;
        
        // 50分テストで最低30問を保証
        const minProblemsFor50Min = 30;
        const targetProblems = Math.max(minProblemsFor50Min, Math.floor(targetTime * 0.6));
        
        // 各分野から固定で15問ずつ生成
        const problemsToGenerate = 15;

        // 難易度に関係なく基本問題から始める
        for (let i = 0; i < problemsToGenerate; i++) {
            // 最初は難易度1から、後半で指定難易度を使用
            const currentDifficulty = i < Math.floor(problemsToGenerate / 2) ? 1 : difficulty;
            const problem = this.generateProblem(grade, fieldName, fieldData, currentDifficulty);
            if (problem) {
                problem.difficulty = currentDifficulty;
                problem.estimatedTime = timePerProblem;
                problem.field = fieldName;
                problems.push(problem);
            }
        }

        console.log(`Generated ${problems.length} problems for ${fieldName}`);
        return problems;
    }

    // 個別問題生成（80%過去問 + 20%オリジナル）
    generateProblem(grade, fieldName, fieldData, difficulty) {
        // 80%の確率で過去問、20%の確率でオリジナル問題
        const useExamProblem = Math.random() < 0.8;
        
        let problem;
        
        if (useExamProblem) {
            problem = this.generateExamProblem(grade, fieldName, difficulty);
        } else {
            problem = this.generateOriginalProblem(grade, fieldName, difficulty);
        }
        
        // フォールバック: 過去問が見つからない場合は従来の生成方式
        if (!problem) {
            problem = this.generateTraditionalProblem(grade, fieldName, difficulty);
        }

        if (problem) {
            problem.field = fieldName;
            problem.difficulty = difficulty;
            problem.estimatedTime = fieldData.difficulty[difficulty].timePerProblem;
        }

        return problem;
    }
    
    // 高校入試過去問から選択
    generateExamProblem(grade, fieldName, difficulty) {
        const gradeKey = `grade${grade}`;
        const gradeProblems = examProblems[gradeKey];
        
        if (!gradeProblems || !gradeProblems[fieldName]) {
            return null;
        }
        
        const fieldProblems = gradeProblems[fieldName];
        // 難易度に応じて問題をフィルタリング
        const suitableProblems = fieldProblems.filter(p => 
            Math.abs(p.difficulty - difficulty) <= 1
        );
        
        if (suitableProblems.length === 0) {
            // 難易度が合わない場合は全ての問題から選択
            return fieldProblems[Math.floor(Math.random() * fieldProblems.length)];
        }
        
        return suitableProblems[Math.floor(Math.random() * suitableProblems.length)];
    }
    
    // オリジナル問題生成
    generateOriginalProblem(grade, fieldName, difficulty) {
        const gradeKey = `grade${grade}`;
        const gradeProblems = originalProblems[gradeKey];
        
        if (!gradeProblems || !gradeProblems[fieldName]) {
            return null;
        }
        
        const generators = gradeProblems[fieldName];
        if (generators.length === 0) {
            return null;
        }
        
        const generator = generators[Math.floor(Math.random() * generators.length)];
        return generator();
    }
    
    // 従来の問題生成（フォールバック用）
    generateTraditionalProblem(grade, fieldName, difficulty) {
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
            console.warn(`No generator found for field: ${fieldName}`);
            return {
                question: `${fieldName}の問題`,
                answer: "解答",
                solution: "解法",
                source: "システム生成"
            };
        }

        return generator();
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
        const problems = {
            1: () => {
                const k = this.randomInt(2, 8);
                const x = this.randomInt(2, 10);
                return {
                    question: `yがxに比例し、x = ${x}のときy = ${k * x}である。\n(1) yをxの式で表しなさい。\n(2) x = 5のときのyの値を求めなさい。`,
                    answer: `(1) y = ${k}x\n(2) y = ${k * 5}`,
                    solution: `比例定数k = ${k * x} ÷ ${x} = ${k}\n(1) y = ${k}x\n(2) y = ${k} × 5 = ${k * 5}`
                };
            },
            2: () => {
                const k = this.randomInt(3, 12);
                const x1 = this.randomInt(2, 6);
                const x2 = this.randomInt(7, 12);
                return {
                    question: `yがxに反比例し、x = ${x1}のときy = ${Math.floor(k * 12 / x1)}である。\nx = ${x2}のときのyの値を求めなさい。`,
                    answer: `y = ${Math.floor(k * 12 / x2)}`,
                    solution: `比例定数k = ${x1} × ${Math.floor(k * 12 / x1)} = ${k * 12}\ny = ${k * 12}/x\nx = ${x2}のとき、y = ${k * 12} ÷ ${x2} = ${Math.floor(k * 12 / x2)}`
                };
            }
        };
        const difficultyLevel = Math.min(difficulty, 2);
        return problems[difficultyLevel]();
    }

    generatePlaneGeometryProblems(difficulty) {
        const problems = {
            1: () => {
                const angle1 = this.randomInt(30, 80);
                const angle2 = 180 - angle1 - this.randomInt(20, 60);
                return {
                    question: `三角形ABCで、∠A = ${angle1}°、∠B = ${angle2}°のとき、∠Cの大きさを求めなさい。`,
                    answer: `${180 - angle1 - angle2}°`,
                    solution: `三角形の内角の和は180°\n∠C = 180° - ${angle1}° - ${angle2}° = ${180 - angle1 - angle2}°`
                };
            },
            2: () => {
                const side = this.randomInt(4, 12);
                return {
                    question: `1辺が${side}cmの正方形の周囲の長さと面積を求めなさい。`,
                    answer: `周囲: ${side * 4}cm、面積: ${side * side}cm²`,
                    solution: `周囲の長さ = ${side} × 4 = ${side * 4}cm\n面積 = ${side} × ${side} = ${side * side}cm²`
                };
            }
        };
        const difficultyLevel = Math.min(difficulty, 2);
        return problems[difficultyLevel]();
    }

    generateSolidGeometryProblems(difficulty) {
        // 空間図形の問題生成
        return { question: "空間図形の問題", answer: "解", solution: "解法" };
    }

    generateDataAnalysisProblems(difficulty) {
        const problems = {
            1: () => {
                const scores = [75, 80, 65, 90, 85, 70, 95, 60, 85, 80];
                const sum = scores.reduce((a, b) => a + b, 0);
                const average = sum / scores.length;
                return {
                    question: `次のテストの点数について平均点を求めなさい。\n${scores.join('点、')}点`,
                    answer: `${average}点`,
                    solution: `合計 = ${scores.join(' + ')} = ${sum}点\n平均 = ${sum} ÷ ${scores.length} = ${average}点`
                };
            },
            2: () => {
                const data = [8, 12, 15, 8, 20, 12, 8, 25];
                const sortedData = [...data].sort((a, b) => a - b);
                const mode = data.filter(x => data.indexOf(x) !== data.lastIndexOf(x))[0];
                return {
                    question: `次のデータの最頻値（モード）を求めなさい。\n${data.join(', ')}`,
                    answer: `${mode}`,
                    solution: `データを整理すると: ${sortedData.join(', ')}\n最も多く現れる値は ${mode}`
                };
            }
        };
        const difficultyLevel = Math.min(difficulty, 2);
        return problems[difficultyLevel]();
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