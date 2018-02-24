# 2018_1_Technokek
Игра про моделирование системы метрополитена и трамвайной сети. Аналогичная игра - Mini Metro.


## API:

### GET USER:           /user/<id>/
```
{
    id,
    nickname,
    email,
    avatar, // url
    games_number,
    highscore    
}
```

### GET USER HISTORY:   /user/<id>/history?mode=<game_mode>?page=<page_number>/
  
* game_mode == **MULTIPLAYER**:
```  
[
    // game
    {
        date,
        score,
        teammate: {
            id,
            nickname
        } // or NULL if anonymous
    },
    ...
]
```
* game_mode == **SINGLAPLAYER**:
```
[
// game
{
    date,
    score,
},
...
]
```

### GET SCOREBOARD:     /scoreboard/?mode=<game_mode>?user=<id>?page=<page_number>/
* game_mode == **MULTIPLAYER**:
```
{
    me: {
        position,
        date,
        score,
        teammate: {
            id,
            nickname
        } // or NULL if anonymous
    }, // or NULL if logged out
    athother: [
        {
            date,
            score,
            teammate: {
                id,
                nickname
            } // or NULL if anonymous
        },
        ...
    ]
}
```
* game_mode == **SINGLAPLAYER**:
```
{
    me: {
        position,
        date,
        score
    }, // or NULL if logged out
    athother: [
        {
            date,
            score
        },
        ...
    ]
}
```

### POST LOGIN          /login/
```
{
    email,
    password
}
```
### POST REGISTER       /register/
```
{
    email,
    nickname,
    password
}
```
### GET ABOUT           /about/
```
[
    {
        paragraph
    },
    ...
]
```
### GET RULES           /rules/
```
[
    {
        type: // text or image
        text: // text or image url 
    },
    ...
]
```
### POST EDIT USER      /user/<id>?field=<field_type>/
* field_type == **EMAIL**
```
{
    text
}
```
* field_type == **NICKNAME**
```
{
    text
}
```
* field_type == **PASSWORD**
```
{
    password,
    new_password
}
```
### ИГРОВАЯ ЧАСТЬ
// Скоро ...