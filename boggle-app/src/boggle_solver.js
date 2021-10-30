/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
exports.findAllSolutions = function (grid, dictionary) {
  let solutions = [];
  
  //checks validity
  if (grid === null || dictionary === null) {
    return solutions;
  }
  if (grid.length === 0) {
    return solutions;
  }
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].length !=== grid.length) {
      return solutions;
     }
  }
  
  toLowercase(grid, dictionary); //changes all letters to lowercase
  let trie = ttMaker(dictionary); //converts dictionary to trie tree

  let finalSet = new Set();

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid.length; col++) {
      let current = "";
      let past = new Array(grid.length)
        .fill(false)
        .map(() => new Array(grid.length).fill(false));
      search(current, past, row, col, grid, trie, finalSet);
    }
  }

  solutions = Array.from(finalSet);
  return solutions;
};

function toLowercase(grid, dictionary) {
  for (let i = 0; i < dictionary.length; i++) {
    dictionary[i] = dictionary[i].toLowerCase();
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }
};

var ttNode = function (value) {
  this.value = value;
  this.children = new Array[];
  this.validWord = false;
};

var ttMaker = function (dict) {
  var root = new ttNode("");

  if (dict.length === 0) {
    return;
  }

  for (let word of dict) {
    var node = root;
    for (let i = 0; i < word.length; i++) {
      var letter = word[i];
      var ord = letter.charCodeAt(0) - 97;
      var curr = node.children[ord];
      if (node.children[ord] === undefined) {
        var curr = new ttNode(letter);
        node.children[ord] = curr;
      }
      node = curr;
    }
    node.validWord = true;
  }
  return root;
};

function search(current, past, row, col, grid, trie, finalSet) {
  let neighbors = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];

  if (
    row < 0 ||
    row >= grid.length ||
    col < 0 ||
    col >= grid[0].length ||
    past[row][col] === true
  ) {
    return;
  }

  current += grid[row][col];
  if (QUorST(current, trie)) {
    past[row][col] = true;
    if (validWord(current, trie)) {
      if (current.length >= 3) {
        finalSet.add(current);
      }
    }
    for (let i = 0; i < neighbors.length; i++) {
      search(
        current,
        past,
        row + neighbors[i][0],
        col + neighbors[i][1],
        grid,
        trie,
        finalSet
      );
    }
  }
  past[row][col] = false;
};

function QUorST(current, trie) {
  let word2 = "";
  let curr = trie;
  for (let i = 0; i < current.length; i++) {
    if (curr !== undefined) {
      for (let node of curr.children) {
        if (node !== undefined && node.value === current[i]) {
          word2 += current[i];
          curr = node;
          break;
        }
      }
    }
  }
  if (current === word2) {
    return true;
  }
  return false;
};

function validWord(current, trie) {
  let word2 = "";
  let curr = trie;

  for (let i = 0; i < current.length; i++) {
    if (curr !== undefined) {
      for (let node of curr.children) {
        if (node !== undefined && node.value === current[i]) {
          word2 += current[i];
          curr = node;
          break;
        }
      }
    }
  }
  if (current === word2 && curr.validWord === true) {
    return true;
  }
  return false;
};

// const grid = [['A', 'QU'],
//               ['D', 'C'],];
// const dictionary = ['ada', 'aqu', 'cud'];

const grid = [
  ["T", "W", "Y", "R"],
  ["E", "N", "P", "H"],
  ["G", "Z", "Qu", "R"],
  ["O", "N", "T", "A"],
];
const dictionary = [
  "art",
  "ego",
  "gent",
  "get",
  "net",
  "new",
  "newt",
  "prat",
  "pry",
  "qua",
  "quart",
  "quartz",
  "rat",
  "tar",
  "tarp",
  "ten",
  "went",
  "wet",
  "arty",
  "egg",
  "not",
  "quar",
];

console.log(exports.findAllSolutions(grid, dictionary));
