class MathTestCreator {
    constructor() {
        this.currentStep = 1;
        this.selectedGrade = null;
        this.selectedFields = [];
        this.difficulty = 3;
        this.timeLimit = 50;
        this.generatedTest = null;
        this.sessionKey = 'mathTestAuth';
        this.init();
    }

    async init() {
        console.log('App initializing...');
        
        // 認証チェックを一時的にスキップ（デバッグ用）
        console.log('Skipping authentication for debugging...');
        
        console.log('Setting up event listeners...');
        this.setupEventListeners();
        this.updateProgress();
        console.log('App initialization complete');
    }

    async checkServerAuthentication() {
        try {
            const response = await fetch('/api/auth/status', {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Auth API response:', data);
                if (data.authenticated) {
                    return true;
                }
            } else {
                console.log('Auth API failed with status:', response.status);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        }
        
        // 認証が失敗した場合、ログインページに移動せずローカルストレージをチェック
        console.log('Server auth failed, checking if already on app page...');
        
        // 現在のURLが /app か /index.html の場合、すでにログイン済みと仮定
        const currentPath = window.location.pathname;
        if (currentPath.includes('/app') || currentPath.includes('index.html') || currentPath === '/') {
            console.log('Already on app page, assuming authenticated');
            return true;
        }
        
        return false;
    }

    redirectToLogin() {
        window.location.href = '/login.html';
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // ログアウトボタン
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
            console.log('Logout button listener added');
        }

        // 学年選択
        const gradeButtons = document.querySelectorAll('.grade-btn');
        console.log('Found grade buttons:', gradeButtons.length);
        
        gradeButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                console.log('Grade button clicked:', e.currentTarget.dataset.grade);
                this.selectGrade(e.currentTarget.dataset.grade);
            });
            console.log(`Grade button ${index + 1} listener added`);
        });

        // ナビゲーションボタン
        document.getElementById('backToGrade').addEventListener('click', () => {
            this.showStep(1);
        });

        document.getElementById('proceedToDifficulty').addEventListener('click', () => {
            this.showStep(3);
        });

        document.getElementById('backToField').addEventListener('click', () => {
            this.showStep(2);
        });

        document.getElementById('backToSettings').addEventListener('click', () => {
            this.showStep(3);
        });

        document.getElementById('generateTest').addEventListener('click', () => {
            this.generateTest();
        });

        document.getElementById('createNewTest').addEventListener('click', () => {
            this.resetToStart();
        });

        // 難易度スライダー
        const difficultyRange = document.getElementById('difficultyRange');
        difficultyRange.addEventListener('input', (e) => {
            this.updateDifficulty(e.target.value);
        });

        // 時間スライダー
        const timeRange = document.getElementById('timeRange');
        timeRange.addEventListener('input', (e) => {
            this.updateTime(e.target.value);
        });

        // PDF機能は削除されました
    }

    async logout() {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.redirectToLogin();
        }
    }

    selectGrade(grade) {
        console.log('selectGrade called with grade:', grade);
        try {
            this.selectedGrade = parseInt(grade);
            console.log('Selected grade set to:', this.selectedGrade);
            
            // UI更新
            document.querySelectorAll('.grade-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            document.querySelector(`[data-grade="${grade}"]`).classList.add('selected');
            console.log('UI updated for grade:', grade);

            // 分野データを読み込んで表示
            this.loadFieldsForGrade(grade);
            
            setTimeout(() => {
                console.log('Moving to step 2');
                this.showStep(2);
            }, 300);
        } catch (error) {
            console.error('Error in selectGrade:', error);
        }
    }

    async loadFieldsForGrade(grade) {
        // 直接クライアントサイドデータを使用（確実に動作）
        console.log('Loading fields for grade:', grade);
        this.renderFieldsFromClientData(grade);
    }

    renderFieldsFromClientData(grade) {
        console.log('renderFieldsFromClientData called for grade:', grade);
        // クライアントサイド用のフォールバックデータ
        const clientData = {
            1: {
                "正負の数": "正負の数の概念、四則演算",
                "文字と式": "文字を使った式、式の値",
                "方程式": "一次方程式、文章題",
                "比例と反比例": "比例、反比例、グラフ",
                "平面図形": "直線と角、三角形と四角形",
                "空間図形": "立体の体積・表面積",
                "データの活用": "ヒストグラム、平均値"
            },
            2: {
                "式の計算": "単項式・多項式の計算",
                "連立方程式": "連立方程式の解法、文章題",
                "一次関数": "一次関数とグラフ",
                "図形の調べ方": "合同な図形、証明",
                "平行四辺形": "平行四辺形の性質",
                "確率": "確率の求め方"
            },
            3: {
                "式の展開と因数分解": "展開の公式、因数分解",
                "平方根": "平方根の計算",
                "二次方程式": "二次方程式の解法",
                "関数 y=ax²": "二次関数とグラフ",
                "相似な図形": "相似な図形、相似の利用",
                "円": "円周角、円の性質",
                "三平方の定理": "三平方の定理の利用",
                "標本調査": "母集団と標本"
            }
        };

        const gradeData = clientData[grade] || {};
        console.log('Grade data for grade', grade, ':', gradeData);
        this.renderFields(gradeData);
    }

    renderFields(fields) {
        const fieldGrid = document.getElementById('fieldGrid');
        fieldGrid.innerHTML = '';

        Object.entries(fields).forEach(([fieldName, description]) => {
            const fieldItem = document.createElement('div');
            fieldItem.className = 'field-item';
            fieldItem.dataset.field = fieldName;
            
            fieldItem.innerHTML = `
                <div class="field-checkbox">✓</div>
                <div class="field-info">
                    <h3>${fieldName}</h3>
                    <div class="field-topics">${description}</div>
                </div>
            `;

            fieldItem.addEventListener('click', () => {
                this.toggleField(fieldName, fieldItem);
            });

            fieldGrid.appendChild(fieldItem);
        });
        console.log('Fields rendered successfully, count:', Object.keys(fields).length);
    }

    toggleField(fieldName, element) {
        if (this.selectedFields.includes(fieldName)) {
            this.selectedFields = this.selectedFields.filter(f => f !== fieldName);
            element.classList.remove('selected');
        } else {
            this.selectedFields.push(fieldName);
            element.classList.add('selected');
        }

        // 次へボタンの有効/無効制御
        const proceedBtn = document.getElementById('proceedToDifficulty');
        proceedBtn.disabled = this.selectedFields.length === 0;
    }

    updateDifficulty(value) {
        this.difficulty = parseInt(value);
        document.getElementById('difficultyValue').textContent = value;
        
        const descriptions = {
            1: "基本的な問題レベルです",
            2: "やや易しい問題レベルです", 
            3: "標準的な問題レベルです",
            4: "やや難しい問題レベルです",
            5: "発展的な問題レベルです"
        };
        
        document.getElementById('difficultyDescription').textContent = descriptions[value];
    }

    updateTime(value) {
        this.timeLimit = parseInt(value);
        document.getElementById('timeValue').textContent = value;
    }

    async generateTest() {
        this.showLoading(true);

        try {
            const testData = {
                grade: this.selectedGrade,
                fields: this.selectedFields,
                difficulty: this.difficulty,
                timeLimit: this.timeLimit
            };

            const response = await fetch('/api/generate-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(testData)
            });

            if (response.ok) {
                this.generatedTest = await response.json();
                this.displayTestResult();
                this.showStep(4);
            } else {
                throw new Error('Test generation failed');
            }
        } catch (error) {
            console.error('Test generation error:', error);
            alert('テストの生成に失敗しました。もう一度お試しください。');
        } finally {
            this.showLoading(false);
        }
    }

    displayTestResult() {
        if (!this.generatedTest) return;

        // テスト概要
        const summaryContainer = document.getElementById('testSummary');
        summaryContainer.innerHTML = `
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="summary-value">${this.generatedTest.gradeName}</div>
                    <div class="summary-label">対象学年</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">${this.generatedTest.totalProblems}</div>
                    <div class="summary-label">問題数</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">レベル ${this.generatedTest.difficulty}</div>
                    <div class="summary-label">難易度</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">${this.generatedTest.actualTime}分</div>
                    <div class="summary-label">想定時間</div>
                </div>
            </div>
        `;

        // 問題プレビュー
        const previewContainer = document.getElementById('testPreview');
        previewContainer.innerHTML = '';

        this.generatedTest.problems.forEach((problem, index) => {
            const problemElement = document.createElement('div');
            problemElement.className = 'problem-item';
            problemElement.innerHTML = `
                <div class="problem-header">
                    <span class="problem-number">問${index + 1}</span>
                    <span class="problem-field">${problem.field}</span>
                </div>
                <div class="problem-question">${problem.question}</div>
            `;
            previewContainer.appendChild(problemElement);
        });
    }

    // PDF機能は削除されました

    // PDF機能は削除されました

    showStep(step) {
        // 全てのステップを非表示
        document.querySelectorAll('.step-section').forEach(section => {
            section.style.display = 'none';
        });

        // 指定されたステップを表示
        const stepSections = {
            1: 'gradeSelection',
            2: 'fieldSelection', 
            3: 'settingsSelection',
            4: 'testResult'
        };

        const targetSection = document.getElementById(stepSections[step]);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        this.currentStep = step;
        this.updateProgress();
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressSteps = document.querySelectorAll('.progress-step');
        
        // プログレスバーの幅
        const progressWidth = (this.currentStep / 4) * 100;
        progressFill.style.width = `${progressWidth}%`;
        
        // ステップの状態更新
        progressSteps.forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 <= this.currentStep) {
                step.classList.add('active');
            }
        });
    }

    showLoading(show) {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }

    resetToStart() {
        this.selectedGrade = null;
        this.selectedFields = [];
        this.difficulty = 3;
        this.timeLimit = 50;
        this.generatedTest = null;
        
        // UI リセット
        document.querySelectorAll('.grade-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelectorAll('.field-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        document.getElementById('difficultyRange').value = 3;
        document.getElementById('timeRange').value = 50;
        this.updateDifficulty(3);
        this.updateTime(50);
        
        this.showStep(1);
    }
}

// ページロード時に初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting MathTestCreator');
    new MathTestCreator();
});

console.log('app.js loaded');