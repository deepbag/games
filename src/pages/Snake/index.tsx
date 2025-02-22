import React, { useState, useEffect, useRef } from "react";
import "./snake.css";

interface Position {
  x: number;
  y: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const gridSize: number = 20;
  const maxX: number = Math.floor(dimensions.width / gridSize);
  const maxY: number = Math.floor(dimensions.height / gridSize);

  const moveSnake = (): void => {
    if (gameOver || !isPlaying) return;

    const head: Position = { ...snake[0] };
    switch (direction) {
      case "RIGHT":
        head.x += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
    }

    if (head.x >= maxX) head.x = 0;
    else if (head.x < 0) head.x = maxX - 1;
    if (head.y >= maxY) head.y = 0;
    else if (head.y < 0) head.y = maxY - 1;

    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    const newSnake: Position[] = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setScore((prev) => prev + 1);
      setFood({
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
      });
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const handleKeyPress = (e: KeyboardEvent): void => {
    switch (e.key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
    }
  };

  const drawGame = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    ctx.fillStyle = "green";
    snake.forEach((segment) => {
      ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize - 2,
        gridSize - 2
      );
    });

    ctx.fillStyle = "red";
    ctx.fillRect(
      food.x * gridSize,
      food.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );

    if (gameOver) {
      ctx.fillStyle = "black";
      ctx.font = "24px Arial";
      ctx.fillText(
        `Game Over! Score: ${score}`,
        dimensions.width / 4,
        dimensions.height / 2
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = setInterval(moveSnake, 100);
    }
    return () => clearInterval(interval);
  }, [snake, direction, gameOver, isPlaying]);

  useEffect(() => {
    drawGame();
  }, [snake, food, gameOver, dimensions]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  const restartGame = (): void => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  const togglePlay = (): void => {
    if (gameOver) {
      restartGame();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="rgx-snake-game">
      <div className="rgx-topbar-snake">
        <p className="rgx-score">Score: {score}</p>
        <div className="rgx-controls">
          <button
            className="rgx-control-btn"
            onClick={togglePlay}
            style={{ marginRight: "10px" }}
          >
            {isPlaying ? "Stop" : "Start"}
          </button>
          {gameOver && (
            <button className="rgx-restart-btn" onClick={restartGame}>
              Restart
            </button>
          )}
        </div>
      </div>
      <p className="rgx-developer-information">
        developed by{" "}
        <strong>
          <a
            href="https://www.linkedin.com/in/deepbag"
            target="_blank"
            rel="noopener noreferrer"
          >
            deepbag
          </a>
        </strong>{" "}
        &{" "}
        <strong>
          <a href="https://grok.com" target="_blank" rel="noopener noreferrer">
            grokai
          </a>
        </strong>{" "}
        & hosted{" "}
        <strong>
          <a
            href="https://github.com/deepbag/games"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </strong>
      </p>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="rgx-canvas"
      />
    </div>
  );
};

export default SnakeGame;
