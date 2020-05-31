## Welcome to Adventure-Capitalist Pages

Development Tool : Cocos Creator v2.3.4

Development Script : Typescript

Static Data Format : json

Play Environment : [Web browser (mobile / desktop) of Cocos Creator support](https://docs.cocos.com/creator/manual/en/publish/publish-web.html#browser-compatibility)



### Description of the problem and solution.
- Problem) Table data format<br>
Easy-to-read data format
- Solution)
Use Json format.
- Reasoning)
It is a well-known data format, and the key-value format makes it easy to understand the data and its meaning.

- Problem) 테이블 데이터 포맷을 읽기 쉬운 데이터 포맷으로 사용하기
- Solution) Json 포맷을 사용한다.
- Reasoning)
잘 알려진 데이터 포맷이고, key-value 포맷으로  데이터와 그 의미를 쉽게 파악할 수 있다.
---
- Problem) Business, Manager data and code separation<br>
Business and Manager data are separated from code, so game balance can be adjusted only by changing data

- Solution)
Organize business and manager data tables into json files, load them in game, and allow games to be played only by changing data.

- Reasoning)
If the game can be operated only with data without modifying the code, the code and data are separated and there is no influence on each other, so there is little room for an issue, which helps development stability. Also, it is possible to adjust the game balance without code modification, so development and balancing can be performed simultaneously.

- Problem) Business, Manager 데이터와 코드 분리<br>
Business 와 Manager 의 데이터가 코드와 분리되어, 데이터 변경만으로 게임 밸런스를 조절하기

- Solution)
Business, Manager 데이터 테이블을 json 파일로 구성하고, 게임에서 로드하여, 데이터 변경만으로 게임을 할 수 있도록 한다.

- Reasoning)
코드 수정없이 데이터만으로 게임을 조작할 수 있으면, 코드와 데이터가 분리되어 서로 영향을 주는 일이 없으므로, 이슈 발생 여지가 거의 없어, 개발 안정성에 도움이 된다. 또, 게임 밸런스를 조절하는 일도 코드 수정없이 할 수 있어, 개발과 밸런싱을 병행할 수 있다.
---
- Problem) Gameplay persistence<br>
If you close the browser in progress and open it again, you will need to save your game data when you restart the game.

- Solution)
Since there is no game server, I decided to use the storage space in the browser, and save / read it in the browser storage space using Cocos Creator's cc.sys.localStorage API.

- Reasoning)
There is no time and cost to build a game server, and it is more important to quickly implement only the core core of the game and receive user feedback.

- Problem) 게임 플레이 지속 문제

게임 진행 중인 브라우저를 닫고, 다시 열면, 이전에 하던 게임을 다시 시작하게 할 때, 사용자의 게임 데이터 저장이 필요하다.

- Solution)
게임 서버가 없는 상태여서, 브라우저내의 저장공간을 사용하기로 하고, Cocos Creator 의 cc.sys.localStorage API 를 사용하여, 브라우저 저장공간에 저장/읽기를 함.

- Reasoning)
사용자의 게임 서버를 구축할 시간과 비용이 없고, 게임의 핵심 코어만을 빠르게 구현하여, 사용자 피드백을 받는 것이 더 중요하다.
---
