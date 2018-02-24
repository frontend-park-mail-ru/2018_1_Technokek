# 2018_1_Technokek
Игра про моделирование системы метрополитена и трамвайной сети. Аналогичная игра - Mini Metro.


## API:

### GET USER:           
Url: `/user/<id>/`
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

### GET USER'S HISTORY:   
Url: `/user/<id\>/history?mode=<game_mode>?page=<page_number>/`
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
* game_mode == **SINGLEPLAYER**:
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

### GET SCOREBOARD:     
Url: `/scoreboard/?mode=<game_mode>?user=<id>?page=<page_number>/`
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
* game_mode == **SINGLEPLAYER**:
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

### POST LOGIN          
Url: `/login/`
```
{
    email,
    password
}
```
### POST REGISTER       
Url: `/register/`
```
{
    email,
    nickname,
    password
}
```
### GET ABOUT           
Url: `/about/`
```
[
    {
        paragraph
    },
    ...
]
```
### GET RULES           
Url: `/rules/`
```
[
    {
        type: // text or image
        text: // text or image url 
    },
    ...
]
```
### POST EDIT USER      
Url: `/user/<id>?field=<field_type>/`
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