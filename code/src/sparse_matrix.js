const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');

class SparseMatrix {
    constructor(filePath = null) {
        this.rows = 0;
        this.cols = 0;
        this.data = new Map(); // Store as "row,col" => value
        this.maxRow = -1;
        this.maxCol = -1;

        if (filePath) {
            this.loadFromFile(filePath);
        }
    }

    loadFromFile(filePath) {
        const absolutePath = path.resolve(filePath);
        const content = fs.readFileSync(absolutePath, 'utf-8')
            .split('\n')
            .slice(2) // Skip first two lines
            .filter(line => line.trim() !== '');

        content.forEach((rawLine, index) => {
            const line = rawLine.trim();
            const lineNum = index + 3; // Account for skipped lines
            
            if (!(line.startsWith('(') && line.endsWith(')'))) {
                throw new Error(`Invalid format line ${lineNum}: ${rawLine}`);
            }

            const clean = line.slice(1, -1).replace(/\s/g, '');
            const parts = clean.split(',');
            
            if (parts.length !== 3) {
                throw new Error(`Invalid entry line ${lineNum}: ${rawLine}`);
            }

            const [row, col, value] = parts.map(Number);
            
            if (isNaN(row) || isNaN(col) || isNaN(value)) {
                throw new Error(`Non-numeric values line ${lineNum}: ${rawLine}`);
            }

            this.maxRow = Math.max(this.maxRow, row);
            this.maxCol = Math.max(this.maxCol, col);
            
            if (value !== 0) {
                this.data.set(`${row},${col}`, value);
            }
        });

        this.rows = this.maxRow + 1;
        this.cols = this.maxCol + 1;
    }

    getElement(row, col) {
        return this.data.get(`${row},${col}`) || 0;
    }

    add(other) {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error(`Dimension mismatch: Cannot add ${this.rows}x${this.cols} and ${other.rows}x${other.cols}`);
        }

        const result = new SparseMatrix();
        result.rows = this.rows;
        result.cols = this.cols;

        // Copy all entries from both matrices
        new Set([...this.data.keys(), ...other.data.keys()]).forEach(key => {
            const sum = (this.data.get(key) || 0) + (other.data.get(key) || 0);
            if (sum !== 0) {
                result.data.set(key, sum);
            }
        });

        return result;
    }

    multiply(other) {
        if (this.cols !== other.rows) {
            throw new Error(`Dimension mismatch: Cannot multiply ${this.rows}x${this.cols} and ${other.rows}x${other.cols}`);
        }

        const result = new SparseMatrix();
        result.rows = this.rows;
        result.cols = other.cols;

        this.data.forEach((valueA, key) => {
            const [i, k] = key.split(',').map(Number);
            for (let j = 0; j < other.cols; j++) {
                const valueB = other.getElement(k, j);
                if (valueB !== 0) {
                    const current = result.getElement(i, j);
                    result.data.set(`${i},${j}`, current + valueA * valueB);
                }
            }
        });

        return result;
    }

    saveToFile(filePath) {
        const entries = [];
        this.data.forEach((value, key) => {
            const [row, col] = key.split(',').map(Number);
            entries.push(`(${row}, ${col}, ${value})`);
        });

        const content = [
            `rows=${this.rows}`,
            `cols=${this.cols}`,
            ...entries.sort()
        ].join('\n');

        fs.writeFileSync(filePath, content);
    }
}

// CLI Interface
function main() {
    console.log("Sparse Matrix Operations");
    const operation = readline.questionInt(
        "Choose operation:\n1. Add\n2. Subtract\n3. Multiply\nEnter choice (1-3): "
    );

    const file1 = path.resolve(readline.question("First matrix path: ").trim());
    const file2 = path.resolve(readline.question("Second matrix path: ").trim());
    const outputPath = path.resolve(readline.question("Output file path: ").trim());

    try {
        const matrixA = new SparseMatrix(file1);
        const matrixB = new SparseMatrix(file2);
        
        let result;
        switch(operation) {
            case 1:
                result = matrixA.add(matrixB);
                break;
            case 2:
                // Implement subtract similarly
                throw new Error("Subtract not implemented - follow add() pattern");
            case 3:
                result = matrixA.multiply(matrixB);
                break;
            default:
                throw new Error("Invalid operation");
        }

        result.saveToFile(outputPath);
        console.log(`Operation successful! Result saved to ${outputPath}`);
        console.log(`Result dimensions: ${result.rows}x${result.cols}`);
        console.log(`Non-zero entries: ${result.data.size}`);

    } catch (error) {
        console.error("\nError:", error.message);
        console.log("Common issues:");
        console.log("- Invalid file format (check parentheses and commas)");
        console.log("- Dimension mismatch for operation");
        console.log("- File not found or permission issues");
        process.exit(1);
    }
}

main();