# DSA-HW02-SparseMatrix

## 📝 Overview

A Node.js CLI tool for performing operations (addition, subtraction, multiplication) on sparse matrices stored in a simple text file format. Designed for educational use in Data Structures & Algorithms coursework.

## ✨ Features

- 📂 Loads sparse matrices from custom text files
- ⚡ Efficient storage using JavaScript `Map`
- ➕➖✖️ Supports matrix addition, subtraction, and multiplication
- 💾 Saves results to file in the same format
- 🖥️ Command-line interface for interactive use
- 🛡️ Robust error handling for file format and dimension mismatches

## 📦 Folder Structure

```
DSA-HW02-SparseMatrix/
├── code/
│   └── src/
│       └── sparse_matrix.js    # Main CLI and sparse matrix logic
├── README.md                   # Project documentation
├── LICENSE                     # MIT License
```

## 🚀 Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/hamse-ai/DSA-HW02-SparseMatrix.git
    cd DSA-HW02-SparseMatrix
    ```

2. Install dependencies:
    ```bash
    npm install readline-sync
    ```

## ⚙️ Usage

Run the CLI with Node.js:

```bash
node code/src/sparse_matrix.js
```

You will be prompted to:
- Choose an operation: Add, Subtract, or Multiply
- Enter paths for the two input matrix files
- Enter a path for the output file

### 🗂️ Example Matrix File Format

```
rows=3
cols=3
(0, 1, 5)
(2, 2, 8)
```

- First two lines specify dimensions.
- Each subsequent line: `(row, col, value)` (omit zeros).

### 🖥️ Example Session

```
Sparse Matrix Operations
Choose operation:
1. Add
2. Subtract
3. Multiply
Enter choice (1-3): 2
First matrix path: ./mat1.txt
Second matrix path: ./mat2.txt
Output file path: ./result.txt
Operation successful! Result saved to ./result.txt
Result dimensions: 3x3
Non-zero entries: 4
```

## 📝 Notes

- All three operations (add, subtract, multiply) are implemented.
- Input files must match the specified format or errors will be thrown.
- For large matrices, further optimizations are possible but not required for coursework.

## 🧪 Testing

> No automated tests are included yet. For best results, test manually with a variety of input files, including edge cases (zero matrices, mismatched dimensions, empty files, etc.).

## 👐 Contributing

Open source contributions are welcome! Feel free to fork the repository, create issues, or submit pull requests.

## 📄 License

This project is licensed under the MIT License.  
See [LICENSE](./LICENSE) for details.

---

**MIT License**  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the conditions stated in the LICENSE file.
