// 日本の中学校学習指導要領に基づく数学カリキュラム

const mathCurriculum = {
    grade1: {
        name: "中学1年生",
        fields: {
            "正負の数": {
                topics: ["正負の数の概念", "正負の数の加法・減法", "正負の数の乗法・除法", "四則混合計算"],
                difficulty: {
                    1: { description: "基本的な計算", timePerProblem: 2 },
                    2: { description: "一般的な計算", timePerProblem: 3 },
                    3: { description: "やや複雑な計算", timePerProblem: 4 },
                    4: { description: "応用問題", timePerProblem: 5 },
                    5: { description: "発展問題", timePerProblem: 6 }
                }
            },
            "文字と式": {
                topics: ["文字を使った式", "式の値", "一次式の加法・減法", "等式・不等式"],
                difficulty: {
                    1: { description: "基本的な文字式", timePerProblem: 2 },
                    2: { description: "文字式の計算", timePerProblem: 3 },
                    3: { description: "式の値の計算", timePerProblem: 4 },
                    4: { description: "文字式の応用", timePerProblem: 5 },
                    5: { description: "発展的な文字式", timePerProblem: 6 }
                }
            },
            "方程式": {
                topics: ["一次方程式", "一次方程式の解法", "一次方程式の文章題"],
                difficulty: {
                    1: { description: "基本的な一次方程式", timePerProblem: 3 },
                    2: { description: "係数のある方程式", timePerProblem: 4 },
                    3: { description: "分数を含む方程式", timePerProblem: 5 },
                    4: { description: "文章題", timePerProblem: 7 },
                    5: { description: "複雑な文章題", timePerProblem: 8 }
                }
            },
            "比例と反比例": {
                topics: ["比例", "反比例", "比例・反比例のグラフ"],
                difficulty: {
                    1: { description: "基本的な比例関係", timePerProblem: 3 },
                    2: { description: "比例定数の計算", timePerProblem: 4 },
                    3: { description: "グラフの読み取り", timePerProblem: 5 },
                    4: { description: "反比例の応用", timePerProblem: 6 },
                    5: { description: "複合的な問題", timePerProblem: 7 }
                }
            },
            "平面図形": {
                topics: ["直線と角", "平行線と角", "三角形と四角形", "円"],
                difficulty: {
                    1: { description: "基本的な角度", timePerProblem: 2 },
                    2: { description: "平行線の性質", timePerProblem: 3 },
                    3: { description: "三角形の角", timePerProblem: 4 },
                    4: { description: "図形の性質", timePerProblem: 5 },
                    5: { description: "複合図形", timePerProblem: 6 }
                }
            },
            "空間図形": {
                topics: ["立体の見方", "立体の体積・表面積", "球"],
                difficulty: {
                    1: { description: "基本的な立体", timePerProblem: 3 },
                    2: { description: "体積の計算", timePerProblem: 4 },
                    3: { description: "表面積の計算", timePerProblem: 5 },
                    4: { description: "複合立体", timePerProblem: 6 },
                    5: { description: "応用問題", timePerProblem: 7 }
                }
            },
            "データの活用": {
                topics: ["データの収集・整理", "ヒストグラム", "平均値・中央値・最頻値"],
                difficulty: {
                    1: { description: "基本的なデータ読み取り", timePerProblem: 2 },
                    2: { description: "平均値の計算", timePerProblem: 3 },
                    3: { description: "中央値・最頻値", timePerProblem: 4 },
                    4: { description: "ヒストグラムの作成", timePerProblem: 5 },
                    5: { description: "データの分析", timePerProblem: 6 }
                }
            }
        }
    },
    
    grade2: {
        name: "中学2年生",
        fields: {
            "式の計算": {
                topics: ["単項式・多項式", "式の加法・減法", "単項式の乗法・除法", "式の値"],
                difficulty: {
                    1: { description: "基本的な多項式", timePerProblem: 2 },
                    2: { description: "多項式の加減", timePerProblem: 3 },
                    3: { description: "単項式の乗除", timePerProblem: 3 },
                    4: { description: "複雑な計算", timePerProblem: 4 },
                    5: { description: "応用計算", timePerProblem: 5 }
                }
            },
            "連立方程式": {
                topics: ["連立方程式", "連立方程式の解法", "連立方程式の文章題"],
                difficulty: {
                    1: { description: "基本的な連立方程式", timePerProblem: 4 },
                    2: { description: "加減法・代入法", timePerProblem: 5 },
                    3: { description: "係数の整理が必要", timePerProblem: 6 },
                    4: { description: "文章題", timePerProblem: 8 },
                    5: { description: "複雑な文章題", timePerProblem: 10 }
                }
            },
            "一次関数": {
                topics: ["一次関数", "一次関数のグラフ", "一次関数の利用"],
                difficulty: {
                    1: { description: "基本的な一次関数", timePerProblem: 3 },
                    2: { description: "傾きと切片", timePerProblem: 4 },
                    3: { description: "グラフの作成", timePerProblem: 5 },
                    4: { description: "グラフの読み取り", timePerProblem: 6 },
                    5: { description: "一次関数の応用", timePerProblem: 7 }
                }
            },
            "図形の調べ方": {
                topics: ["合同な図形", "三角形の合同条件", "証明"],
                difficulty: {
                    1: { description: "合同な図形の判定", timePerProblem: 3 },
                    2: { description: "合同条件の確認", timePerProblem: 4 },
                    3: { description: "簡単な証明", timePerProblem: 8 },
                    4: { description: "複雑な証明", timePerProblem: 12 },
                    5: { description: "発展的な証明", timePerProblem: 15 }
                }
            },
            "平行四辺形": {
                topics: ["平行四辺形の性質", "平行四辺形になる条件", "特別な平行四辺形"],
                difficulty: {
                    1: { description: "基本的な性質", timePerProblem: 3 },
                    2: { description: "性質の応用", timePerProblem: 4 },
                    3: { description: "条件の確認", timePerProblem: 5 },
                    4: { description: "証明問題", timePerProblem: 10 },
                    5: { description: "発展的な証明", timePerProblem: 12 }
                }
            },
            "確率": {
                topics: ["確率の求め方", "いろいろな確率"],
                difficulty: {
                    1: { description: "基本的な確率", timePerProblem: 3 },
                    2: { description: "樹形図を使った確率", timePerProblem: 5 },
                    3: { description: "条件付き確率", timePerProblem: 6 },
                    4: { description: "複雑な確率", timePerProblem: 7 },
                    5: { description: "応用問題", timePerProblem: 8 }
                }
            }
        }
    },
    
    grade3: {
        name: "中学3年生",
        fields: {
            "式の展開と因数分解": {
                topics: ["多項式の乗法", "展開の公式", "因数分解", "式の計算の利用"],
                difficulty: {
                    1: { description: "基本的な展開", timePerProblem: 2 },
                    2: { description: "公式を使った展開", timePerProblem: 3 },
                    3: { description: "因数分解", timePerProblem: 4 },
                    4: { description: "複雑な因数分解", timePerProblem: 5 },
                    5: { description: "式の計算の応用", timePerProblem: 6 }
                }
            },
            "平方根": {
                topics: ["平方根", "根号を含む式の計算", "平方根の利用"],
                difficulty: {
                    1: { description: "基本的な平方根", timePerProblem: 2 },
                    2: { description: "平方根の計算", timePerProblem: 3 },
                    3: { description: "根号を含む式", timePerProblem: 4 },
                    4: { description: "複雑な計算", timePerProblem: 5 },
                    5: { description: "平方根の応用", timePerProblem: 6 }
                }
            },
            "二次方程式": {
                topics: ["二次方程式", "二次方程式の解法", "二次方程式の利用"],
                difficulty: {
                    1: { description: "基本的な二次方程式", timePerProblem: 4 },
                    2: { description: "因数分解による解法", timePerProblem: 5 },
                    3: { description: "解の公式", timePerProblem: 6 },
                    4: { description: "文章題", timePerProblem: 8 },
                    5: { description: "複雑な応用問題", timePerProblem: 10 }
                }
            },
            "関数 y=ax²": {
                topics: ["関数 y=ax²", "関数 y=ax²のグラフ", "いろいろな関数"],
                difficulty: {
                    1: { description: "基本的な二次関数", timePerProblem: 3 },
                    2: { description: "グラフの読み取り", timePerProblem: 4 },
                    3: { description: "グラフの作成", timePerProblem: 5 },
                    4: { description: "一次関数との関係", timePerProblem: 6 },
                    5: { description: "関数の応用", timePerProblem: 7 }
                }
            },
            "相似な図形": {
                topics: ["相似な図形", "三角形の相似条件", "平行線と線分の比", "相似の利用"],
                difficulty: {
                    1: { description: "相似な図形の判定", timePerProblem: 3 },
                    2: { description: "相似比の計算", timePerProblem: 4 },
                    3: { description: "線分の比", timePerProblem: 5 },
                    4: { description: "相似の証明", timePerProblem: 10 },
                    5: { description: "相似の応用", timePerProblem: 12 }
                }
            },
            "円": {
                topics: ["円周角", "円に内接する四角形", "円の性質の利用"],
                difficulty: {
                    1: { description: "基本的な円周角", timePerProblem: 3 },
                    2: { description: "円周角の定理", timePerProblem: 4 },
                    3: { description: "内接四角形", timePerProblem: 5 },
                    4: { description: "円の性質の証明", timePerProblem: 8 },
                    5: { description: "発展的な問題", timePerProblem: 10 }
                }
            },
            "三平方の定理": {
                topics: ["三平方の定理", "三平方の定理の逆", "三平方の定理の利用"],
                difficulty: {
                    1: { description: "基本的な計算", timePerProblem: 3 },
                    2: { description: "辺の長さの計算", timePerProblem: 4 },
                    3: { description: "図形への応用", timePerProblem: 5 },
                    4: { description: "空間図形への応用", timePerProblem: 6 },
                    5: { description: "複雑な応用問題", timePerProblem: 8 }
                }
            },
            "標本調査": {
                topics: ["母集団と標本", "標本調査"],
                difficulty: {
                    1: { description: "基本的な概念", timePerProblem: 2 },
                    2: { description: "標本の選び方", timePerProblem: 3 },
                    3: { description: "標本調査の計算", timePerProblem: 4 },
                    4: { description: "調査結果の分析", timePerProblem: 5 },
                    5: { description: "標本調査の応用", timePerProblem: 6 }
                }
            }
        }
    }
};

module.exports = mathCurriculum;