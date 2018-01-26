1. client get request to /api/user/newgame. generate gameId put into games. - done
2. get first question. return gameId and first question to client - done
3. client submits answer to question with gameID. - done
4. update games document with progress - done
4. server validates client answer. stores in gameId provided. update games document with progress 1 -done
5. server provides next question -done
6. server validates client answer. stores in gameId provided. update games document with progress 2 - done
7. validate answers generate score. - done
8. update game collection update highscore document. -done
9. if user has answered all questions. end game. calculate score -done
10. get user to provide name. -done
11. return highscore document to user. -done


