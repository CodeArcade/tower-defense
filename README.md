# Tower Defense
## Field Setup

|||Gra|vey|ard|||
|-|-|-|-|-|-|-|
||Forest P-V|Forest Y-V|Forest R-V|Forest B-V|Forest G-V||
|Forest G->|||V|||Forest <-P|
|Forest B->|||V|||Forest <-Y|
|Forest R->||>|Tower|<||Forest <-R|
|Forest Y->|||/\\|||Forest <-B|
|Forest P->|||V|||Forest <-G|
||Village|Village|Village|Village|Village||

3 random not red skeletons are spawned before the game begins
## Phases
- Phases that require player action will have 45 second timer
  - If timer runs out the action will be taken at random or it will be passed 
### Hero Move
- Hero can not stand still - you can not pass
- Hero can move orthogonal or diagonal - like king in chess
- Hero does not trigger traps
- Kills skeletons on touch
### Traps
- Place trap, pick trap or pass
- Place trap
  - Pick trap from stash
  - Place it on field without trap, tower or skeleton
  - Trap stays until picked up or destroyed 
- Take trap
  - Pick trap from field and return it to stash
  - Trap can be used later again
- Pass
  - do nothing

- Available traps are decided pre game (manual selection, weekly rotation, ...)

#### Trap
- Can be used dedicated amount of times
- Once last use was triggered trap is destoryed
- Gets refreshed when returned to stash
- Grants points at end of game if not destroyed
- Does not trigger if hero is on top

#### List of Traps
- Wall
  - 2 uses
  - Skeletons change direction by 90° based on alignment of wall - Angle of incidence equals angle of reflection
  - then they move one more field
  - walls can be chained
- Dragon
  - 2 uses
  - Can be played on skeletons and is instantly triggered if done so
  - Place skeletons on orthogonal fields you your choice (forest is also possible)
- Catapult
  - 2 uses
  - Moves skeletons in graveyard of choice (not own) 
- Treasure
  - 1 use
  - If treasure is played all orthogonal skeletons that border turn their direction towards the treasure
  - This also happens if a skeleton moves next to the treasure
  - Treasure is destroyed if a skeleton steps on it 
- Bomb
  - 1 use
  - Kills skeletons
  - Can be played on skeletons but not on hero
  - Blocks field where used, so new traps can't be played here
- Labyrinth
  - Infinite uses
  - Skeletons that enter the labyrinth can not move next round (if they are still in it)
- Hearse
  - Infinite uses
  - Skeletons that end up on hearse are moved to graveyard of choice (not own) with hearse
  - If hearse is in your graveyard return it to stash
- Palisade
  - 2 uses
  - Blocks movement of skeletons
  - Also triggered if hero stands on it
  - Skeletons that would be redirected from **one or multiple** walls, stay in front of the walls - walls and palisade are triggered
- Spring
  - 2 uses
  - moves skeleton 2 fields in its direction ([->] [S] [ ] [ X])
  - skeletons are not affected by skiped field
  - can leave field this way (forest, village)
  - if thrown into palisade skeleton dies and palisade is triggered
- Portal
  - 2 uses
  - returns skeleton to spawn
- Ballista
  - 2 uses
  - Place only on tower
  - Has direction
  - Triggers when skeleton reaches tower in direction ballista is facing
  - Kills skeleton
- Fan
  - 1 use
  - Has direction
  - Does not affect skeletons on fan, but gets destroyed if skeleton on top
  - Pushes bordering skeletons in facing direction on lane without changing rotation
- Skeleton in Distress
  - Like treasure, but if destroyed summons a skeleton in direction of the village
  - worth less points than treasure, to give it an incentive to play over treasure
    - are there other tweaks to make it less worse than treasure?
- Shield
  - Place on other trap where (only if no skeleton is on top of it)
  - The next time the trap would use one use it does not
  - Then the shield is destroyed
  - If the "enchanted" trap is picked up, pick up the shield as well
  - Can not target hearse, labyrinth or bomb
### Skeletons Move
- Have fix spawn point and spawn direction
  - e.g. R-> (red and to the right)

- If new spawned they are in forest besides field
- They move one field in direction
- If all skeletons moved traps are triggered
- Then skeletons on the same field as the hero die
- Then skeletons on diretion arrows rotate
- If skeleton leaves forest
  - If the skeleton moves into the forest on the left, immediately put it in the graveyard on your left
  - If the skeleton moves into the forest on the right, immediately place it in the graveyard on your right.
  - If the skeleton moves into the forest above, immediately put it into a graveyard of your choice, but not own.
- If skeleton moves on tower or village, destroy one tower layer or house
  - If tower or village is destroyed the game ends

### Skeletons Spawn
- Spawn three random skeletons 
  - Spawning places them on their spawn point in the forest based on spawn point and direction
- Skeletons in graveyard are spawned as well

### End of Game
- Game is over one a village or tower has been destroyed
- Players with a destroyed village or tower do not get any points
- Remaining houses, tower layers and traps reward points
- Player with most points wins