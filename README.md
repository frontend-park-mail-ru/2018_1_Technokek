# 2018_1_Technokek

## Описание

Игра про моделирование системы метрополитена и трамвайной сети. Аналогичная игра - Mini Metro.

## API

________________________________________________________________________

* ### GET

#### GET PROFILE

**url:** `/user/me/`

```javascript
{
    message: {
        id: 1,
        nickname: 'vitalyCherkov',
        email: 'vitaly@cher.kov',
        score: 0,
        games_number: 0,
        avatar: null
    },
    successful: true
}
```

#### GET USER

**url:** `/user/<id>/`

```javascript
//   if your id attribute === user ID -> you can get this data
{
    message: {
        id: 1,
        nickname: "vitaliycherkov",
        password: 1,
        email: "vitaliycherkov@gmail.com",
        avatar: null,
    },
    successful: true,
}

```

#### GET SCOREBOARD

**url:** `/scoreboard/<mode>/<page>/`

**per page:** 10

* `mode === 'singleplayer'`

  ```javascript
    {
        message: [
            another: [
                {
                    index: 1,
                    nickname: 'Busov',
                    score: 1200
                },
                {
                    index: 2,
                    nickname: 'Shport',
                    score: 1200
                }
                // ...
            ]
            me: {
                index: 1
            }
        ],
        successful: true
    }
  ```

  Информация о своей поизции должна содержать только index, т.е. положение в общем рейтинге, т.к. вся остальная информация уже была до этого загружена по `/user/me`. Но для упрощения в общем списке `another` информация о текущем пользователе вполне может быть, т.к. при возврате общего рейтинга не нужно удалять из выборки информацию о текущем пользователе. Аналогично и для следующего пункта.

* `mode === 'multiplayer'`

  ```javascript
    {
        message: [
            another: [
                {
                    index: 1,
                    nickname1: 'Busov',
                    nickname2: 'Cherkov',
                    score: 1200
                },
                {
                    index: 2,
                    nickname1: 'Shport',
                    nickname2: 'Chernega',
                    score: 1200
                }
                // ...
            ]
            me: {
                index: 1,
                nickname2: 'Busov',
                score: 1200,
            }
        ],
        successful: true
    }
  ```

  Здесь все то же самое, что и в предыдущем пункте. Однако для информации о текущем пользователе в `multiplayer` нужно дополнительно передать `nickname` второго игрока и общий `score`.

#### GET HISTORY

**url:** `/history/<mode>/<page>/`

**per page:** 10

* `mode === 'singleplayer'`

  ```javascript
    {
        message: [
            {
                date: '10-11-2017',
                score: 1200
            },
            {
                date: '12-10-2017',
                score: 1000
            }
        ],
        successful: true
    }
  ```

* `mode === 'multiplayer'`

  ```javascript
    {
        message: [
            {
                date: '10-11-2017',
                partner: 'Shport',
                score: 1200
            },
            {
                date: '12-10-2017',
                partner: 'Chernega'
                score: 1000
            }
        ],
        successful: true
    }
  ```

#### GET AVATAR

**url:** `/avatars/<avatar>/`

**responce:** file

+ TODO: `avatars` change to `upload`

#### GET ABOUT

**url:** `/about/`

```javascript
{
    message: [
        {
            type: 'text',
            content: 'Hello world'
        },
        {
            type: 'img',
            content: 'image_url.png'
        },
        ...
    ],
    successful: true
}
```

* Т.е. можно сказать, что `about` состоит из ряда блоков, каждый из которых может быть текстовым, либо картинкой. Абзацы делятся по текстовым блокам.
* Если этот блок - картинка, то пользователь идет по соотвусвующему урлу в `uploads`

#### GET RULES

**url:** `/rules/`

* Здесь ситуация абсолютно аналогична, что и в **about**, только слово **'about'** заменяется на **'rules'**

________________________________________________________________________

* ### POST

#### POST LOGIN

* **url:** `/login/`

* **request:**

  ```javascript
    {
        'email': 'ema@il.com',
        'password': 'password'
    }
  ```

* **responce успешный:**

  ```javascript
    {
        successful: true
    }
  ```

  В случае, если `successful === true`, осуществляется запрос по `/user/me/`

* **responce с ошибкой:**

  ```javascript
    {
        message: {
            global: [
                'Incorrect email or password',
            ],
            fields: {
                'email': [
                    'Incorrect fomat of email',
                    'The second error for this field'
                ],
                'password': [
                    'This field is required'
                ]
            }
        },
        successful: false
    }
  ```

  Таким образом, об ошибках форм следует знать следующее:
  * Они бывают двух типов:
    * _Глобальные_ - те, которые относятся сразу ко всем полям
    * _Ошибки полей_ - относятся к конкретному полю
  * **Важно:** к каждому полю передается массив ошибок, т.е. учитывается случай, когда их  может быть несколько. Соответсвенно, если ошибок к конкретному полю нет, то массив пуст.
  * Корректные же значения передавать обратно не нужно, т.к. предполагается, что они сохранены на клиенте.


#### POST REGISTRATION

* ** url: _** `/signup/`

* ** request: _**

  ```javascript
    {
        'nickname': 'Keker'
        'email': 'keker@lol.com',
        'password': 'password'
        'password_repeat': 'password'
    }
  ```

* ** responce успешный: _**

  ```javascript
    {
        successful: true
    }
  ```

  В случае, если `successful === true`, осуществляется запрос по `/user/me/`

* ** responce с ошибкой: _** ошибки всех форм описываются аналогично случаю в `/login/`

#### POST UPLOAD AVATAR

**url:** `/upload/avatar/`

if your id attribute === user ID -> file uploads

#### POST EDIT PROFILE

**url:** `/user/edit/`

* Редактирование**email**
  * **request:**
    ```javascript
    {
        'email': 'new-email@ya.ru'
    }
    ```
  * **responce успешный:**
    ```javascript
    {
        successful: true
    }
    ```
    В случае успеха осуществляется запрос по `/user/me/`
  * **responce с ошибкой:**
    ```javascript
    {
        message: {
            global: [
                'This email is already used'
            ]
        }
        successful: false
    }
    ```
    Т.к. редактируется всего одно поле, то ошибка глобальная

* Редактирование **nickname**

  Все аналогично случаю с редактированием **email**, только слово **'email'** заменяется на **'nickname'**

* Редактирование **password**
  * **request:**
    ```javascript
    {
        'password': 'querty123',
        'new_password': 'password1',
        'new_password_repeat': 'password1'
    }
    ```
  * **responce успешный:**
    ```javascript
    {
        successful: true
    }
    ```
    В случае успеха осуществляется запрос по `/user/me/`
  * **responce c ошибкой:** в данном случае ответ сервера аналогичен вышеописанным ответам с ошибками форм.

#### POST LOGOUT

* **url:** `/logout/`
* **request:** пустой
* **responce успешный:**

  ```javascript
    {
        successful: true
    }
  ```

* **responce с ошибкой:**

  ```javascript
    {
        message: 'Something went wrong'
        successful: false
    }
  ```