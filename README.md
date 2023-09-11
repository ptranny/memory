# Demo

[https://ptranny.github.io/memory/](https://ptranny.github.io/memory/)

# Memory Game

This is an implementation of a classic game using a tool called a state chart to model the game logic. A state chart can be thought of as a more powerful extension of a finite state machine.

The first implementation I ever made of this game mixed both game and presentation logic in the tile components and also forced a render of every single tile on every single turn. My goals for this new implementation were to have a clean separation of game and presentation logic and trigger renders in a more granular way, so that only tiles clicked on during a turn would be rendered. Of course this is just a trivial example with lightweight components so the amount of renders is not going to cost a significant amount of compute time either way, but one could imagine a real scenario where you would not want to re-render complex components needlessly. I built this proof of concept as a way to explore coding patterns that could be used with real apps.

The basic event loop looks like this:
- user clicks on a tile
- the tile sends an event to the state machine and subscribes to state updates
- the state machine carries out all of the logic for assessing a match and win condition and notifies all listeners on state change
- once a turn is complete and all the tiles involved have updated themselves, they unsubscribe