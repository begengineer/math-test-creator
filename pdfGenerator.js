// PDF生成エンジン
class PDFGenerator {
    constructor() {
        this.pageMargin = 40;
        this.lineHeight = 20;
        this.fontSize = {
            title: 18,
            subtitle: 14,
            body: 12,
            small: 10
        };
    }

    // テストPDF生成
    generateTestPDF(testData) {
        return new Promise((resolve, reject) => {
            try {
                // ブラウザ環境でjsPDFを使用
                if (typeof window !== 'undefined' && window.jsPDF) {
                    const pdf = this.generateClientSidePDF(testData);
                    resolve(pdf);
                } else {
                    // サーバーサイド（今回は簡単な形式で返す）
                    const textContent = this.generateTextContent(testData);
                    resolve(textContent);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    // クライアントサイドPDF生成（jsPDF使用）
    generateClientSidePDF(testData) {
        const { jsPDF } = window.jspdf;
        // Unicode対応でPDFを作成
        const doc = new jsPDF({
            unit: 'mm',
            format: 'a4',
            charset: 'utf-8'
        });
        
        // 日本語フォント設定
        doc.addFileToVFS('NotoSansCJK.ttf', 'base64,data');
        doc.addFont('NotoSansCJK.ttf', 'NotoSansCJK', 'normal');
        doc.setFont('NotoSansCJK', 'normal');
        
        let yPosition = 30;
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        
        // タイトル
        doc.setFontSize(this.fontSize.title);
        doc.setFont('helvetica', 'bold');
        const title = this.encodeText('数学テスト');
        doc.text(title, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;
        
        // テスト情報
        doc.setFontSize(this.fontSize.subtitle);
        doc.setFont('helvetica', 'normal');
        
        const testInfo = [
            `Target: ${testData.gradeName}`,
            `Fields: ${testData.selectedFields.join(', ')}`,
            `Difficulty: ${testData.difficulty}/5`,
            `Time: ${testData.targetTime} min`,
            `Problems: ${testData.totalProblems}`
        ];
        
        testInfo.forEach(info => {
            doc.text(info, this.pageMargin, yPosition);
            yPosition += 10;
        });
        yPosition += 10;
        
        // 注意事項
        doc.setFontSize(this.fontSize.small);
        doc.text('【注意事項】', this.pageMargin, yPosition);
        yPosition += 8;
        doc.text('・計算過程も書くこと', this.pageMargin + 5, yPosition);
        yPosition += 6;
        doc.text('・図やグラフは正確に描くこと', this.pageMargin + 5, yPosition);
        yPosition += 6;
        doc.text('・答えは指定された形で記入すること', this.pageMargin + 5, yPosition);
        yPosition += 20;
        
        // 問題
        doc.setFontSize(this.fontSize.body);
        testData.problems.forEach((problem, index) => {
            // ページ改行チェック
            if (yPosition > pageHeight - 60) {
                doc.addPage();
                yPosition = 30;
            }
            
            // 問題番号
            doc.setFont(undefined, 'bold');
            doc.text(`問${index + 1}`, this.pageMargin, yPosition);
            yPosition += 5;
            
            // 分野表示
            doc.setFontSize(this.fontSize.small);
            doc.setFont(undefined, 'normal');
            doc.text(`[${problem.field}]`, this.pageMargin + 30, yPosition - 5);
            
            // 問題文
            doc.setFontSize(this.fontSize.body);
            doc.setFont(undefined, 'normal');
            yPosition += 10;
            
            const questionLines = this.splitText(problem.question, pageWidth - 2 * this.pageMargin);
            questionLines.forEach(line => {
                doc.text(line, this.pageMargin, yPosition);
                yPosition += this.lineHeight;
            });
            
            // 解答欄
            yPosition += 10;
            doc.text('【解答】', this.pageMargin, yPosition);
            yPosition += 15;
            
            // 解答用の罫線
            for (let i = 0; i < 3; i++) {
                doc.line(this.pageMargin, yPosition, pageWidth - this.pageMargin, yPosition);
                yPosition += 15;
            }
            
            yPosition += 10;
        });
        
        return doc;
    }

    // テキスト形式でのテスト内容生成
    generateTextContent(testData) {
        let content = '';
        
        // ヘッダー
        content += '=========================================\n';
        content += '          数学テスト\n';
        content += '=========================================\n\n';
        
        // テスト情報
        content += `対象: ${testData.gradeName}\n`;
        content += `分野: ${testData.selectedFields.join(', ')}\n`;
        content += `難易度: ${testData.difficulty}/5\n`;
        content += `制限時間: ${testData.targetTime}分\n`;
        content += `問題数: ${testData.totalProblems}問\n\n`;
        
        // 注意事項
        content += '【注意事項】\n';
        content += '・計算過程も書くこと\n';
        content += '・図やグラフは正確に描くこと\n';
        content += '・答えは指定された形で記入すること\n\n';
        
        // 問題
        testData.problems.forEach((problem, index) => {
            content += `-----------------------------------------\n`;
            content += `問${index + 1} [${problem.field}]\n`;
            content += `-----------------------------------------\n`;
            content += `${problem.question}\n\n`;
            content += '【解答】\n';
            content += '___________________________________\n';
            content += '___________________________________\n';
            content += '___________________________________\n\n';
        });
        
        return content;
    }

    // 解答付きPDF生成
    generateAnswerPDF(testData) {
        return new Promise((resolve, reject) => {
            try {
                if (typeof window !== 'undefined' && window.jsPDF) {
                    const pdf = this.generateClientSideAnswerPDF(testData);
                    resolve(pdf);
                } else {
                    const textContent = this.generateAnswerTextContent(testData);
                    resolve(textContent);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    // 解答付きクライアントサイドPDF生成
    generateClientSideAnswerPDF(testData) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        let yPosition = 30;
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        
        // タイトル
        doc.setFontSize(this.fontSize.title);
        doc.setFont(undefined, 'bold');
        doc.text('数学テスト - 解答と解説', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 25;
        
        // 問題と解答
        doc.setFontSize(this.fontSize.body);
        testData.problems.forEach((problem, index) => {
            // ページ改行チェック
            if (yPosition > pageHeight - 80) {
                doc.addPage();
                yPosition = 30;
            }
            
            // 問題番号
            doc.setFont(undefined, 'bold');
            doc.text(`問${index + 1}`, this.pageMargin, yPosition);
            yPosition += 5;
            
            // 分野表示
            doc.setFontSize(this.fontSize.small);
            doc.setFont(undefined, 'normal');
            doc.text(`[${problem.field}]`, this.pageMargin + 30, yPosition - 5);
            
            // 問題文
            doc.setFontSize(this.fontSize.body);
            doc.setFont(undefined, 'normal');
            yPosition += 10;
            
            const questionLines = this.splitText(problem.question, pageWidth - 2 * this.pageMargin);
            questionLines.forEach(line => {
                doc.text(line, this.pageMargin, yPosition);
                yPosition += this.lineHeight;
            });
            
            // 解答
            yPosition += 10;
            doc.setFont(undefined, 'bold');
            doc.text('【解答】', this.pageMargin, yPosition);
            doc.setFont(undefined, 'normal');
            yPosition += 10;
            doc.text(`${problem.answer}`, this.pageMargin + 10, yPosition);
            yPosition += 15;
            
            // 解説
            if (problem.solution) {
                doc.setFont(undefined, 'bold');
                doc.text('【解説】', this.pageMargin, yPosition);
                doc.setFont(undefined, 'normal');
                yPosition += 10;
                
                const solutionLines = this.splitText(problem.solution, pageWidth - 2 * this.pageMargin);
                solutionLines.forEach(line => {
                    doc.text(line, this.pageMargin + 10, yPosition);
                    yPosition += this.lineHeight;
                });
            }
            
            yPosition += 15;
        });
        
        return doc;
    }

    // 解答テキスト形式生成
    generateAnswerTextContent(testData) {
        let content = '';
        
        // ヘッダー
        content += '=========================================\n';
        content += '       数学テスト - 解答と解説\n';
        content += '=========================================\n\n';
        
        // 問題と解答
        testData.problems.forEach((problem, index) => {
            content += `-----------------------------------------\n`;
            content += `問${index + 1} [${problem.field}]\n`;
            content += `-----------------------------------------\n`;
            content += `${problem.question}\n\n`;
            content += `【解答】 ${problem.answer}\n\n`;
            if (problem.solution) {
                content += `【解説】\n${problem.solution}\n\n`;
            }
        });
        
        return content;
    }

    // テキスト分割ユーティリティ
    splitText(text, maxWidth) {
        const lines = text.split('\n');
        const result = [];
        
        lines.forEach(line => {
            if (line.length === 0) {
                result.push('');
                return;
            }
            
            // 簡単な文字数ベースの分割（実際にはより精密な計算が必要）
            const maxChars = Math.floor(maxWidth / 6); // 大まかな文字幅
            if (line.length <= maxChars) {
                result.push(line);
            } else {
                let currentLine = '';
                const words = line.split('');
                
                words.forEach(char => {
                    if (currentLine.length + 1 <= maxChars) {
                        currentLine += char;
                    } else {
                        if (currentLine) result.push(currentLine);
                        currentLine = char;
                    }
                });
                
                if (currentLine) result.push(currentLine);
            }
        });
        
        return result;
    }

    // PDFダウンロード処理
    downloadPDF(pdf, filename) {
        if (pdf.save) {
            // jsPDFオブジェクトの場合
            pdf.save(filename);
        } else {
            // テキストコンテンツの場合
            const blob = new Blob([pdf], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
}

module.exports = PDFGenerator;