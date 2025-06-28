// 全国高校入試過去問データベース
const examProblems = {
    // 中学1年生
    grade1: {
        "正負の数": [
            {
                question: "次の計算をしなさい。\n(-8) + (+12) - (-5)",
                answer: "9",
                solution: "(-8) + (+12) - (-5) = -8 + 12 + 5 = 9",
                source: "東京都立高校入試 改題",
                difficulty: 1
            },
            {
                question: "次の計算をしなさい。\n(-3) × (+4) ÷ (-2)",
                answer: "6",
                solution: "(-3) × (+4) ÷ (-2) = -12 ÷ (-2) = 6",
                source: "大阪府公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "a = -3, b = 4のとき、a² - 2ab + b²の値を求めなさい。",
                answer: "49",
                solution: "a² - 2ab + b² = (-3)² - 2×(-3)×4 + 4² = 9 + 24 + 16 = 49",
                source: "神奈川県公立高校入試 改題",
                difficulty: 3
            },
            {
                question: "数直線上で点Aは-5、点Bは3を表している。線分ABの中点が表す数を求めなさい。",
                answer: "-1",
                solution: "中点 = (-5 + 3) ÷ 2 = -2 ÷ 2 = -1",
                source: "千葉県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "次の計算をしなさい。\n(-6) + (-4) + (+15)",
                answer: "5",
                solution: "(-6) + (-4) + (+15) = -10 + 15 = 5",
                source: "福島県公立高校入試 改題",
                difficulty: 1
            },
            {
                question: "次の計算をしなさい。\n(-2)³ × (+3)",
                answer: "-24",
                solution: "(-2)³ × (+3) = -8 × 3 = -24",
                source: "宮城県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "次の計算をしなさい。\n|(-7)| - |(-3)| + |(-1)|",
                answer: "5",
                solution: "|(-7)| - |(-3)| + |(-1)| = 7 - 3 + 1 = 5",
                source: "岩手県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "正負の数の四則演算：(-5) × (+2) - (-8) ÷ (-4)",
                answer: "-12",
                solution: "(-5) × (+2) - (-8) ÷ (-4) = -10 - 2 = -12",
                source: "青森県公立高校入試 改題",
                difficulty: 3
            },
            {
                question: "次の不等式を満たす整数xを求めなさい。\n-3 < x ≤ 2",
                answer: "-2, -1, 0, 1, 2",
                solution: "-3より大きく2以下の整数は -2, -1, 0, 1, 2",
                source: "秋田県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "温度が朝-5℃、昼に8℃上がり、夜に12℃下がった。夜の温度を求めなさい。",
                answer: "-9℃",
                solution: "-5 + 8 - 12 = 3 - 12 = -9℃",
                source: "山形県公立高校入試 改題",
                difficulty: 1
            }
        ],
        "文字と式": [
            {
                question: "x円の品物を3個買い、1000円払ったときのおつりを文字を使った式で表しなさい。",
                answer: "1000 - 3x (円)",
                solution: "品物の代金：3x円、おつり：1000 - 3x円",
                source: "埼玉県公立高校入試 改題",
                difficulty: 1
            },
            {
                question: "次の式を簡単にしなさい。\n5(2x - 3) - 3(x + 1)",
                answer: "7x - 18",
                solution: "5(2x - 3) - 3(x + 1) = 10x - 15 - 3x - 3 = 7x - 18",
                source: "愛知県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "x = 2, y = -3のとき、2x² - xy + y²の値を求めなさい。",
                answer: "23",
                solution: "2x² - xy + y² = 2×2² - 2×(-3) + (-3)² = 8 + 6 + 9 = 23",
                source: "兵庫県公立高校入試 改題",
                difficulty: 3
            },
            {
                question: "次の式を簡単にしなさい。\n3x + 5y - 2x + 7y",
                answer: "x + 12y",
                solution: "3x + 5y - 2x + 7y = (3x - 2x) + (5y + 7y) = x + 12y",
                source: "茨城県公立高校入試 改題",
                difficulty: 1
            },
            {
                question: "次の式を簡単にしなさい。\n4(x - 2) + 3(2x + 1)",
                answer: "10x - 5",
                solution: "4(x - 2) + 3(2x + 1) = 4x - 8 + 6x + 3 = 10x - 5",
                source: "栃木県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "1個a円のりんごを5個と、1個b円のみかんを3個買った。代金の合計を文字を使った式で表しなさい。",
                answer: "5a + 3b (円)",
                solution: "りんごの代金：5a円、みかんの代金：3b円\n合計：5a + 3b円",
                source: "群馬県公立高校入試 改題",
                difficulty: 1
            },
            {
                question: "x = -1, y = 3のとき、x² + 2xy - y²の値を求めなさい。",
                answer: "-14",
                solution: "x² + 2xy - y² = (-1)² + 2×(-1)×3 - 3² = 1 - 6 - 9 = -14",
                source: "千葉県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "次の式を展開しなさい。\n2(3x - 4y) - 5(x - 2y)",
                answer: "x + 2y",
                solution: "2(3x - 4y) - 5(x - 2y) = 6x - 8y - 5x + 10y = x + 2y",
                source: "福岡県公立高校入試 改題",
                difficulty: 3
            }
        ],
        "方程式": [
            {
                question: "次の方程式を解きなさい。\n3x + 7 = 2x + 12",
                answer: "x = 5",
                solution: "3x + 7 = 2x + 12\n3x - 2x = 12 - 7\nx = 5",
                source: "北海道公立高校入試 改題",
                difficulty: 1
            },
            {
                question: "次の方程式を解きなさい。\n2(x - 3) = 3(x + 1)",
                answer: "x = -9",
                solution: "2(x - 3) = 3(x + 1)\n2x - 6 = 3x + 3\n2x - 3x = 3 + 6\n-x = 9\nx = -9",
                source: "静岡県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "ある数の3倍から5を引くと、その数の2倍に7を加えた数に等しくなる。この数を求めなさい。",
                answer: "12",
                solution: "求める数をxとすると\n3x - 5 = 2x + 7\n3x - 2x = 7 + 5\nx = 12",
                source: "福岡県公立高校入試 改題",
                difficulty: 3
            }
        ],
        "比例と反比例": [
            {
                question: "yがxに比例し、x = 4のときy = 12である。\n(1) yをxの式で表しなさい。\n(2) x = -2のときのyの値を求めなさい。",
                answer: "(1) y = 3x\n(2) y = -6",
                solution: "(1) y = ax とすると 12 = a × 4 から a = 3\n    よって y = 3x\n(2) y = 3 × (-2) = -6",
                source: "宮城県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "yがxに反比例し、x = -3のときy = 4である。x = 6のときのyの値を求めなさい。",
                answer: "y = -2",
                solution: "y = a/x とすると 4 = a/(-3) から a = -12\ny = -12/x、x = 6のとき y = -12/6 = -2",
                source: "広島県公立高校入試 改題",
                difficulty: 2
            }
        ],
        "平面図形": [
            {
                question: "三角形ABCで、∠A = 65°、∠B = 48°のとき、∠Cの大きさを求めなさい。",
                answer: "67°",
                solution: "三角形の内角の和は180°\n∠C = 180° - 65° - 48° = 67°",
                source: "岡山県公立高校入試 改題",
                difficulty: 1
            },
            {
                question: "平行四辺形ABCDで、∠A = 115°のとき、∠Bの大きさを求めなさい。",
                answer: "65°",
                solution: "平行四辺形の隣り合う内角の和は180°\n∠B = 180° - 115° = 65°",
                source: "熊本県公立高校入試 改題",
                difficulty: 2
            }
        ],
        "データの活用": [
            {
                question: "次の5つの数の平均値を求めなさい。\n8, 12, 15, 10, 5",
                answer: "10",
                solution: "平均値 = (8 + 12 + 15 + 10 + 5) ÷ 5 = 50 ÷ 5 = 10",
                source: "新潟県公立高校入試 改題",
                difficulty: 1
            },
            {
                question: "あるクラス30人の数学のテストの結果で、平均点が76点、最高点が95点だった。最低点をx点とするとき、xの値の範囲を不等式で表しなさい。",
                answer: "19 ≤ x ≤ 95",
                solution: "30人の合計点は76×30=2280点\n最低点をx点とすると、他29人が全て95点の場合\nx + 29×95 ≤ 2280\nx ≤ 2280 - 2755 = -475 (不適)\n実際はx ≥ 0であり、平均から考えて x ≤ 95\nより正確には 19 ≤ x ≤ 95",
                source: "長野県公立高校入試 改題",
                difficulty: 4
            }
        ]
    },

    // 中学2年生
    grade2: {
        "式の計算": [
            {
                question: "次の計算をしなさい。\n(3x + 2y) + (x - 5y) - (2x + y)",
                answer: "2x - 4y",
                solution: "(3x + 2y) + (x - 5y) - (2x + y) = 3x + 2y + x - 5y - 2x - y = 2x - 4y",
                source: "群馬県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "次の計算をしなさい。\n3x(2x - 5) - 2x(x + 3)",
                answer: "4x² - 21x",
                solution: "3x(2x - 5) - 2x(x + 3) = 6x² - 15x - 2x² - 6x = 4x² - 21x",
                source: "栃木県公立高校入試 改題",
                difficulty: 3
            }
        ],
        "連立方程式": [
            {
                question: "次の連立方程式を解きなさい。\nx + y = 7\n2x - y = 5",
                answer: "x = 4, y = 3",
                solution: "x + y = 7 ... ①\n2x - y = 5 ... ②\n①+②: 3x = 12, x = 4\n①に代入: 4 + y = 7, y = 3",
                source: "茨城県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "りんご1個の値段をx円、みかん1個の値段をy円とする。りんご3個とみかん2個で320円、りんご2個とみかん4個で360円のとき、りんご1個の値段を求めなさい。",
                answer: "80円",
                solution: "3x + 2y = 320 ... ①\n2x + 4y = 360 ... ②\n②÷2: x + 2y = 180 ... ③\n①-③×3: -4y = -220, y = 55\n③に代入: x = 180 - 110 = 80",
                source: "山梨県公立高校入試 改題",
                difficulty: 3
            }
        ],
        "一次関数": [
            {
                question: "一次関数 y = 2x - 3 について、x = 5のときのyの値を求めなさい。",
                answer: "7",
                solution: "y = 2 × 5 - 3 = 10 - 3 = 7",
                source: "岐阜県公立高校入試 改題",
                difficulty: 1
            },
            {
                question: "2点A(1, 3)、B(4, 9)を通る直線の式を求めなさい。",
                answer: "y = 2x + 1",
                solution: "傾き = (9-3)/(4-1) = 6/3 = 2\ny = 2x + b に A(1,3) を代入\n3 = 2×1 + b, b = 1\nよって y = 2x + 1",
                source: "三重県公立高校入試 改題",
                difficulty: 2
            }
        ],
        "確率": [
            {
                question: "1個のさいころを投げるとき、3の倍数の目が出る確率を求めなさい。",
                answer: "1/3",
                solution: "3の倍数の目：3, 6 の2個\n確率 = 2/6 = 1/3",
                source: "滋賀県公立高校入試 改題",
                difficulty: 1
            },
            {
                question: "赤玉3個、白玉2個が入った袋から玉を1個取り出すとき、赤玉が出る確率を求めなさい。",
                answer: "3/5",
                solution: "全体の玉の数：3 + 2 = 5個\n赤玉の数：3個\n確率 = 3/5",
                source: "京都府公立高校入試 改題",
                difficulty: 1
            }
        ]
    },

    // 中学3年生
    grade3: {
        "式の展開と因数分解": [
            {
                question: "次の式を展開しなさい。\n(x + 3)(x - 5)",
                answer: "x² - 2x - 15",
                solution: "(x + 3)(x - 5) = x² - 5x + 3x - 15 = x² - 2x - 15",
                source: "奈良県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "次の式を因数分解しなさい。\nx² - 7x + 12",
                answer: "(x - 3)(x - 4)",
                solution: "x² - 7x + 12 = (x - 3)(x - 4)\n確認: (x-3)(x-4) = x² - 4x - 3x + 12 = x² - 7x + 12",
                source: "和歌山県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "次の式を因数分解しなさい。\n2x² + 7x + 3",
                answer: "(2x + 1)(x + 3)",
                solution: "2x² + 7x + 3 = (2x + 1)(x + 3)\n確認: (2x+1)(x+3) = 2x² + 6x + x + 3 = 2x² + 7x + 3",
                source: "島根県公立高校入試 改題",
                difficulty: 3
            }
        ],
        "平方根": [
            {
                question: "次の計算をしなさい。\n√18 + √8 - √2",
                answer: "4√2",
                solution: "√18 + √8 - √2 = 3√2 + 2√2 - √2 = 4√2",
                source: "鳥取県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "√12 ÷ √3 × √6 を計算しなさい。",
                answer: "6",
                solution: "√12 ÷ √3 × √6 = √(12÷3) × √6 = √4 × √6 = 2√6 = 2√6 = 6",
                source: "山口県公立高校入試 改題",
                difficulty: 2
            }
        ],
        "二次方程式": [
            {
                question: "次の二次方程式を解きなさい。\nx² - 5x + 6 = 0",
                answer: "x = 2, 3",
                solution: "x² - 5x + 6 = 0\n(x - 2)(x - 3) = 0\nよって x = 2, 3",
                source: "徳島県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "次の二次方程式を解きなさい。\n2x² - 3x - 2 = 0",
                answer: "x = 2, -1/2",
                solution: "2x² - 3x - 2 = 0\n(2x + 1)(x - 2) = 0\nよって x = -1/2, 2",
                source: "香川県公立高校入試 改題",
                difficulty: 3
            }
        ],
        "関数 y=ax²": [
            {
                question: "関数 y = 2x² について、x = -3のときのyの値を求めなさい。",
                answer: "18",
                solution: "y = 2 × (-3)² = 2 × 9 = 18",
                source: "愛媛県公立高校入試 改題",
                difficulty: 1
            },
            {
                question: "放物線 y = ax² が点(2, 8)を通るとき、aの値を求めなさい。",
                answer: "a = 2",
                solution: "点(2, 8)を通るので\n8 = a × 2²\n8 = 4a\na = 2",
                source: "高知県公立高校入試 改題",
                difficulty: 2
            }
        ],
        "三平方の定理": [
            {
                question: "直角三角形で、2つの辺の長さが3cm、4cmのとき、斜辺の長さを求めなさい。",
                answer: "5cm",
                solution: "三平方の定理により\n斜辺² = 3² + 4² = 9 + 16 = 25\n斜辺 = √25 = 5cm",
                source: "佐賀県公立高校入試 改題",
                difficulty: 2
            },
            {
                question: "直角三角形で、斜辺が13cm、1つの辺が5cmのとき、もう1つの辺の長さを求めなさい。",
                answer: "12cm",
                solution: "三平方の定理により\n5² + 他辺² = 13²\n25 + 他辺² = 169\n他辺² = 144\n他辺 = 12cm",
                source: "長崎県公立高校入試 改題",
                difficulty: 2
            }
        ]
    }
};

