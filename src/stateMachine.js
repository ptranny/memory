import { createMachine, assign } from 'xstate'

const tiles = [
  '\u{1F330}',
  '\u{1F33D}',
  '\u{1F33E}',
  '\u{1F34D}',
  '\u{1F341}',
  '\u{1F34D}',
  '\u{1F33F}',
  '\u{1F33D}',
  '\u{1F33F}',
  '\u{1F340}',
  '\u{1F330}',
  '\u{1F347}',
  '\u{1F33E}',
  '\u{1F347}',
  '\u{1F341}',
  '\u{1F340}',
]

export default createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    context: {
      tiles,
      match: Array(tiles.length).fill(0),
    },
    id: 'memory',
    initial: 'idle',
    states: {
      idle: {
        on: {
          guess: {
            target: 'guessing',
            actions: assign({
              guess1: (context, event) => event.id,
            }),
          },
        },
      },
      guessing: {
        on: {
          guess: {
            target: 'checking for match',
            actions: assign({
              guess2: (context, event) => event.id,
            }),
          },
        },
      },
      'checking for match': {
        always: [
          {
            target: 'checking for win',
            cond: (context) =>
              context.tiles[context.guess1] === context.tiles[context.guess2],
            actions: (context) => {
              context.match[context.guess1] = 1
              context.match[context.guess2] = 1
            },
          },
          {
            target: 'idle',
            actions: assign({ guess1: null, guess2: null }),
          },
        ],
      },
      'checking for win': {
        always: [
          {
            target: 'win',
            cond: (context, event) =>
              context.match.reduce((sum, value) => sum + value) ===
              context.tiles.length,
          },
          {
            target: 'idle',
          },
        ],
      },
      win: {
        type: 'final',
      },
    },
  },
  {
    actions: {},
    services: {},
    guards: {},
    delays: {},
  }
)
