# Tic Tac Toe

This **Tic Tac Toe** game is a simple, interactive web application built using **HTML**, **CSS**, and **JavaScript**. The game offers two modes: **One Player** (against AI) and **Two Player** (local). The goal is to implement as much functionality as possible within factories and avoid global code By doing so, the project promotes modularity and scalability, while maintaining a clean and organized structure..

The main purpose of this project is to demonstrate my proficiency in **JavaScript** and the use of **Factory Functions**.

## Features 🚀

- **Two Game Modes**:
  - **One Player**: Play against the AI.
  - **Two Player**: Play with a friend locally.

- **AI Opponent**: The AI intelligently selects moves to win or block your moves.
- **Score Tracking**: Player scores are tracked throughout the session.
- **Game Reset**: Restart the game with the click of a button.
- **Responsive Design**: The app adapts its layout for different screen sizes.

## Purpose 🎯

This project is designed to showcase my skills in **JavaScript** with a focus on:

- **Factory Functions**: Using factories to manage game components like the board, cells, and game controller.
- **DOM Manipulation**: Dynamically updating the game interface in response to player actions.
- **Event Handling**: Managing user input and game interactions through event listeners.
- **AI Logic**: Implementing an AI opponent that intelligently responds to player moves.
- **CSS Styling**: Creating a visually appealing and responsive layout with animations.

## Technologies Used ⚙️

### **HTML**: 
- simple layout with a start screen, game container, and gameboard.
- The game screen includes options to select one or two players, enter player names, and start the game.
### **CSS**: 
- The styling uses a minimalistic design with subtle animations and hover effects for interactive elements.
- The gameboard uses a flexible grid layout to arrange the cells for a responsive game experience.
### **JavaScript**: 
- The game logic is divided into multiple factories:
  - **Cell Factory**: Defines the individual cells of the board, with methods to track their current state (either `X` or `O`).
  - **GameBoard Factory**: Manages the state of the entire board, handling cell updates, resets, and retrieval of the board's current state.
  - **GameController Factory**: Coordinates the gameplay, manages turns, checks for wins, ties, and handles AI logic when playing against the computer.
  - **Display Logic**: Handles dynamic updates to the DOM, including rendering the gameboard, updating scores, and showing game results.

## How to Play 🕹️

1. Open the app in a browser.
2. Choose your game mode:
   - **One Player**: Play against the AI.
   - **Two Player**: Play with a friend.
3. Click on any of the cells on the game board to place your marker (`X` or `O`).
4. The game will automatically switch turns between the two players or player and AI.
5. After a winner is determined or the game is a draw, you can restart or change the game mode.

## Installation ⚡

To run the game locally:

1. Clone the repository:
   ```bash
   git clone git@github.com:DGUXdesigns/tic-tac-toe.git