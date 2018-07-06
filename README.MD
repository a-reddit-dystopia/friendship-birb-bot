# FRIENDSHIP BIRB BOT

## Lottery workflow

### Before drawings
- Elroy administrator starts a lottery: ```elroy set lottery enabled```
- Admin can set invite message ```elroy set inviteMessage '/w piprunetotem-bleeding-hollow pirate' ```


### During Drawings
- Members enter lottery: ```elroy enter biebear bleeding-hollow```
- Admin draws winners ```elroy lottery 10```
  - Elroy mentions all winners in lottery channel
- Elroy DMs instructions about what is about to happen and asks them to respond within a set time
  - If user responds
    - Elroy adds a `AOTC Winner` discord role 
    - If users are in a voice channel, Elroy moves users to the winners circle voice channel
  - if user fails to respond
      - elroy continues to draw until the lottery number is satisfied
- Lobby helper initiates invite instructions to members of the winners circle voice chan with ```AOTC Winner``` role. ```elroy invite```
- Lobber helper yanks 'AOTC Winner' after a period ```elroy yank @biebear```
- repeat!