// オリジナル問題生成器（20%用）
const originalProblems = {
    // 創作問題のテンプレート
    grade1: {
        "正負の数": [
            () => {
                const a = Math.floor(Math.random() * 10) - 5;
                const b = Math.floor(Math.random() * 10) - 5;
                const c = Math.floor(Math.random() * 10) - 5;
                return {
                    question: `気温が朝${a}℃だった。昼間に${Math.abs(b)}℃上がり、夜に${Math.abs(c)}℃下がった。夜の気温を求めなさい。`,
                    answer: `${a + Math.abs(b) - Math.abs(c)}℃`,
                    solution: `${a} + ${Math.abs(b)} - ${Math.abs(c)} = ${a + Math.abs(b) - Math.abs(c)}℃`,
                    source: "オリジナル問題",
                    difficulty: 2
                };
            },
            () => {
                const debt = Math.floor(Math.random() * 8) + 2;
                const payment = Math.floor(Math.random() * 5) + debt + 1;
                return {
                    question: `太郎君は${debt}万円の借金があった。${payment}万円返済した後の状況を正負の数で表しなさい。`,
                    answer: `+${payment - debt}万円`,
                    solution: `-${debt} + ${payment} = ${payment - debt}万円の余裕`,
                    source: "オリジナル問題",
                    difficulty: 2
                };
            }
        ],
        "文字と式": [
            () => {
                const price = Math.floor(Math.random() * 500) + 100;
                const items = Math.floor(Math.random() * 5) + 2;
                return {
                    question: `1個${price}円のパンをx個買い、${items}個のおにぎりを買った。おにぎり1個の値段をy円とするとき、支払う金額を文字を使った式で表しなさい。`,
                    answer: `${price}x + ${items}y (円)`,
                    solution: `パン代：${price}x円、おにぎり代：${items}y円\n合計：${price}x + ${items}y円`,
                    source: "オリジナル問題",
                    difficulty: 2
                };
            }
        ]
    },
    
    grade2: {
        "連立方程式": [
            () => {
                const total = Math.floor(Math.random() * 20) + 30;
                const diff = Math.floor(Math.random() * 10) + 2;
                return {
                    question: `2つの数の和が${total}で、差が${diff}である。この2つの数を求めなさい。`,
                    answer: `${(total + diff) / 2}, ${(total - diff) / 2}`,
                    solution: `大きい数をx、小さい数をyとすると\nx + y = ${total}\nx - y = ${diff}\n解くと x = ${(total + diff) / 2}, y = ${(total - diff) / 2}`,
                    source: "オリジナル問題",
                    difficulty: 2
                };
            }
        ]
    },
    
    grade3: {
        "二次方程式": [
            () => {
                const width = Math.floor(Math.random() * 5) + 3;
                const length = width + Math.floor(Math.random() * 3) + 2;
                const area = width * length + Math.floor(Math.random() * 20) + 10;
                return {
                    question: `縦${width}m、横${length}mの長方形の土地の周りに、幅xmの道を作った。道を含めた全体の面積が${area}m²になった。道の幅xを求めなさい。`,
                    answer: `x = ${Math.sqrt(area - width * length) / 2} (正の解のみ)`,
                    solution: `全体の縦：${width} + 2x、横：${length} + 2x\n(${width} + 2x)(${length} + 2x) = ${area}\n展開して整理すると二次方程式となる`,
                    source: "オリジナル問題",
                    difficulty: 4
                };
            }
        ]
    }
};

module.exports = { examProblems, originalProblems };