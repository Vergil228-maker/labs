const boardContainer = document.getElementById('board-container');
        const statusDiv = document.getElementById('status');
        const sizeSelect = document.getElementById('size-select');
        const newGameBtn = document.getElementById('new-game');

        let board = [];
        let currentPlayer = 'X';
        let gameActive = true;

        function checkWin() {
            const size = board.length;

            for (let i = 0; i < size; i++) {
                let win = true;
                for (let j = 0; j < size; j++) {
                    if (board[i][j] !== currentPlayer) {
                        win = false;
                        break;
                    }
                }
                if (win) return true;
            }

            for (let j = 0; j < size; j++) {
                let win = true;
                for (let i = 0; i < size; i++) {
                    if (board[i][j] !== currentPlayer) {
                        win = false;
                        break;
                    }
                }
                if (win) return true;
            }

            let win = true;
            for (let i = 0; i < size; i++) {
                if (board[i][i] !== currentPlayer) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
            // Проверка побочной диагонали
            win = true;
            for (let i = 0; i < size; i++) {
                if (board[i][size - 1 - i] !== currentPlayer) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
            return false;
        }

        function checkDraw() {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === null) return false;
                }
            }
            return true;
        }

        function handleMove(row, col, cell) {
            if (!gameActive) return;
            if (board[row][col] !== null) return;

            board[row][col] = currentPlayer;
            cell.innerText = currentPlayer;

            if (checkWin()) {
                statusDiv.innerText = `Победил ${currentPlayer}!`;
                gameActive = false;
                return;
            }

            if (checkDraw()) {
                statusDiv.innerText = 'Ничья!';
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDiv.innerText = `Ходит ${currentPlayer}`;
        }

        function createBoard(size) {
            boardContainer.innerHTML = '';
            board = Array(size).fill().map(() => Array(size).fill(null));

            const table = document.createElement('table');
            for (let i = 0; i < size; i++) {
                const tr = document.createElement('tr');
                for (let j = 0; j < size; j++) {
                    const td = document.createElement('td');
                    td.addEventListener('click', (function(r, c) {
                        return function() {
                            handleMove(r, c, td);
                        };
                    })(i, j));
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            boardContainer.appendChild(table);
        }

        function resetGame() {
            const size = parseInt(sizeSelect.value);
            createBoard(size);
            currentPlayer = 'X';
            gameActive = true;
            statusDiv.innerText = 'Ходит X';
        }

resetGame();
newGameBtn.addEventListener('click', resetGame);
sizeSelect.addEventListener('change', resetGame);